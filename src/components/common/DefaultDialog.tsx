import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import React from 'react';

interface DefaultDialogProp {
  open: boolean;
  onOpenChange: () => void;
  title?: string;
  description?: string | React.ReactNode;
  content?: React.ReactNode;
  buttons?: React.ReactElement;
  icon?: React.ReactElement;
}

export function DefaultDialog({
  open,
  onOpenChange,
  title,
  description,
  content,
  buttons,
  icon,
}: DefaultDialogProp) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex">
          <div className="flex items-center">
            <DialogTitle>{title}</DialogTitle>
            {icon && icon}
          </div>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {content}
        <DialogFooter className="flex">{buttons}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
