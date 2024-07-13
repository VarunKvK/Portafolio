import connectToDatabase from "@/lib/mongodb";
import User from "@/models/Users";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req, res) {
  try {
    const user = await currentUser();
    if (!user) {
      return Response.json({ error: "Unauthorized" });
    }

    await connectToDatabase();

    const { id, imageUrl, firstName, lastName } = user;
    const emailAddress = user.emailAddresses[0].emailAddress;

    const existingUser = await User.findOne({ clerkId: id });

    if (existingUser) {
      return Response.json(existingUser);
    }

    const newUser = await User.create({
      clerkId: id,
      email: emailAddress,
      firstName,
      lastName,
      image_url: imageUrl,
    });

    return Response.json(newUser);
  } catch (error) {
    console.error("Error creating/updating user:", error);
    return Response.json({ error: "Internal Server Error" });
  }
}
