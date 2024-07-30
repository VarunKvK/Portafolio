"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "../ui/use-toast";
import { Label } from "../ui/label";
import { CheckCircle, AlertTriangle, Upload, Trash } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { upload } from "@/lib/upload";
import ProjectsContainer from "../ProjectsContainer";
import ToolTip from "../smallerComponents/ToolTip";
import Image from "next/image";

const projectSchema = z.object({
  title: z.string().min(1, { message: "Project title is required" }).max(20, {
    message: "Project title should only be less than 20 characters",
  }),
  description: z
    .string()
    .min(1, { message: "Project description is required" })
    .max(200, {
      message: "Project description should only be less than 200 characters",
    }),
  url: z.string().url("Invalid URL").optional(),
  files: z
    .any()
    .refine(
      (files) => files && files.length > 0,
      "At least one image is required"
    ),
});

export default function ProjectFormUpdate({ userProjectInfo }) {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState();
  const [projectData, setProjectData] = useState([]);
  const [tempFileName, setTempFileName] = useState("");
  const [titleCharCount, setTitleCharCount] = useState(0);
  const [descCharCount, setDescCharCount] = useState(0);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(projectSchema),
  });

  async function handleFileChange(e) {
    setTempFileName(e.target.files[0].name);
    setUploading(true);

    const response = await upload(e, (link) => {
      setValue("files", link);
      console.log(link);
    });
    setUploading(false);

    if (response.ok) {
      toast({
        title: (
          <div className="flex items-center gap-1">
            <Upload className="dark:text-[#f1f1f1] text-[#282f30]" />
            <p className="dark:text-[#f1f1f1] text-[#282f30]">
              Image Uploaded Successfully
            </p>
          </div>
        ),
      });
    } else {
      toast({
        title: (
          <div className="flex items-center gap-1">
            <AlertTriangle className="dark:text-[#f1f1f1] text-[#f44336]" />
            <p className="dark:text-[#f1f1f1] text-[#f44336]">
              Error Uploading Image
            </p>
          </div>
        ),
        variant: "destructive",
      });
    }
  }

  function handleTitleChange(e) {
    const inputValue = e.target.value;
    if (inputValue.length <= 15) {
      setValue("title", inputValue);
      setTitleCharCount(inputValue.length);
    }
  }

  function handleDescriptionChange(e) {
    const inputValue = e.target.value;
    if (inputValue.length <= 500) {
      setValue("description", inputValue);
      setDescCharCount(inputValue.length);
    }
  }

  async function handleSaveProject(data) {
    setSaving(true);
    try {
      const response = await fetch("/api/projectInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        throw new Error("Failed to save project");
      }

      toast({
        title: (
          <div className="flex items-center gap-1">
            <CheckCircle className="dark:text-[#f1f1f1] text-[#282f30]" />
            <p className="dark:text-[#f1f1f1] text-[#282f30]">
              Project Saved Successfully
            </p>
          </div>
        ),
      });
    } catch (error) {
      toast({
        title: (
          <div className="flex items-center gap-1">
            <AlertTriangle className="dark:text-[#f1f1f1] text-[#f44336]" />
            <p className="dark:text-[#f1f1f1] text-[#f44336]">
              Error Saving Project
            </p>
          </div>
        ),
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  }

  function createProjectData(data) {
    setProjectData((prevData) => [
      ...prevData,
      {
        title: data.title,
        description: data.description,
        url: data.url,
        files: data.files,
      },
    ]);
    resetForm();
  }

  function resetForm() {
    reset({
      title: "",
      description: "",
      url: "",
      files: null,
    });
    setTempFileName("");
    setTitleCharCount(0);
    setDescCharCount(0);
  }

  function removeProject(index) {
    setProjectData((prevData) => prevData.filter((_, i) => i !== index));
  }

  // const isProjectLimitReached = projectData.length >= 4;

  return (
    <div className="bg-[#f7f7f7] border border-white/50 dark:bg-[#15191a] dark:border-[#282F30]/40 p-8 rounded-[2rem] mt-8 flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Label>
            Project Title{" "}
            <span className="text-white/20">(Max 20 characters)</span>
          </Label>
          <span className="text-gray-400">{titleCharCount}/20</span>
        </div>
        <Input
          {...register("title")}
          placeholder="Project Title"
          onChange={handleTitleChange}
        />
        <div className="flex justify-between text-sm">
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Label>Project Url</Label>
        <Input {...register("url")} placeholder="Project URL" />
        {errors.url && <p className="text-red-500">{errors.url.message}</p>}
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Label>
            Project Description{" "}
            <span className="text-white/20">(Max 200 characters)</span>
          </Label>
          <span className="text-gray-400">{descCharCount}/200</span>
        </div>
        <Textarea
          {...register("description")}
          placeholder="Project Description"
          onChange={handleDescriptionChange}
        />
        <div className="flex justify-between text-sm">
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Label>Project Thumbnail</Label>
        {uploading && (
          <span className="text-sm text-[#f1f1f1]">Uploading...</span>
        )}
        <div className="flex justify-center items-center py-6 bg-[#f0f0f0] dark:bg-[#15191a] border border-dashed border-[#dfdfdf] dark:border-[#282f40] rounded-lg">
          <label className="px-4 py-2 mt-2 flex gap-2 w-full flex-col justify-center items-center cursor-pointer">
            <Input type="hidden" {...register("files")} />
            <Input type="file" onChange={handleFileChange} className="hidden" />
            <div className="flex gap-1 items-center">
              <Upload className="w-4" />
              <span>Upload Thumbnail</span>
            </div>
            {tempFileName && (
              <span className="text-[#282f40]">({tempFileName})</span>
            )}
          </label>
        </div>
        {errors.files && <p className="text-red-500">{errors.files.message}</p>}
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-1">
          <Button
            onClick={handleSubmit(createProjectData)}
            className="bg-[#F1C40F] rounded-lg px-14"
            // className={`bg-[#F1C40F] rounded-lg px-14 ${
            //   isProjectLimitReached ? "opacity-50 cursor-not-allowed" : ""
            // }`}
            // disabled={isProjectLimitReached}
          >
            <span className="">Create</span>
          </Button>
        </div>
        <div className="flex flex-col gap-1">
          <Button
            onClick={handleSaveProject}
            className="bg-[#F1C40F] rounded-lg px-14"

            // className={`bg-[#F1C40F] rounded-lg px-14 ${
            // isProjectLimitReached ? "opacity-50 cursor-not-allowed" : ""
            // }`}
            // disabled={!isProjectLimitReached}
          >
            {saving ? (
              <span className="">Saving...</span>
            ) : (
              <span className="">Save</span>
            )}
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-bold dark:text-[#f1f1f1] text-[#282F30]">
          Projects you created
        </h2>
        <div className="flex items-center gap-2">
          {userProjectInfo.map((values) => (
            <div key={values.name} className="relative">
              <ToolTip
                className="relative w-[20%] h-[20%]"
                projectTitle={values.name}
                projectDescription={values.description}
                projectUrl={values.url}
              >
                <Image
                  className="rounded-md w-full h-full"
                  src={values.project_image_url}
                  alt={values.name}
                  width={100}
                  height={100}
                />
              </ToolTip>
            </div>
          ))}
        </div>
        <ProjectsContainer
          projectData={projectData}
          error={error}
          removeProject={removeProject}
        />
      </div>
    </div>
  );
}
