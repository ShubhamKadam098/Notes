import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

import Note from "@/Models/NoteModel";
import EmptyNotes from "../Dummy/EmptyNotes";
import { Input } from "../ui/input";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import UpdateNote from "@/Firebase/UpdateNote";
import { useToast } from "../ui/use-toast";

const DisplayCard = ({ NotesList }: { NotesList: Note[] }) => {
  const { toast } = useToast();
  const [updatedNote, setUpdatedNote] = useState<Note>({
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
  const handleClick = (id: string) => {
    const selectedNote = NotesList.find((note) => note.id === id);
    if (selectedNote) {
      setUpdatedNote(selectedNote);
    }
  };
  const handleSubmit = () => {
    let id;
    for (let i = 0; i < NotesList.length; i++) {
      if (NotesList[i].id === updatedNote.id) {
        id = i;
        break;
      }
    }
    if (!id) {
      console.error("Note not found");
      return;
    }
    if (
      updatedNote.title === NotesList[id].title &&
      updatedNote.content === NotesList[id].content
    )
      return;
    UpdateNote(updatedNote.id, updatedNote)
      .then(() => {
        console.log("Note Updated");
      })
      .catch((e) => {
        console.error(e);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem while updating note.",
        });
      });
  };

  return (
    <>
      <Dialog
        onOpenChange={(e) => {
          if (e == false) handleSubmit();
          else return;
        }}
      >
        {NotesList.length > 0 ? (
          <section className="grid h-full w-full grid-cols-1 flex-wrap gap-x-2 gap-y-4 sm:grid-cols-2 md:grid-cols-3">
            {NotesList.map((note: Note) => {
              return (
                <DialogTrigger>
                  <div
                    key={note.id}
                    className="card max-h-[200px] cursor-pointer rounded-lg px-3 py-4 shadow-lg dark:border-slate-600 dark:bg-dark-secondary"
                    onClick={() => {
                      handleClick(note.id);
                    }}
                  >
                    <div className="card-header">
                      <h3>{note.title}</h3>
                    </div>
                    <div className="card-body line-clamp-3 max-h-full text-wrap">
                      <p>{note.content}</p>
                    </div>
                    <div className="card-footer">
                      <p>{note.labels.join(", ")}</p>
                    </div>
                  </div>
                </DialogTrigger>
              );
            })}
          </section>
        ) : (
          <EmptyNotes />
        )}
        <DialogContent className="bg-light-secondary dark:bg-dark-secondary">
          <DialogHeader>
            <DialogDescription>
              <Input
                placeholder="Title"
                value={updatedNote.title}
                onChange={(e) =>
                  setUpdatedNote((prev: Note) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                className="rounded-none border-none border-transparent bg-transparent text-lg font-semibold text-black ring-offset-0 placeholder:text-xl placeholder:font-semibold focus:border-b focus:border-white focus-visible:border-transparent focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus-visible:ring-offset-transparent dark:text-white"
              />
            </DialogDescription>
            <Textarea
              placeholder="Take a note... "
              value={updatedNote.content}
              onChange={(e) =>
                setUpdatedNote((prev: Note) => ({
                  ...prev,
                  content: e.target.value,
                }))
              }
              className="text-md h-fit overflow-y-visible rounded-none border border-none border-white bg-transparent text-slate-900 ring-offset-0 focus:border-b focus:border-white focus-visible:border-transparent focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus-visible:ring-offset-transparent dark:text-white"
            />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DisplayCard;
