import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SquarePlus } from "lucide-react";

export function SearchInput() {
  return (
    <div className="mx-auto flex w-full max-w-lg items-center space-x-2">
      <Input
        type="text"
        placeholder="Search"
        className="shadow-sm outline-none focus:ring-0"
      />
      <Button className="bg-[#f9dd8f] px-6 shadow hover:bg-yellow-400 dark:bg-blue-400 dark:hover:bg-blue-600">
        <SquarePlus />
      </Button>
    </div>
  );
}
