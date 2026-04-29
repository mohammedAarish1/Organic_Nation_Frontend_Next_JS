"use client";

// import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
// import { useRouter } from "next/navigation";
export function NavigationButton({
  //   children,
  title,
  // action = () => {},
  path,
  disabled = false,
  className = "",
}: {
  //   children: ReactNode;
  title: string;
  path: string;
  // action: () => void;
  disabled?: boolean;
  className?: string;
}) {
  // const router = useRouter();

  return (
    <Link
      href={path}
      // whileHover={{ scale: 1.05 }}
      // whileTap={{ scale: 0.95 }}
      // onClick={()=>router.push(path)}
      aria-label="Previous Categories"
      // disabled={disabled}
      className="bg-gradient-btn flex max-w-max cursor-pointer items-center justify-center gap-2 rounded-full px-8 py-4 font-semibold text-white shadow-xl transition-shadow hover:shadow-2xl"
    >
      {title} <ArrowRight className="h-5 w-5" />
    </Link>
  );
}
