import "./globals.css";
import ScrollReveal from "./components/ScrollReveal";

export const metadata = {
  title: "Hariprasath V — Full-stack developer",
  description:
    "Portfolio of Hariprasath V, a full-stack developer building thoughtful digital products and dependable web applications.",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body>
        <ScrollReveal />
        {children}
      </body>
    </html>
  );
}
