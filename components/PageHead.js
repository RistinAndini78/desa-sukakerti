export default function PageHead({ judul, deskripsi }) {
  return (
    <section className="pagehead">
      <div className="container">
        <h1>{judul}</h1>
        {deskripsi && <p>{deskripsi}</p>}
      </div>
    </section>
  );
}
