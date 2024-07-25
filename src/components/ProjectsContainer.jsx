"use client";

import { Frown, Trash } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ToolTip from "./smallerComponents/ToolTip";

const ProjectsContainer = ({ projectData, error, removeProject }) => {
  if (error) {
    return <div>{error}</div>;
  }

  if (!projectData || projectData.length === 0) {
    return (
      <div className="dark:bg-[#121515] bg-[#f0f0f0] w-full rounded-lg p-6 flex items-center justify-center gap-1">
        <Frown className="text-[#394041]" />
        <p className="text-[#394041] text-md">No projects added yet!</p>
      </div>
    );
  }

  return (
    <div className="dark:bg-[#121515] bg-[#f0f0f0] w-full rounded-lg p-6 flex items-end gap-4 overflow-y-auto max-w-6xl">
      {projectData.map((values, index) => (
        <div key={values.title} className="relative w-[20%] h-[20%]">
            <Button
              onClick={() => removeProject(index)}
              className="absolute right-2 top-2 bg-[#121515] dark:bg-[#f1f1f1] p-2 rounded-md"
            >
              <Trash className="dark:text-[#394041] text-[#f1f1f1]" />
            </Button>
        <ToolTip className="relative w-[20%] h-[20%]" projectTitle={values.title} projectDescription={values.description} projectUrl={values.url}>
            <Image
              className="rounded-md w-full h-full"
              src={values.files}
              alt={values.title}
              width={200}
              height={200}
              />
        </ToolTip>
              </div>
      ))}
    </div>
  );
};

export default ProjectsContainer;
