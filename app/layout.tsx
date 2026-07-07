import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "900"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = "https://kyarameru.jp";
const SITE_TITLE = "Ryuki Sato | IT for Smiles";
const SITE_DESCRIPTION =
  "ITで、笑顔をつくる。Ryuki Satoのポートフォリオサイトです。エンジニアとしてのプロジェクトやスキルを紹介しています。";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: ["Ryuki Sato", "エンジニア", "ポートフォリオ", "IT", "Flutter", "Python"],
  authors: [{ name: "Ryuki Sato" }],
  alternates: { canonical: "/" },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "Ryuki Sato Portfolio",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/ogp.png`,
        width: 1200,
        height: 630,
        alt: "Ryuki Sato - IT for Smiles | エンジニアポートフォリオ",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@kyarameru_dev",
    creator: "@kyarameru_dev",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/ogp.png`],
  },
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23111111'/%3E%3Ctext x='50' y='70' font-family='Arial, sans-serif' font-size='60' font-weight='900' text-anchor='middle' fill='%23ffffff'%3ERS%3C/text%3E%3C/svg%3E",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ryuki Sato",
  alternateName: "佐藤 琉輝",
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/ogp.png`,
  jobTitle: "Software Engineer",
  description:
    "ITで、笑顔をつくる。NFC/RFIDを軸に、誰もが使いやすいUIを開発するエンジニア。",
  email: "mailto:ryu727tmm19@gmail.com",
  knowsAbout: ["NFC", "RFID", "Flutter", "Python", "JavaScript", "AI"],
  sameAs: ["https://github.com/ryuki0616", "https://x.com/kyarameru_dev"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className={`${notoSansJP.variable} ${inter.variable}`}>
        {children}
      </body>
      <GoogleAnalytics gaId="G-T086H1JGHX" />
    </html>
  );
}
