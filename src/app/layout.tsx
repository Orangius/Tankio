import type { Metadata } from "next"
import { Inter, Nunito } from "next/font/google"
import "./globals.css"
import Header from "@components/header/header"

const nunito = Nunito({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Tankio",
  description: "Manage your water tanks from anywhere",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.className}`}>
        <Header />
        {children}
      </body>
    </html>
  )
}
