"use client";
import AlertComponent from "@/components/smallerComponents/AlertComponent";
import SaveData from "@/components/smallerComponents/WebsiteDataToSave";
import ImageLoader from "@/components/smallerComponents/WebsiteProcessLoader";
import { Home } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ProcessPage = () => {
  const { template_id } = useParams();
  const [templateHTML, setTemplateHTML] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/usersData", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        await fetchTemplate(userData);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchTemplate = async (userData) => {
      try {
        const response = await fetch("/api/templateFetcher", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ template_id }),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch template data");
        }
        const templateData = await response.json();
        const { dynamic_code_url } = templateData;
        const codeResponse = await fetch(dynamic_code_url);
        if (!codeResponse.ok) {
          throw new Error("Failed to fetch template code");
        }
        let code = await codeResponse.text();
        code = injectUserData(code, userData);
        setTemplateHTML(code);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserData();
  }, [template_id]);

  const injectUserData = (code, userData) => {
    if (!userData.portfolioInfo) {
      throw new Error("Portfolio information is missing in user data");
    }
    const skillsContainer = userData.portfolioInfo.skills
      .map(
        (skills) => `
    <div class="skill-container-div">
      <p class="font-bold skill-text">${skills.skill}</p>
      <p class="opacity-50 skill-level-text">${skills.level}</p>
    </div>
  `
      )
      .join("");

    const projectsContainer = userData.portfolioInfo.projects
      .map(
        (project) => `
      <a href="${project.url}" target="_blank" class="project-link-container">
  <div class="project-image-dimensions">
    <img
      src="${project.project_image_url}"
      alt="${project.name}"
      class="img object-cover w-full h-full"
    />
  </div>
   <div class="project-container items-center">
    <h1 class="project-text-responsive font-bold">${project.name}</h1>
    <p class="opacity-50 project-description-text md:w-[40%]">
      ${project.description}
    </p>
  </div>
</a>
    `
      )
      .join("");

    const socialsContainer = userData.portfolioInfo.socials
      .map(
        (link) => `
      <li class="list-none">
      <a href="${link.url}" class="">
      ${link.social_name}
      </a>
      </li>
    `
      )
      .join("");

    return code
      .replace(/{{websiteName}}/g, userData.portfolioInfo.bio.websiteName)
      .replace(/{{username}}/g, userData.portfolioInfo.bio.username)
      .replace(/{{bio}}/g, userData.portfolioInfo.bio.bio)
      .replace(/{{profession}}/g, userData.portfolioInfo.bio.profession)
      .replace(/{{skills}}/g, skillsContainer)
      .replace(/{{projects}}/g, projectsContainer)
      .replace(/{{socials}}/g, socialsContainer)
      .replace(/{{email}}/g, userData.email);
  };

  return (
    <div className="bg-[#141718]">
      {error ? (
        <div className="w-full h-screen flex justify-center items-center">
          <div className="">
            <AlertComponent
              alert_description={error}
              alert_title={"You have a message from Batman"}
              className={"bg-red-400 text-red-800 border border-red-700"}
            />
          </div>
        </div>
      ) : !templateHTML ? (
        <div className="w-full h-screen flex justify-center items-center">
          <ImageLoader />
        </div>
      ) : (
        <div className="w-full grid gap-[20px] p-8">
          <div className="p-8 rounded-[30px] bg-[#121515] border border-[#282f30] w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-[#F1F1F1] text-3xl md:text-4xl font-bold">
              Have a <span className="italic font-semibold">&quot;good&quot;</span> look at it!
            </h1>
            <div className="flex gap-4 items-center">
              <Link
                href={"/"}
                className="flex items-end bg-[#1c2122] border border-[#4e5c5e] text-[#f1f1f1] p-2 rounded-lg"
              >
                <Home className="w-6" />
              </Link>
              <SaveData dialog_title={"Like your website?"} id={template_id} />
            </div>
          </div>
          <div dangerouslySetInnerHTML={{ __html: templateHTML }} />
        </div>
      )}
    </div>
  );
};

export default ProcessPage;
