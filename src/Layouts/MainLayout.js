import React from "react";
import Navbar from "../Components/Navbar";
import Covid19BackgroundImage from "../Media/Images/covid19Image.jpg";

function MainLayout({ children }) {
  return (
    <div className="main-layout">
      <div className="main-layout-content">
        <Navbar />
        <div
          className="main-layout-display-data"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${Covid19BackgroundImage})`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
