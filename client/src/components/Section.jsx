export default function Section({ id, title, children }) {
  return (
    <section id={id} className="section">
      <h1>{title}</h1>
      {children}
    </section>
  );
}
