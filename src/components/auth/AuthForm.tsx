"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import OTPVerification from "./OtpVerification";
import {
  useLazyGetCurrentUserQuery,
  useSendOtpMutation,
  useVerifyOtpMutation,
} from "@/lib/services/api/authApi";
import { useCart } from "@/lib/custom-hooks/useCart";
import { useRouter } from "next/navigation";

interface FormValues {
  phoneNumber: string;
  referralCode: string;
  showReferralCode: boolean;
}

// Validation Schema
const createValidationSchema = (showReferralCode: boolean) =>
  Yup.object().shape({
    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, "Please enter a valid 10-digit phone number")
      .required("Phone number is required"),
    referralCode: showReferralCode
      ? Yup.string().matches(
          /^[A-Za-z0-9]*$/,
          "Only letters and numbers allowed",
        )
      : Yup.string(),
  });
// Initial Values
const initialValues: FormValues = {
  phoneNumber: "",
  referralCode: "",
  showReferralCode: false,
};

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Reusable Phone Input Component
const PhoneNumberField = () => (
  <div className="space-y-2">
    <label
      htmlFor="phoneNumber"
      className="block text-sm font-medium text-gray-700"
    >
      Enter Your 10-digit Phone Number
    </label>
    <div className="flex overflow-hidden rounded-xl border-2 border-gray-300 transition-colors focus-within:border-amber-500">
      <div className="flex items-center gap-2 bg-gray-50 px-4 py-3">
        <Image
          src="https://organicnationmages.s3.ap-south-1.amazonaws.com/other_images/flag.png"
          alt="India flag"
          width={24}
          height={16}
          className="h-auto w-6"
        />
        <span className="font-medium text-gray-700">+91</span>
      </div>
      <Field name="phoneNumber">
        {({ field, form }: any) => (
          <input
            {...field}
            type="tel"
            id="phoneNumber"
            placeholder="10-digit phone number"
            className="w-full bg-white px-4 py-3 text-gray-900 outline-none"
            maxLength={10}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "").slice(0, 10);
              form.setFieldValue("phoneNumber", val);
            }}
          />
        )}
      </Field>
    </div>
    <ErrorMessage
      name="phoneNumber"
      component="p"
      className="text-sm text-red-500"
    />
  </div>
);

// Reusable Referral Code Input Component
const ReferralCodeField = () => (
  <motion.div
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: "auto" }}
    exit={{ opacity: 0, height: 0 }}
    className="space-y-2"
  >
    <label
      htmlFor="referralCode"
      className="block text-sm font-medium text-gray-700"
    >
      Enter Referral Code (Optional)
    </label>
    <Field name="referralCode">
      {({ field, form }: any) => (
        <input
          {...field}
          type="text"
          id="referralCode"
          placeholder="Enter your friend's referral code"
          className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 text-gray-900 transition-colors outline-none focus:border-amber-500"
          maxLength={10}
          onChange={(e) => {
            form.setFieldValue(
              "referralCode",
              e.target.value.toUpperCase().slice(0, 10),
            );
          }}
        />
      )}
    </Field>
    <ErrorMessage
      name="referralCode"
      component="p"
      className="text-sm text-red-500"
    />
  </motion.div>
);

// Submit Button Component
const SubmitButton = ({
  isLoading,
  showArrow = false,
}: {
  isLoading: boolean;
  showArrow?: boolean;
}) => (
  <button
    type="submit"
    disabled={isLoading}
    className="group flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-linear-to-r from-amber-600 to-red-700 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:shadow-xl disabled:opacity-50"
  >
    <span>{isLoading ? "Sending OTP..." : "Send OTP"}</span>
    {!isLoading && showArrow && (
      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
    )}
  </button>
);

const AuthForm = ({ isCheckout }) => {
  const router = useRouter();
  const [showReferralCode, setShowReferralCode] = useState(false);
  const [showOTPFields, setShowOTPFields] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [sendOtp, { isLoading: sendingOtp }] = useSendOtpMutation();
  const [verifyOtp, { isLoading: verifyingOtp }] = useVerifyOtpMutation();
  const [getCurrentUser] = useLazyGetCurrentUserQuery();

  const { mergeCart } = useCart();
  const handleSubmit = async (values: FormValues) => {
    try {
      setPhoneNumber(values.phoneNumber);
      const result = await sendOtp({
        phoneNumber: values.phoneNumber,
      }).unwrap();
      if (result?.success) {
        setShowOTPFields(true);
      }
      // setStep('otp');
    } catch (error: any) {
      throw error;
      // setError(error?.data?.message || 'Failed to send OTP');
    }
  };

  const handleOtpVerification = async (
    otp: string,
    setError: React.Dispatch<React.SetStateAction<string | null>>,
  ): Promise<boolean> => {
    try {
      const result = await verifyOtp({ phoneNumber, otp }).unwrap();
      if (result?.success) {
        const mergeResult = await mergeCart();
        if (mergeResult.data.success) {
          getCurrentUser();
        }
        if (!isCheckout) {
          router.push("/");
        }
      }
      return true;

      // Cookie is automatically set by backend
      // Redux state is automatically updated via extraReducers
      // onClose();
      // setPhone('');
      // setOtp('');
      // setStep('phone');
    } catch (error: any) {
      if (error) {
        setError(error.data.message);
      }
      return false;
    }
  };

  const handleResend = async () => {
    try {
      const result = await sendOtp({ phoneNumber }).unwrap();
      if (result?.success) {
        setShowOTPFields(true);
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    // <div className="p-8 sm:w-3/5">
    <div className={`px-2 py-8 sm:px-8 ${!isCheckout && "sm:w-3/5"}`}>
      {/* //   <div className="mx-auto sm:w-[90%]"> */}
      <div className={`mx-auto ${!isCheckout && "sm:w-[90%]"}`}>
        {showOTPFields ? (
          <OTPVerification
            phoneNumber={phoneNumber}
            onVerify={handleOtpVerification}
            onResend={handleResend}
            isCheckout={false}
            isVerifying={verifyingOtp}
          />
        ) : (
          <Formik
            initialValues={initialValues}
            validationSchema={createValidationSchema(showReferralCode)}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            <Form>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                <motion.div variants={itemVariants}>
                  <PhoneNumberField />
                </motion.div>

                {/* Referral Code Toggle */}
                <motion.div
                  variants={itemVariants}
                  className="flex items-center gap-2"
                >
                  {/* <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={showReferralCode}
                      onChange={() => setShowReferralCode(!showReferralCode)}
                      className="peer sr-only"
                    />
                    <div className="peer h-6 w-11 rounded-full bg-gray-300 peer-checked:bg-amber-600 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-full" />
                  </label> */}
                  {/* <span className="text-sm text-gray-700">
                    Have a referral code? (optional)
                  </span> */}
                </motion.div>

                {showReferralCode && (
                  <motion.div variants={itemVariants}>
                    <ReferralCodeField />
                  </motion.div>
                )}

                <motion.div variants={itemVariants}>
                  <SubmitButton isLoading={sendingOtp} showArrow />
                  {/* <SubmitButton showArrow /> */}
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="text-center text-xs text-gray-600"
                >
                  <p>
                    By continuing, you agree to our{" "}
                    <span className="cursor-pointer text-amber-700 hover:underline">
                      Terms of Service
                    </span>{" "}
                    and{" "}
                    <span className="cursor-pointer text-amber-700 hover:underline">
                      Privacy Policy
                    </span>
                  </p>
                </motion.div>
              </motion.div>
            </Form>
          </Formik>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
