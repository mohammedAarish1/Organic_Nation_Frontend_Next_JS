import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import Header from "@/components/common/Header";
import Header from "@/components/header/Header";
import Footer from "@/components/common/Footer";
import StoreProvider from "@/lib/StoreProvider";
import CartNotification from "@/components/cart/CartNotification";
import CartProvider from "@/components/providers/CartProvider";
import { CheckoutModalProvider } from "@/components/providers/CheckoutModalProvider";
import CheckoutModal from "@/components/checkout/CheckoutModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getProductsAndCategories } from "@/lib/services/api";
import { ProductsProvider } from "@/components/providers/ProductsProvider";
import JsonLd from "@/components/JsonLd";
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

//  it applies to  entire site pages as fallback
export const metadata: Metadata = {
  metadataBase: new URL("https://www.organicnation.co.in/"),
  title: {
    default: "Organic Nation", // Used when no page sets a title
    template: "%s | Organic Nation", // Other pages become "Product Name | Organic Nation"
  },
  description: "Pure | Natural | Organic",
  robots: {
    index: true,
    follow: true,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Organic Nation",
  url: "https://organicnation.co.in/",
  logo: "https://organicnationmages.s3.ap-south-1.amazonaws.com/logo/ON_Logo.webp",
  sameAs: [
    "https://www.instagram.com/organicnationofficial/",
    "https://www.facebook.com/profile.php?id=61580503481336",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-XXXXXXXXXX",
    contactType: "customer service",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { products, categoryList } = await getProductsAndCategories();
  return (
    <html lang="en">
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        className={`antialiased`}
      >
        <JsonLd data={organizationSchema} />
        <StoreProvider>
          <ProductsProvider products={products} categories={categoryList}>
            <CheckoutModalProvider>
              <CartProvider>
                <Header />
                {children}
                <ToastContainer
                  position="top-right"
                  autoClose={3000}
                  newestOnTop
                  closeOnClick
                  pauseOnHover
                  theme="colored"
                />
                <CartNotification />
                <CheckoutModal />
                <Footer />
              </CartProvider>
            </CheckoutModalProvider>
          </ProductsProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
