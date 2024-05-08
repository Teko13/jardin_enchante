import { Rubik } from "next/font/google";
import Header from "./(globals)/header";
import "./globals.css";
import { UserProvider } from "./(context)/userContext";
import Footer from "./(globals)/Footer";
import { CartProvider } from "./(context)/cartContext";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
        <body className={rubik.className}>
          <UserProvider>
          <CartProvider>
            <Header />
              <main className="w-full min-h-screen pt-[5rem]">
                {children}
              </main>
              <Footer />
            </CartProvider>
            </UserProvider>
        </body>
    </html>
  );
}
