import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { loadEnvConfig } from "@next/env";
import { createClient } from "@supabase/supabase-js";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
loadEnvConfig(projectRoot);

const requiredEnv = [
  "SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
  "AWS_REGION",
  "AWS_S3_BUCKET",
  "AWS_ACCESS_KEY_ID",
  "AWS_SECRET_ACCESS_KEY",
];
const missingEnv = requiredEnv.filter((key) => !process.env[key]);

if (missingEnv.length) {
  console.error(`Missing required environment variables: ${missingEnv.join(", ")}`);
  process.exit(1);
}

const source = JSON.parse(
  await readFile(path.join(projectRoot, "supabase/seed-content.json"), "utf8"),
);
const assetFiles = source._assetFiles ?? {};
delete source._assetFiles;

const bucket = process.env.AWS_S3_BUCKET;
const region = process.env.AWS_REGION;
const s3 = new S3Client({
  region,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

function setAtPath(object, pathString, value) {
  const pathParts = pathString.split(".");
  let current = object;

  for (const part of pathParts.slice(0, -1)) {
    current = /^\d+$/.test(part) ? current[Number(part)] : current[part];
    if (!current) {
      throw new Error(`Seed asset path does not exist: ${pathString}`);
    }
  }

  const last = pathParts.at(-1);
  if (/^\d+$/.test(last)) current[Number(last)] = value;
  else current[last] = value;
}

function publicUrlFor(key) {
  const base =
    process.env.AWS_S3_PUBLIC_URL?.replace(/\/+$/, "") ||
    `https://${bucket}.s3.${region}.amazonaws.com`;
  return `${base}/${key.split("/").map(encodeURIComponent).join("/")}`;
}

for (const [contentPath, relativeFile] of Object.entries(assetFiles)) {
  const filePath = path.resolve(projectRoot, relativeFile);
  if (!filePath.startsWith(`${projectRoot}${path.sep}`)) {
    throw new Error(`Seed asset path must stay inside the project: ${relativeFile}`);
  }

  const bytes = await readFile(filePath);
  const extension = path.extname(filePath).toLowerCase();
  const contentType =
    extension === ".jpg" || extension === ".jpeg"
      ? "image/jpeg"
      : extension === ".png"
        ? "image/png"
        : extension === ".webp"
          ? "image/webp"
          : null;

  if (!contentType) {
    throw new Error(`Unsupported seed image format: ${relativeFile}`);
  }

  const key = `portfolio/initial/${path.basename(filePath)}`;
  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: bytes,
      ContentType: contentType,
      CacheControl: "public, max-age=31536000, immutable",
    }),
  );
  setAtPath(source, contentPath, publicUrlFor(key));
  console.log(`Uploaded ${path.basename(filePath)} to S3.`);
}

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } },
);

const { data: existing, error: readError } = await supabase
  .from("portfolio_content")
  .select("id")
  .eq("id", "primary")
  .maybeSingle();

if (readError) {
  throw new Error(
    `Could not access portfolio_content. Apply supabase/schema.sql first. ${readError.message}`,
  );
}

if (existing) {
  console.log("Portfolio content already exists; left it unchanged.");
  console.log("Seed images are in S3. Update image URLs from the admin dashboard if needed.");
  process.exit(0);
}

const { error: insertError } = await supabase
  .from("portfolio_content")
  .insert({ id: "primary", content: source });

if (insertError) {
  throw new Error(`Could not seed portfolio content: ${insertError.message}`);
}

console.log("Portfolio content seeded in Supabase.");
