// // =============================================
// // Social Media Reviews Section
// // Add this import at the top of your file:
// // import { Instagram, Twitter, Facebook, ExternalLink } from "lucide-react";
// // =============================================

// import { Instagram, Twitter, Facebook, ExternalLink, Star, Heart } from "lucide-react";
// import Image from "next/image";
// import { FadeInView, ShimmerReveal } from "../animations/animations";

// const socialReviews = [
//   {
//     platform: "instagram",
//     handle: "@priya.wellness",
//     avatar: "https://i.pravatar.cc/150?img=47",
//     rating: 5,
//     caption:
//       "Absolutely loving my @OrganicNation haul! 🌿 The cold-pressed oils are pure gold. My skin and cooking have never been better. 10/10 would recommend to everyone! #OrganicNation #OrganicLiving",
//     image: "https://picsum.photos/seed/insta1/400/400",
//     likes: "1.2K",
//     time: "2 days ago",
//     verified: true,
//   },
//   {
//     platform: "twitter",
//     handle: "@rahul_eats_clean",
//     avatar: "https://i.pravatar.cc/150?img=33",
//     rating: 5,
//     caption:
//       "Just received my order from @OrganicNation and I'm genuinely impressed. The packaging is eco-friendly, everything arrived fresh, and the taste? Unbeatable. This is how organic should be. ✅🌾",
//     image: null,
//     likes: "847",
//     time: "5 days ago",
//     verified: true,
//   },
//   {
//     platform: "instagram",
//     handle: "@sneha.homechef",
//     avatar: "https://i.pravatar.cc/150?img=20",
//     rating: 5,
//     caption:
//       "Made my mom's recipe with @OrganicNation pickles and everyone at the table was floored 😍 The authenticity hits different. Grandma approved! #HomeCooking #OrganicNation #PickleLove",
//     image: "https://picsum.photos/seed/insta2/400/400",
//     likes: "3.4K",
//     time: "1 week ago",
//     verified: false,
//   },
//   {
//     platform: "facebook",
//     handle: "Meena Krishnamurthy",
//     avatar: "https://i.pravatar.cc/150?img=44",
//     rating: 5,
//     caption:
//       "Posted a review on their page but had to share here too — Organic Nation's honey is THE BEST I've ever tasted. Pure, raw, and no aftertaste. My whole family switched. Highly recommended! 💛",
//     image: "https://picsum.photos/seed/fb1/400/400",
//     likes: "562",
//     time: "3 days ago",
//     verified: true,
//   },
//   {
//     platform: "twitter",
//     handle: "@fitness_arjun",
//     avatar: "https://i.pravatar.cc/150?img=68",
//     rating: 5,
//     caption:
//       "3 months into using @OrganicNation oats & superfoods in my morning routine. Energy levels are through the roof 🚀 No bloating, no chemicals, just clean fuel. Athletes — this one's for you.",
//     image: null,
//     likes: "1.9K",
//     time: "4 days ago",
//     verified: true,
//   },
//   {
//     platform: "instagram",
//     handle: "@deepika.organics",
//     avatar: "https://i.pravatar.cc/150?img=29",
//     rating: 5,
//     caption:
//       "Unboxing my @OrganicNation monthly subscription box 📦✨ Everything is so beautifully packaged and the quality is consistently amazing every single time. Worth every rupee! #Unboxing #OrganicNation",
//     image: "https://picsum.photos/seed/insta3/400/400",
//     likes: "2.7K",
//     time: "6 days ago",
//     verified: true,
//   },
// ];

// const platformConfig = {
//   instagram: {
//     icon: Instagram,
//     label: "Instagram",
//     gradient: "from-purple-500 via-pink-500 to-orange-400",
//     bg: "bg-gradient-to-br from-purple-50 to-pink-50",
//     badge: "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700",
//   },
//   twitter: {
//     icon: Twitter,
//     label: "X (Twitter)",
//     gradient: "from-sky-400 to-blue-600",
//     bg: "bg-gradient-to-br from-sky-50 to-blue-50",
//     badge: "bg-blue-100 text-blue-700",
//   },
//   facebook: {
//     icon: Facebook,
//     label: "Facebook",
//     gradient: "from-blue-600 to-indigo-700",
//     bg: "bg-gradient-to-br from-blue-50 to-indigo-50",
//     badge: "bg-indigo-100 text-indigo-700",
//   },
// };

// const SocialMediaReviews = () => {
//   return (
//     <section className="px-4 py-16 sm:px-6 lg:px-8">
//       <div className="mx-auto max-w-6xl">

//         {/* ── Section Header ── */}
//         <FadeInView>
//           <div className="mb-4 text-center">
//             <div className="mb-4 inline-block rounded-full bg-linear-to-r from-amber-100 to-orange-100 px-6 py-2">
//               <span className="text-sm font-semibold text-amber-800">
//                 📲 Across The Internet
//               </span>
//             </div>
//             <h2 className="text-secondary mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
//               Loved on Social Media
//             </h2>
//             <div className="mx-auto mb-6 h-1 w-16 bg-linear-to-r from-amber-600 to-orange-600" />
//             <p className="mx-auto max-w-xl text-base text-gray-600 sm:text-lg">
//               Real customers, real posts — see what people are sharing about us
//               on Instagram, Twitter & Facebook.
//             </p>
//           </div>
//         </FadeInView>

