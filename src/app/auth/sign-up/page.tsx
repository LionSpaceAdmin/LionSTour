"use client";

import { useState } from "react";
import Link from "next/link";
import { useI18n } from "@/hooks/useI18n";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

export default function SignUpPage() {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage(t("SignUp.successMessage"));
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
                        <h1 className="text-3xl font-bold text-white mb-2">
                            {t("SignUp.title")}
                        </h1>
                        <p className="text-white/60">{t("SignUp.subtitle")}</p>
                    </div>

                    <form onSubmit={handleSignUp} className="space-y-6">
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
                                autoComplete="new-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/20 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                                placeholder={t("Auth.passwordPlaceholder")}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full group relative inline-block px-8 py-3 text-lg font-semibold text-white bg-white/5 border-2 border-transparent rounded-full backdrop-blur-xl shadow-lg transition-all duration-300 overflow-hidden hover:shadow-purple-500/20 hover:scale-105 transform"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <span className="relative">{t("SignUp.createAccount")}</span>
                        </button>
                    </form>

                    {message && (
                        <p className="mt-6 text-center text-sm text-white/60">{message}</p>
                    )}

                    <div className="mt-8 text-center">
                        <p className="text-white/60">
                            {t("SignUp.alreadyHaveAccount")}{" "}
                            <Link
                                href="/auth/login"
                                className="text-purple-400 hover:text-purple-300 font-semibold"
                            >
                                {t("Login.title")}
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    </div>
  );
}
