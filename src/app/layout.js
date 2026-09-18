import { Cormorant_Garamond, Pinyon_Script, Work_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const pinyon = Pinyon_Script({
  variable: "--font-pinyon",
  subsets: ["latin"],
  weight: "400",
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata = {
  title: "Editar Vernaza",
  description: "Invitaciones y detalles para eventos sociales",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={`${cormorant.variable} ${pinyon.variable} ${workSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <div className="flex-1">
        {children}
        <Footer />
        </div>
      </body>
    </html>
  );
}