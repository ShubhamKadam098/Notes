import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <main className="min-h-screen">
        <section className="container mx-auto max-w-screen-2xl">
          <Header />
          <Outlet />
          <Footer />
        </section>
      </main>
    </>
  );
};

export default Layout;
