import { randomUUID } from "node:crypto";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { getAdminSession } from "../../../../lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;
const imageTypes = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["image/gif", "gif"],
]);

export async function POST(request) {
  const session = await getAdminSession();
  if (!session.configured) {
    return NextResponse.json({ error: "Admin is not configured." }, { status: 503 });
  }
  if (!session.isAdmin) {
    return NextResponse.json({ error: "Not authorized." }, { status: 401 });
  }

  const region = process.env.AWS_REGION;
  const bucket = process.env.AWS_S3_BUCKET;
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

  if (!region || !bucket || !accessKeyId || !secretAccessKey) {
    return NextResponse.json({ error: "S3 image storage is not configured." }, { status: 503 });
  }

  let form;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Upload form is invalid." }, { status: 400 });
  }

  const file = form.get("file");
  if (!file || typeof file.arrayBuffer !== "function") {
    return NextResponse.json({ error: "Choose an image file to upload." }, { status: 400 });
  }
  if (file.size < 1 || file.size > MAX_UPLOAD_BYTES) {
    return NextResponse.json({ error: "Images must be 4 MB or smaller." }, { status: 413 });
  }

  const extension = imageTypes.get(file.type);
  if (!extension) {
    return NextResponse.json(
      { error: "Use a JPG, PNG, WebP, or GIF image." },
      { status: 415 },
    );
  }

  const key = `portfolio/${randomUUID()}.${extension}`;
  const client = new S3Client({
    region,
    credentials: { accessKeyId, secretAccessKey },
  });

  try {
    await client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: Buffer.from(await file.arrayBuffer()),
        ContentType: file.type,
        CacheControl: "public, max-age=31536000, immutable",
      }),
    );
  } catch (error) {
    console.error("S3 upload failed:", error);
    return NextResponse.json({ error: "The image could not be uploaded to S3." }, { status: 502 });
  }

  const baseUrl =
    process.env.AWS_S3_PUBLIC_URL?.replace(/\/+$/, "") ||
    `https://${bucket}.s3.${region}.amazonaws.com`;
  const publicUrl = `${baseUrl}/${key.split("/").map(encodeURIComponent).join("/")}`;

  return NextResponse.json({ url: publicUrl });
}
