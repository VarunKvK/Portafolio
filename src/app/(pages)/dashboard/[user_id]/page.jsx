"use client";

import Loader from "@/components/smallerComponents/Loader";
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
      setIsLoading(true);
      const response = await fetch("/api/userProfileData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ user_id }),
      });
      const userData = await response.json();
      setUser(userData);
      setIsLoading(false);
      setProgress(90);
    };

    fetchUserData();
  }, [user_id]);

  return (
    <div>
      {isLoading ? (
        <Loader value={progress}/>
      ) : (
        <div className="max-w-4xl mx-auto flex flex-col justify-center items-center gap-2">
        <UserProfile userData={user} />
        <SkillProfile userSkills={user.portfolioInfo.skills}/>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
