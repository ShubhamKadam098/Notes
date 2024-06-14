import Note from "@/Models/CardModel";

const DisplayCard = ({ NotesList }: { NotesList: Note[] }) => {
  return (
    <>
      <section className="grid grid-cols-1 flex-wrap gap-x-2 gap-y-4 sm:grid-cols-2 md:grid-cols-3">
        {NotesList.map((note: Note) => {
          return (
            <div
              key={note.id}
              className="card max-h-[200px] rounded-lg border border-slate-300 px-3 py-4 shadow-lg dark:border-slate-600 dark:bg-dark-secondary"
            >
              <div className="card-header">
                <h3>{note.title}</h3>
              </div>
              <div className="card-body line-clamp-3 max-h-full text-wrap">
                <p>{note.content}</p>
              </div>
              <div className="card-footer">
                <p>{note.labels.join(", ")}</p>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default DisplayCard;
