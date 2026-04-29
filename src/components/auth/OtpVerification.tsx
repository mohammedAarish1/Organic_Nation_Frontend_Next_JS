"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, RefreshCw } from "lucide-react";

interface OTPVerificationProps {
  phoneNumber: string;
  onVerify: (
    otp: string,
    setError: React.Dispatch<React.SetStateAction<string | null>>,
  ) => Promise<boolean>;
  onResend: () => void;
  isCheckout?: boolean;
  isVerifying?: boolean;
}

// Single OTP Input Box
const OTPInputBox = ({
  inputRef,
  index,
  onChange,
  onKeyDown,
  onPaste,
}: {
  // inputRef: React.RefObject<HTMLInputElement> | null;
  inputRef: React.RefObject<HTMLInputElement | null> | null;
  index: number;
  onChange: (index: number, value: string) => void;
  onKeyDown: (e: React.KeyboardEvent, index: number) => void;
  onPaste?: (e: React.ClipboardEvent) => void;
}) => (
  <motion.input
    ref={inputRef}
    type="text"
    maxLength={1}
    inputMode="numeric"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    onChange={(e) => onChange(index, e.target.value.replace(/\D/g, ""))}
    onKeyDown={(e) => onKeyDown(e, index)}
    onPaste={index === 0 ? onPaste : undefined}
    className="h-14 w-14 rounded-xl border-2 border-gray-300 bg-white text-center text-xl font-bold text-gray-900 shadow-sm transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-200 focus:outline-none"
  />
);

// Timer Component
const ResendTimer = ({
  seconds,
  onResend,
  isResending,
}: {
  seconds: number;
  onResend: () => void;
  isResending: boolean;
}) => {
  if (seconds > 0) {
    return (
      <p className="text-sm text-gray-500">
        Resend OTP in{" "}
        <span className="font-semibold text-amber-700">{seconds}s</span>
      </p>
    );
  }

  return (
    <button
      onClick={onResend}
      disabled={isResending}
      className="flex items-center gap-2 text-sm font-semibold text-amber-700 transition-colors hover:text-amber-800 disabled:opacity-50"
    >
      <RefreshCw className={`h-4 w-4 ${isResending ? "animate-spin" : ""}`} />
      {isResending ? "Sending..." : "Resend OTP"}
    </button>
  );
};

export default function OTPVerification({
  phoneNumber,
  onVerify,
  onResend,
  isCheckout = false,
  isVerifying = false,
}: OTPVerificationProps) {
  const [error, setError] = useState<string | null>(null);
  const [resendTimer, setResendTimer] = useState(30);
  const [isResending, setIsResending] = useState(false);

  // Create refs for all 4 inputs
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Focus first input on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRefs[0].current?.focus();
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Resend timer countdown
  useEffect(() => {
    if (resendTimer > 0) {
      const interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [resendTimer]);

  // Get complete OTP from all inputs
  const getOTP = () => {
    return inputRefs.map((ref) => ref.current?.value || "").join("");
  };

  // Verify OTP
  const handleVerify = async (otp: string) => {
    if (otp.length !== 4) return;

    setError(null);
    await onVerify(otp, setError);
    // const success = await onVerify(otp);

    // if (!success) {
    //   setError('Invalid OTP. Please try again.');
    //   // Clear inputs on error
    //   inputRefs.forEach((ref) => {
    //     if (ref.current) ref.current.value = '';
    //   });
    //   inputRefs[0].current?.focus();
    // }
  };

  // Handle input change
  const handleChange = (index: number, value: string) => {
    if (!value) return;

    // Set value
    if (inputRefs[index].current) {
      inputRefs[index].current.value = value;
    }

    // Clear error on input
    if (error) setError(null);

    // Move to next input or verify if last
    if (index < 3) {
      inputRefs[index + 1].current?.focus();
    } else {
      // Last digit entered, verify automatically
      const otp = getOTP();
      if (otp.length === 4) {
        handleVerify(otp);
      }
    }
  };

  // Handle backspace
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace") {
      if (inputRefs[index].current?.value === "" && index > 0) {
        inputRefs[index - 1].current?.focus();
      }
    }
  };

  // Handle paste
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 4);

    if (pastedData.length === 4) {
      // Fill all inputs
      pastedData.split("").forEach((digit, i) => {
        if (inputRefs[i].current) {
          inputRefs[i].current.value = digit;
        }
      });

      // Verify immediately
      handleVerify(pastedData);
    }
  };

  // Handle resend
  const handleResend = async () => {
    setIsResending(true);
    setError(null);

    try {
      await onResend();
      setResendTimer(30);
      // Clear inputs
      inputRefs.forEach((ref) => {
        if (ref.current) ref.current.value = "";
      });
      inputRefs[0].current?.focus();
    } finally {
      setIsResending(false);
    }
  };

  // Mask phone number
  const maskedPhone = phoneNumber.replace(
    /(\+91)(\d{2})(\d{4})(\d{4})/,
    "$1 $2****$4",
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className={`text-center ${isCheckout ? "" : "mb-6"}`}>
        {!isCheckout && (
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
            <ShieldCheck className="h-8 w-8 text-amber-700" />
          </div>
        )}
        <h3
          className={`font-semibold ${isCheckout ? "text-lg text-gray-700" : "text-xl text-gray-900"}`}
        >
          Enter OTP
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          We sent a 4-digit code to{" "}
          <span className="font-medium text-gray-700">{maskedPhone}</span>
        </p>
      </div>

      {/* OTP Input Boxes */}
      <div className="flex justify-center gap-3">
        {inputRefs.map((ref, index) => (
          <OTPInputBox
            key={index}
            inputRef={ref}
            index={index}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
          />
        ))}
      </div>

      {/* Error Message */}
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-sm text-red-500"
        >
          {error}
        </motion.p>
      )}

      {/* Verifying Indicator */}
      {isVerifying && (
        <div className="flex items-center justify-center gap-2 text-sm text-amber-700">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <RefreshCw className="h-4 w-4" />
          </motion.div>
          <span>Verifying...</span>
        </div>
      )}

      {/* Resend Section */}
      <div className="text-center">
        <p className="mb-2 text-sm text-gray-500">
          {"Didn't"} receive the code?
        </p>
        <ResendTimer
          seconds={resendTimer}
          onResend={handleResend}
          isResending={isResending}
        />
      </div>
    </motion.div>
  );
}
