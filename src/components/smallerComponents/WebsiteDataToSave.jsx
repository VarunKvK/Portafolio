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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SaveData({ dialog_title, id, websiteName }) {
  const router=useRouter()
  const [name, setWebsiteName] = useState("");
  const [description, setDescription] = useState("");

  function handleOnWebsiteName(e) {
    const websiteName = e.target.value;
    setWebsiteName(websiteName);
  }

  function handleOnWebsiteDescription(e) {
    const websiteDescription = e.target.value;
    setDescription(websiteDescription);
  }

  async function handleSubmit() {
    const response = await fetch("/api/userTemplateData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: name,
        description: description,
        template_id:id,
        websiteName:websiteName
      }),

    });
    if(response.ok){
        router.push("/templates")
    }
}
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#1c2122] border border-[#4e5c5e] text-[#f1f1f1]">
          Save your website
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{dialog_title}</DialogTitle>
          <DialogDescription>
            Saving the changes would be displayed on the dashboard.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="websitename" className="text-right">
              WebsiteName
            </Label>
            <Input
              onChange={handleOnWebsiteName}
              id="websitename"
              placeholder="Batman"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              onChange={handleOnWebsiteDescription}
              id="description"
              placeholder="This is batman"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
