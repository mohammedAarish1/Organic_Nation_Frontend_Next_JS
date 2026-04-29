// "use client";
import { Award, Eye, Handshake, Leaf } from "lucide-react";

// Values Section
const ValueSection = () => {
  const values = [
    {
      icon: Leaf,
      title: "Sustainability",
      description:
        "Committed to eco-friendly practices throughout our supply chain.",
      gradient: "from-green-100 to-emerald-100",
      iconColor: "text-green-600",
    },
    {
      icon: Handshake,
      title: "Community",
      description: "Supporting local farmers and empowering rural communities.",
      gradient: "from-amber-100 to-orange-100",
      iconColor: "text-amber-600",
    },
    {
      icon: Award,
      title: "Quality",
      description:
        "Ensuring excellence in every product we create and distribute.",
      gradient: "from-yellow-100 to-amber-100",
      iconColor: "text-yellow-600",
    },
    {
      icon: Eye,
      title: "Transparency",
      description:
        "Open about our processes, sources, and sustainable practices.",
      gradient: "from-blue-100 to-cyan-100",
      iconColor: "text-blue-600",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-white via-emerald-50/30 to-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-secondary mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            Our Core Values
          </h2>
          <div className="mx-auto mb-6 h-1 w-16 bg-gradient-to-r from-amber-600 to-orange-600" />
          <p className="mx-auto max-w-3xl text-base text-gray-700 sm:text-lg">
            We believe in nourishing both people and the planet through our
            commitment to organic food processing. Our journey began with a
            simple yet powerful mission.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <div key={index} className="group relative">
              <div
                className={`rounded-2xl bg-gradient-to-br ${value.gradient} p-6 shadow-lg transition-all duration-300 hover:shadow-2xl`}
              >
                {/* Icon */}
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300 group-hover:scale-110">
                  <value.icon className={`h-8 w-8 ${value.iconColor}`} />
                </div>

                {/* Content */}
                <h3 className="text-secondary mb-2 text-xl font-bold">
                  {value.title}
                </h3>
                <p className="text-sm text-gray-700">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueSection;
