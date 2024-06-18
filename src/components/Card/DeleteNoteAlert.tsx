import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash } from "lucide-react";

const DeleteNoteAlert = ({
  id,
  handleDelete,
}: {
  id: string;
  handleDelete: (id: string) => void;
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger onClick={(e) => e.stopPropagation()}>
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white ring-offset-slate-700 focus:outline-none focus:ring-1 focus:ring-black focus:ring-offset-1 dark:bg-red-500 dark:ring-offset-slate-400"
          aria-label="delete note"
        >
          <Trash height={17} width={17} />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete note.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(id);
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteNoteAlert;
