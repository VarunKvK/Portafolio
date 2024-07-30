"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash, CheckCircle, Plus, AlertTriangle,Frown } from "lucide-react";
import { useToast } from "../ui/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const skillsList = [
  "JavaScript",
  "React",
  "Next.js",
  "Node.js",
  "CSS",
  "HTML",
  "Python",
  "Django",
  "Java",
  "C++",
];

const levels = ["Beginner", "Intermediate", "Advanced"];

const skillSchema = z.object({
  skill: z.string().min(1, { message: "Please select a skill" }),
  level: z.string().min(1, { message: "Please select a proficiency level" }),
});

export default function SkillsFormUpdate({userSkillsInfo}) {
  const { toast } = useToast();
  const [skills, setSkills] = useState(userSkillsInfo);
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(skillSchema),
  });

  const handleAddSkill = (data) => {
    setSkills([...skills, { skill: data.skill, level: data.level }]);
    setValue("skill", "");
    setValue("level", "");
  };

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
    <div className="bg-[#f7f7f7] border border-white/50 dark:bg-[#15191a] dark:border-[#282F30]/40 p-8 rounded-[2rem] mt-8 flex flex-col gap-6">
      <form onSubmit={handleSubmit(handleAddSkill)}>
        <div className="flex items-center gap-2">
          <Select
            onValueChange={(value) => setValue("skill", value)}
            {...register("skill")}
          >
            <SelectTrigger className="dark:bg-[#121515] dark:border-[#282f30]">
              <SelectValue placeholder="Select a skill" />
            </SelectTrigger>
            <SelectContent>
              {skillsList.map((skill) => (
                <SelectItem key={skill} value={skill}>
                  {skill}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.skill && (
            <p className="text-red-500 text-xs">{errors.skill.message}</p>
          )}

          <Select
            onValueChange={(value) => setValue("level", value)}
            {...register("level")}
          >
            <SelectTrigger className="dark:bg-[#121515] dark:border-[#282f30]">
              <SelectValue placeholder="Select proficiency level" />
            </SelectTrigger>
            <SelectContent>
              {levels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.level && (
            <p className="text-red-500 text-xs">{errors.level.message}</p>
          )}

          <Button type="submit">
            <Plus className="w-5" />
          </Button>
        </div>
      </form>

      <div className="px-[24px] py-[24px] border border-[#282F30] dark:bg-[#121515] dark:border-[#282F30] mt-8 rounded-lg">
        {skills.length === 0 ? (
          <div className="text-[#394041] text-md w-full flex justify-center items-center gap-1">
            <Frown/>
            <p className="text-[#394041] text-md">No skills added yet!</p>
          </div>
        ) : (
          skills.map((skillItem, index) => (
            <div
              key={index}
              className="flex items-center justify-between mb-2 bg-[#f0f0f0] border border-white/80 dark:bg-[#141718] dark:border-[#282F30]/50 rounded-md px-4 py-3"
            >
              <span className="font-semibold">{skillItem.skill}</span>
              <span>{skillItem.level}</span>
              <Button onClick={() => handleRemoveSkill(index)} type="button">
                <Trash className="w-4" />
              </Button>
            </div>
          ))
        )}
      </div>

      <div className="w-full flex justify-end">
        <Button
          onClick={handleSaveSkills}
          className="bg-[#F1C40F] rounded-lg px-14 mt-8"
          disabled={saving}
        >
          {saving ? (
            <span className="">Saving...</span>
          ) : (
            <span className="">Save</span>
          )}
        </Button>
      </div>
    </div>
  );
}
