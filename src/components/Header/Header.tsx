import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ThemeToggle from "../Theme/ThemeToggle";
import MobileSidebar from "../SideBar/MobileSidebar";

const Header = () => {
  return (
    <header className="border-b border-slate-300 dark:border-slate-600">
      <nav className="border-gray-200 bg-light-secondary px-4 py-2.5 dark:bg-dark-secondary lg:px-6">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between">
          <MobileSidebar />
          <a href="https://flowbite.com" className="flex items-center">
            <img
              src="/public/icons/logo.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Logo"
            />
            <span className="self-center whitespace-nowrap text-xl font-[700] dark:text-white">
              My Notes
            </span>
          </a>
          <div className="flex items-center gap-4 lg:order-2">
            <ThemeToggle />
            <Avatar className="border-2 border-slate-900 dark:border-slate-100">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
