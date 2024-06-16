import FilterOptions from "@/components/Card/FilterOptions";
import sampleData from "../../Temp/sampleData";
import DisplayCard from "@/components/Card/DisplayCard";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { AddNoteBtn } from "@/components/Note/AddNoteBtn";
const Homepage = () => {
  const [searchInput, setSearchInput] = useState("");

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
        <DisplayCard NotesList={sampleData} />
      </div>
    </section>
  );
};
export default Homepage;
