import connectToDatabase from "@/lib/mongodb";
import Template from "@/models/Templates";
import UserTemplate from "@/models/UsersTemplateData";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(req) {
  try {
    const user = await currentUser();
    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }
    await connectToDatabase();
    const { id } = user;

    const userTemplateData = await UserTemplate.findOne({ userId: id });
    return new Response(JSON.stringify(userTemplateData), { status: 200 });
  } catch (error) {
    console.error("Error retrieving user data:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}

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
    const specificTemplate = await Template.findOne({ _id: template_id });

    if (!specificTemplate) {
      return new Response(JSON.stringify({ error: "Template not found" }), { status: 404 });
    }

    const newWebsiteData = {
      websiteName: name,
      description: description,
      templateUrl: `/${name}`,
      templateId: specificTemplate._id.toString(), // Convert ObjectId to string
      templatName: specificTemplate.template_name,
      templateType: specificTemplate.template_type,
      templateImageUrl: specificTemplate.template_image_url,
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

export async function DELETE(req) {
  try {
    const user = await currentUser();
    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const { projectId } = await req.json();
    if (!projectId) {
      return new Response(JSON.stringify({ error: "Project ID is required" }), { status: 400 });
    }

    await connectToDatabase();
    const { id } = user;

    const userTemplate = await UserTemplate.findOne({ userId: id });

    if (!userTemplate) {
      return new Response(JSON.stringify({ error: "User data not found" }), { status: 404 });
    }

    const projectIndex = userTemplate.websiteData.findIndex(
      (project) => project._id.toString() === projectId
    );

    if (projectIndex === -1) {
      return new Response(JSON.stringify({ error: "Project not found" }), { status: 404 });
    }

    userTemplate.websiteData.splice(projectIndex, 1);
    await userTemplate.save();

    return new Response(JSON.stringify({ message: "Project deleted successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error deleting project:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
