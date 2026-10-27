# Running this project on Replit

- This project uses Next.js App Router.
- The project targets Node.js 24.x, matching its Vercel deployment runtime.
- The `Start application` workflow runs `npm run dev` on `0.0.0.0:5000`.
- Use `npm run build` to make a production build and `npm start` to serve it.
- The app's routes and reusable components live in `app/`; live portfolio content is stored in Supabase.
- Apply `supabase/schema.sql`, configure project environment variables, and run `npm run seed:portfolio` to upload the starter images and populate the first content row.
- Static documents are served from `public/`. `src/assets/` contains seed images that the setup script uploads to S3.
- The contact form opens a prefilled email draft and does not require service credentials.
