import { FAQSearch } from "@/components/faq-page/FAQSearch";
import { CheckCircle, MessageCircle, Phone, Mail } from "lucide-react";

export interface FAQ {
  id: number;
  header: string;
  text: string;
  category?: string;
}

const faqs: FAQ[] = [
  {
    id: 1,
    header: "What does 'organic' mean?",
    text: "'Organic' refers to the way agricultural products are grown and processed. Specific criteria and practices are followed to ensure that the products meet organic standards.",
    category: "Basics",
  },
  {
    id: 2,
    header: "What do you mean by Processed Organic Foods?",
    text: "Processed organic foods are products made from organically grown ingredients that have undergone various processing methods to create a final food product. These foods maintain the principles of organic farming and production, which prioritize the use of natural substances and processes while minimizing the use of synthetic chemicals, pesticides, and genetically modified organisms (GMOs).",
    category: "Basics",
  },
  {
    id: 3,
    header: "How can I identify Processed Organic Foods?",
    text: "Processed organic foods can be identified by their labels, which indicate compliance with organic standards. Look for certifications from recognized organic bodies, such as the USDA Organic seal in the United States or the EU Organic logo in Europe. These labels ensure that the food is made from organic ingredients and processed according to organic guidelines. Additionally, processed organic foods often list their organic ingredients prominently on the packaging. However, they still undergo some level of processing, such as canning, freezing, or baking, which distinguishes them from fresh organic produce. Reading ingredient lists and certification labels is crucial in identifying these foods",
    category: "Basics",
  },
  {
    id: 4,
    header: "What is difference between Jaggery powder and Sugar?",
    text: "Jaggery powder and sugar differ primarily in their source and processing: Sugar is typically derived from sugarcane or sugar beets, while jaggery is made from sugarcane juice or palm sap. Sugar undergoes refining and chemical processing to extract sucrose, whereas jaggery is prepared by evaporating water from sugarcane juice or palm sap without separating the molasses. Jaggery has a distinctive caramel-like flavor due to the presence of molasses, whereas sugar is neutral in flavor. Jaggery is often considered healthier than sugar due to its mineral content and lower glycemic index, though both are still high in calories and should be consumed in moderation.",
    category: "Products",
  },
  {
    id: 5,
    header: "What is Organic Honey?",
    text: "Organic honey is honey that is produced following organic beekeeping practices, which ensure that both the honey and the bees are treated with the highest standards of health and sustainability. Here's what distinguishes organic honey",
    category: "Products",
  },
  {
    id: 6,
    header: "How is organic Honey different from regular honey?",
    text: "Organic honey differs from regular honey primarily in its production methods and sourcing. Organic honey comes from bees that forage on flowers grown without synthetic pesticides, herbicides, or fertilizers, ensuring a more natural and environmentally friendly process. Additionally, the beekeeping practices for organic honey emphasize sustainability, such as using organic-certified hives and avoiding artificial feed or chemicals. As a result, organic honey is often considered purer and is free from contaminants commonly found in conventional honey, making it a preferred choice for health-conscious consumers.",
    category: "Products",
  },
  {
    id: 7,
    header: "How is raw filtered honey different from processed honey?",
    text: `Raw Filtered Honey:- Raw filtered honey is extracted directly from the hive and only lightly filtered to remove debris like beeswax and dead bees. This process retains most of the natural enzymes, vitamins, and minerals. Because it undergoes minimal processing, raw honey retains more nutrients, including antioxidants, pollen, and propolis, which are beneficial for health. 

Processed Honey:- Processed honey undergoes heating and fine filtering, which removes impurities as well as beneficial components like pollen. It is often pasteurized to extend shelf life. heating and filtration process can destroy many of the beneficial enzymes, vitamins, and minerals found in raw honey, reducing its nutritional value.`,
    category: "Products",
  },
  {
    id: 8,
    header:
      "How are homestyle pickles different from conventional commercial pickles?",
    text: `Homestyle Pickles: Typically use fresh, natural ingredients without preservatives. They often include garden-fresh cucumbers, herbs, spices, garlic, and sometimes vegetables from home gardens. The brine usually consists of vinegar, water, and salt.

Commercial Pickles: Often include preservatives, artificial flavors, and colorings to enhance shelf life and maintain uniform appearance. The brine might include additives like calcium chloride to keep pickles crisp and high fructose corn syrup for sweetness.`,
    category: "Products",
  },
  {
    id: 9,
    header: "How is rock salt healthier than conventional iodized salt?",
    text: "Rock salt, also known as Himalayan salt, is often perceived as healthier than conventional iodized salt due to several reasons: Rock salt is mined from natural salt deposits in the earth, whereas conventional table salt is typically heavily processed to remove impurities and often includes additives to prevent clumping. Himalayan rock salt is claimed to contain more minerals than table salt because it is less refined. These minerals include trace elements like potassium, magnesium, and calcium, which are believed to be beneficial for health in small amounts.",
    category: "Products",
  },
  {
    id: 10,
    header: "What is organic Brown sugar?",
    text: "Organic brown sugar is a type of sugar that is less refined than white sugar, retaining more of the natural molasses present in the sugarcane juice from which it is made. It is produced by crushing sugarcane to extract its juice, which is then evaporated and spun in a centrifuge to separate the molasses from the crystals.",
    category: "Products",
  },
  {
    id: 11,
    header:
      "How are processed Organic Foods different from conventional processed foods?",
    text: "Processed organic foods differ from conventional processed foods primarily in their production methods and ingredient standards. Organic processed foods are made from ingredients that are grown without synthetic pesticides, herbicides, and fertilizers, and they are free from genetically modified organisms (GMOs). The processing of these foods also avoids the use of artificial additives, preservatives, and irradiation. In contrast, conventional processed foods often contain synthetic additives, preservatives, and GMOs, and their ingredients may be produced using chemical fertilizers and pesticides. Organic certification ensures adherence to these stricter standards, aiming to provide a product that is considered healthier and more environmentally friendly",
    category: "Products",
  },
  {
    id: 12,
    header:
      "Where can I contact to track my order or any quality related services?",
    text: "You can contact our customer service team for assistance with tracking your order or any quality-related services. Please reach out to us through the following channels: Email: info@organicnation.co.in • Phone: +91-9999532041",
    category: "Support",
  },
  {
    id: 13,
    header: "How is buyer data protected when they buy from this website?",
    text: "When you buy from our website, we take your data protection seriously. Here's how we safeguard your information: We use industry-standard encryption to ensure that your payment information is protected during transmission. Your personal details are kept confidential and are only used for processing your order and communicating with you about it. We have a clear Privacy Policy that outlines how we collect, use, and protect your information. You can review it to understand your rights and how we handle your data.",
    category: "Support",
  },
  {
    id: 14,
    header: "What are the quality credentials of this website & company?",
    text: "Certainly! Our website and company uphold stringent quality credentials to ensure trust and reliability for our users and customers. Here are some key aspects of our quality credentials: We bring years of industry expertise and experience to our services, backed by a team of professionals who are leaders in their respective fields. Quality is at the core of everything we do. We adhere to high standards in content creation, product development, and customer service. Our priority is customer satisfaction. We consistently gather feedback and make improvements based on user experiences to ensure we meet and exceed expectations.",
    category: "Support",
  },
  {
    id: 15,
    header: "Is there any grievance redressal process of this website?",
    text: "Certainly! We take grievances seriously and have a structured grievance redressal process in place. If you have any concerns or complaints, you can contact our customer support team directly through the designated channels provided on our website. Our team is committed to addressing and resolving issues promptly and fairly to ensure a positive experience for all users. Your feedback is valuable to us in improving our services.",
    category: "Support",
  },
];

