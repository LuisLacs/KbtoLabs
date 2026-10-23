import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kbto Labs | Punto de Venta, Desarrollo de Software y Automatización IoT",
  description:
    "Sistemas Punto de Venta (POS), plataformas web a medida y monitoreo IoT para negocios en Guasave, Sinaloa y todo México. Precios claros en MXN y soporte directo de ingeniería.",
  openGraph: {
    title: "Kbto Labs | Software, POS y Automatización Industrial",
    description:
      "Digitaliza caja, inventario y monitoreo físico con sistemas propios y precios transparentes en MXN.",
    locale: "es_MX",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
