"use client";

// import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
// import { ChevronDown, User as UserIcon } from "lucide-react";

import { Dispatch, forwardRef, RefObject, SetStateAction } from "react";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { Boxes, LogOut, Undo } from "lucide-react";
import { User } from "@/types";

// Types
// interface User {
//   fullName?: string;
//   phoneNumber?: string;
//   email?: string;
// }

interface UserMenuProps {
  user: User;
  showMenu: boolean;
  setShowUserMenu: Dispatch<SetStateAction<boolean>>;
  menuRef: RefObject<HTMLDivElement>;
  onLogout: () => Promise<void>;
}

interface MenuItem {
  id: string;
  label: string;
  description: string;
  icon: any;
  path: string;
  iconBg: string;
  iconColor: string;
}

// Menu Items Configuration
const USER_MENU_ITEMS: MenuItem[] = [
  // {
  //   id: 'profile',
  //   label: 'Personal Information',
  //   description: 'Manage your personal details',
  //   icon: User,
  //   path: '/profile/personal-info',
  //   iconBg: 'bg-purple-100',
  //   iconColor: 'text-purple-600'
  // },
  {
    id: "orders",
    label: "Order History",
    description: "Track and manage orders",
    icon: Boxes,
    path: "/orders",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    id: "returns",
    label: "Returns & Refunds",
    description: "Manage your returns",
    icon: Undo,
    path: "/returns",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
];

// User Menu Item Component
const UserMenuItem = ({
  item,
  setShowUserMenu,
}: {
  item: MenuItem;
  setShowUserMenu: Dispatch<SetStateAction<boolean>>;
}) => {
  const Icon = item.icon;

  return (
    <li>
      <Link
        href={item.path}
        onClick={() => setShowUserMenu(false)}
        className="group flex items-start gap-3 px-6 py-3.5 transition-all hover:bg-linear-to-r hover:from-amber-50 hover:to-orange-50"
      >
        <span
          className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.iconBg} ${item.iconColor} transition-transform group-hover:scale-110`}
        >
          <Icon className="h-5 w-5" />
        </span>
        <div className="flex-1">
          <p className="font-semibold text-gray-900 transition-colors group-hover:text-amber-700">
            {item.label}
          </p>
          <p className="mt-0.5 text-xs text-gray-500">{item.description}</p>
        </div>
      </Link>
    </li>
  );
};

// Main User Menu Component
// const UserMenu = forwardRef<HTMLDivElement, UserMenuProps>(
//   ({ showMenu,user,menuRef, onLogout }) => {
// // const menuRef = ref as React.RefObject<HTMLDivElement>;
//     const userInitial = user?.fullName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U';

//     return (
//       <AnimatePresence>
//         {showMenu && (
//           <motion.div
//             ref={menuRef}
//             initial={{ opacity: 0, y: -10, scale: 0.95 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: -10, scale: 0.95 }}
//             transition={{ duration: 0.2, ease: 'easeOut' }}
//             className="absolute right-0 z-50 mt-2 w-80 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl sm:right-0"
//           >
//             {/* Header Section */}
//             <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 px-6 py-5">
//               <div className="mb-3 flex items-center gap-4">
//                 {/* User Avatar */}
//                 <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-600 to-red-700 shadow-lg">
//                   <span className="text-2xl font-bold text-white">{userInitial}</span>
//                 </div>

//                 {/* User Info */}
//                 <div className="flex-1 overflow-hidden">
//                   <h3 className="truncate font-bold capitalize text-gray-900">
//                     {user.fullName || 'You'}
//                   </h3>
//                   <p className="truncate text-sm text-gray-600">
//                     {user?.phoneNumber || user.email}
//                   </p>
//                 </div>
//               </div>

//               {/* Decorative Line */}
//               <div className="h-1 w-16 rounded-full bg-gradient-to-r from-amber-600 to-red-700"></div>
//             </div>

//             {/* Menu Items */}
//             <div className="py-2">
//               <ul className="divide-y divide-gray-50">
//                 {USER_MENU_ITEMS.map((item) => (
//                   <UserMenuItem key={item.id} item={item} />
//                 ))}
//               </ul>
//             </div>

//             {/* Footer Section - Logout Button */}
//             <div className="border-t border-gray-100 bg-gray-50 px-4 py-3">
//               <button
//                 onClick={onLogout}
//                 className="group flex w-full items-center justify-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-4 py-3 font-semibold text-gray-700 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-600"
//               >
//                 <LogOut className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
//                 <span>Sign out</span>
//               </button>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     );
//   }
// );

const UserMenu = forwardRef<HTMLDivElement, UserMenuProps>(
  ({ showMenu, setShowUserMenu, user, menuRef, onLogout }, ref) => {
    // Use ref here, if needed, or pass it down to child components
    const userInitial =
      user?.fullName?.[0]?.toUpperCase() ||
      user.email?.[0]?.toUpperCase() ||
      "U";

    return (
      <AnimatePresence>
        {showMenu && (
          <motion.div
            ref={menuRef || ref} // Use either the passed-in ref or the forwarded ref
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute -right-8 z-50 mt-2 w-80 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl sm:right-0"
          >
            {/* Header Section */}
            <div className="bg-linear-to-br from-amber-50 via-orange-50 to-red-50 px-6 py-5">
              <div className="mb-3 flex items-center gap-4">
                {/* User Avatar */}
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-amber-600 to-red-700 shadow-lg">
                  <span className="text-2xl font-bold text-white">
                    {userInitial}
                  </span>
                </div>

                {/* User Info */}
                <div className="flex-1 overflow-hidden">
                  <h3 className="truncate font-bold text-gray-900 capitalize">
                    {user.fullName || "You"}
                  </h3>
                  <p className="truncate text-sm text-gray-600">
                    {user?.phoneNumber || user.email}
                  </p>
                </div>
              </div>

              {/* Decorative Line */}
              <div className="h-1 w-16 rounded-full bg-linear-to-r from-amber-600 to-red-700"></div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              <ul className="divide-y divide-gray-50">
                {USER_MENU_ITEMS.map((item) => (
                  <UserMenuItem
                    key={item.id}
                    item={item}
                    setShowUserMenu={setShowUserMenu}
                  />
                ))}
              </ul>
            </div>

            {/* Footer Section - Logout Button */}
            <div className="border-t border-gray-100 bg-gray-50 px-4 py-3">
              <button
                onClick={onLogout}
                className="group flex w-full items-center justify-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-4 py-3 font-semibold text-gray-700 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                <LogOut className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                <span>Sign out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  },
);
UserMenu.displayName = "UserMenu";

export default UserMenu;

// interface User {
//   fullName?: string;
//   phoneNumber?: string;
//   email?: string;
// }

// interface UserMenuWrapperProps {
//   user: User;
//   onLogout: () => void;
// }

// export default function UserMenuWrapper({ user, onLogout }: UserMenuWrapperProps) {

//   return (
//       <UserMenu
//         ref={menuRef}
//         user={user}
//         showMenu={showMenu}
//         onLogout={() => {
//           setShowMenu(false);
//           onLogout();
//         }}
//       />
//   );
// }
