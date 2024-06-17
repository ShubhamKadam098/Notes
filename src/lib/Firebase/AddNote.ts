import Note from "@/Models/NoteModel";
import { db } from "@/config/firebase";
import GenrateNewId from "@/lib/GenrateNewId";
import { setDoc, doc } from "firebase/firestore";
const AddNote = async (note: Note) => {
  note.createdAt = new Date();
  note.updatedAt = new Date();
  note.id = GenrateNewId();

  try {
    await setDoc(doc(db, "cities", note.id), note).catch((error) => {
      throw new Error(error);
    });
  } catch (e) {
    console.error("Error adding document: ", e);
    throw new Error("Error while adding document");
  }
};
export default AddNote;
