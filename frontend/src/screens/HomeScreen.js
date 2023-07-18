import React from "react";
import Header from "../components/Header";
import HomeSection from "../components/homeComponents/HomeSection";
import ContactInfo from "../components/homeComponents/ContactInfo";
import CalltoActionSection from "../components/homeComponents/CalltoActionSection";
import Footer from "../components/Footer";
import Navbar from "../components/navBar/navbar";
import MobileHomeSection from "../components/homeComponents/MobileHomeSection";
import HomeInfo from "../components/homeComponents/HomeInfo";

const HomeScreen = ({ match }) => {
  window.scrollTo(0, 0);
  const keyword = match.params.keyword;
  const pagenumber = match.params.pagenumber;
  return (
    <div>
      <Navbar />
      <div className="pc-header">
        <HomeSection keyword={keyword} pagenumber={pagenumber} />
      </div>
      <div className="mobile-header">
        <MobileHomeSection keyword={keyword} pagenumber={pagenumber} />
        <HomeInfo />
      </div>

      <div className="pc-header">
        <CalltoActionSection />
        <ContactInfo />
        <Footer />
      </div>
    </div>
  );
};

export default HomeScreen;
