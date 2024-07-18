"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Loader from "@/components/smallerComponents/Loader";
import Link from "next/link";
import FooterContainer from "@/components/FooterContainer";
import TemplatesContainer from "@/components/TemplatesContainer";

import InfoTooltip from "@/components/smallerComponents/InfoTooltip";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const PreviewPage = () => {
  const router = useRouter();
  const { template_id } = useParams();
  const [templateHTML, setTemplateHTML] = useState("");
  const [progress, setProgress] = useState(0);
  const [renderTemplates, setRenderTemplates] = useState([]);
  const [hasPortfolioData, setPortfolioData] = useState(false);

  useEffect(() => {
    const fetchSpecificTemplate = async () => {
      try {
        if (!template_id) return;
        setProgress(90);
        const response = await fetch("/api/templateFetcher", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ template_id }),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const template_url = data.template_code_url;

        const templateResponse = await fetch(template_url, {
          mode: "cors",
        });
        if (!templateResponse.ok) {
          throw new Error("Failed to fetch template code");
        }
        const code = await templateResponse.text();
        setTemplateHTML(code);
      } catch (error) {
        console.error("Error loading template:", error);
        setProgress(0);
      }
    };

    const fetchTemplate = async () => {
      try {
        const response = await fetch("/api/templateFetcher");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const remainingTemplates = data.filter(
          (template) => template._id !== template_id
        );
        setRenderTemplates(remainingTemplates);
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };

    const fetchUserPortfolioData = async () => {
      try {
        const response = await fetch("/api/portfolioInfo");
        const userPortfolio = await response.json();
        setPortfolioData(userPortfolio.hasPortfolio);
      } catch (err) {
        console.error("Error fetching user portfolio data:", err);
      }
    };

    fetchSpecificTemplate();
    fetchTemplate();
    fetchUserPortfolioData();
  }, [template_id]);

  function storingTemplateId() {
    if (typeof window !== "undefined" && window.localStorage) {
      // Save the template id to local storage
      window.localStorage.setItem("template_id", template_id);
    }
  }

  return (
    <div className="max-w-8xl mx-auto w-full p-4 md:p-8">
      <div className="bg-[#f7f7f7] border border-white/50 dark:bg-[#15191a] dark:border-[#282F30]/40 p-8 rounded-[2rem]">
        <div className="md:flex justify-between items-center mb-10">
          <div className="flex items-start gap-2">
            <h1 className="mb-4 md:text-left text-center text-[32px] font-bold text-[#282f30] dark:text-[#f1f1f1]">
              Preview Template
            </h1>
            <InfoTooltip
              info={"Hover over elements for guidance on filling out details."}
            />
          </div>
          {!hasPortfolioData ? (
            <Link
              onClick={storingTemplateId}
              href={"/create"}
              className="flex justify-center bg-[#282F30] dark:bg-[#f1f1f1] px-4 py-2 text-sm rounded-[15px] text-[#f1f1f1] dark:text-[#282F30] font-bold transition duration-300 md:hover:shadow-[0_0_20px_5px_currentColor]"
            >
              Let's get it done
            </Link>
          ) : (
            <Button
              onClick={() => router.push(`/processing/${template_id}`)}
              className="flex justify-center bg-[#F1C40F] dark:bg-[#F1C40F] px-4 py-2 text-sm rounded-[15px] text-[#282F30] dark:text-[#282F30] font-bold transition duration-300 md:hover:shadow-[0_0_20px_5px_currentColor]"
            >
              Create Portfolio
            </Button>
          )}
        </div>
        {!templateHTML && <Loader progress={progress} />}
        <div className="rounded-[30px] h-[100vh] overflow-y-auto overflow-x-hidden">
          <div dangerouslySetInnerHTML={{ __html: templateHTML }} />
        </div>
      </div>
      <div className="mt-10">
        <h1 className="mb-4 text-center text-[32px] font-bold text-[#282f30] dark:text-[#f1f1f1]">
          More Templates
        </h1>
        <div className="flex flex-col md:grid md:grid-cols-2 gap-10 max-w-6xl mx-auto w-full h-full mt-8 px-4">
          {renderTemplates.map((data, index) => (
            <TemplatesContainer template_data={data} key={index} />
          ))}
        </div>
      </div>
      <FooterContainer />
    </div>
  );
};

export default PreviewPage;
