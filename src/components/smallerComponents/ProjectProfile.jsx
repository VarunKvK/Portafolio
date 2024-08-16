import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import {
  AlertTriangle,
  CheckCircle,
  Pencil,
  PlusIcon,
  Trash,
} from "lucide-react";
import { useToast } from "../ui/use-toast";
import ProjectsContainer from "../ProjectsContainer";
import ToolTip from "./ToolTip";
import Image from "next/image";
import { Separator } from "../ui/separator";
import Link from "next/link";

const ProjectProfile = ({ userProjects, id }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [projectData, setProjectData] = useState(userProjects);
  const [error, setError] = useState();

  async function handleDeleteProject(index) {
    const project = projectData[index];
    try {
      const response = await fetch("/api/projectInfo", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ title: project.name }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete project");
      }

      toast({
        title: (
          <div className="flex items-center gap-1">
            <CheckCircle className="dark:text-[#f1f1f1] text-[#282f30]" />
            <p className="dark:text-[#f1f1f1] text-[#282f30]">
              Project Deleted Successfully
            </p>
          </div>
        ),
      });

      setProjectData((prevData) => prevData.filter((_, i) => i !== index));
    } catch (error) {
      toast({
        title: (
          <div className="flex items-center gap-1">
            <AlertTriangle className="dark:text-[#f1f1f1] text-[#f44336]" />
            <p className="dark:text-[#f1f1f1] text-[#f44336]">
              Error Deleting Project: {error.message}
            </p>
          </div>
        ),
        variant: "destructive",
      });
    }
  }

  return (
    <div className="bg-[#f7f7f7] border border-white/50 dark:bg-[#15191a] dark:border-[#282F30]/40 p-8 rounded-[2rem] md:w-[70%] w-[95%]">
      <div className="flex items-end justify-between mb-2.5">
        <h1 className="text-[#282F30]/50 dark:text-[#f1f1f1]/50 font-semibold">
          Projects you added
        </h1>
        <Dialog>
          <DialogTrigger
            className="flex items-center gap-1 border-white/50 dark:bg-[#15191a] dark:border-[#282F30]/40 dark:text-white"
            asChild
          >
            <Button variant="outline" className="flex items-center gap-1">
              <Pencil className="w-4" />
              <span className="md:block hidden">Edit Projects</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[95%] sm:w-full h-auto rounded-[1.5rem] bg-[#f7f7f7] border border-white/50 dark:bg-[#15191a] dark:border-[#282F30]/40 dark:text-white text-[#1c2021] ">
            <DialogHeader>
              <DialogTitle>Edit your projects</DialogTitle>
              <DialogDescription>
                Make changes to your projects here. And you are done!
              </DialogDescription>
            </DialogHeader>
            <div className="px-[24px] border border-[#282F30] dark:bg-[#121515] dark:border-[#282F30] rounded-lg">
              <div className="py-4 rounded-lg flex flex-col gap-6">
                <div className="flex flex-col gap-8">
                  <div className="flex items-center gap-1 justify-between">
                    <h2 className="text-lg font-bold dark:text-[#f1f1f1] text-[#282F30]">
                      Projects you created
                    </h2>
                    <Link
                      href={`/create/${id}`}
                      className="border rounded-md py-2 px-4 border-[#F1C40F] text-[#F1C40F]"
                    >
                      <PlusIcon />
                    </Link>
                  </div>
                  <div className="dark:bg-[#121515] bg-[#f0f0f0] w-full rounded-lg grid grid-cols-2 items-end gap-4 overflow-y-auto max-w-6xl">
                    {projectData.length > 0 ? (
                      projectData.map((values, index) => (
                        <div key={values.name} className="relative">
                          <Button
                            onClick={() => handleDeleteProject(index)}
                            className="absolute right-2 top-2 bg-[#121515] dark:bg-[#f1f1f1] p-2 rounded-md"
                          >
                            <Trash className="dark:text-[#394041] text-[#f1f1f1]" />
                          </Button>
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
                              width={200}
                              height={200}
                            />
                          </ToolTip>
                        </div>
                      ))
                    ) : (
                      <p className="col-span-2 text-center py-4">
                        No projects added yet.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Separator variant="outline" />
      <div className="w-full rounded-lg grid grid-cols-2 md:grid-cols-4 items-end gap-4 overflow-y-auto max-w-6xl pt-6">
        {projectData.length > 0 ? (
          projectData.map((values, index) => (
            <div key={values.name} className="relative">
              <ToolTip
                className="relative"
                projectTitle={values.name}
                projectDescription={values.description}
                projectUrl={values.url}
              >
                <Image
                  className="rounded-md w-full h-full"
                  src={values.project_image_url}
                  alt={values.name}
                  width={200}
                  height={200}
                />
              </ToolTip>
            </div>
          ))
        ) : (
          <p className="col-span-2 text-center md:text-left py-4 text-[#282F30]/70 dark:text-[#f1f1f1]/70">
            No projects added yet. Click the &quot;<Link href={`/create/${id}`} className="text-[#1e1e1e] underline">
              Add Projects
            </Link>&quot; to get started.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProjectProfile;
