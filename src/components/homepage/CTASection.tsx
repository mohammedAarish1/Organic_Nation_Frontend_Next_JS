"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-[#7A7D3F] to-[#5C5F2E] py-16 sm:py-24">
      <div className="absolute inset-0 opacity-10">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 h-96 w-96 rounded-full border-4 border-white"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute right-0 bottom-0 h-96 w-96 rounded-full border-4 border-white"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-4 text-3xl font-bold text-white sm:mb-6 sm:text-4xl md:text-5xl">
            Ready to Go Organic?
          </h2>
          <p className="mb-6 text-lg text-[#E8DCC4] sm:mb-8 sm:text-xl">
            Try now and taste the difference !
          </p>
          <Link
            href="/shop/all"
            className="rounded-full bg-white px-8 py-3 text-base font-bold text-[#7A7D3F] shadow-xl transition-colors hover:scale-110 hover:bg-[#F5F5DC] sm:px-12 sm:py-4 sm:text-lg"
          >
            Start Shopping Now
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
