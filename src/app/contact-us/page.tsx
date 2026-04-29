import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import Link from "next/link";
import ContactUsForm from "@/components/contact-us/ContactUsForm";

export default function ContactUsPage() {
  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: "+919310840400",
      subtext: "Mon-Sat, 9AM-6PM IST",
      gradient: "from-amber-100 to-orange-100",
    },
    {
      icon: Mail,
      title: "Email",
      details: "info@organicnation.co.in",
      subtext: "We reply within 24 hours",
      gradient: "from-green-100 to-emerald-100",
    },
    {
      icon: MapPin,
      title: "Address",
      details: "Organic Nation HQ",
      subtext: "Noida, UP, India",
      gradient: "from-yellow-100 to-amber-100",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-white via-amber-50/30 to-emerald-50/30 pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-amber-50 via-orange-50 to-emerald-50 py-16 sm:py-20">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 -left-20 h-64 w-64 rounded-full bg-amber-200 blur-3xl" />
          <div className="absolute -right-20 bottom-20 h-64 w-64 rounded-full bg-emerald-200 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-6 inline-block rounded-full bg-linear-to-r from-amber-100 to-orange-100 px-4 py-2">
            <span className="text-sm font-semibold text-amber-800">
              💬 {"We'd Love to Hear From You"}
            </span>
          </div>

          <h1 className="mb-6 text-4xl leading-tight font-bold sm:text-5xl lg:text-6xl">
            <span className="bg-linear-to-r from-amber-700 via-orange-600 to-amber-700 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-gray-600 sm:text-xl">
            {
              " Have questions about our organic products? We're here to help you choose the best for your family."
            }
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="relative -mt-12 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {contactInfo.map((info, idx) => {
              const Icon = info.icon;
              return (
                <div
                  key={idx}
                  className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${info.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-10`}
                  />

                  <div className="relative">
                    <div
                      className={`mb-4 inline-flex rounded-full bg-linear-to-br ${info.gradient} p-3`}
                    >
                      <Icon className="h-6 w-6 text-amber-700" />
                    </div>

                    <h3 className="mb-2 text-lg font-bold text-gray-900">
                      {info.title}
                    </h3>

                    <p className="mb-1 text-base font-semibold text-amber-700">
                      {info.details}
                    </p>

                    <p className="text-sm text-gray-500">{info.subtext}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Contact Form Section */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left Column - Form */}

            <div>
              <div className="mb-8">
                <h2 className="mb-3 text-3xl font-bold text-gray-900">
                  Send Us a Message
                </h2>
                <p className="text-gray-600">
                  {
                    "Fill out the details below and we'll get back to you as soon as possible."
                  }
                </p>
              </div>
              <ContactUsForm />
            </div>

            {/* Right Column - Additional Info */}
            <div className="space-y-8">
              <div className="rounded-2xl border border-gray-200 bg-linear-to-br from-amber-50 to-orange-50 p-8">
                <div className="mb-4 inline-flex rounded-full bg-white p-3 shadow-md">
                  <Clock className="h-6 w-6 text-amber-700" />
                </div>

                <h3 className="mb-3 text-xl font-bold text-gray-900">
                  Business Hours
                </h3>

                <div className="space-y-2 text-gray-700">
                  <div className="flex justify-between">
                    <span className="font-medium">Monday - Saturday:</span>
                    <span>9:30 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Sunday:</span>
                    <span className="text-red-600">Closed</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-linear-to-br from-green-50 to-emerald-50 p-8">
                <div className="mb-4 inline-flex rounded-full bg-white p-3 shadow-md">
                  <MessageCircle className="h-6 w-6 text-green-700" />
                </div>

                <h3 className="mb-3 text-xl font-bold text-gray-900">FAQs</h3>

                <p className="mb-4 text-gray-700">
                  Looking for quick answers? Check out our frequently asked
                  questions page for instant help.
                </p>

                <Link
                  href="/frequently-asked-questions"
                  className="font-semibold text-green-700 underline decoration-2 underline-offset-4 transition-colors hover:text-green-800"
                >
                  Visit FAQ Page →
                </Link>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-8">
                <h3 className="mb-4 text-xl font-bold text-gray-900">
                  Why Choose Organic Nation?
                </h3>

                <ul className="space-y-3 text-gray-700">
                  {[
                    "Direct from Farm to Table",
                    "No Artificial Preservatives",
                    "Eco-Friendly Packaging",
                    "Fast & Reliable Delivery",
                    "Assured Quality",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="mt-1 text-green-600">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section Placeholder */}
      {/* <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-100 to-gray-200 shadow-lg">
            <div className="flex h-96 items-center justify-center">
              <div className="text-center">
                <MapPin className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                <p className="text-lg font-semibold text-gray-600">
                  Map Integration Placeholder
                </p>
                <p className="text-sm text-gray-500">
                  Add Google Maps or similar map service here
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}
