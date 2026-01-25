"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    employeeId: "",
  });

  const [loading, setLoading] = useState(false);
  const [loginAs, setLoginAs] = useState("employee");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log("formData", formData);

    try {
      const response = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Server Error");
      }

      const data = await response.json();
      console.log("data", data);

      if (data.user.role === "Admin") {
        router.push("/admin");
      } else {
        router.push("/employee");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-4 w-full">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">RFID System</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {loginAs === "admin" ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employee ID
              </label>
              <input
                type="text"
                value={formData.employeeId}
                onChange={(e) =>
                  setFormData({ ...formData, employeeId: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {loginAs === "admin" ? (
          <button
            onClick={() => {
              setFormData({ ...formData, email: "" });
              setLoginAs("employee");
            }}
            className="underline"
          >
            Login As Employee
          </button>
        ) : (
          <button
            onClick={() => {
              setFormData({ ...formData, employeeId: "" });
              setLoginAs("admin");
            }}
            className="underline"
          >
            Login As Admin
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;
