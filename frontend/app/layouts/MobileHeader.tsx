import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Sidebar from "../globals/LeftSidebar/Sidebar";

function MobileHeader() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu className=" cursor-pointer" />
      </SheetTrigger>
      <SheetContent className="bg-slate-800 border-none">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
}

export default MobileHeader;
