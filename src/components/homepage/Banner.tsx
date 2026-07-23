import { API_BASE_URL } from "@/constants";
import BannerSection from "./BannerSection";

async function getBanners() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/main/banners`, {
      // Revalidate every 1 hour
      // next: { revalidate: 10 },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch banners");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching blogsss:", error);
    return [];
  }
}

const Banner = async () => {
  let banners = [];
  const bannerData = (await getBanners()) || [];
  banners = bannerData.mainBanners;
  return (
    <div>
      {banners.length === 0 && <div className="mt-36">Loading....</div>}
      <BannerSection banners={banners} />
    </div>
  );
};

export default Banner;
