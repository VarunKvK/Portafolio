const { Schema, model, default: mongoose } = require("mongoose")

let Template

try{
    Template = model("Template")
 
}catch(e){
   const  TemplateSchema= new Schema({
        templateName: { type: String, required: true },
        template_description: { type: String, required: true },
        template_code_Url: { type: String, required: true },
        template_type: { type: String, required: true },
        template_tags:[{ type: String, required: true}]
    })
    Template=model("Template",TemplateSchema)
}

export default Template;