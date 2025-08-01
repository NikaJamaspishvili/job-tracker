import "../globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("register layout");
  return (
    <html lang="en">
      <body className="bg-blue-500">
        <div className="w-[95%] max-w-[1200px] min-h-screen flex mx-auto">
        {children}
        </div>
      </body>
    </html>
  );
}
