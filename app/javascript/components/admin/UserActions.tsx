import React, { useState } from "react";
import { AdminUser } from "../../types";
import { useI18n } from "../../contexts/I18nContext";
import { useAppNavigation } from "../../hooks/useAppNavigation";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";

import { Eye, UserCheck, UserX } from "lucide-react";

interface UserActionsProps {
  user: AdminUser;
  onToggleStatus: (userId: string) => void;
}

const UserActions = ({ user, onToggleStatus }: UserActionsProps) => {
  const i18n = useI18n();
  const { navigate } = useAppNavigation();

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const isInactive = user.status !== "Active";

  const handleConfirmToggle = () => {
    onToggleStatus(user.id);
    setIsConfirmModalOpen(false);
  };

  return (
    <>
      <div className="flex items-center gap-1">
        <TooltipProvider>
          {/* View details button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setIsViewModalOpen(true)}
              >
                <Eye className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{i18n.users_tab.actions.view_details}</p>
            </TooltipContent>
          </Tooltip>

          {/* Toggle status button */}
          <Tooltip>
            <TooltipTrigger asChild>
              {/* TODO: refresh ui after status change */}
              <Button
                variant="ghost"
                size="icon"
                className={`h-8 w-8 ${
                  isInactive ? "text-green-500" : "text-destructive"
                }`}
                onClick={() => setIsConfirmModalOpen(true)}
              >
                {isInactive ? (
                  <UserCheck className="h-4 w-4" />
                ) : (
                  <UserX className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {isInactive
                  ? i18n.users_tab.actions.activate_user
                  : i18n.users_tab.actions.deactivate_user}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* View details modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{i18n.users_tab.details_modal.title}</DialogTitle>
            <DialogDescription>
              {i18n.users_tab.details_modal.description.replace(
                "%{name}",
                user.name
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-lg">
                  {user.initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold">{user.name}</h3>
                <p className="text-muted-foreground">{user.email}</p>
                <Badge className="mt-1">{user.role}</Badge>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <strong className="block font-medium">
                  {i18n.users_tab.details_modal.join_date}
                </strong>
                <p className="text-muted-foreground">{user.joinDate}</p>
              </div>
              <div>
                <strong className="block font-medium">
                  {i18n.users_tab.details_modal.last_active}
                </strong>
                <p className="text-muted-foreground">{user.lastActive}</p>
              </div>
              <div>
                <strong className="block font-medium">
                  {i18n.users_tab.details_modal.rating}
                </strong>
                <p className="text-muted-foreground">{user.rating}/5.0</p>
              </div>
              <div>
                <strong className="block font-medium">
                  {i18n.users_tab.details_modal.location}
                </strong>
                <p className="text-muted-foreground">{user.location}</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation modal */}
      <AlertDialog
        open={isConfirmModalOpen}
        onOpenChange={setIsConfirmModalOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {i18n.users_tab.delete_modal.title}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {isInactive
                ? `This will reactivate ${user.name}'s account.`
                : `This will deactivate ${user.name}'s account.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {i18n.users_tab.delete_modal.cancel}
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmToggle}>
              {isInactive ? "Activate" : "Deactivate"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default UserActions;
