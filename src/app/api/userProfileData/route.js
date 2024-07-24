import connectToDatabase from "@/lib/mongodb";
import User from "@/models/Users";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req){
    const {user_id}=await req.json()
    try{
      const user = await currentUser();
      if (!user) {
        return Response.json({ error: "Unauthorized" });
      }
  
      await connectToDatabase();
  
      const verifiedUser = await User.findOne({ _id: user_id });
  
      return Response.json(verifiedUser);
    } catch (error) {
      console.error("Error creating/updating user:", error);
      return Response.json({ error: "Internal Server Error" });
    }
  }