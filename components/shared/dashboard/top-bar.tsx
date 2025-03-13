"use client";

import AppLogo from "../app-logo";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/lib/actions/user-actions";
import { ArrowLeftToLine } from "lucide-react";
import { useActionState } from "react";

export default function TopBar() {
  const [isPending, formAction] = useActionState(async (prevState) => {
    await logoutAction();
    return true;
  }, false);

  return (
    <div style={{ backgroundColor: "#f3f4f6" }} className="flex justify-between items-center p-3 px-5">
      <AppLogo />

      {isPending && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <p className="text-lg font-semibold">Logging out...</p>
          </div>
        </div>
      )}

      <form action={formAction}>
        <Button variant="ghost" aria-disabled={isPending} className="w-full justify-start text-muted-foreground">
          <ArrowLeftToLine className="w-6 mr-2" />
          <div className="hidden md:block">Log Out</div>
        </Button>
      </form>
    </div>
  );
}
