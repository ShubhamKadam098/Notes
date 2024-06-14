import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "./contexts/theme";
import { useEffect, useState } from "react";
import Sidebar from "./components/SideBar/Sidebar";

const Layout = () => {
  let mode;
  if (
    localStorage.getItem("color-theme") === "dark" ||
    (!("color-theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    mode = "dark";
    document.documentElement.classList.add("dark");
  } else {
    mode = "light";
    document.documentElement.classList.remove("dark");
  }
  const [themeMode, setThemeMode] = useState(mode);
  const darkTheme = () => setThemeMode("dark");
  const lightTheme = () => setThemeMode("light");

  useEffect(() => {
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(themeMode);
  }, [themeMode]);
  return (
    <>
      <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
        <main className="">
          <section className="mx-auto flex min-h-screen max-w-screen-2xl flex-col border border-white">
            <Header />
            <div className="flex flex-grow bg-light-primary dark:bg-dark-primary">
              <Sidebar />
              <div className="flex-1">
                <Outlet />
              </div>
            </div>
            <Footer />
          </section>
        </main>
      </ThemeProvider>
    </>
  );
};

export default Layout;
