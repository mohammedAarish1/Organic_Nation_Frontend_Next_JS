// "use client";

import AnimatedSection from "./AnimatedSection";

// Content Sections
const ContentSections = () => {
  const sections = [
    {
      id: "mission",
      title: "Our Mission",
      content:
        'The mission of "Better than the Best in Organic & Natural Products" is to provide consumers with the highest quality organic goods, ensuring sustainability, purity, and health benefits, while supporting eco-friendly farming and fair-trade practices. Driven by a deep respect for nature and a passion for healthy living, our mission is twofold: to cultivate a sustainable food ecosystem and to empower communities through ethical practices.',
      imageSrc:
        "https://organicnationmages.s3.ap-south-1.amazonaws.com/AboutUs/5.png",
      imageFirst: false,
    },
    {
      id: "harmony",
      title: "Harmony with Nature",
      content:
        "Our operations are deeply rooted in environmental stewardship. Set against the backdrop of Uttarakhand's lush landscapes, we harness the purity of this region to cultivate and process organic foods that are free from harmful chemicals and pesticides. By prioritizing eco-friendly practices, we strive to preserve the natural beauty and biodiversity of our surroundings.",
      imageSrc:
        "https://organicnationmages.s3.ap-south-1.amazonaws.com/AboutUs/harmony.webp",
      imageFirst: true,
    },
    {
      id: "empowering",
      title: "Empowering Local Communities",
      content:
        "At ORGANIC NATION, we believe in the power of community. Our partnerships with local farmers are built on the principles of fair trade, respect, and mutual growth. Through training programs and resources, we empower farmers to adopt sustainable agricultural practices that enrich soil health and biodiversity, ensuring their prosperity and the health of the land they cultivate.",
      imageSrc:
        "https://organicnationmages.s3.ap-south-1.amazonaws.com/AboutUs/4.png",
      imageFirst: false,
    },
    {
      id: "quality",
      title: "Commitment to Quality",
      content:
        "Quality is the cornerstone of our philosophy. Each product is carefully processed to retain its natural goodness, ensuring that what you consume is as nourishing as it is delicious. Every product undergoes rigorous testing and adheres to the highest standards of organic certification. Our team of passionate food artisans continuously innovates, combining traditional wisdom with modern techniques.",
      imageSrc:
        "https://organicnationmages.s3.ap-south-1.amazonaws.com/AboutUs/1.png",
      imageFirst: true,
    },
    {
      id: "transparency",
      title: "Transparency and Trust",
      content:
        "We believe that trust is built through transparency. Our customers can trace the journey of their food, knowing the exact origins and the ethical practices behind its production. By fostering open communication, we ensure that every purchase supports sustainable and humane practices.",
      imageSrc:
        "https://organicnationmages.s3.ap-south-1.amazonaws.com/AboutUs/organic.webp",
      imageFirst: false,
    },
    {
      id: "journey",
      title: "Join Our Journey",
      content:
        "As we continue to grow, we invite you to join us at ORGANIC NATION and embark on a journey of natural goodness. Whether you are a health-conscious individual, a culinary enthusiast, or a supporter of sustainable living, we invite you to experience the exceptional quality and taste of our organic products. Together, we can make a positive impact - one organic meal at a time.",
      imageSrc:
        "https://organicnationmages.s3.ap-south-1.amazonaws.com/AboutUs/journey.webp",
      imageFirst: true,
    },
  ];

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
              Our Commitment to Excellence
            </span>
          </h2>
        </div>

        {/* Sections */}
        <div className="space-y-16 lg:space-y-24">
          {sections.map((section, index) => (
            <AnimatedSection key={section.id} section={section} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContentSections;
