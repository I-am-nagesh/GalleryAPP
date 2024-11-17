import { connectMongoDB } from "@/lib/mongodb";
import Image from "@/models/Image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    await connectMongoDB();

    const images = await Image.find({ user: session.user.id }).select(
      "url createdAt"
    );

    const imageData = images.map((image) => ({
      url: image.url,
      createdAt: image.createdAt,
    }));

    return new Response(JSON.stringify({ images: imageData }), { status: 200 });
  } catch (error) {
    console.error("Error fetching images:", error);
    return new Response(JSON.stringify({ message: "Internal server error." }), {
      status: 500,
    });
  }
}
