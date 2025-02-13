import dynamic from "next/dynamic";
import Header from "./components/layout/Header";

// Leniwe ładowanie
const Hero = dynamic(() => import("./components/sections/Hero"), {
  loading: () => <div className="h-screen bg-gray-900" />,
});

const About = dynamic(() => import("./components/sections/About"), {
  loading: () => <div className="h-96 bg-gray-900" />,
});

const Gallery = dynamic(() => import("./components/sections/Gallery"), {
  loading: () => <div className="h-96 bg-gray-900" />,
});

const Contact = dynamic(() => import("./components/sections/Contact"), {
  loading: () => <div className="h-96 bg-gray-900" />,
});

const Footer = dynamic(() => import("./components/sections/Footer"), {
  loading: () => <div className="h-96 bg-gray-900" />,
});

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <About />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  );
}
