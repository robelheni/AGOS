export default function Loading() {
  return (
    <div className="min-h-screen bg-[var(--paper)] pt-[var(--header-height)]">
      <section className="section">
        <div className="container">
          <div className="max-w-3xl">
            <p className="fine-label text-[var(--accent)]">Preparing page</p>
            <div className="mt-8 space-y-5" aria-hidden="true">
              <div className="h-16 w-full max-w-2xl animate-pulse bg-[var(--line)]" />
              <div className="h-16 w-4/5 animate-pulse bg-[var(--line)]" />
              <div className="mt-8 h-4 w-2/3 animate-pulse bg-[var(--line-strong)]" />
              <div className="h-4 w-1/2 animate-pulse bg-[var(--line-strong)]" />
            </div>
            <span className="sr-only">Loading Agos Design page.</span>
          </div>
        </div>
      </section>
    </div>
  );
}
