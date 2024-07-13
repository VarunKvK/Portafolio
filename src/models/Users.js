const { Schema, model, models } = require("mongoose");

const BioSchema = new Schema(
  {
    websiteName: { type: String, required: true },
    username: { type: String, required: true },
    profession: { type: String, required: true },
    bio: { type: String, required: true },
  },
  { _id: false }
);

const SocialSchema = new Schema(
  {
    social_name: { type: String, required: true },
    url: { type: String, required: true },
  },
  { _id: false }
);

const SkillSchema = new Schema(
  {
    skill: { type: String, required: true },
    level: { type: String, required: true },
  },
  { _id: false }
);

const ProjectSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    project_image_url: { type: String, required: true },
    url: { type: String, required: true },
  },
  { _id: false }
);

const UserPortfolioInfoSchema = new Schema({
  bio: BioSchema,
  socials: [SocialSchema],
  skills: [SkillSchema],
  projects: [ProjectSchema],
});

let User;

try {
  User = model("User");
} catch (e) {
  const UserSchema = new Schema(
    {
      clerkId: { type: String, required: true, unique: true },
      email: { type: String, required: true },
      firstName: { type: String },
      lastName: { type: String },
      image_url: { type: String },
      portfolioInfo: { type: UserPortfolioInfoSchema },
    },
    { timestamps: true }
  );
  User = model("User", UserSchema);
}

export default User;
