import "./globals.css";

export const metadata = {
  title: "W E L C O M E   I T Z   F I Z Z",
  description: "Scroll-driven car animation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#0f172a] text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
