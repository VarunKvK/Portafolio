import React, { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import { SavedProjects } from "./SavedProjectsProfile";
import Loader from "./Loader";
import Link from "next/link";

const PortfolioCreatedProfile = ({ id }) => {
  const [userTemplate, setUserTemplate] = useState(null);
  const [portfolioInfo, setPortfolio] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchUserTemplateData = async () => {
      try {
        const response = await fetch("/api/userTemplateData", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        setProgress(90);
        if (response.ok) {
          const userTemplateData = await response.json();
          setUserTemplate(userTemplateData);
          setPortfolio(userTemplateData.websiteData);
        } else {
          console.error("Failed to fetch user template data");
        }
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      }
    };

    fetchUserTemplateData();
  }, [id]);

  const handleDelete = (projectId) => {
    setPortfolio((prevPortfolio) =>
      prevPortfolio.filter((portfolio) => portfolio._id !== projectId)
    );
  };

  if (portfolioInfo === null) {
    return <Loader value={progress} />;
  }

  return (
    <div className="bg-[#f7f7f7] border border-white/50 dark:bg-[#15191a] dark:border-[#282F30]/40 rounded-[2rem] md:w-[70%] w-[95%]">
      <div className="flex flex-col p-8">
        <h1 className="text-[#282F30]/50 mb-2.5 dark:text-[#f1f1f1]/50 font-semibold">
          Portfolios you created
        </h1>
        <Separator variant="outline" />
      </div>
      {/* <div className="flex md:grid md:grid-cols-2 md:gap-2 w-full relative "> */}
      <div className="grid md:grid-cols-2 items-center gap-2 w-full relative ">
        {portfolioInfo.length > 0 ? (
          portfolioInfo.map((portfolio) => (
            <SavedProjects
              key={portfolio._id}
              portfolio={portfolio}
              onDelete={handleDelete}
              id={id}
            />
          ))
        ) : (
          <p className="col-span-2 text-center md:text-left py-4 text-[#282F30]/70 dark:text-[#f1f1f1]/70">
            No portfolios created yet. Click the &quot;
            <Link href={`/create/${id}`} className="text-[#1e1e1e] underline">
              Add Portfolios
            </Link>
            &quot; to get started.
          </p>
        )}
      </div>
    </div>
  );
};

export default PortfolioCreatedProfile;
