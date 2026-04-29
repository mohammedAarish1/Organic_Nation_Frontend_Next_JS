"use client";

import { useState } from "react";
import { Mail, Send } from "lucide-react";
import { API_BASE_URL } from "../../constants";
import axios from "axios";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/add/newsletter/subscription`,
        { email },
      );
      if (response.status === 200) {
        setStatus("success");
        setEmail("");
        // Optionally hide the success message after 5 seconds
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch (error) {
      setStatus("error");
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <h4 className="mb-2 text-lg font-bold text-white">Stay Updated</h4>
      <p className="mb-6 text-sm text-gray-300">
        Subscribe to our newsletter for exclusive offers and organic living
        tips.
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <Mail className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pr-4 pl-12 text-sm text-white placeholder-gray-400 backdrop-blur-sm transition-all focus:border-amber-500/50 focus:bg-white/10 focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
            disabled={status === "loading"}
            required
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 to-red-700 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-amber-500/20 transition-all hover:shadow-xl hover:shadow-amber-500/30 disabled:opacity-50"
        >
          {status === "loading" ? (
            "Subscribing..."
          ) : (
            <>
              Subscribe Now
              <Send className="h-4 w-4" />
            </>
          )}
        </button>
        {status === "success" && (
          <p className="flex items-center gap-2 text-sm text-emerald-400">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20">
              ✓
            </span>
            Successfully subscribed!
          </p>
        )}
        {status === "error" && (
          <p className="flex items-center gap-2 text-sm text-red-400">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500/20">
              ✗
            </span>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
