import { API_BASE_URL } from "@/constants";

interface FetchOptions extends RequestInit {
  revalidate?: number;
  noCache?: boolean; // Add this for explicit no-cache cases
}

type Category = {
  category: string;
  categoryUrl: string;
};

async function apiClient<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  const { revalidate, noCache, ...fetchOptions } = options;

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...fetchOptions.headers,
      },
      // FIXED: Default to cache, only disable if explicitly requested
      ...(noCache
        ? { cache: "no-store" }
        : revalidate
          ? { next: { revalidate } }
          : { cache: "force-cache" }), // Cache by default
      ...fetchOptions,
    });

    if (!res.ok) {
      const errorMessage = `API Error: ${res.status} ${res.statusText}`;
      console.error(errorMessage, { endpoint });
      throw new Error(errorMessage);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Failed to fetch ${endpoint}:`, error.message);
      throw error;
    }
    throw new Error(`Unknown error occurred while fetching ${endpoint}`);
  }
}

// Export typed functions with proper caching
export async function getProductsAndCategories() {
  // Cache for 1 hour (3600 seconds) - adjust as needed
  return apiClient<{ products: any[]; categoryList: Category[] }>("/products", {
    revalidate: 3600,
  });
}

export async function getCategories() {
  return apiClient<string[]>("/categories", { revalidate: 3600 });
}

export async function getProductByCategory(slug: string) {
  return apiClient<any>(`/products/${slug}`, { revalidate: 3600 });
}
