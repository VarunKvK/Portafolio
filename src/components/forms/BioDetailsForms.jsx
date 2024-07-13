import { promises as fs } from "fs";
import { ProfileForm } from "../formComponents/BioForm";

const BioDetailsForms = async ({ id }) => {
  const file = await fs.readFile(
    process.cwd() + "/src/components/Jsons/CreateFormsContents.json",
    "utf8"
  );
  const formDetails = JSON.parse(file);

  const totalForms = formDetails.length;
  const formDetail = formDetails.find((form) => form.id === id);

  if (!formDetail) {
    throw new Error(`Form detail with ID ${id} not found`);
  }

  const { title, subtitle } = formDetail;
  const rank = `${id}/${totalForms}`;

  return (
    <div className="w-full bg-[#f7f7f7] border border-white/80 dark:bg-[#15191a] dark:border-[#282F30]/40 rounded-[30px] px-10 py-10">
      <div className="flex flex-col gap-1">
        <div className="w-full flex justify-between">
          <h1 className="text-[32px] font-bold text-[#282f30] dark:text-[#f1f1f1]">
            {title}
          </h1>
          <span className="text-[16px] font-bold text-[#505455] dark:text-[#f1f1f1]">
            {rank}
          </span>
        </div>
        <p className="text-[16px] font-semibold text-[#4D5657] dark:text-[#4D5657]">
          {subtitle}
        </p>
      </div>
      <div className="mt-10">
        <ProfileForm/>
      </div>
    </div>
  );
};

export default BioDetailsForms;
