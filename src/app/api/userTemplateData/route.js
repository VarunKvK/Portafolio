import connectToDatabase from "@/lib/mongodb";
import UserTemplate from "@/models/UsersTemplateData";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req) {
  try {
    const user = await currentUser();
    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const { name, description, template_id } = await req.json();
    if (!name || !description || !template_id) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    await connectToDatabase();
    const { id } = user;
    const emailAddress = user.emailAddresses[0].emailAddress;

    const existingUser = await UserTemplate.findOne({ userId: id });

    const newWebsiteData = {
      websiteName: name,
      description: description,
      templateUrl: `/processing/${template_id}`,
    };

    if (existingUser) {
      existingUser.websiteData.push(newWebsiteData);
      await existingUser.save();
    } else {
      await UserTemplate.create({
        userId: id,
        email: emailAddress,
        websiteData: [newWebsiteData],
      });
    }

    return new Response(JSON.stringify({ message: "Success" }), { status: 200 });
  } catch (error) {
    console.error("Error saving user data:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
