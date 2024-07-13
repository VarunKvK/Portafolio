"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LoadingTemplate = () => {
  const { template_id } = useParams();
  const router = useRouter();
  const [templateHTML, setTemplateHTML] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch("/api/usersData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const userData = await response.json();
      fetchTemplateUrl(userData);
    };

    const fetchTemplateUrl = async (userData) => {
      const response = await fetch("/api/templateFetcher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ template_id }),
      });
      const templateUrl = await response.json();
      const URL = templateUrl.dynamic_template_code_url;
      try {
        const response_code = await fetch(URL);
        let code = await response_code.text();
        code = injectUserData(code, userData);
        console.log(code)
        setTemplateHTML(code);
      } catch (error) {
        console.error("Error fetching the template:", error);
      }
    };
    fetchUserData();
  }, [template_id]);

  const injectUserData = (code, userData) => {
    const projectsJSON = JSON.stringify(userData.portfolioInfo.projects)
    const skillsJSON = JSON.stringify(userData.portfolioInfo.skills)
    return code
      .replace(/{{websiteName}}/g, userData.portfolioInfo.bio.websiteName)
      .replace(/{{username}}/g, userData.portfolioInfo.bio.username)
      .replace(/{{bio}}/g, userData.portfolioInfo.bio.bio)
      .replace(/{{profession}}/g, userData.portfolioInfo.bio.profession)
      .replace(/{{projectsJSON}}/g, projectsJSON)
      .replace(/{{socialLinksJSON}}/g, skillsJSON )
      .replace(/{{email}}/g, userData.email);
  };

  return (
    <div className=" w-full h-full flex items-center justify-center">
       {templateHTML ? (
        <div dangerouslySetInnerHTML={{ __html: templateHTML }} />
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default LoadingTemplate;
