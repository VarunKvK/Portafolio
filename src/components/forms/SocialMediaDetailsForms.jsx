import SocialForm from "../formComponents/SocialForm";
import InfoTooltip from "../smallerComponents/InfoTooltip";
import {FormText} from "@/components/Jsons/CreateFormsContents"


const SocialMediaDetailsForms = async ({ id }) => {
  const totalForms = FormText.length;
  const formDetail = FormText.find((form) => form.id === id);


  if (!formDetail) {
    throw new Error(`Form detail with ID ${id} not found`);
  }

  const { title, subtitle } = formDetail;
  const rank = `${id}/${totalForms}`;

  return (
    <div className="bg-[#f7f7f7] border border-white/80 dark:bg-[#15191a] dark:border-[#282F30]/40 rounded-[30px] px-6 py-10">
      <div className="flex flex-col gap-1">
        <div className="w-full flex justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-[32px] font-bold text-[#282f30] dark:text-[#f1f1f1]">
              {title}
            </h1>
            <InfoTooltip info={"Include links to your social media profiles for connectivity."}/>
          </div>
          <span className="text-[16px] font-bold text-[#444c4d] dark:text-[#f1f1f1]">
            {rank}
          </span>
        </div>
        <p className="text-[16px] font-semibold text-[#4D5657] dark:text-[#4D5657]">
          {subtitle}
        </p>
      </div>
      <div className="mt-10">
        <SocialForm />
      </div>
    </div>
  );
};

export default SocialMediaDetailsForms;
