// app/layout.tsx
import Navbar from "@/components/navbar/Navbar";
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar/>
          {children}
        </Providers>
      </body>
    </html>
  );
}