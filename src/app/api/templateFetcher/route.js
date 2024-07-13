import connectToDatabase from "@/lib/mongodb";
import Template from "@/models/Templates";

export async function GET(req) {
    await connectToDatabase();
    try{
        const template_data=await Template.find()

        return Response.json(template_data)
    }catch(err){
        throw new Error(err.message)
    }
}

export async function POST(req){
    await connectToDatabase();
    const {template_id}=await req.json()
    try{
        const find_template=await Template.findOne({_id: template_id})
        return Response.json(find_template)
    }catch(err){
        throw new Error(err.message)
    }
} 