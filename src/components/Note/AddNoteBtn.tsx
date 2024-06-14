import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { SquarePlus } from "lucide-react";
import Note from "@/Models/NoteModel";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

export function AddNoteBtn() {
  const [notes, setNotes] = useState<Note>({
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

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="bg-yellow-400 px-6 shadow hover:bg-yellow-500 dark:bg-blue-400 dark:hover:bg-blue-600">
          <SquarePlus />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-light-secondary dark:bg-dark-secondary">
        <DialogHeader>
          <DialogDescription>
            <div className="flex flex-col gap-4">
              <Input
                placeholder="Title"
                value={notes.title}
                onChange={(e) =>
                  setNotes((prev) => ({ ...prev, title: e.target.value }))
                }
                className="rounded-none border-none border-transparent bg-transparent text-lg font-semibold text-black ring-offset-0 placeholder:text-xl placeholder:font-semibold focus:border-b focus:border-white focus-visible:border-transparent focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus-visible:ring-offset-transparent dark:text-white"
              />
              <Textarea
                placeholder="Take a note... "
                value={notes.content}
                onChange={(e) =>
                  setNotes((prev) => ({ ...prev, content: e.target.value }))
                }
                className="text-md h-fit overflow-y-visible rounded-none border border-none border-white bg-transparent text-slate-900 ring-offset-0 focus:border-b focus:border-white focus-visible:border-transparent focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus-visible:ring-offset-transparent dark:text-white"
              />

              <div className="flex items-center justify-end">
                <Button className="bg-yellow-400 px-6 shadow hover:bg-yellow-500 dark:bg-blue-400 dark:hover:bg-blue-600">
                  Add Note
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
