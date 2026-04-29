import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*", // Applies to ALL search engine bots
        allow: "/", // Allow everything by default
        disallow: [
          "/cart", // No one should index cart
        ],
      },
    ],
    sitemap: "https://www.organicnation.co.in/sitemap.xml", // Point to your sitemap
  };
}
