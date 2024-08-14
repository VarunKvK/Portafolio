"use client";

import { FeaturesList } from "@/components/Jsons/FeaturesJson";
import Image from "next/image";
import Link from "next/link";

import TemplateGroup from "../../public/Images/Template.svg";
import GenerateBtn from "../../public/Images/GenerateBtn.svg";
import FormInput from "../../public/Images/FormInput.svg";

import Features from "@/components/ResponsiveContainers/Features";
import FooterContainer from "@/components/FooterContainer";
import WorkingContainer from "@/components/WorkingContainer";
import FeaturesContainer from "@/components/FeaturesContainer";

import { useAuth } from "@clerk/nextjs";
import TemplatesContainer from "@/components/TemplatesContainer";
import { useEffect, useState } from "react";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

if (typeof window !== "undefined") {
  // checks that we are client-side
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host:
      process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
    person_profiles: "identified_only",
    loaded: (posthog) => {
      if (process.env.NODE_ENV === "development") posthog.debug();
    },
  });
}

export default function Home() {
  const { isSignedIn } = useAuth();
  const [template, setTemplate] = useState([]);

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const result = await fetch("/api/templateFetcher");
        if (result.ok) {
          const template_data = await result.json();
          setTemplate(template_data);
        } else {
          console.error("Failed to fetch templates");
        }
      } catch (error) {
        console.error("Error fetching templates", error);
      }
    };

    fetchTemplate();
  }, []);

  return (
    <PostHogProvider client={posthog}>
      <div className="max-w-6xl mx-auto md:px-4 px-6">
        {/* Header */}
        <section className="flex items-center md:h-[88vh] h-screen">
          <div className="grid gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-[#282F30] dark:text-[#f1f1f1] leading-tight w-[80%] md:w-[75%] font-bold text-[40px] md:text-[64px]">
                Create Stunning Portfolios Instantly with{" "}
                <span className="font-bold text-[#F1C40F]">Portafolio</span>
              </h1>
              <p className="text-[#808687] font-medium md:text-[20px] text-[15px] md:w-[70%] w-[90%]">
                Effortlessly craft professional sites by choosing a template,
                entering your details, and publishing instantly.
              </p>
            </div>
            <div className="mt-4">
              {!isSignedIn ? (
                <Link
                  href={"/sign-in"}
                  className="bg-[#F1C40F] px-3 py-3.5 rounded-[15px] text-[#f1f1f1] font-bold"
                >
                  Create Account
                </Link>
              ) : (
                <Link
                  href={"/create"}
                  className="bg-[#282F30] dark:bg-[#f1f1f1] px-3 py-3.5 rounded-[15px] text-[#f1f1f1] dark:text-[#282F30] font-bold"
                >
                  Create Portfolio
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="flex items-center h-[88vh]">
          <div className="flex flex-col gap-12">
            <h2 className="text-[#282F30] dark:text-[#f1f1f1] font-bold text-[40px] w-[60%] md:text-[50px]">
              Why Choose Portafolio?
            </h2>
            <div className=" md:hidden flex items-center ">
              <Features features={FeaturesList} />
            </div>
            <div className="hidden md:grid grid-cols-3 gap-10">
              {FeaturesList.map((f) => (
                <FeaturesContainer
                  key={f.id}
                  featureTitle={f.featureTitle}
                  featureDescription={f.featureDescription}
                  featureIcon={f.featureIcon}
                />
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="md:h-screen  md:mt-[100px] mt-[80px]">
          <h2 className="text-[#282F30] dark:text-[#f1f1f1] font-bold text-[40px] md:text-[54px]">
            How It Works?
          </h2>
          <div className="grid grid-rows-3 gap-[10px] h-full mt-[40px] sm:gap-[60px]">
            <div className="md:flex-row flex-col justify-between flex items-center h-full gap-[10px]">
              <WorkingContainer
                workingTitle="Choose a Template"
                workingDescription="Select from our carefully curated collection of professional designs. Offering a wide variety of templates for various professions."
              />
              <Image
                className="rounded-[30px] w-full md:w-[300px]"
                src={TemplateGroup}
                alt="Template Selection"
                width={290}
                height={290}
                priority
              />
            </div>
            <div className="md:flex-row flex-col-reverse justify-between flex items-center h-full gap-[10px]">
              <Image
                className="rounded-[30px] w-full md:w-[370px]"
                src={FormInput}
                alt="Form Input"
                width={360}
                height={360}
                priority
              />
              <WorkingContainer
                workingTitle="Enter Your Details"
                workingDescription="Fill out simple forms to customize your site. This reduces the hassle of creating various HTML elements."
              />
            </div>
            <div className="md:flex-row flex-col justify-between flex items-center h-full gap-[10px]">
              <WorkingContainer
                workingTitle="Publish and Share"
                workingDescription="Effortlessly copy your website link and make it accessible to the whole world."
              />
              <Image
                className="rounded-[30px] w-full md:w-auto"
                src={GenerateBtn}
                alt="Generate Link"
                width={240}
                height={240}
                priority
              />
            </div>
          </div>
        </section>

        {/* Template Collections */}
        <section className="md:mt-[380px] mt-[250px] flex flex-col gap-12">
          <h2 className="text-[#282F30] dark:text-[#f1f1f1] font-bold md:text-[58px] text-[40px]">
            Template Collections
          </h2>
          <div className="flex flex-col md:grid md:grid-cols-2 gap-10 w-full h-full mt-8">
            {template.map((data, index) => (
              <TemplatesContainer template_data={data} key={index} />
            ))}
          </div>
        </section>

        <FooterContainer />
      </div>
    </PostHogProvider>
  );
}
