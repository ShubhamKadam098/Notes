import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="dark:bg-dark-secondary bg-light-secondary relative border-t border-slate-500 py-2 dark:text-white">
      <div className="container mx-auto flex items-center justify-center px-2">
        <Link
          to="https://github.com/ShubhamKadam098"
          target="_blank"
          className="flex items-center gap-2 text-sm font-semibold"
          rel="noreferrer"
        >
          <img
            width="40"
            height="40"
            src={"/icons/github-Icon.svg"}
            alt="github"
            className="invert filter dark:invert-0"
          />
          @ShubhamKadam098
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
