import FilterOptions from "@/components/Card/FilterOptions";
import DisplayCard from "@/components/Card/DisplayCard";
import { Input } from "@/components/ui/input";
import { useContext, useState } from "react";
import { AddNoteBtn } from "@/components/Note/AddNoteBtn";
import NotesContext from "@/contexts/NotesContext";

const Homepage = () => {
  const { notes } = useContext(NotesContext);
  const [searchInput, setSearchInput] = useState("");

  const filteredNotes = notes
    .filter((note) =>
      note.title.toLowerCase().includes(searchInput.toLowerCase()),
    )
    .sort((a, b) => {
      if (a.pinned && !b.pinned) {
        return -1;
      } else if (!a.pinned && b.pinned) {
        return 1;
      } else {
        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      }
    });

  return (
    <section className="flex h-full max-h-full flex-grow flex-col px-4 py-4">
      <div className="mx-auto flex w-full max-w-lg items-center space-x-2 py-4">
        <Input
          type="text"
          placeholder="Search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="shadow-sm focus-visible:ring-transparent"
        />
        <AddNoteBtn />
      </div>
      <FilterOptions />
      <div className="flex-grow">
        <DisplayCard NotesList={filteredNotes} />
      </div>
    </section>
  );
};

export default Homepage;
