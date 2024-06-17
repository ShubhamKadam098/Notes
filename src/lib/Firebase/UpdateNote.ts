import Note from "@/Models/NoteModel";
import { db } from "@/config/firebase";
import { doc, updateDoc } from "firebase/firestore";

const UpdateNote = async (id: string, updatedNote: Note) => {
  try {
    updatedNote.updatedAt = new Date();
    const res = await updateDoc(doc(db, "notes", id), {
      ...updatedNote,
    });
    console.log("Document successfully updated!");
    console.log(res);
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};

export default UpdateNote;
