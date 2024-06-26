import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import Note from "@/Models/NoteModel";
import EmptyNotes from "../Dummy/EmptyNotes";
import { Input } from "../ui/input";
import { useContext, useState } from "react";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";
import { Archive, Pin, PinOff } from "lucide-react";
import NotesContext from "@/contexts/NotesContext";
import DeleteNoteAlert from "./DeleteNoteAlert";

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

  const handleDelete = async (id: string) => {
    try {
      await DeleteNote(id);
      toast({
        variant: "default",
        title: "Note deleted",
      });
    } catch (error) {
      console.error("Error deleting note: ", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem while deleting the note.",
      });
    }
  };

  const handleSubmit = async () => {
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

    try {
      await UpdateNote(updatedNote.id, updatedNote);
    } catch (error) {
      console.error("Error updating note: ", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem while updating the note.",
      });
    }
  };

  const NoteCard = ({ note }: { note: Note }) => {
    const dateObject = new Date(note.updatedAt);
    const date = dateObject.toDateString();
    return (
      <DialogTrigger key={note.id} className="h-[258px] rounded-lg">
        <div
          className="mb-6 flex h-64 flex-col justify-between rounded-lg border border-slate-300 bg-light-secondary px-4 py-5 shadow-lg dark:border-slate-700 dark:bg-dark-secondary"
          onClick={() => handleClick(note.id)}
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
                <div className="" onClick={(e) => e.stopPropagation()}>
                  <DeleteNoteAlert id={note.id} handleDelete={handleDelete} />
                </div>
                <button
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500 text-white ring-offset-slate-700 focus:outline-none focus:ring-1 focus:ring-black focus:ring-offset-1 dark:bg-blue-500 dark:ring-offset-slate-400"
                  aria-label="pin note"
                  onClick={(e) => {
                    e.stopPropagation();
                    UpdateNote(note.id, {
                      ...note,
                      pinned: !note.pinned,
                    });
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
  };

  return (
    <>
      <Dialog onOpenChange={(isOpen) => !isOpen && handleSubmit()}>
        {NotesList.length > 0 ? (
          <section className="grid gap-6 transition delay-75 ease-in-out sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {NotesList.sort().map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
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
                  setUpdatedNote((prev) => ({
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
                setUpdatedNote((prev) => ({
                  ...prev,
                  content: e.target.value,
                }))
              }
              className="text-md h-64 overflow-y-visible rounded-none border border-none border-white bg-transparent text-slate-900 ring-offset-0 focus:border-b focus:border-white focus-visible:border-transparent focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus-visible:ring-offset-transparent dark:text-white"
            />
          </DialogHeader>
          <DialogFooter>
            <div className="flex grow items-center justify-end gap-2">
              <button
                className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500 text-white ring-offset-slate-700 focus:outline-none focus:ring-1 focus:ring-black focus:ring-offset-1 dark:bg-blue-500 dark:ring-offset-slate-400"
                aria-label="pin note"
                onClick={(e) => {
                  e.stopPropagation();
                  UpdateNote(updatedNote.id, {
                    ...updatedNote,
                    pinned: !updatedNote.pinned,
                  });
                }}
              >
                {updatedNote.pinned ? (
                  <PinOff height={17} width={17} />
                ) : (
                  <Pin height={17} width={17} />
                )}
              </button>
              {/* Archieve */}
              <button
                className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white ring-offset-slate-700 focus:outline-none focus:ring-1 focus:ring-black focus:ring-offset-1 dark:bg-orange-500 dark:ring-offset-slate-400"
                aria-label="delete Archieve"
              >
                <Archive height={17} width={17} />
              </button>
              {/* Delete */}
              <div className="" onClick={(e) => e.stopPropagation()}>
                <DeleteNoteAlert
                  id={updatedNote.id}
                  handleDelete={handleDelete}
                />
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DisplayCard;
