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
import { useContext, useState } from "react";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";
import { Pin, PinOff, Trash } from "lucide-react";
import NotesContext from "@/contexts/NotesContext";

const DisplayCard = ({ NotesList }: { NotesList: Note[] }) => {
  const { toast } = useToast();
  const { UpdateNote, DeleteNote } = useContext(NotesContext);
  const [noteId, setNoteId] = useState<string | null>(null);
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
      setNoteId(id);
      setUpdatedNote(selectedNote);
    }
  };

  function handleDelete(id: string) {
    DeleteNote(id)
      .then(() => {
        console.log("Note Deleted");
      })
      .catch((e) => {
        console.error(e);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem while deleting note.",
        });
      });
  }

  const handleSubmit = () => {
    if (!noteId) {
      console.error("No note selected");
      return;
    }

    const index = NotesList.findIndex((note) => note.id === noteId);
    if (index === -1) {
      console.error("Note not found");
      return;
    }

    const noteToUpdate = NotesList[index];
    if (
      updatedNote.title === noteToUpdate.title &&
      updatedNote.content === noteToUpdate.content
    ) {
      return;
    }

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
          <section className="grid gap-6 transition delay-75 ease-in-out sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {NotesList.sort().map((note: Note) => {
              const dateObject = new Date(note.updatedAt);
              const date = dateObject.toDateString();
              return (
                <DialogTrigger key={note.id} className="h-[258px] rounded-lg">
                  <div
                    className="mb-6 flex h-64 flex-col justify-between rounded-lg border border-slate-300 bg-light-secondary px-4 py-5 shadow-lg dark:border-slate-700 dark:bg-dark-secondary"
                    onClick={() => {
                      handleClick(note.id);
                    }}
                  >
                    <div className="flex grow flex-col">
                      <h4 className="mb-3 font-bold text-gray-800 dark:text-white">
                        {note.title}
                      </h4>
                      <p className="max-h-36 grow truncate text-wrap text-start text-sm text-gray-800 dark:text-slate-300">
                        {note.content}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-gray-800">
                        <p className="text-sm text-gray-800 dark:text-slate-300">
                          {date}
                        </p>
                        <div className="flex grow items-center justify-end gap-2">
                          <button
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white ring-offset-slate-700 focus:outline-none focus:ring-1 focus:ring-black focus:ring-offset-1 dark:bg-red-500 dark:ring-offset-slate-400"
                            aria-label="delete note"
                            role="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(note.id);
                            }}
                          >
                            <Trash height={17} width={17} />
                          </button>
                          <button
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500 text-white ring-offset-slate-700 focus:outline-none focus:ring-1 focus:ring-black focus:ring-offset-1 dark:bg-blue-500 dark:ring-offset-slate-400"
                            aria-label="pin note"
                            role="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              UpdateNote(note.id, {
                                ...note,
                                pinned: !note.pinned,
                              });
                              note.pinned = !note.pinned;
                            }}
                          >
                            {note.pinned ? (
                              <PinOff height={17} width={17} />
                            ) : (
                              <Pin height={17} width={17} />
                            )}
                          </button>
                        </div>
                      </div>
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
              className="text-md h-64 overflow-y-visible rounded-none border border-none border-white bg-transparent text-slate-900 ring-offset-0 focus:border-b focus:border-white focus-visible:border-transparent focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus-visible:ring-offset-transparent dark:text-white"
            />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DisplayCard;
