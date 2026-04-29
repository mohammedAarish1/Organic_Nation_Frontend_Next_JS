import { CheckCircle, Leaf, ShieldCheck, Star } from "lucide-react";
import { FadeInView } from "../animations/animation2";
import SectionHeader from "../common/SectionHeader";
import Image from "next/image";

interface Feature {
  img: string;
  text: string;
  description?: string;
}

interface WhyChooseSectionProps {
  features: Feature[];
}

// Trust Badge Component (Server Component)
const TrustBadge = ({
  type,
}: {
  type: "quality" | "eco" | "trusted" | "rated";
}) => {
  const badges = {
    quality: {
      icon: <CheckCircle className="h-3.5 w-3.5" />,
      text: "Premium Quality",
    },
    eco: {
      icon: <Leaf className="h-3.5 w-3.5" />,
      text: "Eco Friendly",
    },
    trusted: {
      icon: <ShieldCheck className="h-3.5 w-3.5" />,
      text: "Trusted",
    },
    rated: {
      icon: <Star className="h-3.5 w-3.5" />,
      text: "Top Rated",
    },
  };

  const badge = badges[type];

  return (
    <div className="bg-gradient-btn flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white shadow-md">
      {badge.icon}
      <span>{badge.text}</span>
    </div>
  );
};

// Main Server Component
export default function WhyUs({ features }: WhyChooseSectionProps) {
  // Default features if none provided
  const defaultFeatures: Feature[] = [
    {
      img: "https://organicnationmages.s3.ap-south-1.amazonaws.com/category_carousel_new/reduced-quality/pickle.webp",
      text: "Traditional Recipes",
      description:
        "Handcrafted using age-old family recipes passed down through generations",
    },
    {
      img: "https://organicnationmages.s3.ap-south-1.amazonaws.com/category_carousel_new/reduced-quality/honey.webp",
      text: "Pure & Natural",
      description:
        "Sourced directly from certified organic farms with no chemicals or additives",
    },
    {
      img: "https://organicnationmages.s3.ap-south-1.amazonaws.com/category_carousel_new/reduced-quality/oats.webp",
      text: "Farm Fresh",
      description:
        "Freshly harvested and delivered to maintain maximum nutritional value",
    },
    {
      img: "https://organicnationmages.s3.ap-south-1.amazonaws.com/category_carousel_new/reduced-quality/vegan.webp",
      text: "Quality Assured",
      description:
        "Rigorous quality checks ensure only the best products reach your table",
    },
  ];

  const displayFeatures = features?.length > 0 ? features : defaultFeatures;
  const badgeTypes: ("quality" | "eco" | "trusted" | "rated")[] = [
    "quality",
    "eco",
    "trusted",
    "rated",
  ];

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-emerald-50/30 to-white py-12 sm:py-16 lg:py-20">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-20 left-1/4 h-64 w-64 rounded-full bg-amber-200 blur-3xl" />
        <div className="absolute right-1/4 bottom-20 h-64 w-64 rounded-full bg-emerald-200 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subTitle="Why Choose Us"
          title="Why Organic Nation?"
          content="Crafted with care, our products combine tradition with innovation for unmatched quality"
        />
        {/* Section Header */}

        {/* Features Grid - Client Component for animations */}
        <FadeInView>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-8">
            {displayFeatures.map((feature, index) => (
              <div
                key={feature.img}
                className="group h-full"
                data-index={index}
              >
                <div className="flex h-full flex-col rounded-2xl bg-white p-5 shadow-md transition-shadow duration-300 hover:shadow-xl sm:p-6">
                  {/* Image Container */}
                  <div className="relative mb-4 shrink-0">
                    {/* Badge */}
                    <div className="absolute -top-2 -right-2 z-10">
                      <TrustBadge type={badgeTypes[index % 4]} />
                    </div>

                    {/* Image Background */}
                    <div className="bg-gradient-primary flex h-32 items-center justify-center overflow-hidden rounded-xl p-4">
                      <Image
                        src={feature.img}
                        alt={feature.text}
                        width={100}
                        height={50}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="grow">
                    <h3 className="text-primary mb-2 text-center text-lg font-semibold">
                      {feature.text}
                    </h3>
                    <p className="text-muted text-center text-sm">
                      {feature.description ||
                        "Experience the craftsmanship that sets our products apart."}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
