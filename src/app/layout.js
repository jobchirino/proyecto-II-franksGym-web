import "./globals.css";

export const metadata = {
  title: "Frank`s Gym",
  description: "Administración de atletas en Frank`s Gym",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="w-full min-h-dvh">
        {children}
      </body>
    </html>
  );
}
