import { Link } from "react-scroll";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">Eswar</h2>

      <div className="nav-links">
        {["bio", "social", "skills", "projects", "education"].map((item) => (
          <Link
            key={item}
            to={item}
            smooth={true}
            duration={500}
            offset={-80}
            className="nav-item"
            activeClass="active"
          >
            {item.toUpperCase()}
          </Link>
        ))}
      </div>
    </nav>
  );
}
