import Section from "../components/Section";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaInstagram,
} from "react-icons/fa";
import { SiLeetcode, SiLetterboxd } from "react-icons/si";

export default function Social() {
  return (
    <Section id="social" title="Social">
      <div className="social-container">

        <a
          href="https://github.com/Esw4r"
          target="_blank"
          rel="noopener noreferrer"
          className="social-card"
        >
          <FaGithub className="social-icon" />
          <span>@Esw4r</span>
        </a>

        <a
          href="https://linkedin.com/in/yourname"
          target="_blank"
          rel="noopener noreferrer"
          className="social-card"
        >
          <FaLinkedin className="social-icon" />
          <span>Eswara Raj M</span>
        </a>

        <a
          href="https://instagram.com/esw4r__"
          target="_blank"
          rel="noopener noreferrer"
          className="social-card"
        >
          <FaInstagram className="social-icon" />
          <span>@esw4r__</span>
        </a>

        <a
          href="https://leetcode.com/esw4rr"
          target="_blank"
          rel="noopener noreferrer"
          className="social-card"
        >
          <SiLeetcode className="social-icon" />
          <span>esw4rr</span>
        </a>

        <a
          href="https://letterboxd.com/esw4rr/"
          target="_blank"
          rel="noopener noreferrer"
          className="social-card"
        >
          <SiLetterboxd className="social-icon" />
          <span>@esw4rr</span>
        </a>

        <a
          href="mailto:eswararaj01@gmail.com"
          className="social-card"
        >
          <FaEnvelope className="social-icon" />
          <span>eswararaj01@gmail.com</span>
        </a>

      </div>
    </Section>
  );
}
