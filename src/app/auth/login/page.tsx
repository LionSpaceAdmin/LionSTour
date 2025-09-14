"use client";

import { useI18n } from "@/hooks/useI18n";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { useState } from "react";
import Link from "next/link";

import { supabase } from "@/lib/supabase";

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
      // Redirect to dashboard or home page
      window.location.href = "/dashboard";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Language Switcher */}
      <div className="absolute top-4 right-4 z-10">
        <LanguageSwitcher />
      </div>

      {/* Hero Section */}
      <div className="relative py-20 bg-gradient-to-r from-amber-500 to-orange-600">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            {t("Auth.welcomeBack")}
          </h1>
          <p className="text-xl md:text-2xl text-amber-100 max-w-3xl mx-auto leading-relaxed">
            {t("Auth.welcomeBackDesc")}
          </p>
        </div>
      </div>

      {/* Login Form */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-3xl">🔐</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {t("Auth.signIn")}
                </h2>
                <p className="text-gray-600">{t("Auth.signInDesc")}</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 mb-2"
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
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                    placeholder={t("Auth.emailPlaceholder")}
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-700 mb-2"
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
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                    placeholder={t("Auth.passwordPlaceholder")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="rememberMe"
                      name="rememberMe"
                      type="checkbox"
                      className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="rememberMe"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      {t("Auth.rememberMe")}
                    </label>
                  </div>
                  <Link
                    href="/auth/forgot-password"
                    className="text-sm text-amber-600 hover:text-amber-700 font-medium"
                  >
                    {t("Auth.forgotPassword")}
                  </Link>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 px-6 rounded-lg font-bold text-lg hover:from-amber-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  {t("Auth.signIn")}
                </button>
              </form>

              {message && (
                <p className="mt-6 text-center text-sm text-gray-600">{message}</p>
              )}

              {/* Magic link */}
              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleMagicLink}
                  className="w-full inline-flex justify-center py-3 px-4 border border-amber-300 rounded-lg shadow-sm bg-white text-sm font-medium text-amber-700 hover:bg-amber-50 transition-all duration-300"
                >
                  ✨ {t("Auth.magicLink")}
                </button>
              </div>

              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  {t("Auth.noAccount")}{" "}
                  <Link
                    href="/auth/sign-up"
                    className="text-amber-600 hover:text-amber-700 font-semibold"
                  >
                    {t("Auth.createAccount")}
                  </Link>
                </p>
              </div>

              {/* Social Login */}
              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      {t("Auth.orContinueWith")}
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleOAuth("google")}
                    className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-300"
                  >
                    <span className="text-xl mr-2">🟢</span>
                    {t("Auth.google")}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOAuth("facebook")}
                    className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-300"
                  >
                    <span className="text-xl mr-2">📘</span>
                    {t("Auth.facebook")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-20 bg-gradient-to-r from-amber-500 to-orange-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t("Auth.readyToExplore")}
          </h2>
          <p className="text-xl text-amber-100 mb-8 max-w-3xl mx-auto">
            {t("Auth.readyToExploreDesc")}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/experiences"
              className="bg-white text-amber-600 px-12 py-4 rounded-full font-bold text-xl hover:bg-amber-50 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              {t("Auth.exploreExperiences")}
            </Link>
            <Link
              href="/plan"
              className="border-2 border-white text-white px-12 py-4 rounded-full font-bold text-xl hover:bg-white/10 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {t("Auth.planJourney")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
