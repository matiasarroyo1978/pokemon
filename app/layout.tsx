/** @format */
import Providers from "./Providers";
import Header from "./pokemon/components/Header";
import "./globals.css";
import { ServerThemeProvider } from "next-themes";

export const metadata = {
  title: "Pokemon App",
  description: "A new generation of Pokemons for Pokemon",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ServerThemeProvider attribute="class">
      <html lang="en" style={{ scrollBehavior: "smooth" }}>
        <body>
          <Providers>
              <main className="bg-color w-full h-full min-h-screen py-6">
                <Header/>
                {children}
              </main>
          </Providers>
        </body>
      </html>
    </ServerThemeProvider>
  );
}
