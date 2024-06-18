import DisplayCard from "@/components/Card/DisplayCard";
import { Input } from "@/components/ui/input";
import { useContext, useState, useMemo } from "react";
import { AddNoteBtn } from "@/components/Note/AddNoteBtn";
import NotesContext from "@/contexts/NotesContext";
import PaginationBar from "@/components/Card/PaginationBar";

const Homepage = () => {
  const { notes } = useContext(NotesContext);
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");

  const filteredNotes = useMemo(() => {
    return notes
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
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        }
      });
  }, [notes, searchInput]);

  const notesToDisplay = useMemo(() => {
    const start = (page - 1) * 6;
    const end = start + 6;
    return filteredNotes.slice(start, end);
  }, [filteredNotes, page]);

  return (
    <section className="flex h-full max-h-full flex-grow flex-col px-4 py-4">
      <div className="mx-auto mb-8 flex w-full max-w-lg items-center space-x-2 py-4">
        <Input
          type="text"
          placeholder="Search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="rounded-full border border-slate-300 pe-6 ps-6 shadow-lg focus-visible:ring-transparent dark:border-slate-700"
        />
        <AddNoteBtn />
      </div>
      <div className="flex-grow">
        <DisplayCard NotesList={notesToDisplay} />
      </div>
      {filteredNotes.length > 6 && (
        <PaginationBar
          page={page}
          setPage={setPage}
          length={filteredNotes.length}
        />
      )}
    </section>
  );
};

export default Homepage;
