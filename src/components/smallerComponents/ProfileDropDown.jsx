import { LifeBuoy, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export function Dropdown() {
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch("/api/usersData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const userData = await response.json();
      setUser(userData);
    };
    
    fetchUserData();
  }, []);


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="rounded-full bg-[#f1f1f1] border border-[#ffff] dark:border-[#4e5c5e] text-[#282F30] hover:text-[#f1f1f1] dark:text-[#f1f1f1] dark:hover:text-[#282f30] dark:hover:bg-[#f1f1f1] dark:bg-[#1c2122] flex items-center justify-center"
          aria-label="User Menu"
        >
          <User />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-4">
        {!user ? (
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
        ) : (
          <DropdownMenuLabel>Welcome {user.firstName}!</DropdownMenuLabel>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={`/dashboard/${user._id}`} className="flex items-center w-full">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <LifeBuoy className="mr-2 h-4 w-4" />
            <span>Support</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <SignOutButton />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
