import React from "react";
import {
  Leaf,
  Users,
  Heart,
  Shield,
  Recycle,
  Globe,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  Award,
  Target,
} from "lucide-react";

// Policy Section Component
const PolicySection = ({
  icon,
  title,
  description,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  description?: string;
  items: Array<{ title: string; description: string }>;
}) => {
  return (
    <div className="group rounded-2xl border-2 border-emerald-100 bg-white p-6 shadow-md transition-all hover:border-emerald-300 hover:shadow-xl sm:p-8">
      {/* Icon & Title */}
      <div className="mb-6 flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-100 to-green-100 transition-transform group-hover:scale-110">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="mb-2 text-xl font-bold text-gray-900 sm:text-2xl">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-gray-600 sm:text-base">{description}</p>
          )}
        </div>
      </div>

      {/* Items List */}
      <div className="space-y-4">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex gap-3 rounded-xl bg-gradient-to-r from-emerald-50/30 to-amber-50/30 p-4 transition-all hover:shadow-md"
          >
            <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
            <div>
              <h4 className="mb-1 font-semibold text-gray-900">{item.title}</h4>
              <p className="text-sm leading-relaxed text-gray-700">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Stats Card Component
const StatsCard = ({
  icon,
  label,
  description,
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
}) => {
  return (
    <div className="group rounded-2xl bg-white p-6 shadow-md transition-all hover:shadow-xl">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-100 to-green-100 transition-transform group-hover:scale-110">
        {icon}
      </div>
      <h4 className="mb-2 text-xl font-bold text-gray-900">{label}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

export default function CSRPolicyPage() {
  const policyData = [
    {
      icon: <Users className="h-7 w-7 text-emerald-600" />,
      title: "Supporting Marginalized Farmers",
      items: [
        {
          title: "Fair Pricing",
          description:
            "We ensure that marginalized farmers receive fair prices for their produce, empowering them economically and improving their quality of life.",
        },
        {
          title: "Capacity Building",
          description:
            "We provide training and resources to help farmers adopt organic farming practices, improve yield quality, and increase productivity.",
        },
        {
          title: "Market Access",
          description:
            "We facilitate direct access to urban markets for farmers, eliminating middlemen and ensuring that farmers receive the full value of their produce.",
        },
      ],
    },
    {
      icon: <Leaf className="h-7 w-7 text-emerald-600" />,
      title: "Promoting Environmental Sustainability",
      items: [
        {
          title: "Organic Farming",
          description:
            "We promote the use of organic farming methods that enhance soil fertility, reduce chemical usage, and preserve the natural ecosystem.",
        },
        {
          title: "Sustainable Practices",
          description:
            "We implement sustainable business practices in our operations, including waste reduction, energy efficiency, and water conservation.",
        },
        {
          title: "Biodiversity",
          description:
            "We support initiatives that protect and enhance biodiversity in the regions where we operate.",
        },
      ],
    },
    {
      icon: <Heart className="h-7 w-7 text-emerald-600" />,
      title: "Community Engagement and Development",
      items: [
        {
          title: "Education",
          description:
            "We invest in educational programs for farmers and their families, including literacy programs, agricultural education, and scholarships for children.",
        },
        {
          title: "Healthcare",
          description:
            "We support healthcare initiatives that provide medical services, health education, and wellness programs to farming communities.",
        },
        {
          title: "Infrastructure",
          description:
            "We contribute to the development of local infrastructure, such as building roads, irrigation systems, and storage facilities to support agricultural activities.",
        },
      ],
    },
    {
      icon: <Shield className="h-7 w-7 text-emerald-600" />,
      title: "Ethical Business Practices",
      items: [
        {
          title: "Transparency",
          description:
            "We maintain transparency in all our business dealings and ensure that our supply chain is free from exploitation and unethical practices.",
        },
        {
          title: "Fair Labour",
          description:
            "We adhere to fair labor practices, ensuring safe working conditions, fair wages, and respect for workers' rights.",
        },
        {
          title: "Community Fairness",
          description:
            "We engage with local communities to understand their needs and work collaboratively to create positive social impact.",
        },
      ],
    },
    {
      icon: <Recycle className="h-7 w-7 text-emerald-600" />,
      title: "Environmental Stewardship",
      items: [
        {
          title: "Carbon Footprint",
          description:
            "We work towards reducing our carbon footprint by adopting eco-friendly technologies and practices in our manufacturing processes.",
        },
        {
          title: "Recycling",
          description:
            "We promote recycling and responsible disposal of waste materials in our operations.",
        },
        {
          title: "Renewable Energy",
          description:
            "We explore and invest in renewable energy sources to power our facilities and reduce our dependence on non-renewable resources.",
        },
      ],
    },
    {
      icon: <Target className="h-7 w-7 text-emerald-600" />,
      title: "Monitoring and Reporting",
      items: [
        {
          title: "Regular Audits",
          description:
            "We conduct regular audits of our CSR activities to ensure compliance and measure impact.",
        },
        {
          title: "Reporting",
          description:
            "We provide transparent reporting on our CSR initiatives and progress to stakeholders and the public.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/30 to-white">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-20 left-1/4 h-96 w-96 rounded-full bg-amber-200 blur-3xl" />
        <div className="absolute right-1/4 bottom-20 h-96 w-96 rounded-full bg-emerald-200 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        {/* Header */}
        <div className="mb-12 text-center sm:mb-16">
          <div className="mb-4 inline-block rounded-full bg-gradient-to-r from-emerald-100 to-amber-100 px-4 py-2">
            <span className="text-sm font-semibold text-emerald-700">
              🌱 Our Commitment
            </span>
          </div>
          <h1 className="mb-4 text-4xl font-bold sm:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent">
              Foodsbay India CSR Policy
            </span>
          </h1>
          <p className="mx-auto max-w-3xl text-base text-gray-600 sm:text-lg">
            Committed to creating a sustainable and socially responsible
            business model that supports marginalized farmers, promotes
            environmental sustainability, and delivers high-quality organic
            products
          </p>
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-600">
            <Award className="h-4 w-4 text-emerald-600" />
            <span>
              Effective Date:{" "}
              <span className="font-semibold">26 June, 2024</span>
            </span>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mb-12 rounded-3xl bg-gradient-to-r from-emerald-600 to-green-600 p-8 text-center text-white shadow-xl sm:mb-16 sm:p-12">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
            <Globe className="h-8 w-8" />
          </div>
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl">Our Mission</h2>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-emerald-50 sm:text-lg">
            Foodsbay India is committed to creating a sustainable and socially
            responsible business model that supports marginalized farmers,
            promotes environmental sustainability, and delivers high-quality
            organic products to the urban marketplace. Our CSR policy outlines
            our commitment to improving the lives of farmers in Uttarakhand,
            ensuring fair trade practices, and fostering environmental
            stewardship.
          </p>
        </div>

        {/* Key Impact Areas */}
        <div className="mb-12 sm:mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 sm:text-4xl">
            Our Key Impact Areas
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <StatsCard
              icon={<Users className="h-6 w-6 text-emerald-600" />}
              label="Farmer Empowerment"
              description="Supporting marginalized farmers with fair pricing and market access"
            />
            <StatsCard
              icon={<Leaf className="h-6 w-6 text-emerald-600" />}
              label="Sustainability"
              description="Promoting organic farming and environmental conservation"
            />
            <StatsCard
              icon={<Heart className="h-6 w-6 text-emerald-600" />}
              label="Community Development"
              description="Investing in education, healthcare, and infrastructure"
            />
            <StatsCard
              icon={<Shield className="h-6 w-6 text-emerald-600" />}
              label="Ethical Practices"
              description="Ensuring transparency and fair labor in all operations"
            />
            <StatsCard
              icon={<Recycle className="h-6 w-6 text-emerald-600" />}
              label="Environmental Care"
              description="Reducing carbon footprint and promoting renewable energy"
            />
            <StatsCard
              icon={<Target className="h-6 w-6 text-emerald-600" />}
              label="Accountability"
              description="Regular audits and transparent reporting of initiatives"
            />
          </div>
        </div>

        {/* Policy Sections */}
        <div className="mb-12 space-y-8 sm:mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 sm:text-4xl">
            Our CSR Commitments
          </h2>
          {policyData.map((policy, idx) => (
            <PolicySection
              key={idx}
              icon={policy.icon}
              title={policy.title}
              items={policy.items}
            />
          ))}
        </div>

        {/* Conclusion */}
        <div className="mb-12 rounded-2xl border-2 border-emerald-200 bg-gradient-to-r from-emerald-50/50 to-amber-50/50 p-8 sm:mb-16 sm:p-10">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-600 to-green-600">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Conclusion
            </h2>
          </div>
          <p className="text-base leading-relaxed text-gray-700 sm:text-lg">
            At Foodsbay India, we believe that our success is intrinsically
            linked to the well-being of the communities we serve and the health
            of our environment. Through our CSR policy, we are dedicated to
            making a positive and lasting impact on society and the planet.
          </p>
        </div>

        {/* Contact Section */}
        <div className="rounded-3xl bg-white p-8 shadow-xl sm:p-10">
          <div className="mb-6 text-center">
            <h2 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">
              Get in Touch
            </h2>
            <p className="text-gray-600">
              For more information about our CSR initiatives, please contact us
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Address */}
            <div className="flex gap-4 rounded-2xl bg-gradient-to-r from-emerald-50/50 to-amber-50/50 p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-100 to-green-100">
                <MapPin className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-gray-900">Address</h3>
                <p className="text-sm leading-relaxed text-gray-700">
                  D-166/25, Ground Floor, Sector-50 Noida, Noida City Zone-4,
                  Gautam Buddha Nagar, Uttar Pradesh-201301
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-4 rounded-2xl bg-gradient-to-r from-emerald-50/50 to-amber-50/50 p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-100 to-green-100">
                <Mail className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-gray-900">Email</h3>
                <a
                  href="mailto:Info@foodsbay.com"
                  className="text-sm text-emerald-600 transition-colors hover:text-emerald-700"
                >
                  Info@foodsbay.com
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-4 rounded-2xl bg-gradient-to-r from-emerald-50/50 to-amber-50/50 p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-100 to-green-100">
                <Phone className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-gray-900">Phone</h3>
                <a
                  href="tel:+919999532041"
                  className="text-sm text-emerald-600 transition-colors hover:text-emerald-700"
                >
                  +91-9999532041
                </a>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-8 text-center">
            <button className="rounded-full bg-gradient-to-r from-emerald-600 to-green-600 px-8 py-4 font-semibold text-white shadow-lg transition-all hover:shadow-xl">
              Contact Our CSR Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
