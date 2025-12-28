import { useEffect } from "react";

import Navbar from "./components/Navbar";
import Bio from "./sections/Bio";
import Social from "./sections/Social";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Education from "./sections/Education";

function App() {
  useEffect(() => {
    const glow = document.querySelector(".mouse-glow");

    const moveGlow = (e) => {
      if (!glow) return;
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
    };

    window.addEventListener("mousemove", moveGlow);

    return () => window.removeEventListener("mousemove", moveGlow);
  }, []);

  return (
    <>
      <div className="mouse-glow" />
      <Navbar />
      <Bio />
      <Social />
      <Skills />
      <Projects />
      <Education />
    </>
  );
}

export default App;
