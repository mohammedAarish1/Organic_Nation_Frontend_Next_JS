import {
  ShieldAlert,
  Lock,
  UserCheck,
  Bell,
  FileText,
  Users,
  Database,
  Share2,
  Cookie,
  Mail,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import {
  FadeInView,
  FloatingBackground2,
  ShimmerReveal,
} from "@/components/animations/animations";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-white via-amber-50/20 to-white">
      <HeroSection />
      <LastUpdated />
      <ContentWrapper />
    </div>
  );
}

// Hero Section
const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-emerald-600 via-green-500 to-teal-600 px-4 py-26 sm:px-6 lg:px-8">
      {/* Animated Background */}
      <FloatingBackground2 />

      <div className="relative z-10 mx-auto max-w-4xl text-center text-white">
        <FadeInView>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-6 py-3 backdrop-blur-sm">
            <Lock className="h-5 w-5" />
            <span className="text-sm font-semibold">Your Privacy Matters</span>
          </div>
        </FadeInView>
        <h1 className="mb-6 text-4xl font-bold drop-shadow-2xl sm:text-5xl lg:text-6xl">
          Privacy Policy
        </h1>

        <div className="mx-auto mb-6 h-1 w-24 bg-white" />

        <p className="text-lg drop-shadow-lg sm:text-xl">
          We are committed to protecting your personal information and privacy
          rights
        </p>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 100"
          className="w-full"
        >
          <path
            fill="white"
            fillOpacity="1"
            d="M0,64L48,58.7C96,53,192,43,288,48C384,53,480,75,576,80C672,85,768,75,864,64C960,53,1056,43,1152,42.7C1248,43,1344,53,1392,58.7L1440,64L1440,100L1392,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z"
          />
        </svg>
      </div>
    </section>
  );
};

// Last Updated Section
const LastUpdated = () => {
  return (
    <FadeInView>
      <div className="mx-auto max-w-6xl px-4 py-8 text-center sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-6 py-3 shadow-md">
          <AlertCircle className="h-5 w-5 text-amber-700" />
          <span className="text-sm font-medium text-amber-800">
            Last Updated: 25<sup>th</sup> June 2024
          </span>
        </div>
      </div>
    </FadeInView>
  );
};

