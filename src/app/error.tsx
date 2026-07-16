"use client";

import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-[var(--paper)] pt-[var(--header-height)]">
      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <p className="fine-label text-[var(--accent)]">Page error</p>
          <div>
            <h1 className="display-md max-w-4xl">Something did not load properly.</h1>
            <p className="body-lg mt-6 max-w-2xl text-[var(--muted)]">
              Try loading the page again. If it keeps happening, contact Agos directly and we can
              help with your quote or project details.
            </p>
            <p className="mt-5 text-sm text-[var(--muted)]">
              Error reference: {error.digest || error.message}
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button type="button" onClick={reset}>
                Try again
              </Button>
              <a className="text-link" href="mailto:kebtom9@gmail.com">
                Email Agos
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
