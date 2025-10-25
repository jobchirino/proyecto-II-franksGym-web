import "./globals.css";
import { Roboto_Mono } from "next/font/google";

export const metadata = {
  title: "Frank`s Gym",
  description: "Administración de atletas en Frank`s Gym",
};

export const roboto = Roboto_Mono({
  subsets: ["latin"],
  weight: '400'
});

export default function RootLayout({ children }) {
  
  return (
    <html lang="es">
      <body className="w-full min-h-dvh">
        {children}
      </body>
    </html>
  );
}
