"use client";

import Loader from "@/components/smallerComponents/Loader";
import PortfolioCreatedProfile from "@/components/smallerComponents/PortfolioCreatedProfile";
import ProjectProfile from "@/components/smallerComponents/ProjectProfile";
import SkillProfile from "@/components/smallerComponents/SkillProfile";
import UserProfile from "@/components/smallerComponents/UserProfile";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const { user_id } = useParams();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      setProgress(90);
      setIsLoading(true);
      try {
        const response = await fetch("/api/userProfileData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ user_id }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [user_id]);

  if (isLoading) {
    return <Loader value={progress} />;
  }

  if (!user) {
    return <div>Error loading user data. Please try again later.</div>;
  }

  const { portfolioInfo = {} } = user;
  const { skills = [], projects = [] } = portfolioInfo;

  return (
    <div className="max-w-8xl mx-auto flex flex-col justify-center items-center gap-2 h-full">
      <UserProfile userData={user} id={user_id}/>
      <SkillProfile userSkills={skills} id={user_id} />
      <ProjectProfile userProjects={projects} id={user_id} />
      <PortfolioCreatedProfile id={user_id} />
    </div>
  );
};

export default Dashboard;
