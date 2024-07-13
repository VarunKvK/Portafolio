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
    const socials = data.socialLinks; // Assuming this is the array of social links
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

    // Ensure portfolioInfo and socials are initialized
    if (!profile.portfolioInfo) {
      profile.portfolioInfo = { socials: [] };
    } else if (!profile.portfolioInfo.socials) {
      profile.portfolioInfo.socials = [];
    }

    socials.forEach((social) => {
      const existingSocial = profile.portfolioInfo.socials.find(
        (s) => s.social_name === social.platform
      );

      if (existingSocial) {
        existingSocial.url = social.url;
      } else {
        profile.portfolioInfo.socials.push({
          social_name: social.platform,
          url: social.url,
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

    const updatedSocials = profile.portfolioInfo.socials.filter(
      (social) => social.social_name !== data.platform
    );

    profile.portfolioInfo.socials = updatedSocials;
    await profile.save();

    return new Response(
      JSON.stringify({ message: "Social link deleted successfully" }),
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