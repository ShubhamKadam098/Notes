import Note from "@/Models/NoteModel";
import NotesContext from "./NotesContext";
import { useState, ReactNode, useEffect } from "react";
import Loading from "@/components/Dummy/Loading";
import GenrateNewId from "@/lib/GenrateNewId";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/config/firebase";

const NotesContextProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("NotesProvider mounted");
    setLoading(true);
    FetchNotes();
    setLoading(false);
  }, []);

  const FetchNotes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "notes"));
      const docsArray = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const updatedAt = data.updatedAt ? data.updatedAt.toDate() : null;
        return {
          id: doc.id,
          ...data,
          updatedAt,
        };
      });

      console.log("docsArray", docsArray);

      setNotes(docsArray as Note[]);
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  };

  const AddNote = async (note: Note) => {
    note.createdAt = new Date();
    note.updatedAt = new Date();
    note.id = GenrateNewId();

    try {
      await setDoc(doc(db, "notes", note.id), note);
      FetchNotes();
      console.log("Document successfully added!");
    } catch (e) {
      console.error("Error adding document: ", e);
      throw new Error("Error while adding document");
    }
  };

  const UpdateNote = async (id: string, updatedNote: Note) => {
    try {
      updatedNote.updatedAt = new Date();
      await updateDoc(doc(db, "notes", id), {
        ...updatedNote,
      });
      FetchNotes();
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };

  const DeleteNote = async (noteId: string) => {
    try {
      await deleteDoc(doc(db, "notes", noteId));
      FetchNotes();
    } catch (e) {
      console.error("Error removing document: ", e);
    }
  };

  const value = {
    notes,
    AddNote,
    UpdateNote,
    DeleteNote,
    FetchNotes,
  };

  return (
    <NotesContext.Provider value={value}>
      {!loading ? children : <Loading />}
    </NotesContext.Provider>
  );
};

export default NotesContextProvider;
