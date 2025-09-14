import { useState } from "react";
import Link from "next/link";
import { useI18n } from "@/hooks/useI18n";
import { supabase } from "@/lib/supabase";

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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">{t("SignUp.title")}</h1>
          <p className="text-gray-600 mt-2">{t("SignUp.subtitle")}</p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              {t("Common.email")}
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-gray-300 focus:border-amber-500 focus:ring-amber-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              {t("Common.password")}
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-gray-300 focus:border-amber-500 focus:ring-amber-500"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-lg font-medium text-white bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-300 transform hover:scale-105"
            >
              {t("SignUp.createAccount")}
            </button>
          </div>
        </form>

        {message && (
          <p className="mt-6 text-center text-sm text-gray-600">{message}</p>
        )}

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {t("SignUp.alreadyHaveAccount")}{" "}
            <Link href="/auth/login" className="font-medium text-amber-600 hover:text-amber-500">
              {t("Login.title")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
