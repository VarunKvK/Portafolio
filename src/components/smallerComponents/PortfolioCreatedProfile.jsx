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
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: id }),
        });
        setProgress(90);

        if (response.ok) {
          const userTemplateData = await response.json();
          setUserTemplate(userTemplateData);
          setPortfolio(userTemplateData?.websiteData || []);
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
    return (
      <div className="bg-[#f7f7f7] border border-white/50 dark:bg-[#15191a] dark:border-[#282F30]/40 p-8 rounded-[2rem] md:w-[70%] w-[95%]">
        <div className="flex items-end justify-between mb-2.5">
          <h1 className="text-[#282F30]/50 dark:text-[#f1f1f1]/50 font-semibold">
            Portfolios you created
          </h1>
        </div>
        <Separator variant="outline" />
        <p className="col-span-2 text-center py-4 text-[#282F30]/70 dark:text-[#f1f1f1]/70">
          No portfolios created yet.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#f7f7f7] border border-white/50 dark:bg-[#15191a] dark:border-[#282F30]/40 p-8 rounded-[2rem] md:w-[70%] w-[95%]">
      <div className="flex items-end justify-between mb-2.5">
        <h1 className="text-[#282F30]/50 dark:text-[#f1f1f1]/50 font-semibold">
          Portfolios you created
        </h1>
      </div>
      <Separator variant="outline" />
      <div className="grid md:grid-cols-2 gap-2">
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
            No portfolios created yet. Click the &quot;<Link href={`/create/${id}`} className="text-[#1e1e1e] underline">
              Add Portfolios
            </Link>&quot; to get started.
          </p>
        )}
      </div>
    </div>
  );
};

export default PortfolioCreatedProfile;
