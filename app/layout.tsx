import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-blue-500">
        <div className="w-[95%] max-w-[1000px] min-h-screen flex mx-auto">
        {children}
        </div>
      </body>
    </html>
  );
}
