"use client";
import axios from "axios";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import React from "react";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = React.useState("nothing");

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);

      toast.error(error.message || "An error occurred while logging out");
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Welcome to your profile page!</p>
      <h2 className="text-lg font-semibold mt-4 p-1 rounded bg-green-500">
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  mt-4 rounded"
        onClick={logout}
      >
        Logout
      </button>

      <button
        className="bg-purple-500 hover:bg-blue-700 text-white font-bold py-2 px-4  mt-4 rounded"
        onClick={getUserDetails}
      >
        Get User Details
      </button>


    </div>
  );
}
