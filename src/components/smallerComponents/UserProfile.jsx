import React from "react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "../ui/textarea";
import { Pencil } from "lucide-react";

const socialMediaIcons = {
  Instagram: faInstagram,
  Facebook: faFacebook,
  Dribbble: faDribbble,
  Behance: faBehance,
  Twitter: faTwitter,
  Github: faGithub,
  Youtube: faYoutube,
};

// Zod schema for validation
const schema = z.object({
  username: z.string().min(1, "Username should be a one character").optional(),
  websiteName: z.string().optional(),
  profession: z
    .string()
    .min(1, "Profession should be a one character")
    .optional(),
  bio: z.string().optional(),
});

const UserProfile = ({ userData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      username: userData.portfolioInfo.bio.username,
      websiteName: userData.portfolioInfo.bio.websiteName,
      profession: userData.portfolioInfo.bio.profession,
      bio: userData.portfolioInfo.bio.bio,
    },
  });

  const getInitials = (firstName, lastName) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  };

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/portfolioInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userData._id, ...data }),
      });

      if (response.ok) {
        toast({
          title: "Profile updated successfully!",
          description: "Your profile has been updated.",
          status: "success",
          duration: 5000,
        });
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      toast({
        title: "Error updating profile",
        description: error.message,
        status: "error",
        duration: 5000,
      });
    }
  };

  return (
    <div className="bg-[#f7f7f7] border border-white/50 dark:bg-[#15191a] dark:border-[#282F30]/40 p-8 rounded-[2rem] md:w-[70%] w-[95%]">
      <div className="space-y-1 flex items-end gap-2.5 justify-between">
        <div className="flex items-end gap-2.5">
          <Avatar className="w-[60px] h-[60px]">
            <AvatarImage src={userData.image_url} alt={userData.firstName} />
            <AvatarFallback>
              {getInitials(userData.firstName, userData.lastName)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <h4 className="text-lg font-semibold leading-none">
              {userData.portfolioInfo.bio.username}
            </h4>
            <p className="text-sm text-muted-foreground">
              {userData.portfolioInfo.bio.profession}
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button className="flex items-center gap-1 bg-[#f7f7f7] border border-white/50 dark:bg-[#15191a] dark:border-[#282F30]/40 dark:text-[#f1f1f1] text-[#1c2021] hover:text-[#f1f1f1]">
                <Pencil className="w-4" />
                <span className="md:block hidden">Edit Profile</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-[#f7f7f7] border border-white/50 dark:bg-[#15191a] dark:border-[#282F30]/40 dark:text-white text-[#1c2021]">
              <SheetHeader>
                <SheetTitle>Edit profile</SheetTitle>
                <SheetDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </SheetDescription>
              </SheetHeader>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid gap-4 py-10"
              >
                <div className="flex flex-col items-start gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <Input
                    id="username"
                    {...register("username")}
                    className="col-span-3"
                  />
                  {errors.username && <p>{errors.username.message}</p>}
                </div>
                <div className="flex flex-col items-start gap-4">
                  <Label htmlFor="website" className="text-right">
                    Website
                  </Label>
                  <Input
                    id="website"
                    {...register("websiteName")}
                    className="col-span-3"
                  />
                </div>
                <div className="flex flex-col items-start gap-4">
                  <Label htmlFor="profession" className="text-right">
                    Profession
                  </Label>
                  <Input
                    id="profession"
                    {...register("profession")}
                    className="col-span-3"
                  />
                  {errors.profession && <p>{errors.profession.message}</p>}
                </div>
                <div className="flex flex-col items-start gap-4">
                  <Label htmlFor="bio" className="text-right">
                    Bio
                  </Label>
                  <Textarea
                    id="bio"
                    {...register("bio")}
                    className="col-span-3"
                  />
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button type="submit" className="bg-[#F1C40F]">
                      Save changes
                    </Button>
                  </SheetClose>
                </SheetFooter>
              </form>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="">
        <p className="text-sm md:text-md md:w-[50%] dark:text-[#f1f1f1]/50 text-[#282F30] ">
          {userData.portfolioInfo.bio.bio}
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex flex-wrap h-auto items-center space-x-2 border rounded-lg p-4">
        {userData.portfolioInfo.socials.map((link) => {
          const icon = socialMediaIcons[link.social_name];
          return (
            <Link
              href={link.url}
              key={link.social_name}
              className="flex items-center gap-1"
            >
              {icon && (
                <FontAwesomeIcon className="text-[1.3rem]" icon={icon} />
              )}
              <p className="hidden md:block">{link.social_name}</p>
              <Separator orientation="vertical" />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default UserProfile;
