"use client";

import React, { useEffect, useState } from "react";

export default function Gallery() {
  const [searchQuery, setSearchQuery] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRandomPhotos = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/imageforall?query=random`);
        const data = await res.json();
        setImages(data);
      } catch (error) {
        console.error("Error fetching random images:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRandomPhotos();
  }, []);
  const fetchImages = async () => {
    if (!searchQuery) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/imageforall?query=${searchQuery}`);
      const data = await res.json();
      setImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <div className="flex items-center justify-center mb-8 w-full max-w-md">
        <input
          type="text"
          placeholder="Search for images (e.g., animals, nature)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 w-full rounded-l-md"
        />
        <button
          onClick={fetchImages}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md"
        >
          Search
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
          {images.map((image) => (
            <div key={image.id} className="rounded overflow-hidden shadow-md">
              <img
                src={image.urls.small}
                alt={image.alt_description || "Image"}
                className="w-full h-auto"
              />
              <p className="text-sm p-2">
                {image.description || "No description"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
