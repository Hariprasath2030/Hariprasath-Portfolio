# Hariprasath V — Portfolio

A responsive, monochrome portfolio built with the Next.js App Router. Public content is loaded from Supabase, managed through an owner-only admin dashboard, and portfolio images are stored in an S3 bucket.

## Run locally

Use Node.js 24.x.

```bash
npm install
npm run dev
```

Open [http://localhost:5000](http://localhost:5000).

## Commands

```bash
npm run dev    # Start the Next.js development server
npm run build  # Create a production build
npm start      # Serve the production build
npm run lint   # Lint app routes, libraries, and scripts
npm run seed:portfolio # Upload starter images and seed the database
```

## Project structure

```text
app/
  admin/       # Owner sign-in and CMS dashboard
  api/admin/   # Owner-checked content and image APIs
  components/  # Reusable site, section, icon, and admin components
  globals.css  # Responsive monochrome visual system and animations
  page.jsx     # Server-rendered portfolio loaded from Supabase
lib/           # Supabase clients and owner authorization
scripts/       # Initial content and S3 image seed
supabase/      # Database schema and starter content
public/        # Resume, certificates, and 3D model assets
src/assets/    # Source images uploaded to S3 by the seed command
```

The contact form prepares an email in the visitor's email app; it does not send messages through a configured email provider.

## Database and image storage setup

Follow [the Supabase and S3 setup guide](supabase/SETUP.md) before using the dashboard. The public portfolio needs an initialized `portfolio_content` row; the admin route is `/admin`. Admin account creation is restricted to the configured owner email and requires a one-time setup token.
