import connectToDatabase from "@/lib/mongodb";
import User from "@/models/Users";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req) {
  const user = await currentUser();
  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  await connectToDatabase();

  try {
    const data = await req.json();
    const profile = await User.findOne({ clerkId: user.id });

    if (!profile) {
      return new Response(
        JSON.stringify({ error: "No user found in the database" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Ensure portfolioInfo and projects are initialized
    if (!profile.portfolioInfo) {
      profile.portfolioInfo = { projects: [] };
    } else if (!Array.isArray(profile.portfolioInfo.projects)) {
      profile.portfolioInfo.projects = [];
    }

    // Add the new project to the projects array
    data.forEach(project => {
      profile.portfolioInfo.projects.push({
        name: project.title,
        description: project.description,
        url: project.url,
        project_image_url: project.files,
      });
    });

    await profile.save();

    return new Response(
      JSON.stringify({ message: "Data updated successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
