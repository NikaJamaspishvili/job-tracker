import Navbar from "@/components/Navbar";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white">
        <div className="w-[95%] max-w-[1200px] min-h-screen flex mx-auto flex-col">
        <Navbar />
        {children}
        </div>
      </body>
    </html>
  );
}
