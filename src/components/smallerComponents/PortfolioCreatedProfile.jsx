import React, { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import { SavedProjects } from "./SavedProjectsProfile";

const PortfolioCreatedProfile = () => {
  const [userTemplate, setUserTemplate] = useState(null);
  const [portfolioInfo, setPortfolio] = useState(null);

  useEffect(() => {
    const fetchUserTemplateData = async () => {
      const response = await fetch("/api/userTemplateData");
      const userTemplateData = await response.json();
      if (response.ok) {
        setUserTemplate(userTemplateData);
        setPortfolio(userTemplateData.websiteData);
      }
    };

    fetchUserTemplateData();
  }, []);

  const handleDelete = (projectId) => {
    setPortfolio((prevPortfolio) =>
      prevPortfolio.filter((portfolio) => portfolio._id !== projectId)
    );
  };

  if (!portfolioInfo) {
    return <div>Loading...</div>; // or some other loading indicator
  }

  return (
    <div className="bg-[#f7f7f7] border border-white/50 dark:bg-[#15191a] dark:border-[#282F30]/40 p-8 rounded-[2rem] md:w-[70%] w-[95%]">
      <div className="flex items-end justify-between mb-2.5">
        <h1 className="text-[#282F30]/50 dark:text-[#f1f1f1]/50 font-semibold">
          Portfolios you created
        </h1>
      </div>
      <Separator variant="outline" />
      <div className="md:grid md:grid-cols-2 flex">
        {portfolioInfo.map((portfolio) => (
          <SavedProjects
            key={portfolio._id}
            portfolio={portfolio}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default PortfolioCreatedProfile;
