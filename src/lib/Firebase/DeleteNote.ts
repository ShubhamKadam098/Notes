import { db } from "@/config/firebase";
import { deleteDoc, doc } from "firebase/firestore";

const DeleteNote = async (noteId: string) => {
  try {
    const res = await deleteDoc(doc(db, "notes", noteId));
    console.log("Document successfully deleted!");
    console.log(res);
  } catch (e) {
    console.error("Error removing document: ", e);
  }
};

export default DeleteNote;
