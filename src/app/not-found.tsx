import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--paper)] pt-[var(--header-height)]">
      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <p className="fine-label text-[var(--accent)]">404</p>
          <div>
            <h1 className="display-md max-w-4xl">This page is not on the production board.</h1>
            <p className="body-lg mt-6 max-w-2xl text-[var(--muted)]">
              The link may have moved. Start from the work, services or quote pages to continue.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <ButtonLink href="/services">View Services</ButtonLink>
              <ButtonLink href="/quote" variant="secondary">
                Start a Quote
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
