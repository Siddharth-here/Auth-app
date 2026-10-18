"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Axios } from "axios";

export default function LoginPage() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Login</h1>
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
      <Link href="/login" className="text-blue-500 hover:underline">
        Visit signup Page
      </Link>
    </div>
  );
}
