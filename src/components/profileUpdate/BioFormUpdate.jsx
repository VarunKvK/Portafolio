"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect } from "react";
import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import InfoTooltip from "@/components/smallerComponents/InfoTooltip";

const formSchema = z.object({
  websiteName: z
    .string()
    .min(2, { message: "Website name must be at least 2 characters." })
    .max(20, { message: "Website name must be at most 20 characters." }),
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." })
    .max(20, { message: "Username must be at most 20 characters." }),
  profession: z.string().min(2, {
    message: "Profession must be at least 2 characters.",
  }),
  bio: z
    .string()
    .min(10, { message: "Bio must be at least 10 characters." })
    .max(200, { message: "Bio must be at most 200 characters." }),
});

export function ProfileFormUpdate({ userBioInfo }) {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [websiteNameCharCount, setWebsiteNameCharCount] = useState(
    userBioInfo.websiteName.length || 0
  );
  const [usernameCharCount, setUsernameCharCount] = useState(
    userBioInfo.username.length || 0
  );
  const [bioCharCount, setBioCharCount] = useState(userBioInfo.bio.length || 0);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      websiteName: userBioInfo.websiteName || "",
      username: userBioInfo.username || "",
      profession: userBioInfo.profession || "",
      bio: userBioInfo.bio || "",
    },
  });

  function handleWebsiteNameChange(e) {
    const inputValue = e.target.value;
    if (inputValue.length <= 20) {
      form.setValue("websiteName", inputValue);
      setWebsiteNameCharCount(inputValue.length);
    }
  }

  function handleUsernameChange(e) {
    const inputValue = e.target.value;
    if (inputValue.length <= 20) {
      form.setValue("username", inputValue);
      setUsernameCharCount(inputValue.length);
    }
  }

  function handleBioChange(e) {
    const inputValue = e.target.value;
    if (inputValue.length <= 200) {
      form.setValue("bio", inputValue);
      setBioCharCount(inputValue.length);
    }
  }

  async function onSubmit(data) {
    if (Object.values(data).some((value) => value.trim() !== "")) {
      setSaving(true);
      try {
        const response = await fetch("/api/portfolioInfo", {
          method: "POST", // Changed to PUT for updating data
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        } else {
          toast({
            title: "Your submitted values have been updated successfully",
          });
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        toast({
          title: "Error submitting form",
          description:
            "There was an error submitting your form. Please try again.",
          variant: "destructive",
        });
      } finally {
        setSaving(false);
      }
    } else {
      toast({
        title: (
          <div className="flex items-center gap-1">
            <AlertTriangle className="text-[#f1f1f1]" />
            <p className="text-[#f1f1f1]">Bio Details Cannot be Empty</p>
          </div>
        ),
      });
    }
  }

  return (
    <div className="bg-[#f7f7f7] border border-white/50 dark:bg-[#15191a] dark:border-[#282F30]/40 p-8 rounded-[2rem] mt-8 flex flex-col gap-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="websiteName"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel className="flex gap-2 items-center">
                    Website Name
                    <InfoTooltip
                      info={"Choose a stylish website name that reflects you"}
                    />
                  </FormLabel>
                  <span className="text-gray-400">
                    {websiteNameCharCount}/20
                  </span>
                </div>
                <FormControl>
                  <Input
                    placeholder="Batman"
                    {...field}
                    onChange={handleWebsiteNameChange}
                    className="dark:bg-[#121515] dark:border-[#282f30]"
                  />
                </FormControl>
                <div className="flex justify-between text-sm">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel className="flex gap-2 items-center">
                    Username
                    <InfoTooltip
                      info={"Integrate it as your name or nickname"}
                    />
                  </FormLabel>
                  <span className="text-gray-400">{usernameCharCount}/20</span>
                </div>
                <FormControl>
                  <Input
                    placeholder="Bruce Wayne"
                    {...field}
                    onChange={handleUsernameChange}
                    className="dark:bg-[#121515] dark:border-[#282f30]"
                  />
                </FormControl>
                <div className="flex justify-between text-sm">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="profession"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-2 items-center">
                  Profession
                  <InfoTooltip
                    info={"Ensure it clearly communicates your expertise"}
                  />
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="dark:bg-[#121515] dark:border-[#282f30]">
                      <SelectValue placeholder="Select your cool profession" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="dark:bg-[#121515] dark:border-[#282f30]">
                    <SelectItem value="Graphic Designer">
                      Graphic Designer
                    </SelectItem>
                    <SelectItem value="UI/UX Designer">
                      UI/UX Designer
                    </SelectItem>
                    <SelectItem value="Web Designer">Web Designer</SelectItem>
                    <SelectItem value="Web Developer">Web Developer</SelectItem>
                    <SelectItem value="Photographers">Photographers</SelectItem>
                    <SelectItem value="Videographer">Videographers</SelectItem>
                    <SelectItem value="Architect">Architect</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel className="flex gap-2 items-center">
                    Bio
                    <InfoTooltip
                      info={"Craft it into your about content as well."}
                    />
                  </FormLabel>
                  <span className="text-gray-400">{bioCharCount}/200</span>
                </div>
                <FormControl>
                  <Textarea
                    placeholder="I am batman"
                    {...field}
                    onChange={handleBioChange}
                    className="dark:bg-[#121515] dark:border-[#282f30]"
                  />
                </FormControl>
                <div className="flex gap-2 text-sm">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <div className="w-full flex justify-end">
            <Button type="submit" className="bg-[#F1C40F] rounded-lg px-14">
              {saving ? (
                <span className="">Saving...</span>
              ) : (
                <span className="">Save</span>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
