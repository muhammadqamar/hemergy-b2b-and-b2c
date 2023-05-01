import Navbar from "./navbar";
import Footer from "./footer";
const Index = ({ children }) => {
  return (
    <div>
      <Navbar /> <main>{children}</main> <Footer />
    </div>
  );
};

export default Index;
