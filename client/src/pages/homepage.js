import Navbar from "../components/navbar";
import Section1 from "../components/section1";
import Section2 from "../components/section2";
import Section3 from "../components/section3";
import Section4 from "../components/section4";
import Footer from "../components/footer";

function Home() {
  const links = [
    { name: "Book", path: "#Section2", type: "a" },
    { name: "About Us", path: "#Section4", type: "a" },
    { name: "Contact Us", path: "#Footer", type: "a" },
  ];
  return (
    <>
      <Navbar links={links} />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Footer />
    </>
  );
}

export default Home;
