import Section from "../components/Section";

export default function Projects() {
  return (
    <Section id="projects" title="Projects">
      <div className="project">
        <h3>Movie Recommendation System</h3>
        <p>Collaborative filtering using SVD</p>
      </div>

      <div className="project">
        <h3>RTOS on STM32</h3>
        <p>Task scheduling and kernel implementation</p>
      </div>
    </Section>
  );
}
