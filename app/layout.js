import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  title: "W E L C O M E   I T Z   F I Z Z",
  description: "Scroll-driven car animation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className={`${poppins.className} bg-[#0f172a] text-white min-h-screen antialiased`}>
        {children}
      </body>
    </html>
  );
}

