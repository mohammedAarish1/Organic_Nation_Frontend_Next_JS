"use client";

import { memo, useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { Loader } from "lucide-react";
import { useAppSelector } from "@/lib/hooks";
import { useApplyCouponCodeMutation } from "@/lib/services/api/cartApi";

// ─── Types ───────────────────────────────────────────────────────────────────

interface CouponFormValues {
  couponCode: string;
}

interface ApplyCouponPayload {
  phoneNumber: string;
  couponCode: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

// const CONFETTI_COLORS = ["#7A2E1D", "#9B7A2F", "#6B8E23", "#D87C45"] as const;

const INITIAL_VALUES: CouponFormValues = { couponCode: "" };

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Dynamically imports canvas-confetti and fires a 3-burst celebration animation.
 * Wrapped in try/catch so a missing or blocked package never breaks the UX.
 */
async function triggerConfetti(): Promise<void> {
  try {
    const { default: confetti } = await import("canvas-confetti");

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#7A2E1D", "#9B7A2F", "#6B8E23", "#D87C45"] as string[],
      shapes: ["circle", "square"],
      gravity: 0.8,
      drift: 0,
      ticks: 300,
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#7A2E1D", "#9B7A2F", "#6B8E23", "#D87C45"] as string[],
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#7A2E1D", "#9B7A2F", "#6B8E23", "#D87C45"] as string[],
      });
    }, 200);
  } catch (err) {
    // Non-critical — silently swallow so the success flow continues.
    console.warn("[FamilyCoupon] Confetti failed to load:", err);
  }
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const AppliedBadge = memo(function AppliedBadge() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="mb-3 flex items-center gap-3 rounded-lg border-2 border-[#6B8E23]/30 bg-gradient-to-r from-[#6B8E23]/10 to-[#6B8E23]/5 p-4 shadow-sm"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#6B8E23]">
        {/* Checkmark icon */}
        <svg
          aria-hidden="true"
          className="h-4 w-4 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </span>

      <p className="text-sm font-semibold text-[#3E2C1B]">
        Coupon Code Applied!
      </p>
    </div>
  );
});

// ─── Main component ───────────────────────────────────────────────────────────

const FamilyCoupon = memo(function FamilyCoupon() {
  // const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [applyCouponCode, { isLoading }] = useApplyCouponCodeMutation();
  // Granular selectors — avoids re-renders from unrelated state changes
  const phoneNumber = useAppSelector(
    (state) => state.auth.user?.phoneNumber ?? "",
  );
  const couponCodeApplied = useAppSelector(
    (state) => state.cart.couponCodeApplied,
  );

  const [isApplied, setIsApplied] = useState(false);

  // True when a coupon was applied in the current session OR previously persisted
  const isCouponActive = isApplied || couponCodeApplied.length > 0;

  const handleSubmit = useCallback(
    async (
      values: CouponFormValues,
      { setSubmitting, resetForm }: FormikHelpers<CouponFormValues>,
    ): Promise<void> => {
      const trimmedCode = values.couponCode.trim();

      if (!trimmedCode) {
        toast.error("Please provide a valid coupon code");
        setSubmitting(false);
        return;
      }

      const payload: ApplyCouponPayload = {
        phoneNumber,
        couponCode: trimmedCode,
      };
      try {
        // await dispatch(applyFamilyCouponCode(payload)).unwrap();
        const result = await applyCouponCode(payload).unwrap();
        if (result.success) {
          toast.success(
            result?.message || " Coupon code successfully applied!",
          );
          setIsApplied(true);
          resetForm();
          // Fire-and-forget — UX must not block on this
          void triggerConfetti();
        }
      } catch (error: any) {
        const message = error?.data?.error || "Coupon code is not valid!";
        setErrorMessage(message);
      } finally {
        setSubmitting(false);
      }
    },
    [phoneNumber],
  );

  // Stable reference — prevents Formik from resetting on every parent re-render
  const initialValues = useMemo<CouponFormValues>(() => INITIAL_VALUES, []);

  if (isCouponActive) {
    return (
      <div className="mx-auto w-full max-w-md">
        <AppliedBadge />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <Formik<CouponFormValues>
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ isSubmitting, values }) => (
          <Form noValidate>
            <div className="mb-3 flex items-stretch gap-2 rounded-lg border border-[#DCD2C0] bg-gradient-to-r from-[#F5EFE6] to-[#DCD2C0] p-1 shadow-sm transition-all duration-300 focus-within:border-[#9B7A2F] focus-within:bg-gradient-to-r focus-within:from-[#F5EFE6] focus-within:to-[#F5EFE6] focus-within:shadow-md hover:shadow-md">
              <Field
                as="input"
                type="text"
                name="couponCode"
                id="couponCode"
                placeholder="Enter coupon code"
                aria-label="Coupon code"
                autoComplete="off"
                disabled={isSubmitting}
                className="flex-1 rounded-md border-0 bg-white px-4 py-3 text-sm font-medium text-[#3E2C1B] placeholder-[#3E2C1B]/60 shadow-inner transition-all duration-200 outline-none focus:ring-2 focus:ring-[#9B7A2F]/30"
              />
              <button
                type="submit"
                disabled={isSubmitting || !values.couponCode.trim()}
                aria-busy={isSubmitting}
                className="flex min-w-[80px] transform items-center justify-center rounded-md bg-gradient-to-r from-[#7A2E1D] to-[#7A2E1D]/90 px-6 py-3 font-semibold text-[#F5EFE6] shadow-sm transition-all duration-200 hover:scale-[1.02] hover:from-[#7A2E1D]/90 hover:to-[#7A2E1D] hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Loader
                    aria-hidden="true"
                    className="h-4 w-4 animate-spin text-[#F5EFE6]"
                  />
                ) : (
                  <span className="text-sm">Apply</span>
                )}
              </button>
            </div>
            {errorMessage && (
              <p className="mb-2 text-xs text-red-500">{errorMessage}</p>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
});

export default FamilyCoupon;
