"use client";
import React, { useState } from "react";
import { Filter } from "lucide-react";
import { CustomToggle } from "../shared/main/Custom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const MobFil = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleToggleClick = () => {
    setIsSheetOpen(!isSheetOpen);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
  };

  return (
    <div>
      <Sheet open={isSheetOpen}>
        <SheetTrigger>
          <span
            className="text-lg font-semibold tracking-wider flex gap-2 p-2"
            onClick={handleToggleClick}
          >
            <Filter /> Filter
          </span>
        </SheetTrigger>
        <SheetContent className="w-[220px]">
          <CustomToggle onToggleClick={handleCloseSheet} />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobFil;
