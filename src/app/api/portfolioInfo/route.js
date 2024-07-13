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

    // Ensure portfolioInfo and bio are initialized
    if (!profile.portfolioInfo) {
      profile.portfolioInfo = { bio: {} };
    } else if (!profile.portfolioInfo.bio) {
      profile.portfolioInfo.bio = {};
    }

    profile.portfolioInfo.bio.websiteName = data.websiteName;
    profile.portfolioInfo.bio.username = data.username;
    profile.portfolioInfo.bio.profession = data.profession;
    profile.portfolioInfo.bio.bio = data.bio;

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

//Retreives the data of wether the user has filled the form of portfolio

export async function GET(req) {
  const user = await currentUser();
  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  await connectToDatabase();

  try {
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
    return new Response(
      JSON.stringify({ hasPortfolio: !!profile.portfolioInfo })
    );
  } catch (err) {
    console.error("Error fetching user data:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
