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
import { SquarePlus } from "lucide-react";
import Note from "@/Models/NoteModel";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import addNote from "@/Firebase/AddNote";
import { useToast } from "../ui/use-toast";

export function AddNoteBtn() {
  const { toast } = useToast();
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
    await addNote(note)
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
      <DialogTrigger>
        <Button className="bg-yellow-400 px-6 shadow hover:bg-yellow-500 dark:bg-blue-400 dark:hover:bg-blue-600">
          <SquarePlus />
        </Button>
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
            className="text-md h-fit overflow-y-visible rounded-none border border-none border-white bg-transparent text-slate-900 ring-offset-0 focus:border-b focus:border-white focus-visible:border-transparent focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus-visible:ring-offset-transparent dark:text-white"
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