// Content Wrapper
const ContentWrapper = () => {
  const sections = [
    {
      id: "introduction",
      icon: FileText,
      title: "Introduction",
      linear: "from-blue-500 to-cyan-600",
      content: (
        <>
          <p>
            Ensure you always know what information we collect about you, how we
            use it, and have meaningful control over all of it. We want to
            provide you with tools so you can make the best choices with the
            information you provide us. In essence, {"that's"} what this Privacy
            Policy is all about.
          </p>
          <p>
            Thank you for visiting organicnation.co.in. We are committed to
            protecting your personal information and your right to privacy.
          </p>
          <p>
            <span className="font-bold">www.organicnation.co.in</span> is owned
            and operated by FOODSBAY INDIA and is engaged in the business of
            curating, designing and selling consumer products under the brand
            name{" "}
            <Link href="/" className="font-bold text-amber-700 hover:underline">
              {'"Organic Nation"'}
            </Link>
            . When we say{'"Website"'}, we mean the website
            www.organicnation.co.in, and all related functionality, services,
            and content offered by or for Foodsbay India.
          </p>
          <div className="rounded-xl bg-linear-to-r from-amber-50 to-orange-50 p-6 shadow-md">
            <p className="text-secondary font-semibold">
              PLEASE READ THIS PRIVACY POLICY CAREFULLY TO MAKE SURE YOU
              UNDERSTAND HOW ANY PERSONAL INFORMATION YOU PROVIDE TO US WILL BE
              USED, SHARED AND HANDLED. BY USING OUR SERVICES, YOU EXPRESSLY
              CONSENT TO OUR USE AND DISCLOSURE OF YOUR PERSONAL INFORMATION IN
              ACCORDANCE WITH THIS PRIVACY POLICY.
            </p>
          </div>
          <p>
            This document is published in accordance with the Information
            Technology Act, 2000 and the Information Technology (Reasonable
            Security Practices and Procedures and Sensitive Personal Data of
            Information) Rules, 2011.
          </p>
          <p>
            The Company is committed to ensuring that your privacy is protected.
            We know that you care how information about you is used and shared,
            and we appreciate your trust that we will do so carefully and
            sensibly.
          </p>
        </>
      ),
    },
    {
      id: "collection",
      icon: Database,
      title: "How We Collect Information",
      linear: "from-purple-500 to-pink-600",
      content: (
        <ol className="list-decimal space-y-4 pl-6">
          <li>
            We collect personal information that you voluntarily provide when
            you register, purchase products, or contact us.
          </li>
          <li>
            <p className="mb-2">
              The personal information we collect may include the following:
            </p>
            <div className="rounded-lg bg-linear-to-r from-purple-50 to-pink-50 p-4">
              <p className="mb-2 font-semibold text-purple-900">
                Payment Information (RBI Compliant):
              </p>
              <p className="mb-3 text-sm">
                Due to Reserve Bank of India (RBI) card storage regulations
                effective October 1, 2022, we save customer card details in a
                compliant format that keeps your sensitive information secure.
              </p>
              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                  <span>Age and location</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                  <span>IP address</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                  <span>Contact details</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                  <span>Email addresses</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                  <span>Reviews and feedback</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                  <span>Identity documents (PAN)</span>
                </li>
              </ul>
            </div>
          </li>
          <li>
            We do not intentionally collect sensitive personal information
            unless legally required.
          </li>
          <li>
            If you provide personal information, you consent to its transfer and
            storage on our servers.
          </li>
          <li>
            Like many businesses, we collect data through cookies. Most web
            browsers accept cookies by default, but you can change your
            settings.
          </li>
          <li>
            If you interact with us on social media, we receive personal
            information based on your privacy settings.
          </li>
        </ol>
      ),
    },
    {
      id: "usage",
      icon: UserCheck,
      title: "How We Use Information",
      linear: "from-green-500 to-emerald-600",
      content: (
        <ol className="list-decimal space-y-4 pl-6">
          <li>
            <p className="mb-3">
              We collect personal information to identify you and provide better
              services:
            </p>
            <div className="space-y-3">
              <div className="rounded-lg border-l-4 border-green-500 bg-green-50 p-4">
                <p className="font-semibold text-green-900">
                  Purchase and Delivery
                </p>
                <p className="text-sm text-green-800">
                  To fulfill orders, process payments, and deliver products
                </p>
              </div>
              <div className="rounded-lg border-l-4 border-emerald-500 bg-emerald-50 p-4">
                <p className="font-semibold text-emerald-900">
                  Service Improvement
                </p>
                <p className="text-sm text-emerald-800">
                  To analyze performance and improve usability
                </p>
              </div>
              <div className="rounded-lg border-l-4 border-teal-500 bg-teal-50 p-4">
                <p className="font-semibold text-teal-900">Personalization</p>
                <p className="text-sm text-teal-800">
                  To recommend products that might interest you
                </p>
              </div>
              <div className="rounded-lg border-l-4 border-cyan-500 bg-cyan-50 p-4">
                <p className="font-semibold text-cyan-900">Communication</p>
                <p className="text-sm text-cyan-800">
                  To communicate about orders and services
                </p>
              </div>
              <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4">
                <p className="font-semibold text-blue-900">
                  Targeted Advertising
                </p>
                <p className="text-sm text-blue-800">
                  To display relevant content (not using personally identifiable
                  information)
                </p>
              </div>
            </div>
          </li>
          <li>
            Your personal data will be retained only as long as necessary for
            the purposes collected.
          </li>
          <li>
            Some information may be stored indefinitely due to legal
            requirements or technical constraints.
          </li>
        </ol>
      ),
    },
    {
      id: "sharing",
      icon: Share2,
      title: "Sharing Information",
      linear: "from-orange-500 to-red-600",
      content: (
        <>
          <p className="mb-4">
            Information about our customers is important, and we are not in the
            business of selling personal information. We share information only
            as described below:
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3 rounded-lg bg-orange-50 p-4">
              <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-orange-600" />
              <div>
                <p className="font-semibold text-orange-900">
                  Legal Compliance
                </p>
                <p className="text-sm text-gray-700">
                  To satisfy applicable laws and regulations
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg bg-red-50 p-4">
              <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-red-600" />
              <div>
                <p className="font-semibold text-red-900">
                  Security & Fraud Prevention
                </p>
                <p className="text-sm text-gray-700">
                  To detect and prevent fraudulent activity
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg bg-amber-50 p-4">
              <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-amber-600" />
              <div>
                <p className="font-semibold text-amber-900">
                  Third-Party Service Providers
                </p>
                <p className="text-sm text-gray-700">
                  For order fulfillment, delivery, payment processing, and
                  customer service
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg bg-yellow-50 p-4">
              <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-yellow-600" />
              <div>
                <p className="font-semibold text-yellow-900">
                  Business Transfers
                </p>
                <p className="text-sm text-gray-700">
                  During mergers, acquisitions, or business transitions
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg bg-lime-50 p-4">
              <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-lime-600" />
              <div>
                <p className="font-semibold text-lime-900">
                  Affiliates & Partners
                </p>
                <p className="text-sm text-gray-700">
                  With our business partners to offer products and services
                </p>
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      id: "cookies",
      icon: Cookie,
      title: "Cookie Note & Policy",
      linear: "from-amber-500 to-yellow-600",
      content: (
        <ol className="list-decimal space-y-4 pl-6">
          <li>
            <p className="mb-3">
              We use cookies to optimize our web presence. These are small text
              files that help us:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-amber-600">✓</span>
                <span>Keep track of items in your shopping basket</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-amber-600">✓</span>
                <span>Conduct research to improve content and services</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-amber-600">✓</span>
                <span>Prevent fraudulent activity</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-amber-600">✓</span>
                <span>Improve security</span>
              </li>
            </ul>
            <div className="mt-3 rounded-lg bg-amber-50 p-4">
              <p className="text-sm text-amber-900">
                You can disable cookies in your browser settings, but this may
                limit functionality.
              </p>
            </div>
          </li>
          <li>
            Approved third parties may also set cookies when you interact with
            our services.
          </li>
          <li>
            Third parties include search engines, analytics providers, shipping
            companies, and advertising networks.
          </li>
        </ol>
      ),
    },
    {
      id: "communication",
      icon: Mail,
      title: "User Communication",
      linear: "from-cyan-500 to-blue-600",
      content: (
        <p>
          When you send email or other communication to us, we may retain those
          communications to process your inquiries, respond to requests, and
          improve our services.
        </p>
      ),
    },
    {
      id: "security",
      icon: Lock,
      title: "Security of Your Information",
      linear: "from-indigo-500 to-purple-600",
      content: (
        <>
          <p className="mb-4">
            Our systems are designed with your security and privacy in mind:
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3 rounded-lg bg-indigo-50 p-4">
              <Lock className="mt-1 h-5 w-5 shrink-0 text-indigo-600" />
              <p className="text-sm">
                We use encryption protocols during transmission to protect your
                information
              </p>
            </div>
            <div className="flex items-start gap-3 rounded-lg bg-purple-50 p-4">
              <ShieldAlert className="mt-1 h-5 w-5 shrink-0 text-purple-600" />
              <p className="text-sm">
                We maintain physical, electronic, and procedural safeguards
              </p>
            </div>
            <div className="flex items-start gap-3 rounded-lg bg-violet-50 p-4">
              <UserCheck className="mt-1 h-5 w-5 shrink-0 text-violet-600" />
              <p className="text-sm">
                Protect your password and sign off when using shared computers
              </p>
            </div>
          </div>
        </>
      ),
    },
    {
      id: "rights",
      icon: Users,
      title: "Rights of Users",
      linear: "from-pink-500 to-rose-600",
      content: (
        <>
          <p className="mb-4">
            You have the following rights regarding your personal data:
          </p>
          <ol className="list-decimal space-y-2 pl-6">
            <li>Right to access and review data</li>
            <li>Right to get data rectified</li>
            <li>Right to seek erasure of data</li>
            <li>Right to withdraw consent</li>
            <li>Option to not provide data prior to collection</li>
          </ol>
          <div className="mt-4 rounded-xl bg-linear-to-r from-pink-50 to-rose-50 p-6">
            <p className="mb-3 font-semibold text-pink-900">
              To exercise your rights or cancel your account:
            </p>
            <p className="text-sm text-gray-700">
              Contact us via the information provided. We will respond to your
              request within 30 days.
            </p>
          </div>
        </>
      ),
    },
    {
      id: "alerts",
      icon: Bell,
      title: "Alerts",
      linear: "from-yellow-500 to-amber-600",
      content: (
        <p>
          The Company may alert users by email, phone (SMS/call), or push
          notifications to inform about new service offerings or other useful
          information.
        </p>
      ),
    },
    {
      id: "grievance",
      icon: AlertCircle,
      title: "Grievance Officer",
      linear: "from-red-500 to-pink-600",
      content: (
        <div className="rounded-xl bg-linear-to-r from-red-50 to-pink-50 p-6">
          <p className="mb-4">
            For questions or concerns about this Privacy Policy, contact our
            Grievance Officer:
          </p>
          <div className="space-y-2">
            {/* <p>
              <span className="font-bold text-red-900">Name:</span> Mr. Jaikishan Belwal
            </p> */}
            <p>
              <span className="font-bold text-red-900">Email:</span>{" "}
              <a
                href="mailto:support@foodsbay.com"
                className="font-bold text-amber-700 hover:underline"
              >
                info@organicnation.co.in
              </a>
            </p>
            <p>
              <span className="font-bold text-red-900">Phone:</span>{" "}
              <a
                href="tel:+919310840400"
                className="font-bold text-amber-700 hover:underline"
              >
                +91-9310840400
              </a>
            </p>
          </div>
          <p className="mt-4 text-sm text-gray-700">
            The Grievance Officer shall address grievances within 1 month from
            receipt.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-8">
        {sections.map((section, index) => (
          <PolicySection key={section.id} section={section} index={index} />
        ))}
        <DisclaimerSection />
      </div>
    </div>
  );
};

// Policy Section Component
const PolicySection = ({ section, index }) => {
  return (
    <ShimmerReveal delay={0.3}>
      <div className="overflow-hidden rounded-2xl bg-white shadow-xl transition-all hover:shadow-2xl">
        <div className={`bg-linear-to-r ${section.linear} p-6`}>
          <div className="flex items-center gap-3 text-white">
            <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm">
              <section.icon className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold sm:text-2xl">{section.title}</h2>
          </div>
        </div>
        <div className="space-y-4 p-6 text-gray-700 sm:p-8">
          {section.content}
        </div>
      </div>
    </ShimmerReveal>
  );
};

// Disclaimer Section
const DisclaimerSection = () => {
  return (
    <ShimmerReveal>
      <div className="overflow-hidden rounded-2xl bg-linear-to-br from-gray-900 to-gray-800 shadow-2xl">
        <div className="p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-3 text-white">
            <div className="rounded-full bg-white/10 p-3 backdrop-blur-sm">
              <AlertCircle className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold sm:text-2xl">Disclaimer</h2>
          </div>
          <div className="space-y-4 text-gray-300">
            <p>
              We reserve the right to modify these policies at any time. Changes
              will take effect immediately upon posting. If we make material
              changes, we will notify you accordingly.
            </p>
            <p>
              The Company shall not be liable for any indirect, special,
              consequential, or punitive damages arising from use of personal
              information, even if expressly advised of such possibility.
            </p>
          </div>
        </div>
      </div>
    </ShimmerReveal>
  );
};
