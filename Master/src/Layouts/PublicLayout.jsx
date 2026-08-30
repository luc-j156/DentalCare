import React from "react";
import TopBar from "./TopBar";
import Navbar from "./Navbar";
import Footer from "./Footer";

const PublicLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <TopBar />
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