//         {/* ── Platform Filter Pills ── */}
//         <FadeInView>
//           <div className="mb-10 flex flex-wrap justify-center gap-3">
//             {(["instagram", "twitter", "facebook"] as const).map(
//               (platform) => {
//                 const config = platformConfig[platform];
//                 const PlatformIcon = config.icon;
//                 return (
//                   <div
//                     key={platform}
//                     className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold shadow-sm ${config.badge}`}
//                   >
//                     <PlatformIcon className="h-4 w-4" />
//                     {config.label}
//                   </div>
//                 );
//               }
//             )}
//           </div>
//         </FadeInView>

//         {/* ── Review Cards Grid ── */}
//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {socialReviews.map((review, index) => {
//             const config = platformConfig[review.platform as keyof typeof platformConfig];
//             const PlatformIcon = config.icon;

//             return (
//               <ShimmerReveal delay={0.3 + index * 0.1} key={index}>
//                 <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">

//                   {/* Hover gradient overlay */}
//                   <div className="absolute inset-0 bg-linear-to-br from-amber-100 to-orange-100 opacity-0 transition-opacity duration-300 group-hover:opacity-20" />

//                   {/* ── Card Top: Platform Bar ── */}
//                   <div className={`relative z-10 bg-linear-to-r ${config.gradient} p-4`}>
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-3">
//                         {/* Avatar */}
//                         <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-white/60">
//                           <Image
//                             src={review.avatar}
//                             alt={review.handle}
//                             fill
//                             className="object-cover"
//                             sizes="40px"
//                           />
//                         </div>
//                         {/* Handle + verified */}
//                         <div>
//                           <div className="flex items-center gap-1">
//                             <span className="text-sm font-bold text-white">
//                               {review.handle}
//                             </span>
//                             {review.verified && (
//                               <span className="text-white/90" title="Verified">
//                                 ✔
//                               </span>
//                             )}
//                           </div>
//                           <div className="flex items-center gap-1 text-white/80">
//                             <PlatformIcon className="h-3 w-3" />
//                             <span className="text-xs">{config.label}</span>
//                           </div>
//                         </div>
//                       </div>
//                       {/* External link icon */}
//                       <ExternalLink className="h-4 w-4 cursor-pointer text-white/70 transition-colors hover:text-white" />
//                     </div>
//                   </div>

//                   {/* ── Screenshot Image (if available) ── */}
//                   {review.image && (
//                     <div className="relative z-10 h-48 w-full overflow-hidden">
//                       <Image
//                         src={review.image}
//                         alt={`Social post by ${review.handle}`}
//                         fill
//                         className="object-cover transition-transform duration-500 group-hover:scale-105"
//                         sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
//                       />
//                       {/* Subtle platform watermark */}
//                       <div className="absolute bottom-2 right-2">
//                         <div
//                           className={`rounded-full bg-linear-to-br ${config.gradient} p-1.5 shadow-md`}
//                         >
//                           <PlatformIcon className="h-3.5 w-3.5 text-white" />
//                         </div>
//                       </div>
//                     </div>
//                   )}

//                   {/* ── Card Body ── */}
//                   <div className="relative z-10 flex flex-1 flex-col p-5">
//                     {/* Star Rating */}
//                     <div className="mb-3 flex gap-1">
//                       {[...Array(review.rating)].map((_, i) => (
//                         <Star
//                           key={i}
//                           className="h-4 w-4 fill-amber-500 text-amber-500"
//                         />
//                       ))}
//                     </div>

//                     {/* Caption / Post Text */}
//                     <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-700 line-clamp-4">
//                       {review.caption}
//                     </p>

//                     {/* ── Card Footer ── */}
//                     <div className="flex items-center justify-between border-t border-gray-100 pt-3">
//                       <div className="flex items-center gap-1 text-xs text-gray-500">
//                         <Heart className="h-3.5 w-3.5 fill-rose-400 text-rose-400" />
//                         <span>{review.likes} likes</span>
//                       </div>
//                       <span className="text-xs text-gray-400">{review.time}</span>
//                     </div>
//                   </div>

//                 </div>
//               </ShimmerReveal>
//             );
//           })}
//         </div>

//         {/* ── Bottom CTA Banner ── */}
//         <FadeInView>
//           <div className="mt-14 overflow-hidden rounded-3xl bg-linear-to-br from-amber-600 via-orange-500 to-red-600 p-8 text-center text-white shadow-2xl sm:p-10">
//             <p className="mb-2 text-lg font-semibold opacity-90">
//               📣 Share Your Experience
//             </p>
//             <h3 className="mb-4 text-2xl font-bold sm:text-3xl">
//               Tag us on Social Media!
//             </h3>
//             <p className="mb-6 text-base opacity-80">
//               Use{" "}
//               <span className="rounded-full bg-white/20 px-3 py-1 font-bold backdrop-blur-sm">
//                 #OrganicNation
//               </span>{" "}
//               and get featured on this page 🌿
//             </p>
//             <div className="flex flex-wrap justify-center gap-4">
//               {(["instagram", "twitter", "facebook"] as const).map(
//                 (platform) => {
//                   const config = platformConfig[platform];
//                   const PlatformIcon = config.icon;
//                   return (
//                     <button
//                       key={platform}
//                       className="flex items-center gap-2 rounded-full bg-white/20 px-6 py-2.5 text-sm font-semibold backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/30"
//                     >
//                       <PlatformIcon className="h-4 w-4" />
//                       {config.label}
//                     </button>
//                   );
//                 }
//               )}
//             </div>
//           </div>
//         </FadeInView>

//       </div>
//     </section>
//   );
// };

// export default SocialMediaReviews;
