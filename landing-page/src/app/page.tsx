import React from "react";
import Header from "./components/layout/Header";
import About from "./components/sections/About";
import Footer from "./components/sections/Footer";
import Hero from "./components/sections/Hero";

const Home: React.FC = () => {
  return (
    <main>
      <Header />
      <Hero />
      <About />
      <Footer />
    </main>
  );
};

export default Home;
