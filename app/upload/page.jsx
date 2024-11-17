"use client";

import { CldUploadWidget } from "next-cloudinary";

const Upload = () => {
  const handleUpload = async (result) => {
    console.log("Uploaded image:", result.info);
    await saveImageToDB(result.info.secure_url);
  };

  const saveImageToDB = async (imageUrl) => {
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl }),
      });

      const data = await response.json();
      console.log("Image saved to DB:", data);
    } catch (err) {
      console.error("Error saving image to DB:", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">
            Upload Your Image
          </h1>
          <p className="text-gray-600 mb-6">
            Select an image to upload to the cloud and store it securely.
          </p>

          <CldUploadWidget
            uploadPreset="image_upload"
            onSuccess={(result) => handleUpload(result)}
          >
            {({ open }) => (
              <button
                onClick={open}
                className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold transition duration-300"
              >
                Upload Image
              </button>
            )}
          </CldUploadWidget>
        </div>
      </div>
    </div>
  );
};

export default Upload;
