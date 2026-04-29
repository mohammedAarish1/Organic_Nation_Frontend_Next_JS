"use client";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Send } from "lucide-react";
import { useAddNewQueryMutation } from "@/lib/services/api/contactUsApi";
import { toast } from "react-toastify";

interface ContactFormValues {
  fullName: string;
  email: string;
  phoneNumber: string;
  city: string;
  message: string;
}

const contactSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .required("Name is required"),
  email: Yup.string().email("Invalid email address"),
  // .required('Email is required'),
  phoneNumber: Yup.string()
    .matches(
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
      "Invalid phone number",
    )
    .nullable()
    .required("Phone Number is required"),

  // subject: Yup.string()
  //   .required('Please select a subject'),
  city: Yup.string().required("City is required"),
  message: Yup.string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters")
    .required("Message is required"),
});

const ContactUsForm = () => {
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null,
  );
  const [focusedField, setFocusedField] = useState<
    "fullName" | "email" | "phoneNumber" | "city" | "message" | null
  >(null);
  const [addNewQuery, { isLoading }] = useAddNewQueryMutation();

  const initialValues = {
    fullName: "",
    email: "",
    phoneNumber: "",
    // subject: '',
    city: "",
    message: "",
  };

  const handleSubmit = async (
    values: ContactFormValues,
    { setSubmitting, resetForm }: FormikHelpers<ContactFormValues>,
  ) => {
    // Simulate API call
    try {
      const result = await addNewQuery(values);
      if (result.data?.success) {
        toast.success(result.data.message);
        setSubmitting(false);
        setSubmitStatus("success");
        resetForm();
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={contactSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="fullName"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Full Name *
              </label>
              <Field
                type="text"
                id="fullName"
                name="fullName"
                onFocus={() => setFocusedField("fullName")}
                onBlur={() => setFocusedField(null)}
                className={`w-full rounded-lg border-2 bg-white px-4 py-3 text-gray-900 transition-all duration-200 focus:outline-none ${
                  errors.fullName && touched.fullName
                    ? "border-red-500 ring-2 ring-red-100"
                    : focusedField === "fullName"
                      ? "border-amber-500 ring-2 ring-amber-100"
                      : "border-gray-200 hover:border-gray-300"
                }`}
                placeholder="John Doe"
              />
              <ErrorMessage
                name="fullName"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Email Address
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                className={`w-full rounded-lg border-2 bg-white px-4 py-3 text-gray-900 transition-all duration-200 focus:outline-none ${
                  errors.email && touched.email
                    ? "border-red-500 ring-2 ring-red-100"
                    : focusedField === "email"
                      ? "border-amber-500 ring-2 ring-amber-100"
                      : "border-gray-200 hover:border-gray-300"
                }`}
                placeholder="john@example.com"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="phoneNumber"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Phone Number *
              </label>
              <Field
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                onFocus={() => setFocusedField("phoneNumber")}
                onBlur={() => setFocusedField(null)}
                className={`w-full rounded-lg border-2 bg-white px-4 py-3 text-gray-900 transition-all duration-200 focus:outline-none ${
                  errors.phoneNumber && touched.phoneNumber
                    ? "border-red-500 ring-2 ring-red-100"
                    : focusedField === "phoneNumber"
                      ? "border-amber-500 ring-2 ring-amber-100"
                      : "border-gray-200 hover:border-gray-300"
                }`}
                placeholder="+91 98765 43210"
              />
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            <div>
              <label
                htmlFor="city"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                City *
              </label>
              <Field
                type="text"
                id="city"
                name="city"
                onFocus={() => setFocusedField("city")}
                onBlur={() => setFocusedField(null)}
                className={`w-full rounded-lg border-2 bg-white px-4 py-3 text-gray-900 transition-all duration-200 focus:outline-none ${
                  errors.city && touched.city
                    ? "border-red-500 ring-2 ring-red-100"
                    : focusedField === "city"
                      ? "border-amber-500 ring-2 ring-amber-100"
                      : "border-gray-200 hover:border-gray-300"
                }`}
                placeholder="Mumbai"
              />
              <ErrorMessage
                name="city"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Your Message *
            </label>
            <Field
              as="textarea"
              id="message"
              name="message"
              onFocus={() => setFocusedField("message")}
              onBlur={() => setFocusedField(null)}
              rows={6}
              className={`w-full resize-none rounded-lg border-2 bg-white px-4 py-3 text-gray-900 transition-all duration-200 focus:outline-none ${
                errors.message && touched.message
                  ? "border-red-500 ring-2 ring-red-100"
                  : focusedField === "message"
                    ? "border-amber-500 ring-2 ring-amber-100"
                    : "border-gray-200 hover:border-gray-300"
              }`}
              placeholder="Tell us how we can help you..."
            />
            <ErrorMessage
              name="message"
              component="div"
              className="mt-1 text-sm text-red-600"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="group flex w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-amber-700 to-orange-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:from-amber-800 hover:to-orange-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Sending...
              </>
            ) : (
              <>
                Send Message
                <Send className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>

          {submitStatus === "success" && (
            <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-center">
              <p className="font-semibold text-green-800">
                ✓ Message sent successfully! {"We'll"} get back to you soon.
              </p>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default ContactUsForm;
