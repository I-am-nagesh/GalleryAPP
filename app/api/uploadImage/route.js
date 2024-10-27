import { connectMongoDB } from "@/lib/mongodb";
import Image from "@/models/Image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const POST = async (req) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    const { imageUrl } = await req.json();

    if (!imageUrl) {
      return new Response(
        JSON.stringify({ message: "Image URL is required" }),
        {
          status: 400,
        }
      );
    }

    await connectMongoDB();

    const newImage = new Image({
      url: imageUrl,
      user: session.user.id,
    });

    await newImage.save();

    return new Response(
      JSON.stringify({
        message: "Image uploaded successfully",
        image: newImage,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error uploading image:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};
