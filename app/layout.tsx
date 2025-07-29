import Navbar from "@/components/navbar/Navbar";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white-500">
        <div className="w-[95%] max-w-[1000px] min-h-screen flex mx-auto flex-col">
        <Navbar />
        {children}
        </div>
      </body>
    </html>
  );
}
