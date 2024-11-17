"use client"
import React from "react";
import { useRouter } from "next/navigation";

export default function MainPage() {
  const router = useRouter();

  const navigateToUpload = () => {
    router.push("/upload");
  };

  return (
    <div
      className="relative bg-cover bg-center h-screen"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1495580621852-5de0cc907d2f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBob3RvZ3JhcGhlcnxlbnwwfHwwfHx8MA%3D%3D')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative flex items-center justify-center h-full text-center text-white">
        <div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Explore the Art of{" "}
            <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
              Photography
            </span>
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Discover stunning images captured by talented photographers.
          </p>
          <button
            onClick={navigateToUpload}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            Upload Image
          </button>
        </div>
      </div>
    </div>
  );
}
