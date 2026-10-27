import "./globals.css";
import ScrollReveal from "./components/ScrollReveal";

export const metadata = {
  title: "Portfolio",
  description: "Personal portfolio.",
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
