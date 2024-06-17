import Note from "@/Models/NoteModel";
import fetchNotes from "@/lib/Firebase/FetchNotes";
import { createContext, useContext, useEffect, useState } from "react";

type NotesContextType = {
  notes: Note[];
  getNotes: () => Promise<void>;
  addNote: (note: Note) => Promise<void>;
  updateNote: (id: string, updatedNote: Note) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
};

const NotesContext = createContext<NotesContextType>({
  notes: [],
  getNotes: async () => {},
  addNote: async () => {},
  updateNote: async () => {},
  deleteNote: async () => {},
});

export default function useNotes() {
  return useContext(NotesContext);
}

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("NotesProvider mounted");
    getNotes();
  }, []);

  async function getNotes() {
    setLoading(true);
    const response = await fetchNotes();
    if (!response) return console.error("Error fetching notes");
    setNotes(response);
    setLoading(false);
  }

  async function addNote(note: Note) {
    addNote(note)
      .then(async () => {
        await getNotes();
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  async function updateNote(id: string, updatedNote: Note) {
    updateNote(id, updatedNote)
      .then(async () => {
        await getNotes();
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  }

  async function deleteNote(id: string) {
    deleteNote(id)
      .then(async () => {
        await getNotes();
      })
      .catch((error) => {
        console.error("Error deleteNote document: ", error);
      });
  }

  const value = {
    notes,
    getNotes,
    addNote,
    updateNote,
    deleteNote,
  };

  return (
    <NotesContext.Provider value={value}>
      {!loading && children}
    </NotesContext.Provider>
  );
}
