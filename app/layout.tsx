// app/layout.tsx
import { ReduxProvider } from "@/redux/provider";
import { Providers } from "./providers";
import Navbar from "@/components/navbar/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <Providers>
            <Navbar />
            {children}
          </Providers>
        </ReduxProvider>
      </body>
    </html>
  );
}
