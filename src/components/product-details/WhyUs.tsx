"use client";

import { motion } from "framer-motion";
import { Award, Truck, Shield, CheckCircle } from "lucide-react";

export default function WhyUs({ usps }) {
  return (
    <section className="mt-20 mb-10 text-center" id="whyus">
      <h2 className="mb-6 border-b pb-3 text-3xl font-bold text-gray-900">
        Why Choose Us?
      </h2>

      <div className="mt-10 mb-10 grid grid-cols-1 gap-8 md:grid-cols-3">
        {[
          {
            icon: Award,
            title: "Premium Quality",
            desc: "Hand-picked and quality tested for the finest experience.",
          },
          {
            icon: Truck,
            title: "Fast Delivery",
            desc: "Quick and reliable shipping across all major locations in India.",
          },
          {
            icon: Shield,
            title: "100% Authentic",
            desc: "Genuine organic products sourced directly from trusted farmers.",
          },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -8 }}
            className="rounded-2xl bg-white p-6 text-center shadow-xl transition-all"
          >
            <item.icon size={40} className="mx-auto mb-4 text-orange-500" />
            <h3 className="mb-2 text-xl font-bold text-gray-900">
              {item.title}
            </h3>
            <p className="text-gray-600">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Additional Points */}
      <div className="mt-8 rounded-2xl bg-white p-8 shadow-lg">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {[
            "Direct from farmers - Supporting local communities",
            "Certified organic by trusted authorities",
            "Eco-friendly and sustainable packaging",
            "No harmful chemicals or pesticides",
            "Fresh roasting ensures maximum flavor",
            "Rigorous quality checks at every step",
          ].map((point, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-start gap-3 rounded-lg bg-green-50 p-3 transition-colors hover:bg-orange-50"
            >
              <CheckCircle
                size={20}
                className="mt-0.5 flex-shrink-0 text-green-600"
              />
              <span className="text-left font-medium text-gray-700">
                {point}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
