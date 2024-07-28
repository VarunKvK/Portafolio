import React from "react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Button } from "../ui/button";
import { EllipsisVertical, Trash } from "lucide-react";
import Link from "next/link";

export function SavedProjects({ portfolio, onDelete }) {
  console.log(portfolio);

  const handleDelete = async () => {
    try {
      const response = await fetch("/api/userTemplateData", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ projectId: portfolio._id }),
      });

      if (response.ok) {
        onDelete(portfolio._id); // Notify the parent component about the deletion
      } else {
        console.error("Failed to delete project");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <Card className="flex flex-col gap-4 w-full bg-[#f7f7f7] border border-white/50 dark:bg-[#15191a] dark:border-[#282F30]/40 p-4 rounded-[2rem] ">
      <Image
        src={portfolio.templateImageUrl}
        alt={portfolio.templateName}
        width={200}
        height={200}
        className="rounded-[1.5rem] relative w-full h-full object-cover"
      />
      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-end gap-4">
            <CardTitle>{portfolio.websiteName}</CardTitle>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="bg-[#f7f7f7] border border-white/50 dark:bg-[#131718] dark:border-[#282F30]/40"
              >
                <EllipsisVertical className="w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#f7f7f7] border border-white/50 dark:bg-[#15191a] dark:border-[#282F30]/40">
              <DropdownMenuGroup>
                <Link href={portfolio.templateUrl}>
                  <DropdownMenuItem>
                    <span>View</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <Link href="/create">
                  <DropdownMenuItem>
                    <span>Edit</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <Button
                  className="border border-red-600 bg-red-500 text-white w-full flex items-center gap-1"
                  onClick={handleDelete}
                >
                  <Trash />
                  <span>Delete</span>
                </Button>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardDescription className="truncate">
          {portfolio.description}
        </CardDescription>
      </div>
    </Card>
  );
}
