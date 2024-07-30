"use client";

import React, { useState } from "react";
import BadgeContainer from "./Badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { Trash, CheckCircle, AlertTriangle } from "lucide-react";
import { useToast } from "../ui/use-toast";
import { Separator } from "../ui/separator";
import Link from "next/link";

const SkillProfile = ({ userSkills,id }) => {
  const { toast } = useToast();
  const [skills, setSkills] = useState(userSkills);
  const [saving, setSaving] = useState(false);

  const handleRemoveSkill = (index) => {
    const newSkills = skills.filter((_, i) => i !== index);
    setSkills(newSkills);
    toast({
      variant: "destructive",
      title: (
        <div className="flex items-center gap-1">
          <Trash className="text-[#f1f1f1]" />
          <p className="text-[#f1f1f1]">Skill Removed</p>
        </div>
      ),
    });
  };

  const handleSaveSkills = async () => {
    if (skills.length === 0) {
      toast({
        variant: "destructive",
        title: (
          <div className="flex items-center gap-1">
            <AlertTriangle className="dark:text-[#f1f1f1] text-[#f44336]" />
            <p className="dark:text-[#f1f1f1] text-[#f44336]">
              Skills list cannot be empty
            </p>
          </div>
        ),
      });
      return;
    }

    setSaving(true);
    try {
      const response = await fetch("/api/skillsInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          skills: skills,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save skills");
      }

      toast({
        title: (
          <div className="flex items-center gap-1">
            <CheckCircle className="dark:text-[#f1f1f1] text-[#282f30]" />
            <p className="dark:text-[#f1f1f1] text-[#282f30]">
              Skills saved successfully
            </p>
          </div>
        ),
      });
    } catch (error) {
      console.error("Error saving skills:", error);
      toast({
        variant: "destructive",
        title: (
          <div className="flex items-center gap-1">
            <AlertTriangle className="dark:text-[#f1f1f1] text-[#f44336]" />
            <p className="dark:text-[#f1f1f1] text-[#f44336]">
              Failed to save skills
            </p>
          </div>
        ),
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-[#f7f7f7] border border-white/50 dark:bg-[#15191a] dark:border-[#282F30]/40 p-8 rounded-[2rem] md:w-[70%] w-[95%]">
      <div className="flex items-end justify-between mb-2.5">
        <h1 className="text-[#282F30]/50 dark:text-[#f1f1f1]/50 font-semibold">
          Skills you have added
        </h1>
        <Dialog>
          <DialogTrigger
            className="bg-[#f7f7f7] border border-white/50 dark:bg-[#15191a] dark:border-[#282F30]/40 dark:text-white text-[#1c2021]"
            asChild
          >
            <Button variant="outline" className="flex items-center gap-1">
              <Pencil className="w-4" />
              <span className="md:block hidden">
              Edit Skills
              </span>
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[95%] h-auto sm:w-full rounded-[1.5rem] bg-[#f7f7f7] border border-white/50 dark:bg-[#15191a] dark:border-[#282F30]/40 dark:text-white text-[#1c2021] ">
            <DialogHeader>
              <DialogTitle>Edit your skills</DialogTitle>
              <DialogDescription>
                Make changes to your skills here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="px-[24px] py-[24px] border border-[#282F30] dark:bg-[#121515] dark:border-[#282F30] rounded-lg">
              {skills.map((skillItem, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between mb-2 bg-[#f0f0f0] border border-white/80 dark:bg-[#141718] dark:border-[#282F30]/50 rounded-md px-4 py-3"
                >
                  <span className="font-semibold">{skillItem.skill}</span>
                  <span>{skillItem.level}</span>
                  <Button
                    onClick={() => handleRemoveSkill(index)}
                    type="button"
                  >
                    <Trash className="w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
            <Button onClick={handleSaveSkills} type="button" disabled={saving} className="bg-[#F1C40F]">
              Save changes
            </Button>
            <Link href={`/create/${id}`} className="border rounded-md py-2 px-4 border-[#F1C40F] text-[#F1C40F]">Add Skills</Link>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Separator variant="outline"/>
      <div className="pt-6 flex flex-wrap items-center gap-2">
        {skills.map((skill) => (
          <BadgeContainer key={skill.skill}>
            <p className="">{skill.skill}</p>
          </BadgeContainer>
        ))}
      </div>
    </div>
  );
};

export default SkillProfile;
