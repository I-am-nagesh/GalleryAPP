"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm({ onSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are necessary.");
      return;
    }

    try {
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("User already exists.");
        return;
      }

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        onSuccess();
      } else {
        console.log("User registration failed.");
        setError("Registration failed. Please try again.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="shadow-lg p-10 rounded-lg border-t-4 border-blue-600 w-96 bg-white">
        <h1 className="text-3xl font-bold my-4 text-center text-blue-800">
          Register
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Full Name"
            required
            className="p-4 border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            required
            className="p-4 border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            required
            className="p-4 border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
          <button className="bg-blue-600 text-white font-bold cursor-pointer px-8 py-3 rounded-lg transition duration-300 hover:bg-blue-700">
            Register
          </button>

          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-2 px-4 rounded-md mt-2">
              {error}
            </div>
          )}

          <Link
            className="text-sm mt-3 text-right text-blue-600 hover:text-blue-800 transition duration-300"
            href={"/login"}
          >
            Already have an account? <span className="underline">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
