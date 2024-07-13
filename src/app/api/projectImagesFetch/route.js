import connectToDatabase from "@/lib/mongodb";
import User from "@/models/Users";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(req, res) {
  const user = await currentUser();
  if (!user) {
    return Response.json({ error: "Unauthorized" });
  }

  await connectToDatabase();

  try {
    const data = await User.findOne({ clerkId: user.id });
    if (!data) {
        return Response.json({ error: "User not found" });
    }
    return Response.json({ projects: data.portfolioInfo.projects });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return Response.json({ error: "Internal Server Error" });
  }
}
