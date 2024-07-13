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
    const skills = data.skills;
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

    // Ensure portfolioInfo and skills are initialized
    if (!profile.portfolioInfo) {
      profile.portfolioInfo = { skills: [] };
    } else if (!profile.portfolioInfo.skills) {
      profile.portfolioInfo.skills = [];
    }

    skills.forEach((skill) => {
      const existingskill = profile.portfolioInfo.skills.find(
        (s) => s.skill === skill.skill
      );

      if (existingskill) {
        existingskill.level = skill.level;
      } else {
        profile.portfolioInfo.skills.push({
          skill: skill.skill,
          level: skill.level,
        });
      }
    });

    // Save the updated profile
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

export async function DELETE(req) {
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

    const updatedskills = profile.portfolioInfo.skills.filter(
      (skill) => skill.skill !== data.skill
    );

    profile.portfolioInfo.skills = updatedskills;
    await profile.save();

    return new Response(
      JSON.stringify({ message: "skill link deleted successfully" }),
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