import React from "react";
import Header from "./../components/Header";
import ShopSection from "./../components/homeComponents/ShopSection";
import ContactInfo from "./../components/homeComponents/ContactInfo";
import CalltoActionSection from "./../components/homeComponents/CalltoActionSection";
import Footer from "./../components/Footer";
import MobileShopSection from "../components/homeComponents/MobileShopSection";

const HomeScreen = ({ match }) => {
  window.scrollTo(0, 0);
  const keyword = match.params.keyword;
  const pagenumber = match.params.pagenumber;
  return (
    <div>
      <Header />
      <div className="pc-header">
        <ShopSection keyword={keyword} pagenumber={pagenumber} />
      </div>
      <div className="mobile-header">
        <MobileShopSection keyword={keyword} pagenumber={pagenumber} />
      </div>

      <div className="pc-header">
        <CalltoActionSection />
        <ContactInfo />
      </div>
      <Footer />
    </div>
  );
};

export default HomeScreen;
