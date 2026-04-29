import { Leaf, Shield, Truck } from "lucide-react";
import { FadeInView, RotateOnHover } from "../animations/animation2";

export default function FeaturesSection() {
  const features = [
    {
      icon: <Leaf className="h-6 w-6" />,
      title: "Pure & Organic",
      desc: "Certified organic products",
    },
    {
      icon: <Truck className="h-6 w-6" />,
      title: "Free Delivery",
      desc: "On orders above ₹500",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Quality Assured",
      desc: "Lab tested & verified",
    },
  ];
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, i) => (
            <FadeInView
              key={i}
              className="bg-gradient-primary rounded-2xl p-8 text-center transition-shadow hover:shadow-xl"
            >
              <RotateOnHover className="bg-gradient-btn mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full text-white">
                {feature.icon}
              </RotateOnHover>
              <h3 className="text-secondary mb-2 text-xl font-bold">
                {feature.title}
              </h3>
              <p className="text-muted">{feature.desc}</p>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}
