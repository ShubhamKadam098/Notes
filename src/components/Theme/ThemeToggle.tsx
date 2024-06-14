import useTheme from "@/contexts/theme";

const ThemeToggle = () => {
  const { themeMode, lightTheme, darkTheme } = useTheme();

  const toggleButton: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const darkModeStatus = (e.target as HTMLInputElement).checked;
    darkModeStatus ? darkTheme() : lightTheme();
  };
  return (
    <label className="flex cursor-pointer items-center">
      <input
        type="checkbox"
        value=""
        className="peer sr-only"
        onChange={toggleButton}
        checked={themeMode === "dark"}
      />
      <div className="peer relative h-6 w-11 rounded-full border border-slate-400 bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800 rtl:peer-checked:after:-translate-x-full"></div>
    </label>
  );
};

export default ThemeToggle;
