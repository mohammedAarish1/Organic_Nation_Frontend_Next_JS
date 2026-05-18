"use client";

import { memo } from "react";
import {
  X,
  Upload,
  Image as ImageIcon,
  Video as VideoIcon,
} from "lucide-react";
import Image from "next/image";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAddReturnItemMutation } from "@/lib/services/api/ordersApi";
import { toast } from "react-toastify";
import { Product } from "@/types";

// Types
// interface Product {
//   "name-url": string;
//   weight: string;
//   quantity: number;
//   unitPrice: number;
// }

interface ReturnItemFormProps {
  product: Product;
  returnedQuantity: number;
  paymentMethod: "cash_on_delivery" | "online_payment";
  amountPaid: number;
  invoiceNumber: string;
  // onSubmit: (data: FormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

interface FormValues {
  itemName: string;
  weight: string;
  quantity: number;
  reason: string;
  returnOptions: "replacement" | "refund" | "";
  images: File[];
  video: File | null;
  accountName: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
}

// Validation Schema
const createValidationSchema = (maxQuantity: number) =>
  Yup.object().shape({
    quantity: Yup.number()
      .required("Quantity is required")
      .min(1, "Quantity must be at least 1")
      .max(maxQuantity, `Maximum quantity is ${maxQuantity}`),
    reason: Yup.string()
      .trim()
      .required("Reason is required")
      .min(10, "Reason must be at least 10 characters"),
    returnOptions: Yup.string()
      .required("Please select an option")
      .oneOf(["replacement", "refund"], "Invalid option"),
    images: Yup.array()
      .min(1, "At least one image is required")
      .max(3, "Maximum 3 images allowed")
      .required("Product images are required"),
    video: Yup.mixed()
      .required("Video is required")
      .test("fileSize", "Video size must be less than 15MB", (file) => {
        if (!file) return true;
        return (file as File).size <= 15 * 1024 * 1024;
      }),
    accountName: Yup.string().when("returnOptions", {
      is: "refund",
      then: (schema) => schema.required("Account name is required"),
      otherwise: (schema) => schema,
    }),
    bankName: Yup.string().when("returnOptions", {
      is: "refund",
      then: (schema) => schema.required("Bank name is required"),
      otherwise: (schema) => schema,
    }),
    accountNumber: Yup.string().when("returnOptions", {
      is: "refund",
      then: (schema) =>
        schema
          .required("Account number is required")
          .matches(/^[0-9]+$/, "Account number must contain only digits"),
      otherwise: (schema) => schema,
    }),
    ifscCode: Yup.string().when("returnOptions", {
      is: "refund",
      then: (schema) =>
        schema
          .required("IFSC code is required")
          .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code format"),
      otherwise: (schema) => schema,
    }),
  });

// Memoized Image Preview Component
const ImagePreview = memo(
  ({ file, onRemove }: { file: File; onRemove: () => void }) => (
    <div className="group relative h-24 w-24 overflow-hidden rounded-lg border-2 border-gray-200">
      <Image
        src={URL.createObjectURL(file)}
        alt="Preview"
        fill
        className="object-cover"
      />
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-1 right-1 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  ),
);

ImagePreview.displayName = "ImagePreview";

// Memoized Video Preview Component
const VideoPreview = memo(
  ({ file, onRemove }: { file: File; onRemove: () => void }) => (
    <div className="group relative mt-4 overflow-hidden rounded-lg border-2 border-gray-200">
      <video
        src={URL.createObjectURL(file)}
        controls
        className="h-48 w-full object-cover"
      />
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-2 right-2 rounded-full bg-red-500 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100"
      >
        <X className="h-5 w-5" />
      </button>
      <div className="absolute bottom-2 left-2 rounded-md bg-black/70 px-2 py-1 text-xs text-white">
        {file.name}
      </div>
    </div>
  ),
);

VideoPreview.displayName = "VideoPreview";

// Input Field Component
const FormField = memo(
  ({
    label,
    name,
    value,
    type = "text",
    disabled = false,
  }: {
    label: string;
    name: string;
    value: string | number;
    type?: string;
    disabled?: boolean;
  }) => (
    <div className="mb-4">
      <label className="mb-1 block text-sm font-medium tracking-wide text-gray-700">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        disabled={disabled}
        className="block w-full rounded-lg border-2 border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-900 transition-colors outline-none focus:border-amber-500 focus:bg-white disabled:cursor-not-allowed"
        readOnly={disabled}
      />
    </div>
  ),
);

FormField.displayName = "FormField";

// Radio Option Component
const RadioOption = memo(
  ({
    id,
    name,
    value,
    checked,
    onChange,
    label,
  }: {
    id: string;
    name: string;
    value: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
  }) => (
    <label
      htmlFor={id}
      className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 p-4 transition-all ${
        checked
          ? "border-amber-500 bg-amber-50"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="h-5 w-5 text-amber-600"
      />
      <span className="font-medium text-gray-900">{label}</span>
    </label>
  ),
);

RadioOption.displayName = "RadioOption";

// Main Form Component
export default function ReturnItemForm({
  product,
  returnedQuantity,
  paymentMethod,
  amountPaid,
  invoiceNumber,
  // onSubmit,
  onCancel,
  isSubmitting = false,
}: ReturnItemFormProps) {
  const [addReturnItem, { isLoading }] = useAddReturnItemMutation();

  const maxQuantity = product.quantity - returnedQuantity;
  // Initial form values
  const initialValues: FormValues = {
    itemName: product["name-url"],
    weight: product.weight,
    quantity: maxQuantity,
    reason: "",
    returnOptions: "",
    images: [],
    video: null,
    accountName: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
  };

  // Handle image upload
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void,
    currentImages: File[],
  ) => {
    const files = Array.from(e.target.files || []);
    const newImages = [...currentImages, ...files].slice(0, 3);
    setFieldValue("images", newImages);
    e.target.value = "";
  };

  // Handle video upload
  const handleVideoChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void,
    setFieldError: (field: string, message: string) => void,
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      if (file.size > 15 * 1024 * 1024) {
        setFieldError("video", "Video size must be less than 15MB");
        e.target.value = "";
        return;
      }
      setFieldValue("video", file);
    }
    e.target.value = "";
  };

  // Handle form submission
  const handleSubmit = async (
    values: FormValues,
    { resetForm }: { resetForm: () => void },
  ) => {
    const formData = new FormData();

    formData.append("itemName", values.itemName);
    formData.append("weight", values.weight);
    formData.append("quantity", values.quantity.toString());
    formData.append("reason", values.reason);
    formData.append("returnOptions", values.returnOptions);
    formData.append("invoiceNumber", invoiceNumber);

    values.images.forEach((image) => {
      formData.append("images", image);
    });

    if (values.video) {
      formData.append("video", values.video);
    }

    if (values.returnOptions === "refund") {
      formData.append("accountName", values.accountName);
      formData.append("bankName", values.bankName);
      formData.append("accountNumber", values.accountNumber);
      formData.append("ifscCode", values.ifscCode);
    }

    // try {

    //   const result = await addReturnItem(formData).unwrap();

    //   if (result.success) {
    //     resetForm();
    //     onCancel();
    //     toast.success(result.message);
    //   }
    // } catch (error) {
    //   if (!error.data.success) {
    //     toast.error(error.data.message);
    //   }
    // }

    // await onSubmit(formData);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/orders/add-return-item`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
          // NO headers at all
        },
      );
      const data = await res.json();
      console.log("Direct fetch result:", data);
    } catch (err) {
      console.error("Direct fetch error:", err);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onCancel}
    >
      <div
        className="max-h-[70vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={createValidationSchema(maxQuantity)}
          onSubmit={handleSubmit}
          validateOnChange={true}
          validateOnBlur={true}
        >
          {({
            values,
            setFieldValue,
            setFieldError,
            handleSubmit: formikSubmit,
          }) => (
            <div className="space-y-6 p-6">
              {/* Header */}
              <div className="flex items-center justify-between border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Return Item
                </h2>
                <button
                  type="button"
                  onClick={onCancel}
                  className="rounded-full p-2 transition-colors hover:bg-gray-100"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Product Info (Read-only) */}
              <div className="space-y-4">
                <FormField
                  label="Product Name"
                  name="itemName"
                  value={values.itemName}
                  disabled
                />
                <FormField
                  label="Weight"
                  name="weight"
                  value={values.weight}
                  disabled
                />
              </div>

              {/* Quantity */}
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium tracking-wide text-gray-700">
                  Quantity <span className="text-red-500">*</span>
                </label>
                <Field
                  type="number"
                  name="quantity"
                  min="1"
                  max={maxQuantity}
                  className="block w-full rounded-lg border-2 border-gray-200 px-4 py-2.5 transition-colors outline-none focus:border-amber-500"
                />
                <ErrorMessage
                  name="quantity"
                  component="p"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              {/* Reason */}
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium tracking-wide text-gray-700">
                  Valid Reason for Returning{" "}
                  <span className="text-red-500">*</span>
                </label>
                <Field
                  as="textarea"
                  name="reason"
                  rows={4}
                  placeholder="Please describe the issue with the product..."
                  className="block w-full rounded-lg border-2 border-gray-200 px-4 py-2.5 transition-colors outline-none focus:border-amber-500"
                />
                <ErrorMessage
                  name="reason"
                  component="p"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              {/* Return Options */}
              <div>
                <label className="mb-3 block text-sm font-bold tracking-widest text-amber-700 uppercase">
                  What Do You Want? <span className="text-red-500">*</span>
                </label>
                <div className="grid gap-3 sm:grid-cols-2">
                  <RadioOption
                    id="replacement"
                    name="returnOptions"
                    value="replacement"
                    checked={values.returnOptions === "replacement"}
                    onChange={() =>
                      setFieldValue("returnOptions", "replacement")
                    }
                    label="Replacement"
                  />
                  <RadioOption
                    id="refund"
                    name="returnOptions"
                    value="refund"
                    checked={values.returnOptions === "refund"}
                    onChange={() => setFieldValue("returnOptions", "refund")}
                    label="Refund"
                  />
                </div>
                <ErrorMessage
                  name="returnOptions"
                  component="p"
                  className="mt-2 text-sm text-red-500"
                />
              </div>

              {/* Bank Details (if refund) */}
              {values.returnOptions === "refund" && (
                <div className="rounded-xl border-2 border-amber-200 bg-amber-50 p-6">
                  <h4 className="mb-4 font-bold text-gray-900">
                    Bank Details for Refund
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Account Holder Name{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <Field
                        type="text"
                        name="accountName"
                        className="block w-full rounded-lg border-2 border-gray-200 px-4 py-2.5 transition-colors outline-none focus:border-amber-500"
                      />
                      <ErrorMessage
                        name="accountName"
                        component="p"
                        className="mt-1 text-sm text-red-500"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Bank Name <span className="text-red-500">*</span>
                      </label>
                      <Field
                        type="text"
                        name="bankName"
                        className="block w-full rounded-lg border-2 border-gray-200 px-4 py-2.5 transition-colors outline-none focus:border-amber-500"
                      />
                      <ErrorMessage
                        name="bankName"
                        component="p"
                        className="mt-1 text-sm text-red-500"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Account Number <span className="text-red-500">*</span>
                      </label>
                      <Field
                        type="text"
                        name="accountNumber"
                        className="block w-full rounded-lg border-2 border-gray-200 px-4 py-2.5 transition-colors outline-none focus:border-amber-500"
                      />
                      <ErrorMessage
                        name="accountNumber"
                        component="p"
                        className="mt-1 text-sm text-red-500"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        IFSC Code <span className="text-red-500">*</span>
                      </label>
                      <Field
                        type="text"
                        name="ifscCode"
                        placeholder="e.g., SBIN0001234"
                        className="block w-full rounded-lg border-2 border-gray-200 px-4 py-2.5 transition-colors outline-none focus:border-amber-500"
                      />
                      <ErrorMessage
                        name="ifscCode"
                        component="p"
                        className="mt-1 text-sm text-red-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Images Upload */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Product Images <span className="text-red-500">*</span>
                  <span className="ml-2 text-xs text-gray-500">
                    (Maximum 3 images)
                  </span>
                </label>
                <label
                  className={`flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6 transition-colors hover:border-amber-500 hover:bg-amber-50 ${
                    values.images.length >= 3
                      ? "cursor-not-allowed opacity-50"
                      : ""
                  }`}
                >
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) =>
                      handleImageChange(e, setFieldValue, values.images)
                    }
                    className="hidden"
                    disabled={values.images.length >= 3}
                  />
                  <div className="text-center">
                    <ImageIcon className="mx-auto mb-2 h-10 w-10 text-gray-400" />
                    <p className="text-sm text-gray-600">
                      {values.images.length >= 3
                        ? "Maximum images reached"
                        : "Click to upload images"}
                    </p>
                  </div>
                </label>
                <ErrorMessage
                  name="images"
                  component="p"
                  className="mt-2 text-sm text-red-500"
                />

                {/* Image Previews */}
                {values.images.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-3">
                    {values.images.map((image, index) => (
                      <ImagePreview
                        key={index}
                        file={image}
                        onRemove={() => {
                          const newImages = values.images.filter(
                            (_, i) => i !== index,
                          );
                          setFieldValue("images", newImages);
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Video Upload */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Upload Video{" "}
                  <span className="ml-2 text-xs text-gray-500">
                    ( Maximum 15MB)
                  </span>
                </label>
                {!values.video ? (
                  <label className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6 transition-colors hover:border-amber-500 hover:bg-amber-50">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) =>
                        handleVideoChange(e, setFieldValue, setFieldError)
                      }
                      className="hidden"
                    />
                    <div className="text-center">
                      <VideoIcon className="mx-auto mb-2 h-10 w-10 text-gray-400" />
                      <p className="text-sm text-gray-600">
                        Click to upload video
                      </p>
                    </div>
                  </label>
                ) : (
                  <VideoPreview
                    file={values.video}
                    onRemove={() => setFieldValue("video", null)}
                  />
                )}
                <ErrorMessage
                  name="video"
                  component="p"
                  className="mt-2 text-sm text-red-500"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => formikSubmit()}
                  disabled={isSubmitting}
                  className="flex-1 rounded-xl bg-gradient-to-r from-amber-600 to-red-700 py-3 font-semibold text-white shadow-lg transition-all hover:shadow-xl disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </button>
                <button
                  type="button"
                  onClick={onCancel}
                  disabled={isSubmitting}
                  className="flex-1 rounded-xl border-2 border-gray-300 bg-white py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
}
