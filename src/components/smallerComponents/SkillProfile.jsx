"use client";

import React, { useState } from "react";
import BadgeContainer from "./Badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil, Trash, CheckCircle, AlertTriangle, Plus } from "lucide-react";
import { useToast } from "../ui/use-toast";
import { Separator } from "../ui/separator";
import Link from "next/link";

const SkillProfile = ({ userSkills, id }) => {
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
      <div className="flex items-end justify-between mb-4">
        <h1 className="text-[#282F30]/50 dark:text-[#f1f1f1]/50 font-semibold text-lg">
          Your Skills
        </h1>
        <div className="flex items-center gap-2">
          <Link href={`/create/${id}`} passHref>
            <Button variant="outline" className="flex items-center gap-1">
              <Plus className="w-4" />
              <span className="md:block hidden">Add Skills</span>
            </Button>
          </Link>
          {skills.length > 0 && (
            <Dialog>
              <DialogTrigger
                className="bg-[#f7f7f7] border border-white/50 dark:bg-[#15191a] dark:border-[#282F30]/40 dark:text-white text-[#1c2021]"
                asChild
              >
                <Button variant="outline" className="flex items-center gap-1">
                  <Pencil className="w-4" />
                  <span className="md:block hidden">Edit Skills</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[95%] h-auto sm:w-full rounded-[1.5rem] bg-[#f7f7f7] border border-white/50 dark:bg-[#15191a] dark:border-[#282F30]/40 dark:text-white text-[#1c2021] ">
                <DialogHeader>
                  <DialogTitle>Edit Your Skills</DialogTitle>
                  <DialogDescription>
                    Make changes to your skills here. Click save when you&apos;re done.
                  </DialogDescription>
                </DialogHeader>
                {skills.length > 0 ? (
                  <div className="px-[24px] py-[24px] border border-[#282F30] dark:bg-[#121515] dark:border-[#282F30] rounded-lg max-h-[400px] overflow-y-auto">
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
                          variant="destructive"
                        >
                          <Trash className="w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="px-[24px] py-[24px] text-center">
                    <p className="text-[#282F30]/70 dark:text-[#f1f1f1]/70 mb-4">
                      You have no skills added. Please add some skills to showcase your expertise.
                    </p>
                    <Link href={`/create/${id}`} passHref>
                      <Button variant="outline" className="flex items-center gap-1 mx-auto">
                        <Plus className="w-4" />
                        <span>Add Skills</span>
                      </Button>
                    </Link>
                  </div>
                )}
                {skills.length > 0 && (
                  <div className="flex items-center justify-end mt-4 gap-2">
                    <Button onClick={handleSaveSkills} type="button" disabled={saving} className="bg-[#F1C40F]">
                      {saving ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
      <Separator variant="outline" />
      <div className="pt-6 flex flex-wrap items-center gap-2">
        {skills.length > 0 ? (
          skills.map((skill) => (
            <BadgeContainer key={skill.skill}>
              <p>{skill.skill}</p>
            </BadgeContainer>
          ))
        ) : (
          <p className="col-span-2 text-center py-4 text-[#282F30]/70 dark:text-[#f1f1f1]/70">
            No skills added yet. Click the &quot;Add Skills&quot; button to get started.
          </p>
        )}
      </div>
    </div>
  );
};

export default SkillProfile;
