import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import BadgeContainer from "@/components/smallerComponents/Badge";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const TemplatesContainer = ({ template_data }) => {
  const router = useRouter();
  const params = usePathname();
  const [hasPortfolioData, setPortfolioData] = useState();

  const handleClick = () => {
    const previewPath = `/templates/preview/${template_data._id}`;
    const templatePath = `/${template_data._id}`;

    if (params === previewPath) {
      router.push(templatePath);
    } else {
      router.push(previewPath);
    }
  };

  useEffect(() => {
    const fetchUserPortfolioData = async () => {
      try {
        const response = await fetch("/api/portfolioInfo");
        const userPortfolio = await response.json();
        setPortfolioData(userPortfolio.hasPortfolio);
      } catch (err) {
        console.error("Error fetching user portfolio data:", err);
      }
    };
    fetchUserPortfolioData();
  }, []);

  function storingTemplateId(id) {
    if (typeof window !== "undefined" && window.localStorage) {
      //Save the template id to local storage
      window.localStorage.setItem("template_id", id);
    }
    //Redirect the user to the template creation page
    router.push(`/create`);
  }

  return (
    <div className="flex flex-col gap-8 w-full bg-[#f7f7f7] border border-white/50 dark:bg-[#15191a] dark:border-[#282F30]/40 p-4 rounded-[2rem]">
      <Image
        width={1200}
        height={600}
        src={template_data.template_image_url}
        className="rounded-[1.4rem]"
        alt={template_data.template_name}
        quality={90}
        layout="responsive"
      />
      <div className="flex justify-between">
        <div className="flex flex-col gap-8 z-10 w-full">
          <div className="w-full flex justify-between gap-6 items-center">
            <h2 className="mb-2 md:mb-0 text-3xl font-semibold text-[#282F30] dark:text-[#f1f1f1]">
              {template_data.template_name}
            </h2>
            <div className="flex gap-2">
              <Button
                onClick={handleClick}
                className="text-[#15191a] hover:text-[#f1f1f1] dark:text-[#f1f1f1] bg-[#f7f7f7] border border-[#282F30]/70  dark:bg-[#191d1e] dark:border-[#f1f1f1]/80 rounded-[2rem]"
              >
                Preview
              </Button>
              {!hasPortfolioData ? (
                <Button
                  className="rounded-[2rem]"
                  onClick={() => storingTemplateId(template_data._id)}
                >
                  Hello
                </Button>
              ) : (
                <Button className="rounded-[2rem]">Create</Button>
              )}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-1">
            {template_data.template_tags.map((tags, index) => (
              <BadgeContainer key={index}>
                <span>{tags}</span>
              </BadgeContainer>
            ))}
          </div>
        </div>
      </div>
      <div className="">
        <p className="text-sm text-[#4D5657] dark:text-[#4D5657]">
          {template_data.template_description}
        </p>
      </div>
    </div>
  );
};

export default TemplatesContainer;
