import React from "react";
import Header from "./components/layout/Header";
import About from "./components/sections/About";
import Footer from "./components/sections/Footer";
import Hero from "./components/sections/Hero";
import Contact from "./components/sections/Contact";
import Reservation from "./components/sections/Reservation";
import Testimonials from "./components/sections/Testimonial";
import Gallery from "./components/sections/Gallery";

const Home: React.FC = () => {
  return (
    <main>
      <Header />
      <Hero />
      <About />
      <Testimonials />
      <Gallery />
      <Contact />
      <Reservation />
      <Footer />
    </main>
  );
};

export default Home;
