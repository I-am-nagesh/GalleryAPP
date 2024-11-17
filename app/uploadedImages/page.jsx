"use client";

import { useState, useEffect } from "react";

const UploadedImages = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/api/fetchuploaded");
        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }
        const data = await response.json();
        setImages(data);
      } catch (err) {
        console.error("Error fetching images:", err);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Uploaded Images</h1>
      {images.length === 0 ? (
        <p className="text-gray-500">No images uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl">
          {images.map((image) => (
            <div
              key={image._id}
              className="relative overflow-hidden rounded-lg shadow-md bg-white group"
            >
              <img
                src={image.imageUrl}
                alt="Uploaded"
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300">
                <div className="p-4 text-white">
                  <p className="text-sm">
                    Uploaded on:{" "}
                    {new Date(image.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadedImages;
