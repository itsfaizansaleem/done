import type { Metadata } from "next";
import { ClerkProvider, SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "faizansaleem.studio | Faizan Digital Solutions",
  description: "Premium Digital Products and Design Assets.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-brand-bg font-sans text-white antialiased">
        <ClerkProvider>
          <header className="flex justify-end p-4 gap-4 bg-brand-bg border-b border-white/5">
            <Show when="signed-out">
              <div className="flex gap-4">
                <SignInButton mode="modal">
                  <button className="px-6 py-2 border border-white/20 text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all">Sign In</button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="px-6 py-2 bg-white text-black text-[10px] uppercase tracking-widest font-bold hover:bg-neutral-200 transition-all">Sign Up</button>
                </SignUpButton>
              </div>
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
          </header>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <SpeedInsights />
        </ClerkProvider>
      </body>
    </html>
  );
}
