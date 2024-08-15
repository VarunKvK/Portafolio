import FooterContainer from "@/components/FooterContainer";
import BioDetailsForms from "@/components/forms/BioDetailsForms";
import ProjectDetailsForms from "@/components/forms/ProjectDetailsForms";
import SkillsDetailsForms from "@/components/forms/SkillsDetailsForms";
import SocialMediaDetailsForms from "@/components/forms/SocialMediaDetailsForms";
import GuideStyling from "@/components/smallerComponents/GuideStyling";
import { useAuth } from "@clerk/nextjs";

import {GuidesData} from "@/components/Jsons/GuideJson"

const CreatePortfolio = async () => {

  return (
    <div className="flex">
      <aside className="hidden lg:flex flex-col w-[25%] ml-[25px]">
        <div className="sticky top-10 bg-[#f7f7f7] border border-white/80 dark:bg-[#15191a] dark:border-[#282F30]/40 rounded-[30px] p-[28px] h-[87vh]">
          <div className="flex flex-col gap-0.5">
            <h1 className="text-[#282F30] dark:text-[#f1f1f1] text-[24px] font-semibold">
              We will guide you
            </h1>
            <p className="text-[#B5B8B9] dark:text-[#4c5758] text-[15px] font-medium">
              Create your first instant portfolio
            </p>
          </div>
          <div className="flex flex-col gap-10 py-10">
            {GuidesData.map((d, index) => (
              <GuideStyling key={index} id={d.id} guide={d.title} />
            ))}
          </div>
        </div>
      </aside>
      <div className="grow w-full lg:w-[75%] flex flex-col gap-2 md:gap-10 px-2 mb-14">
        <BioDetailsForms id={1} />
        <SocialMediaDetailsForms id={2} />
        <SkillsDetailsForms id={3} />
        <ProjectDetailsForms id={4} />
      </div>
    </div>
  );
};

export default CreatePortfolio;
