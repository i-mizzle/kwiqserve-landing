import type { Metadata } from "next";
import { Bricolage_Grotesque, Outfit } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/context/ToastContext";

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "KwiqServe",
  description: "Smart, simple, and reliable POS & retail management. From sales and inventory to staff and reports, KwiqServe helps small businesses run smoother, sell faster, and grow smarter.",
  openGraph: {
    description: "Smart, simple, and reliable POS & retail management. From sales and inventory to staff and reports, KwiqServe helps small businesses run smoother, sell faster, and grow smarter.",
    images: "https://res.cloudinary.com/dsdjt8qsv/image/upload/v1759482488/dashboard_bjffv9.png",
    url: "https://elevana.cloud/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KwiqServe",
    description: "Smart, simple, and reliable POS & retail management. From sales and inventory to staff and reports, KwiqServe helps small businesses run smoother, sell faster, and grow smarter.",
    images: "https://res.cloudinary.com/dsdjt8qsv/image/upload/v1759482488/dashboard_bjffv9.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bricolageGrotesque.variable} ${outfit.variable}`}>
        <ToastProvider>
          <div className="min-h-screen">
            {/* <Header /> */}
            <main className="mx-auto">{children}</main>
            {/* <Footer /> */}
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}
