"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios  from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      router.push("/profile");

    } catch (error: any) {
      console.error("Login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing..." : "Login"}</h1>
      <hr />

      <label htmlFor="email">Email</label>
      <input
        className="border border-gray-300 rounded-md p-2 mb-4"
        type="text"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Enter your email"
      />

      <label htmlFor="password">Password</label>
      <input
        className="border border-gray-300 rounded-md p-2 mb-4"
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Enter your password"
      />
      <button
        className="border border-gray-300 text-white mb-4 p-2 rounded-lg focus:outline-none focus:border-gray-600"
        onClick={onLogin}
      >
        Login here
      </button>
      <Link href="/signup" className="text-blue-500 hover:underline">
        Visit signup Page
      </Link>
    </div>
  );
}
