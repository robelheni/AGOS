'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import ProjectCard from '@/components/shared/ProjectCard'
import CTASection from '@/components/ui/CTASection'
import { projects } from '@/data/projects'

const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))]

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const filtered = useMemo(
    () => activeCategory === 'All' ? projects : projects.filter((p) => p.category === activeCategory),
    [activeCategory]
  )

  return (
    <>
      {/* Page header — compact, no giant padding */}
      <section className="surface-paper" style={{ paddingTop: 'calc(var(--header-height) + 3rem)', paddingBottom: '2.5rem' }}>
        <div className="container">
          <div style={{ borderTop: '1px solid var(--line)', paddingTop: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
              <div>
                <h1 className="display-lg">Our Work</h1>
                <p style={{ marginTop: '1rem', fontSize: 'clamp(.95rem, 1.4vw, 1.1rem)', fontWeight: 500, color: 'var(--ink-muted)', maxWidth: '40ch' }}>
                  Signs, print &amp; clothing — made to be noticed.
                </p>
              </div>
              <Link href="/quote" className="btn btn-primary" style={{ flexShrink: 0 }}>
                Start a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Filter bar */}
      <div className="surface-paper" style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="container">
          <div
            role="list"
            aria-label="Filter by category"
            style={{ display: 'flex', gap: 0, overflowX: 'auto' }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                role="listitem"
                onClick={() => setActiveCategory(cat)}
                style={{
                  flexShrink: 0,
                  padding: '1.1rem 1.5rem',
                  fontSize: '.7rem',
                  fontWeight: 700,
                  letterSpacing: '.12em',
                  textTransform: 'uppercase',
                  border: 'none',
                  borderRight: '1px solid var(--line)',
                  background: activeCategory === cat ? 'var(--ink)' : 'transparent',
                  color: activeCategory === cat ? 'var(--paper)' : 'var(--ink-muted)',
                  cursor: 'pointer',
                  transition: 'background 180ms, color 180ms',
                  whiteSpace: 'nowrap',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Project grid */}
      <section className="section surface-paper">
        <div className="container">
          <motion.div layout className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: .32, delay: index * 0.04 }}
                  className={index === 0 && activeCategory === 'All' ? 'md:col-span-2' : ''}
                >
                  <ProjectCard project={project} large={index === 0 && activeCategory === 'All'} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div style={{ padding: '4rem 0', textAlign: 'center' }}>
              <p className="heading-md" style={{ color: 'var(--ink-muted)' }}>Nothing in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </>
  )
}
