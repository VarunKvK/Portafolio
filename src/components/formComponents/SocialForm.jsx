"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  faBehance,
  faDribbble,
  faFacebook,
  faGithub,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AlertTriangle, CheckCircle, Frown, Trash } from "lucide-react";
import { useToast } from "../ui/use-toast";

const socialMediaPlatforms = [
  { name: "Instagram", icon: faInstagram },
  { name: "Facebook", icon: faFacebook },
  { name: "Dribbble", icon: faDribbble },
  { name: "Behance", icon: faBehance },
  { name: "Twitter", icon: faTwitter },
  { name: "Github", icon: faGithub },
  { name: "Youtube", icon: faYoutube },
];

// Zod schema for form validation
const formSchema = z.object({
  socialLinks: z
    .array(
      z.object({
        platform: z.string(),
        url: z.string().url({ message: "Please enter a valid URL" }),
      })
    )
    .min(1, { message: "You must add at least one social link" }),
});

export default function SocialForm() {
  const { toast } = useToast();
  const [socialLinks, setSocialLinks] = useState([]);
  const [saving, setSaving] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      socialLinks: [],
    },
  });

  const addSocialLink = (platform) => {
    setSocialLinks([...socialLinks, { platform, url: "" }]);
  };

  const removeSocialLink = async (index) => {
    const socialLinkToRemove = socialLinks[index];
    const newLinks = socialLinks.filter((_, i) => i !== index);

    try {
      const response = await fetch("/api/socialInfo", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ platform: socialLinkToRemove.platform }),
      });

        setSocialLinks(newLinks);
        setValue("socialLinks", newLinks);
        toast({
          variant: "destructive",
          title: (
            <div className="flex items-center gap-1">
              <Trash className="dark:text-[#f1f1f1] text-[#f1f1f1]" />
              <p className="dark:text-[#f1f1f1] text-[#f1f1f1]">
                Deleted Successfully
              </p>
            </div>
          ),
        });
    } catch (error) {
      console.error("Error deleting social link:", error);
      toast({
        variant: "destructive",
        title: "Error deleting social link",
        description:
          "There was an error deleting the social link. Please try again.",
      });
    }
  };

  const updateSocialLink = (index, url) => {
    const newLinks = socialLinks.map((link, i) =>
      i === index ? { ...link, url } : link
    );
    setSocialLinks(newLinks);
    setValue("socialLinks", newLinks);
  };
  const onSubmit = async (data) => {
    if (data.length !== 0) {
      setSaving(true);

      try {
        const response = await fetch("/api/socialInfo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        toast({
          title: (
            <div className="flex items-center gap-1">
              <CheckCircle className="dark:text-[#f1f1f1] text-[#282f30]" />
              <p className="dark:text-[#f1f1f1] text-[#282f30]">
                Saved Successfully
              </p>
            </div>
          ),
        });
      } catch (error) {
        console.error("Error submitting form:", error);
        toast({
          title: "Error submitting form",
          description:
            "There was an error submitting your form. Please try again.",
          variant: "destructive",
          icon: (
            <AlertTriangle className="dark:text-[#f1f1f1] text-[#f44336]" />
          ),
        });
      } finally {
        setSaving(false);
      }
    } else {
      toast({
        title: (
          <div className="flex items-center gap-1">
            <AlertTriangle className="dark:text-[#f1f1f1] text-[#f44336]" />
            <p className="dark:text-[#f1f1f1] text-[#f44336]">
              Bio Details Cannot be Empty
            </p>
          </div>
        ),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <div className="flex-wrap gap-6 md:gap-2 md:flex-nowrap flex items-center justify-evenly py-[18px] border border-[#282F30] dark:bg-[#121515] dark:border-[#282F30] rounded-lg">
        {socialMediaPlatforms.map((platform) => (
          <Button
            className="flex items-center gap-1"
            key={platform.name}
            onClick={() => addSocialLink(platform.name)}
            type="button"
          >
            <FontAwesomeIcon icon={platform.icon} className="text-xl md:text-md"/>
            <span className="hidden md:block">{platform.name}</span>
          </Button>
        ))}
      </div>
      <div className="px-[24px] py-[24px] border border-[#282F30] dark:bg-[#121515] dark:border-[#282F30] mt-8 rounded-lg">
        {socialLinks.length === 0 ? (
          <div className="text-[#394041] text-md w-full flex justify-center items-center gap-1">
            <Frown />
            <p className="text-[#394041] text-md">No socials yet!</p>
          </div>
        ) : (
          socialLinks.map((link, index) => (
            <div key={index} className="flex flex-col gap-3 mb-6">
              <span className="font-semibold">{link.platform}</span>
              <div className="flex items-center gap-1">
                <Controller
                  name={`socialLinks.${index}.url`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      value={link.url}
                      onChange={(e) => {
                        field.onChange(e);
                        updateSocialLink(index, e.target.value);
                      }}
                      placeholder={`Enter your ${link.platform} URL`}
                    />
                  )}
                />
                <Button onClick={() => removeSocialLink(index)} type="button">
                  <Trash className="w-4" />
                </Button>
              </div>
              {errors.socialLinks && errors.socialLinks[index] && (
                <p className="text-red-500 text-sm">
                  {errors.socialLinks[index].url?.message}
                </p>
              )}
            </div>
          ))
        )}
      </div>
      <div className="w-full flex justify-end">
        <Button type="submit" className="bg-[#F1C40F] rounded-lg px-14 mt-8">
          {saving ? (
            <span className="">Saving...</span>
          ) : (
            <span className="">Save</span>
          )}
        </Button>
      </div>
    </form>
  );
}
