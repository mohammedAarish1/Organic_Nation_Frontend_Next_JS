// import type { NextConfig } from "next";

// // const nextConfig: NextConfig = {
// //   /* config options here */
// //    images: {
// //     remotePatterns: [
// //       {
// //         protocol: "https",
// //         hostname: "organic-nation-product-images.s3.amazonaws.com",
// //         pathname: "**",
// //       },
// //     ],
// //   },
// // };

// const nextConfig: NextConfig = {
//   /* config options here */
//   images: {
//     domains: [
//       "organic-nation-product-images.s3.amazonaws.com",
//       "organicnationmages.s3.ap-south-1.amazonaws.com",
//       "returned-item-images.s3.ap-south-1.amazonaws.com",
//       "organic-nation-product-images.s3.ap-south-1.amazonaws.com"
//     ],
//   },
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "organic-nation-product-images.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "organicnationmages.s3.ap-south-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "returned-item-images.s3.ap-south-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "organic-nation-product-images.s3.ap-south-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "product-reviews-imgs-videos.s3.ap-south-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "organicnationmages.s3.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
