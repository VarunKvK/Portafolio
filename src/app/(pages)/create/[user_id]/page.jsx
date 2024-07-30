"use client";

import { ProfileFormUpdate } from "@/components/profileUpdate/BioFormUpdate";
import ProjectFormUpdate from "@/components/profileUpdate/ProjectFormUpdate";
import SkillsFormUpdate from "@/components/profileUpdate/SkillsFormUpdate";
import SocialFormUpdate from "@/components/profileUpdate/SocialsFormUpdate";
import Loader from "@/components/smallerComponents/Loader";
// import GuideStyling from "@/components/smallerComponents/GuideStyling";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const CreatePortfolio = () => {
  const { user_id } = useParams();
  const [userData, setUserData] = useState();
  const [loadingvalue, setLoadingValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoadingValue(100);
        const response = await fetch("/api/usersData", {
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
        setUserData(userData.portfolioInfo);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user_id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <Loader progress={loadingvalue} />
      </div>
    );
  }
  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-10 px-6 mb-14">
      <div className="">
        <h1 className="font-bold text-[3rem] px-4">Modify Your Profile</h1>
        <div className="flex flex-col">
          <ProfileFormUpdate userBioInfo={userData.bio}/>
          <SkillsFormUpdate userSkillsInfo={userData.skills}/>
          <ProjectFormUpdate userProjectInfo={userData.projects}/>
          <SocialFormUpdate userSocialsInfo={userData.socials}/>
        </div>
      </div>
    </div>
  );
};

export default CreatePortfolio;