// ─── Page (Server Component) ─────────────────────────────────────────────────
// What runs on the server:
//   • FAQ data import (static module, no client bundle cost)
//   • Page shell: hero, stats cards, CTA section
//   • generateMetadata (SEO, below)
//
// What is delegated to the client:
//   • <FAQSearch> — search input state + filtered accordion list
//   • <AccordionItem> — individual open/close toggle state
//
// Bundle impact: the stats section, hero, and CTA ship as pure HTML with
// zero JavaScript. Only FAQSearch + AccordionItem ship JS to the browser.

export const metadata = {
  title: "FAQs | Organic Nation",
  description:
    "Find answers to common questions about our organic products, quality standards, and services.",
};

// Quick-stats data lives here so it never hits the client bundle.
const stats = [
  {
    icon: CheckCircle,
    value: `${faqs.length}+`,
    label: "Questions Answered",
    gradient: "from-emerald-100 to-green-100",
    iconColor: "text-emerald-600",
  },
  {
    icon: MessageCircle,
    value: "24/7",
    label: "Support Available",
    gradient: "from-amber-100 to-orange-100",
    iconColor: "text-amber-600",
  },
  {
    icon: Phone,
    value: "<2 hrs",
    label: "Response Time",
    gradient: "from-blue-100 to-cyan-100",
    iconColor: "text-blue-600",
  },
] as const;

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-emerald-50/30 to-white pt-20">
      {/* Decorative Background — pure CSS, no JS */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-20 left-1/4 h-96 w-96 rounded-full bg-amber-200 blur-3xl" />
        <div className="absolute right-1/4 bottom-20 h-96 w-96 rounded-full bg-emerald-200 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        {/* ── Hero Header (Server) ──────────────────────────────────────────── */}
        <div className="mb-12 text-center sm:mb-16">
          <div className="mb-4 inline-block rounded-full bg-linear-to-r from-emerald-100 to-amber-100 px-4 py-2">
            <span className="text-sm font-semibold text-emerald-700">
              Got Questions❓
            </span>
          </div>

          <h1 className="mb-4 text-4xl font-bold sm:text-5xl lg:text-6xl">
            <span className="bg-linear-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent">
              Frequently Asked Questions
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-base text-gray-600 sm:text-lg">
            Find answers to common questions about our organic products, quality
            standards, and services
          </p>

          {/*
           * 👇 First client boundary.
           * FAQSearch owns the search <input> and renders the filtered
           * accordion list. The full FAQ array is passed as a plain prop —
           * serialised by Next.js across the server/client boundary.
           */}
          <FAQSearch faqs={faqs} />
        </div>

        {/* ── Quick Stats (Server) ──────────────────────────────────────────── */}
        {/* Rendered as static HTML — no interactivity, no JS shipped. */}
        <div className="mb-12 grid gap-4 sm:grid-cols-3 sm:gap-6">
          {stats.map(({ icon: Icon, value, label, gradient, iconColor }) => (
            <div
              key={label}
              className="rounded-2xl bg-white p-6 text-center shadow-md transition-shadow hover:shadow-lg"
            >
              <div
                className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-r ${gradient}`}
              >
                <Icon className={`h-6 w-6 ${iconColor}`} />
              </div>
              <div className="text-2xl font-bold text-gray-900">{value}</div>
              <div className="text-sm text-gray-600">{label}</div>
            </div>
          ))}
        </div>

        {/* ── Still Have Questions CTA (Server) ────────────────────────────── */}
        {/* Pure static markup — anchor tags need no JS. */}
        <div className="mt-16 rounded-3xl bg-linear-to-r from-emerald-600 to-green-600 p-8 text-center text-white shadow-xl sm:p-12">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
            <MessageCircle className="h-8 w-8" />
          </div>
          <h2 className="mb-3 text-2xl font-bold sm:text-3xl">
            Still Have Questions?
          </h2>
          <p className="mb-8 text-emerald-50">
            {
              " Can't find the answer you're looking for? Our support team is here to help!"
            }
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="mailto:info@organicnation.co.in"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-white px-8 py-4 font-semibold text-emerald-700 transition-all hover:bg-emerald-50"
            >
              <Mail className="h-5 w-5" />
              Email Us
            </a>
            <a
              href="tel:+919999532041"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-transparent px-8 py-4 font-semibold text-white transition-all hover:bg-white/10"
            >
              <Phone className="h-5 w-5" />
              Call +91-9999532041
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
