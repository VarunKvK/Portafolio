import { Schema, model, models } from "mongoose";

const WebsiteDataSchema = new Schema({
  websiteName: { type: String, required: true },
  description: { type: String, required: true },
  templateUrl: { type: String, required: true },
});

const UserTemplateSchema = new Schema(
  {
    userId: { type: String, required: true },
    email: { type: String, required: true },
    websiteData: [WebsiteDataSchema],
  },
  {
    timestamps: true,
  }
);

const UserTemplate = models.UserTemplate || model("UserTemplate", UserTemplateSchema);

export default UserTemplate;
