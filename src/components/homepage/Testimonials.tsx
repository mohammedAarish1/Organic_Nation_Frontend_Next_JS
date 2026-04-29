"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Priya Sharma",
      text: "Best organic products I've found online! Fresh and authentic.",
      rating: 5,
    },
    {
      name: "Rahul Mehta",
      text: "Quick delivery and excellent quality. Highly recommended!",
      rating: 5,
    },
    {
      name: "Anita Desai",
      text: "Love the variety and the commitment to organic farming.",
      rating: 5,
    },
  ];

  return (
    <section className="bg-[#8B4545] py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-center sm:mb-12"
        >
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            What Our Customers Say
          </h2>
          <p className="mx-auto max-w-2xl text-base text-[#E8DCC4] sm:text-lg">
            Join thousands of happy customers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="rounded-3xl bg-white p-6 sm:p-8"
            >
              <div className="mb-4 flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-[#7A7D3F] text-[#7A7D3F]"
                  />
                ))}
              </div>
              <p className="mb-4 text-sm text-[#5C5F2E] italic sm:text-base">
                &quot; {testimonial.text}&quot;
              </p>
              <p className="font-bold text-[#3E2723]">- {testimonial.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
