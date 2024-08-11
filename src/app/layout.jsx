import { Lato } from "next/font/google";
// import "../../app/globals.css";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { CSPostHogProvider } from "./provider";

const lato = Lato({
  subsets: ["latin", "latin-ext"],
  weight: ["100", "300", "400", "700", "900"],
});

export const metadata = {
  title: "Portafolio - Create Stunning Portfolios Instantly",
  description:
    "Effortlessly craft professional sites by choosing a template, entering your details, and publishing instantly.",
  icon: "../../public/Images/Logo.svg",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <CSPostHogProvider>
        <html lang="en">
          <body className={lato.className}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Navbar />
              {children}
            </ThemeProvider>
            <Toaster />
          </body>
        </html>
      </CSPostHogProvider>
    </ClerkProvider>
  );
}
