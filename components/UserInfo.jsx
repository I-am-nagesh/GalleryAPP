"use client";

import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";

export default function UserInfo() {
  const { data: session } = useSession();
  const [images, setImages] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (session) {
      fetchImages();
    }
  }, [session]);

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!imageUrl) return;

    setIsUploading(true);
    try {
      const res = await fetch("/api/uploadImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl }),
      });

      if (res.ok) {
        fetchImages();
        setImageUrl("");
      } else {
        console.log("Image upload failed.");
      }
    } catch (error) {
      console.error("Error during image upload:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const fetchImages = async () => {
    try {
      const res = await fetch("/api/images");
      if (res.ok) {
        const data = await res.json();
        setImages(data.images);
      } else {
        console.error("Failed to fetch images.");
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="shadow-lg p-10 bg-white rounded-lg w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Welcome, {session?.user?.name}
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Email: <span className="font-semibold">{session?.user?.email}</span>
        </p>

        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white font-bold px-6 py-2 w-full rounded hover:bg-red-600 transition mb-4"
        >
          Log Out
        </button>

        <form onSubmit={handleUpload} className="mt-4">
          <h3 className="text-2xl font-semibold text-center text-gray-800 mb-4">
            Upload Image URL
          </h3>
          <input
            type="url"
            placeholder="Enter image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full mb-4"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold px-6 py-2 w-full rounded hover:bg-blue-600 transition"
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Upload"}
          </button>
        </form>

        <h3 className="text-2xl font-semibold mt-6 text-center text-gray-800 mb-4">
          Your Uploaded Images
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {images.length > 0 ? (
            images.map((image, index) => (
              <div
                key={index}
                className="border border-gray-300 rounded-lg overflow-hidden shadow-md"
              >
                <img
                  src={image.url}
                  alt={`Uploaded image ${index + 1}`}
                  className="w-full h-40 object-cover transition-transform transform hover:scale-105"
                />
                <div className="p-4 text-center">
                  <p className="text-gray-600 text-sm">
                    Uploaded on:{" "}
                    {new Date(image.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No images uploaded yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
