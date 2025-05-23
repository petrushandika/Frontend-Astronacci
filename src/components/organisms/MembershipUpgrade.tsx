import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { Link } from "react-router-dom";

interface MembershipUpgradeProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function MembershipUpgrade({
  isOpen,
  onClose,
  children,
}: MembershipUpgradeProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg w-full p-5 rounded-lg shadow-lg bg-white"
        style={{ ["--radix-dialog-overlay-opacity" as any]: 0 }}
      >
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl sm:text-2xl font-bold text-gray-900">
            Access Restricted
          </DialogTitle>
        </DialogHeader>

        <div className="py-6 px-2 text-center space-y-4">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-yellow-100 text-yellow-600">
            <Lock className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>

          <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed px-2">
            You have reached the limit of your article access.
          </p>

          <p className="text-gray-500 text-xs sm:text-sm md:text-base px-4">
            Upgrade your membership to access more premium content.
          </p>

          <Link to="/membership" onClick={onClose}>
            <Button className="mt-4 w-full py-3 sm:py-4 text-sm sm:text-base font-medium bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200">
              Upgrade Membership Now
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default MembershipUpgrade;
