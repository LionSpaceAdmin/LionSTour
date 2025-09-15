"use client";

import { useI18n } from "@/hooks/useI18n";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";

export default function LoginPage() {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleOAuth = async (provider: "google" | "facebook") => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo: `${window.location.origin}/dashboard` },
      });
      if (error) setMessage(error.message);
      else if (data?.url) window.location.href = data.url;
    } catch (e: any) {
      setMessage(e?.message || "OAuth failed");
    }
  };

  const handleMagicLink = async () => {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: `${window.location.origin}/dashboard` },
      });
      if (error) setMessage(error.message);
      else setMessage(t("Auth.emailLinkSent"));
    } catch (e: any) {
      setMessage(e?.message || "Failed to send link");
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage(t("Login.successMessage"));
      window.location.href = "/dashboard";
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="absolute top-4 end-4 z-10">
        <LanguageSwitcher />
      </div>

      <div className="container mx-auto flex min-h-screen items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="w-full max-w-md"
        >
          <div className="bg-black/30 border border-white/10 rounded-3xl shadow-2xl p-8 backdrop-blur-lg">
            <div className="text-center mb-8">
              <Link href="/" className="inline-block mb-6 text-4xl font-bold">🦁</Link>
              <h2 className="text-3xl font-bold text-white mb-2">
                {t("Auth.welcomeBack")}
              </h2>
              <p className="text-white/60">{t("Auth.welcomeBackDesc")}</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-white/70 mb-2"
                >
                  {t("Auth.email")}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/20 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  placeholder={t("Auth.emailPlaceholder")}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-white/70 mb-2"
                >
                  {t("Auth.password")}
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/20 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  placeholder={t("Auth.passwordPlaceholder")}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    className="h-4 w-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                  />
                  <label
                    htmlFor="rememberMe"
                    className="ms-2 block text-sm text-white/70"
                  >
                    {t("Auth.rememberMe")}
                  </label>
                </div>
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-purple-400 hover:text-purple-300 font-medium"
                >
                  {t("Auth.forgotPassword")}
                </Link>
              </div>

              <button
                type="submit"
                className="w-full group relative inline-block px-8 py-3 text-lg font-semibold text-white bg-white/5 border-2 border-transparent rounded-full backdrop-blur-xl shadow-lg transition-all duration-300 overflow-hidden hover:shadow-purple-500/20 hover:scale-105 transform"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="relative">{t("Auth.signIn")}</span>
              </button>
            </form>

            {message && (
              <p className="mt-6 text-center text-sm text-white/60">{message}</p>
            )}

            <div className="mt-6">
              <button
                type="button"
                onClick={handleMagicLink}
                className="w-full px-8 py-3 text-md font-medium text-white/80 bg-transparent border-2 border-white/30 rounded-full backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:text-white hover:border-white/50 hover:scale-105 transform"
              >
                ✨ {t("Auth.magicLink")}
              </button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-white/60">
                {t("Auth.noAccount")}{" "}
                <Link
                  href="/auth/sign-up"
                  className="text-purple-400 hover:text-purple-300 font-semibold"
                >
                  {t("Auth.createAccount")}
                </Link>
              </p>
            </div>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-black/30 text-white/50">
                    {t("Auth.orContinueWith")}
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleOAuth("google")}
                  className="w-full inline-flex justify-center items-center gap-2 py-3 px-4 border border-white/20 rounded-full shadow-sm bg-white/5 text-sm font-medium text-white/80 hover:bg-white/10 transition-all duration-300"
                >
                  <span className="text-xl ms-2">G</span>
                  {t("Auth.google")}
                </button>
                <button
                  type="button"
                  onClick={() => handleOAuth("facebook")}
                  className="w-full inline-flex justify-center items-center gap-2 py-3 px-4 border border-white/20 rounded-full shadow-sm bg-white/5 text-sm font-medium text-white/80 hover:bg-white/10 transition-all duration-300"
                >
                  <span className="text-xl ms-2">F</span>
                  {t("Auth.facebook")}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}