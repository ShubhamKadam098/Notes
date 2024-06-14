import FilterOptions from "@/components/Card/FilterOptions";
import sampleData from "../../Temp/sampleData";
import DisplayCard from "@/components/Card/DisplayCard";
import { SearchInput } from "@/components/SearchInput";
const Homepage = () => {
  return (
    <section className="max-h-full min-h-full flex-grow py-4">
      <div className="container">
        <SearchInput />
        <FilterOptions />

        <DisplayCard NotesList={sampleData} />
      </div>
    </section>
  );
};
export default Homepage;
