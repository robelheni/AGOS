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
      <section className="work-list-hero">
        <div className="container">
          <div className="work-list-hero__inner">
            <div className="work-list-hero__row">
              <div>
                <h1>Our Work</h1>
                <p>
                  Signs, print &amp; clothing — made to be noticed.
                </p>
              </div>
              <Link href="/quote" className="btn btn-primary">
                Start a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="work-filter-bar">
        <div className="container">
          <div
            role="list"
            aria-label="Filter by category"
            className="work-filter-list"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="work-list-section">
        <div className="container">
          <motion.div layout className="work-list-grid">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: .32, delay: index * 0.04 }}
                  className={index === 0 && activeCategory === 'All' ? 'work-list-featured' : ''}
                >
                  <ProjectCard project={project} large={index === 0 && activeCategory === 'All'} aspectRatio={index === 0 && activeCategory === 'All' ? '16/7' : '3/2'} />
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
