"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function verifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async (t: string) => {
    try {
      await axios.post("/api/users/verifyemail", { token: t });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response?.data);
    }
  };

  useEffect(() => {
    // URLSearchParams auto-decodes %24 -> $
    const urlToken = new URLSearchParams(window.location.search).get("token");
    const decoded = urlToken ? decodeURIComponent(urlToken) : "";
    // decode twice-safe: if still contains %24, decode again
    const finalToken = decoded.includes("%24") ? decodeURIComponent(decoded) : decoded;
    setToken(finalToken || "");
    if (finalToken) verifyUserEmail(finalToken);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `${token}` : "no token"}
      </h2>

      {verified && (
        <div>
          <h2 className="text-2xl">Email Verified</h2>
          <Link href="/login">Login</Link>
        </div>
      )}
      {error && (
        <div>
          <h2 className="text-2xl bg-red-500 text-black">Error</h2>
        </div>
      )}
    </div>
  );
}