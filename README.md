# Hariprasath V — Portfolio

A responsive, monochrome portfolio built with the Next.js App Router. It presents Hariprasath's experience, certifications, skills, selected projects, and contact details.

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
npm run lint   # Lint the application
```

## Project structure

```text
app/
  components/  # Shared interactive and presentation components
  data/        # Portfolio content and links
  globals.css  # Global styles and responsive visual system
  layout.jsx   # Root document and metadata
  page.jsx     # Server-rendered portfolio page
public/        # Resume, certificates, and 3D model assets
src/assets/    # Portfolio photography and project preview images
```

The contact form prepares an email in the visitor's email app; it does not send messages through a configured email provider.
