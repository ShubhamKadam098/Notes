import Note from "@/Models/NoteModel";
import { createContext } from "react";

export type NotesContextType = {
  notes: Note[];
  AddNote: (note: Note) => Promise<void>;
  UpdateNote: (id: string, updatedNote: Note) => Promise<void>;
  DeleteNote: (noteId: string) => Promise<void>;
  FetchNotes: () => Promise<void>;
};

const NotesContext = createContext<NotesContextType>();

export default NotesContext;
