# Supabase and S3 setup

The portfolio reads one JSON document from Supabase and uses server-side AWS S3 uploads for portfolio images. Do not put the Supabase service-role key, AWS keys, or owner setup token in client code or commit them.

## 1. Create the Supabase table

1. Create or open a Supabase project.
2. In the Supabase SQL Editor, run the contents of `supabase/schema.sql`.
3. Copy the project URL, anon/public key, and service-role key from the project's API settings.

## 2. Create an S3 bucket

Create a bucket in AWS and an IAM access key restricted to `s3:PutObject` for that bucket's `portfolio/*` path. Do not grant object deletion or bucket listing.

The website displays images directly from their public URLs. Either:

- Allow public `s3:GetObject` only for `arn:aws:s3:::YOUR_BUCKET_NAME/portfolio/*` and keep bucket listing private; or
- Put CloudFront in front of the bucket and set `AWS_S3_PUBLIC_URL` to its base URL.

The S3 uploads are made by the server, so bucket CORS is not required. If using direct S3 URLs, review the bucket's Block Public Access settings because they can override a public-read policy. Only upload images intended for the public portfolio.

## 3. Add environment variables

Set these in Replit Secrets for local preview and in the Vercel project's Environment Variables for deployment:

| Name | Purpose |
| --- | --- |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_ANON_KEY` | Supabase anon/public API key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only Supabase admin/database access |
| `ADMIN_EMAIL` | The single owner email allowed to create an admin account |
| `ADMIN_SETUP_TOKEN` | One-time secret, at least 32 characters |
| `AWS_REGION` | S3 bucket region |
| `AWS_S3_BUCKET` | S3 bucket name |
| `AWS_ACCESS_KEY_ID` | Restricted IAM access key |
| `AWS_SECRET_ACCESS_KEY` | Restricted IAM secret key |
| `AWS_S3_PUBLIC_URL` | Optional public base URL, such as a CloudFront domain |

Generate the setup token locally with a password manager or a command such as `openssl rand -hex 32`. Enter it in the admin setup form; do not paste it into chat or commit it.

## 4. Seed the initial content and images

With the environment variables available in the shell, run:

```bash
npm run seed:portfolio
```

This uploads the existing portrait and project screenshots from `src/assets/` to `portfolio/initial/` in S3 and inserts the starter content into Supabase only if the `primary` row does not already exist. It does not overwrite existing edits.

## 5. Create the owner account

Open `/admin`, choose **First time? Set up the owner account**, and use the `ADMIN_EMAIL`, a password of at least 12 characters, and the one-time setup token. Once the owner account exists, remove `ADMIN_SETUP_TOKEN` from Replit and Vercel settings. The signup endpoint refuses to create another account for that email.

Use the dashboard to edit every portfolio section, add or remove list entries, upload images, and save the content document. Uploaded files are stored in S3 and the resulting public URL is saved in Supabase.

## Deployment note

The project pins Node.js 24.x with `package.json` so Vercel uses Node 24 for its next build. Vercel still needs the same service environment variables as the Replit preview. Add them under the Vercel project settings before promoting the updated site.
