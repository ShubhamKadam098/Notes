import Note from "@/Models/NoteModel";
import { db } from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";

const FetchNotes = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "notes"));
    const docsArray = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("docsArray", docsArray);

    return docsArray as Note[];
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
};

export default FetchNotes;
