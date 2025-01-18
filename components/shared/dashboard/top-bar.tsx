import Link from "next/link";
import AppLogo from "../app-logo";
import { Button } from "@/components/ui/button";
import { ArrowLeftToLine, PowerIcon } from "lucide-react";
import { signOut } from "@/auth";

export default function TopBar() {
    return(
        <div style={{backgroundColor: '#f3f4f6'}} className="flex justify-between items-center p-3 px-5 ">
            <AppLogo></AppLogo>
            <form
            action={async () => {
              'use server'
              await signOut()
            }}
          >
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground"
            >
              <ArrowLeftToLine className="w-6 mr-2" />
              <div className="hidden md:block">Log Out</div>
            </Button>
          </form>
        </div>
    )
}