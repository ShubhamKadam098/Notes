import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { CirclePlus } from "lucide-react";
import Note from "@/Models/NoteModel";
import { useContext, useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import NotesContext from "@/contexts/NotesContext";

export function AddNoteBtn() {
  const { toast } = useToast();
  const { AddNote } = useContext(NotesContext);
  const [note, setNote] = useState<Note>({
    id: "",
    title: "",
    content: "",
    labels: [],
    color: "",
    pinned: false,
    archived: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const handleSubmit = async () => {
    console.log("inside submit");

    if (note.content.trim() === "" && note.title.trim() === "") {
      return;
    }
    await AddNote(note)
      .then(() => {
        setNote({
          id: "",
          title: "",
          content: "",
          labels: [],
          color: "",
          pinned: false,
          archived: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem while adding note.",
        });
      });
  };

  return (
    <Dialog
      onOpenChange={(e) => {
        if (e == false) handleSubmit();
        else return;
      }}
    >
      <DialogTrigger className="c inline-flex h-full items-center whitespace-nowrap rounded-full border border-slate-400 bg-primary bg-yellow-400 px-6 text-sm font-medium text-primary-foreground shadow-lg ring-offset-background transition-colors hover:bg-primary/90 hover:bg-yellow-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600">
        <span className="hidden pr-1 font-semibold dark:text-white md:block">
          New
        </span>
        <CirclePlus className="text-white" />
      </DialogTrigger>
      <DialogContent className="bg-light-secondary dark:bg-dark-secondary">
        <DialogHeader>
          <DialogDescription>
            <Input
              placeholder="Title"
              value={note.title}
              onChange={(e) =>
                setNote((prev) => ({ ...prev, title: e.target.value }))
              }
              className="rounded-none border-none border-transparent bg-transparent text-lg font-semibold text-black ring-offset-0 placeholder:text-xl placeholder:font-semibold focus:border-b focus:border-white focus-visible:border-transparent focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus-visible:ring-offset-transparent dark:text-white"
            />
          </DialogDescription>
          <Textarea
            placeholder="Take a note... "
            value={note.content}
            onChange={(e) =>
              setNote((prev) => ({ ...prev, content: e.target.value }))
            }
            className="text-md h-64 overflow-y-visible rounded-none border border-none border-white bg-transparent text-slate-900 ring-offset-0 focus:border-b focus:border-white focus-visible:border-transparent focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus-visible:ring-offset-transparent dark:text-white"
          />
          <DialogFooter className="pt-2 sm:justify-end">
            <DialogClose asChild>
              <Button className="bg-yellow-400 px-6 shadow transition ease-in hover:translate-y-[2px] hover:bg-yellow-500 dark:bg-blue-400 dark:hover:bg-blue-600">
                Add Note
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
