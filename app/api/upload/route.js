import { connectMongoDB } from "@/lib/mongodb";
import uploadedImage from "@/models/uploadedImage";

export async function POST(req) {
  try {
    await connectMongoDB();
    console.log("Connected to MongoDB");

    const { imageUrl } = await req.json();
    console.log("Image URL received:", imageUrl);

    if (!imageUrl) {
      return new Response(JSON.stringify({ error: "Image URL is required" }), {
        status: 400,
      });
    }

    const newImage = new uploadedImage({ imageUrl });
    await newImage.save();
    console.log("Image saved to MongoDB:", newImage);

    return new Response(
      JSON.stringify({ message: "Image uploaded successfully", newImage }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in Upload API:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
