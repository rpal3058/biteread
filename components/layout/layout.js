import Footer from "./footer";
import Navbar from "./navbar";

const Layout = (props) => {
  return (
    <div>
      <Navbar />
      <main className="overflow-auto"> {props.children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
