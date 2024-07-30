import { promises as fs } from "fs";
import path from "path";

export default async function handler(req, res) {
  const filePath = path.join(process.cwd(), "src/components/Jsons/CreateFormsContents.json");
  const fileContents = await fs.readFile(filePath, "utf8");
  const formDetails = JSON.parse(fileContents);

  Response.json(formDetails);
}
