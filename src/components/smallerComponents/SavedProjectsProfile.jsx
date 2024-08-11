import React, { useState } from "react";
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
import { EllipsisVertical, Eye, Pencil, Trash, Copy } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export function SavedProjects({ portfolio, onDelete, id }) {
  const [copied, setCopied] = useState(false);

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
        onDelete(portfolio._id);
      } else {
        console.error("Failed to delete project");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleView = () => {
    localStorage.setItem("selectedTemplateId", portfolio.templateId);
  };

  const handleCopyLink = async () => {
    try {
      const url = `https://createportafolio.vercel.app${portfolio.templateUrl}`;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  

  return (
    <Card className="flex flex-col gap-4 w-full bg-[#f7f7f7] border border-white/50 dark:bg-[#15191a] dark:border-[#282F30]/40 p-4 rounded-[2rem] ">
      <Image
        src={portfolio.templateImageUrl}
        alt={portfolio.templateName}
        width={500}
        height={500}
        className="rounded-[1.5rem] w-full h-full"
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
                  <DropdownMenuItem onClick={handleView} className="flex items-center gap-1">
                    <Eye className="w-4"/>
                    <span>View</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleCopyLink} className="flex items-center gap-1">
                  <Copy className="w-4" />
                  <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <Link href={`/create/${id}`}>
                  <DropdownMenuItem className="flex items-center gap-1">
                    <Pencil className="w-4"/>
                    <span>Edit</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <Button
                  className="border border-red-600 bg-red-500 text-white w-full flex items-center gap-1"
                  onClick={handleDelete}
                >
                  <Trash className="w-4"/>
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
