import { API_BASE_URL } from "@/constants";
import axios from "axios";

export function getCatogoriesWithImages(categoryList, type) {
  const icons = [
    {
      name: "Pickles",
      category: "Homestyle-Pickles",
      url: "https://organicnationmages.s3.ap-south-1.amazonaws.com/category_carousel_new/reduced-quality/pickle.webp",
    },
    {
      name: "Honey",
      category: "Organic-Honey",
      url: "https://organicnationmages.s3.ap-south-1.amazonaws.com/category_carousel_new/reduced-quality/honey.webp",
    },
    {
      name: "Seasonings",
      category: "Seasonings-&-Herbs",
      url: "https://organicnationmages.s3.ap-south-1.amazonaws.com/category_carousel_new/reduced-quality/seasonings.webp",
    },
    {
      name: "Salt",
      category: "Salt",
      url: "https://organicnationmages.s3.ap-south-1.amazonaws.com/category_carousel_new/reduced-quality/salt.webp",
    },
    {
      name: "Cereals",
      category: "Breakfast-Cereals",
      url: "https://organicnationmages.s3.ap-south-1.amazonaws.com/category_carousel_new/reduced-quality/breakfast.webp",
    },
    {
      name: "Chutney",
      category: "Chutney-&-Dip",
      url: "https://organicnationmages.s3.ap-south-1.amazonaws.com/category_carousel_new/reduced-quality/chutney.webp",
    },
    {
      name: "Oats",
      category: "Oats",
      url: "https://organicnationmages.s3.ap-south-1.amazonaws.com/category_carousel_new/reduced-quality/oats.webp",
    },
    {
      name: "Oils",
      category: "Organic-Oils",
      url: "https://organicnationmages.s3.ap-south-1.amazonaws.com/category_carousel_new/reduced-quality/oils.webp",
    },
    {
      name: "Preserves",
      category: "Fruit-Preserves",
      url: "https://organicnationmages.s3.ap-south-1.amazonaws.com/category_carousel_new/reduced-quality/fruit_preserves.webp",
    },
    {
      name: "Vegan",
      category: "Vegan",
      url: "https://organicnationmages.s3.ap-south-1.amazonaws.com/category_carousel_new/reduced-quality/vegan.webp",
    },
    {
      name: "Sweeteners",
      category: "Sweeteners",
      url: "https://organicnationmages.s3.ap-south-1.amazonaws.com/category_carousel_new/reduced-quality/sweeteners.webp",
    },
    {
      name: "Tea",
      category: "Organic-Tea",
      url: "https://organicnationmages.s3.ap-south-1.amazonaws.com/category_carousel_new/reduced-quality/tea.webp",
    },
    {
      name: "Combo",
      category: "Gifts-&-Combos",
      url: "https://organicnationmages.s3.ap-south-1.amazonaws.com/category_carousel_new/reduced-quality/combo.webp",
    },
  ];

  const categoriesWithImages = categoryList
    ?.filter((item) => item.category !== "All" && item.category !== "Demo")
    .map((item) => {
      return {
        ...item,
        // image: imageLookup[item.categoryUrl] || null,
        name:
          icons.filter((curIcon) => curIcon.category === item.categoryUrl)[0]
            ?.name || null,
        image:
          icons.filter((curIcon) => curIcon.category === item.categoryUrl)[0]
            ?.url || null,
      };
    });

  return categoriesWithImages;
}

// generate random Transaction Id
export const generateTransactionID = () => {
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 1000000);
  const merchantPrefix = "T";
  const transactionID = `${merchantPrefix}${timestamp}${randomNum}`;
  return transactionID;
};

export const additionalDiscountforOnlinePayment = (
  totalCartAmount,
  totalTax,
) => {
  const DISCOUNT_PERCENTAGE = 5;

  //calculate additional 5% discount
  const additionalDiscount = (totalCartAmount * DISCOUNT_PERCENTAGE) / 100;
  const additionalTaxDiscount = (totalTax * DISCOUNT_PERCENTAGE) / 100;

  return {
    onlineDiscount: Math.round(additionalDiscount),
    taxDiscount: Math.round(additionalTaxDiscount),
  };
};

export const timeAgo = (createdAt) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now - new Date(createdAt)) / 1000);

  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(diffInSeconds / 3600);
  const days = Math.floor(diffInSeconds / 86400);
  const months = Math.floor(diffInSeconds / 2592000); // 30 days in a month
  const years = Math.floor(diffInSeconds / 31536000); // 365 days in a year

  if (years > 0) return `${years} year${years > 1 ? "s" : ""} ago`;
  if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;
  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  return `${diffInSeconds} second${diffInSeconds > 1 ? "s" : ""} ago`;
};

export const uploadFileToS3 = async (file, folder, type) => {
  // Step 1: Get presigned URL from your backend
  const { data } = await axios.post(
    `${API_BASE_URL}/api/orders/get-upload-url`,
    {
      fileName: file.name,
      fileType: file.type,
      folder,
      type,
    },
  );

  // Step 2: Upload directly to S3 (bypasses CloudFront completely)
  await fetch(data.uploadUrl, {
    method: "PUT",
    body: file,
    headers: { "Content-Type": file.type },
  });

  return data.fileUrl;
};
