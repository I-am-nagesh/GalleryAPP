import { connectMongoDB } from "@/lib/mongodb";
import uploadedImage from "@/models/uploadedImage";

export async function GET() {
  try {
    await connectMongoDB();
    console.log("Fetching uploaded images from MongoDB");

    const images = await uploadedImage.find();
    return new Response(JSON.stringify(images), { status: 200 });
  } catch (error) {
    console.error("Error fetching images:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
