import { MetadataRoute } from "next";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Helper to make URLs XML-safe
function safeUrl(url: string): string {
  return url.replace(/&/g, "%26");
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: "https://organicnation.co.in",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: "https://organicnation.co.in/shop/all",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: "https://organicnation.co.in/about-us",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: "https://organicnation.co.in/contact-us",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  let productPages: MetadataRoute.Sitemap = [];
  let categoryPages: MetadataRoute.Sitemap = [];

  try {
    const res = await fetch(`${API_BASE_URL}/products`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error(`API responded with ${res.status}`);

    const { products, categoryList } = await res.json();

    // Category pages
    categoryPages = categoryList.map((cat: any) => ({
      url: safeUrl(
        `https://organicnation.co.in/shop/${cat.categoryUrl?.toLowerCase() || cat}`,
      ),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    }));

    // Product pages
    productPages = products.map((product: any) => ({
      url: safeUrl(
        `https://organicnation.co.in/shop/${product["category-url"].toLowerCase()}/${product["name-url"].toLowerCase()}`,
      ),
      lastModified: new Date(product.updatedAt || Date.now()),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch (err) {
    // ✅ Sitemap won't crash — static pages still get returned
    console.error("Sitemap fetch failed:", err);
  }

  return [...staticPages, ...categoryPages, ...productPages];
}
