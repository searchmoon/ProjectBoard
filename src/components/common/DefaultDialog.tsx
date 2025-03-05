import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface DefaultDialogProp {
  open: boolean;
  onOpenChange: () => void;
  title?: string;
  description?: string | React.ReactNode;
  content?: React.ReactNode;
  buttons?: React.ReactNode;
}

export function DefaultDialog({
  open,
  onOpenChange,
  title,
  description,
  content,
  buttons,
}: DefaultDialogProp) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex-row items-center">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {content}
        <DialogFooter>{buttons}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
