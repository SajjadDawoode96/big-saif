import { useEffect, useRef, useState } from 'react'

import mainLogo from './assets/brand/LOGO BIG SAIF.png'
import baumanagementLogo from './assets/brand/BAUMANAGEMENT.png'
import facilityManagementLogo from './assets/brand/FACILITY MANAGEMENT.png'
import transportLogo from './assets/brand/TRANSPORT.png'
import baumanagementBackground from './assets/services/baumanagement-bg.jpg'
import facilityManagementBackground from './assets/services/facility-management-bg.jpg'
import transportBackground from './assets/services/transport-bg.jpg'
import baumanagementProject from './assets/projects2/BAUMANAGEMENT.png'
import facilityManagementProject from './assets/projects2/FACILITY MANAGEMENT.png'
import transportProject from './assets/projects2/TRANSPORT.png'

import constructionImage from './assets/projects/fac.png'
import buildingImage from './assets/projects/building.jpg'
import facilityImage from './assets/projects/facility.jpg'
import transportImage from './assets/projects/transport.png'

import './App.css'

const applicationBase = import.meta.env.BASE_URL

const navigation = [
  ['Leistungen', '#leistungen'],
  ['Referenzen', '#referenzen'],
  ['Über uns', '#ueber-uns'],
  ['Kontakt', '#kontakt'],
]

const services = [
  {
    id: 'leistung-bau',
    title: ['BAUMANAGEMENT'],
    description:
      'Durchdachte Leistungen für Bau-, Umbau- und Renovierungsprojekte – koordiniert und präzise umgesetzt.',
    brandLogo: baumanagementLogo,
    brandLogoAlt: 'BIG SAIF Baumanagement',
    backgroundImage: baumanagementBackground,
  },
  {
    id: 'leistung-facility',
    title: ['FACILITY MANAGEMENT'],
    description:
      'Professionelle Reinigung und sorgfältige Gebäudepflege für dauerhaft gepflegte Innen- und Außenbereiche.',
    brandLogo: facilityManagementLogo,
    brandLogoAlt: 'BIG SAIF Facility Management',
    backgroundImage: facilityManagementBackground,
  },
  {
    id: 'leistung-transport',
    title: ['TRANSPORT'],
    description:
      'Verlässliche Transport- und Lieferleistungen für planbare Abläufe und eine sorgfältige Abwicklung.',
    brandLogo: transportLogo,
    brandLogoAlt: 'BIG SAIF Transport',
    backgroundImage: transportBackground,
  },
]

const projects = [
  {
    id: 'projekt-baumanagement',
    category: 'BAUMANAGEMENT',
    descriptor: 'Bau & Renovierung',
    image: baumanagementProject,
    imageAlt: 'BIG SAIF Team bei Bau- und Renovierungsarbeiten',
    featured: true,
  },
  {
    id: 'projekt-facility-management',
    category: 'FACILITY MANAGEMENT',
    descriptor: 'Reinigung & Gebäudepflege',
    image: facilityManagementProject,
    imageAlt: 'BIG SAIF Team bei der professionellen Gebäudereinigung',
    featured: false,
  },
  {
    id: 'projekt-transport',
    category: 'TRANSPORT',
    descriptor: 'Transport & Lieferung',
    image: transportProject,
    imageAlt: 'BIG SAIF Transporter bei einer Lieferung',
    featured: false,
  },
]

const Arrow = () => <span aria-hidden="true">↗</span>

function ContactIcon({ type }: { type: 'phone' | 'whatsapp' | 'email' | 'address' }) {
  if (type === 'phone') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.3 3.5 5.4 4.4c-.9.4-1.3 1.5-.9 2.4 2.1 5.2 6.1 9.2 11.3 11.3.9.4 2-.1 2.4-.9l.9-1.9-3.5-2.1-1.2 1.2c-2.2-1-3.9-2.7-4.9-4.9l1.2-1.2-2.1-3.5Z" /></svg>
  if (type === 'whatsapp') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19.4 4.5A10 10 0 0 0 4.2 16.7L3 21l4.4-1.1A10 10 0 1 0 19.4 4.5Zm-7.3 13.8a8.1 8.1 0 0 1-4.1-1.1l-.3-.2-2.6.7.7-2.5-.2-.3a8.1 8.1 0 1 1 6.5 3.4Zm4.4-6.1c-.2-.1-1.3-.6-1.5-.7-.2-.1-.4-.1-.5.1-.2.2-.6.7-.7.8-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-1.9-1.2 7.1 7.1 0 0 1-1.3-1.7c-.1-.2 0-.4.1-.5l.4-.5c.1-.1.1-.3.2-.4 0-.2-.1-.3-.1-.4l-.7-1.6c-.2-.4-.4-.3-.5-.3h-.5c-.2 0-.4.1-.6.3-.2.2-.8.7-.8 1.8s.8 2 1 2.2c.1.1 1.5 2.3 3.7 3.2.5.2 1 .4 1.3.5.6.2 1.1.2 1.5.1.5-.1 1.3-.5 1.5-1 .2-.5.2-1 .1-1.1-.1-.1-.2-.2-.4-.3Z" /></svg>
  if (type === 'email') return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="13" rx="1" /><path d="m4.5 7 7.5 5.5L19.5 7" /></svg>
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s6-5.3 6-11A6 6 0 0 0 6 10c0 5.7 6 11 6 11Z" /><circle cx="12" cy="10" r="2" /></svg>
}

function ContactModal({ onClose }: { onClose: () => void }) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeButtonRef.current?.focus()
  }, [])

  return (
    <div
      className="contact-modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          event.preventDefault()
          onClose()
        }
      }}
    >
      <section className="contact-modal" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title">
        <div className="contact-modal-header">
          <div className="contact-modal-intro">
            <p className="contact-modal-eyebrow"><span aria-hidden="true" />KONTAKT</p>
            <h2 id="contact-modal-title"><span>PROJEKT</span><span>ANFRAGEN</span></h2>
            <p>Kontaktieren Sie uns direkt – wir freuen uns auf Ihr Projekt.</p>
          </div>
          <button ref={closeButtonRef} className="contact-modal-close" type="button" aria-label="Kontaktfenster schließen" onClick={onClose}>
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <div className="contact-modal-details">
          <div className="contact-modal-row contact-modal-phone-row">
            <span className="contact-modal-icon contact-modal-icon-phone"><ContactIcon type="phone" /></span>
            <div className="contact-modal-info">
              <h3>TELEFON</h3>
              <a href="tel:+491791527341">01791527341</a>
              <a href="tel:+4917647119724">017647119724</a>
            </div>
            <span className="contact-modal-action">JETZT ANRUFEN</span><span className="contact-modal-arrow" aria-hidden="true">→</span>
          </div>
          <a className="contact-modal-row" href="https://wa.me/491791527341" target="_blank" rel="noreferrer">
            <span className="contact-modal-icon contact-modal-icon-whatsapp"><ContactIcon type="whatsapp" /></span>
            <span className="contact-modal-info"><span className="contact-modal-label">WHATSAPP</span><span>01791527341</span></span>
            <span className="contact-modal-action">CHAT STARTEN</span><span className="contact-modal-arrow" aria-hidden="true">→</span>
          </a>
          <a className="contact-modal-row" href="mailto:service@bigsaif.de">
            <span className="contact-modal-icon"><ContactIcon type="email" /></span>
            <span className="contact-modal-info"><span className="contact-modal-label">E-MAIL</span><span>service@bigsaif.de</span></span>
            <span className="contact-modal-action">E-MAIL SENDEN</span><span className="contact-modal-arrow" aria-hidden="true">→</span>
          </a>
          <a className="contact-modal-row" href="https://www.google.com/maps/search/?api=1&query=Amselweg%2013%2C%2071679%20Asperg%2C%20Deutschland" target="_blank" rel="noreferrer">
            <span className="contact-modal-icon"><ContactIcon type="address" /></span>
            <span className="contact-modal-info"><span className="contact-modal-label">ADRESSE</span><span>Amselweg 13<br />71679 Asperg, Deutschland</span></span>
            <span className="contact-modal-action">IN GOOGLE MAPS ÖFFNEN</span><span className="contact-modal-arrow" aria-hidden="true">→</span>
          </a>
        </div>

        <footer className="contact-modal-footer">
          <div><strong>BIG SAIF</strong><span>BAU. FACILITY. TRANSPORT.</span></div>
          <p>ALLES AUS <span>EINER HAND.</span></p>
        </footer>
      </section>
    </div>
  )
}

type BaumanagementProjectComparison = {
  id: string
  beforeImage: string
  afterImage: string
  title?: string
  description?: string
  altBefore: string
  altAfter: string
}

const baumanagementProjectGroups: { id: string; projects: BaumanagementProjectComparison[] }[] = [
  {
    id: 'project-group-1',
    projects: [
      { id: 'group-1-project-1', beforeImage: baumanagementBackground, afterImage: baumanagementBackground, altBefore: 'Temporäres Entwicklungsbild für einen Vorher-Vergleich', altAfter: 'Temporäres Entwicklungsbild für einen Nachher-Vergleich' },
      { id: 'group-1-project-2', beforeImage: baumanagementBackground, afterImage: baumanagementBackground, altBefore: 'Temporäres Entwicklungsbild für einen Vorher-Vergleich', altAfter: 'Temporäres Entwicklungsbild für einen Nachher-Vergleich' },
      { id: 'group-1-project-3', beforeImage: baumanagementBackground, afterImage: baumanagementBackground, altBefore: 'Temporäres Entwicklungsbild für einen Vorher-Vergleich', altAfter: 'Temporäres Entwicklungsbild für einen Nachher-Vergleich' },
      { id: 'group-1-project-4', beforeImage: baumanagementBackground, afterImage: baumanagementBackground, altBefore: 'Temporäres Entwicklungsbild für einen Vorher-Vergleich', altAfter: 'Temporäres Entwicklungsbild für einen Nachher-Vergleich' },
      { id: 'group-1-project-5', beforeImage: baumanagementBackground, afterImage: baumanagementBackground, altBefore: 'Temporäres Entwicklungsbild für einen Vorher-Vergleich', altAfter: 'Temporäres Entwicklungsbild für einen Nachher-Vergleich' },
    ],
  },
  {
    id: 'project-group-2',
    projects: [
      { id: 'group-2-project-1', beforeImage: baumanagementBackground, afterImage: baumanagementBackground, altBefore: 'Temporäres Entwicklungsbild für einen Vorher-Vergleich', altAfter: 'Temporäres Entwicklungsbild für einen Nachher-Vergleich' },
      { id: 'group-2-project-2', beforeImage: baumanagementBackground, afterImage: baumanagementBackground, altBefore: 'Temporäres Entwicklungsbild für einen Vorher-Vergleich', altAfter: 'Temporäres Entwicklungsbild für einen Nachher-Vergleich' },
      { id: 'group-2-project-3', beforeImage: baumanagementBackground, afterImage: baumanagementBackground, altBefore: 'Temporäres Entwicklungsbild für einen Vorher-Vergleich', altAfter: 'Temporäres Entwicklungsbild für einen Nachher-Vergleich' },
      { id: 'group-2-project-4', beforeImage: baumanagementBackground, afterImage: baumanagementBackground, altBefore: 'Temporäres Entwicklungsbild für einen Vorher-Vergleich', altAfter: 'Temporäres Entwicklungsbild für einen Nachher-Vergleich' },
      { id: 'group-2-project-5', beforeImage: baumanagementBackground, afterImage: baumanagementBackground, altBefore: 'Temporäres Entwicklungsbild für einen Vorher-Vergleich', altAfter: 'Temporäres Entwicklungsbild für einen Nachher-Vergleich' },
    ],
  },
]

const baumanagementServiceAreas = [
  {
    number: '01',
    title: 'BAUARBEITEN',
    description: 'Allgemeine Bauarbeiten und bauliche Umsetzung für unterschiedliche Projekte.',
  },
  {
    number: '02',
    title: 'RENOVIERUNG & SANIERUNG',
    description: 'Renovierung, Erneuerung und Aufwertung bestehender Gebäude und Räume.',
  },
  {
    number: '03',
    title: 'UMBAU & MODERNISIERUNG',
    description: 'Anpassung, Veränderung und Modernisierung bestehender Bereiche.',
  },
  {
    number: '04',
    title: 'REPARATURARBEITEN',
    description: 'Reparatur- und Instandsetzungsarbeiten rund um Gebäude und Innenbereiche.',
  },
  {
    number: '05',
    title: 'INNENAUSBAU',
    description: 'Ausbau und Gestaltung von Innenräumen im Rahmen individueller Projekte.',
  },
  {
    number: '06',
    title: 'DEKORATION & GESTALTUNG',
    description: 'Dekorative Arbeiten, Gestaltung und abschließende Details für Innenbereiche.',
  },
]

function BeforeAfterComparison({
  project,
  position,
  onPositionChange,
  comparisonLabel,
}: {
  project: BaumanagementProjectComparison
  position: number
  onPositionChange: (position: number) => void
  comparisonLabel: string
}) {
  const comparisonRef = useRef<HTMLDivElement>(null)
  const afterRef = useRef<HTMLDivElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)
  const handleRef = useRef<HTMLButtonElement>(null)
  const positionRef = useRef(position)

  const applyPosition = (nextPosition: number) => {
    const clampedPosition = Math.min(100, Math.max(0, nextPosition))
    positionRef.current = clampedPosition

    if (afterRef.current) afterRef.current.style.clipPath = `inset(0 ${100 - clampedPosition}% 0 0)`
    if (dividerRef.current) dividerRef.current.style.left = `${clampedPosition}%`
    if (handleRef.current) handleRef.current.style.left = `${clampedPosition}%`
  }

  const updatePosition = (clientX: number) => {
    const bounds = comparisonRef.current?.getBoundingClientRect()
    if (!bounds) return

    applyPosition(((clientX - bounds.left) / bounds.width) * 100)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const step = 5
    const nextPosition = event.key === 'ArrowLeft'
      ? position - step
      : event.key === 'ArrowRight'
        ? position + step
        : event.key === 'Home'
          ? 0
          : event.key === 'End'
            ? 100
            : null

    if (nextPosition === null) return
    event.preventDefault()
    onPositionChange(Math.min(100, Math.max(0, nextPosition)))
  }

  return (
    <div
      ref={comparisonRef}
      className="baumanagement-comparison"
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture(event.pointerId)
        updatePosition(event.clientX)
      }}
      onPointerMove={(event) => {
        if (event.currentTarget.hasPointerCapture(event.pointerId)) updatePosition(event.clientX)
      }}
      onPointerUp={(event) => {
        event.currentTarget.releasePointerCapture(event.pointerId)
        onPositionChange(positionRef.current)
      }}
      onPointerCancel={() => onPositionChange(positionRef.current)}
    >
      <img className="baumanagement-comparison-image" src={project.beforeImage} alt={project.altBefore} loading="lazy" />
      <div ref={afterRef} className="baumanagement-comparison-after" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <img className="baumanagement-comparison-image" src={project.afterImage} alt={project.altAfter} loading="lazy" />
      </div>
      <span className="baumanagement-comparison-label baumanagement-comparison-label-before">VORHER</span>
      <span className="baumanagement-comparison-label baumanagement-comparison-label-after">NACHHER</span>
      <div ref={dividerRef} className="baumanagement-comparison-divider" style={{ left: `${position}%` }} aria-hidden="true" />
      <button
        ref={handleRef}
        className="baumanagement-comparison-handle"
        type="button"
        style={{ left: `${position}%` }}
        role="slider"
        aria-label={comparisonLabel}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        onKeyDown={handleKeyDown}
      >
        <span aria-hidden="true">←</span><span aria-hidden="true">→</span>
      </button>
    </div>
  )
}

function BaumanagementProjectGroup({ group, groupNumber }: { group: (typeof baumanagementProjectGroups)[number]; groupNumber: number }) {
  const initialProjectIndex = Math.min(1, group.projects.length - 1)
  const [activeIndex, setActiveIndex] = useState(initialProjectIndex)
  const [comparisonPositions, setComparisonPositions] = useState(() => group.projects.map(() => 50))
  const railRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    railRef.current?.children[initialProjectIndex]?.scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'center' })
  }, [initialProjectIndex])

  const updateComparisonPosition = (projectIndex: number, position: number) => {
    setComparisonPositions((current) => current.map((item, index) => (index === projectIndex ? position : item)))
  }

  const goToProject = (nextIndex: number) => {
    const index = Math.min(group.projects.length - 1, Math.max(0, nextIndex))
    setActiveIndex(index)
    railRef.current?.children[index]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }

  return (
    <div className="baumanagement-project-group">
      <div className="baumanagement-showcase-rail-shell">
        <div ref={railRef} className="baumanagement-showcase-rail">
          {group.projects.map((project, index) => (
            <article className={`baumanagement-project${index === activeIndex ? ' is-active' : ''}`} key={project.id}>
              <BeforeAfterComparison
                project={project}
                position={comparisonPositions[index]}
                onPositionChange={(position) => updateComparisonPosition(index, position)}
                comparisonLabel={`Vorher-Nachher-Vergleich, Gruppe ${groupNumber}, Projekt ${index + 1} verschieben`}
              />
              {(project.title || project.description) && (
                <div className="baumanagement-project-meta">
                  {project.title && <h3>{project.title}</h3>}
                  {project.description && <p>{project.description}</p>}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>

      <div className="baumanagement-showcase-navigation" aria-label={`Referenzen Gruppe ${groupNumber} navigieren`}>
        <button type="button" aria-label={`Vorherige Referenz in Gruppe ${groupNumber}`} onClick={() => goToProject(activeIndex - 1)} disabled={activeIndex === 0}>←</button>
        <div className="baumanagement-showcase-indicators" aria-label={`Referenz in Gruppe ${groupNumber} auswählen`}>
          {group.projects.map((project, index) => (
            <button type="button" key={project.id} className={index === activeIndex ? 'is-active' : ''} aria-label={`Referenz ${index + 1} in Gruppe ${groupNumber} auswählen`} aria-current={index === activeIndex ? 'true' : undefined} onClick={() => goToProject(index)} />
          ))}
        </div>
        <button type="button" aria-label={`Nächste Referenz in Gruppe ${groupNumber}`} onClick={() => goToProject(activeIndex + 1)} disabled={activeIndex === group.projects.length - 1}>→</button>
      </div>
    </div>
  )
}

function BaumanagementProjectShowcase() {
  return (
    <section className="baumanagement-showcase" aria-labelledby="references-title">
      <div className="baumanagement-showcase-inner">
        <header className="baumanagement-showcase-header">
          <div>
            <p>UNSERE REFERENZEN</p>
            <h2 id="references-title"><span>VORHER &amp;</span><span>NACHHER</span></h2>
          </div>
          <p className="baumanagement-showcase-intro">Einblicke in unsere bisherigen Arbeiten.</p>
        </header>

        <div className="baumanagement-project-groups">
          {baumanagementProjectGroups.map((group, index) => (
            <BaumanagementProjectGroup group={group} groupNumber={index + 1} key={group.id} />
          ))}
        </div>
      </div>
    </section>
  )
}

function BaumanagementServiceAreas() {
  const [activeServiceIndex, setActiveServiceIndex] = useState(0)
  const activeService = baumanagementServiceAreas[activeServiceIndex]

  return (
    <section className="baumanagement-transition" aria-labelledby="service-areas-title">
      <div>
        <header className="baumanagement-transition-header">
          <div className="baumanagement-transition-title-block">
            <p>BAUMANAGEMENT</p>
            <h2 id="service-areas-title">LEISTUNGSBEREICHE</h2>
          </div>
          <p className="baumanagement-transition-intro">Von Bau- und Renovierungsarbeiten über Reparaturen bis hin zu Innenausbau und Gestaltung – Leistungen für unterschiedliche Anforderungen rund um Gebäude und Räume.</p>
        </header>

        <div className="baumanagement-service-stage">
          <div className="baumanagement-service-feature" aria-live="polite">
            <div className="baumanagement-service-feature-content" key={activeService.number}>
              <span className="baumanagement-service-feature-number">{activeService.number}</span>
              <h3>{activeService.title}</h3>
              <p>{activeService.description}</p>
            </div>
          </div>

          <ol className="baumanagement-service-index" aria-label="Leistungsbereiche auswählen">
            {baumanagementServiceAreas.map((service, index) => {
              const isActive = index === activeServiceIndex

              return (
                <li key={service.number}>
                  <button
                    className={isActive ? 'is-active' : ''}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActiveServiceIndex(index)}
                    onFocus={() => setActiveServiceIndex(index)}
                    onMouseEnter={() => setActiveServiceIndex(index)}
                  >
                    <span>{service.number}</span>
                    <span>{service.title}</span>
                  </button>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}

function SiteHeader({ servicePage = false }: { servicePage?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const links = navigation.map(([label, href]) => [label, servicePage ? `${applicationBase}${href}` : href])
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <a className="brand" href={servicePage ? applicationBase : '#top'} aria-label="BIG SAIF Startseite">
        <img src={mainLogo} alt="BIG SAIF" />
      </a>

      <button
        className="menu-toggle"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span>{menuOpen ? 'Schließen' : 'Menü'}</span>
        <span className="menu-icon" aria-hidden="true"><i /><i /></span>
      </button>

      <nav
        id="primary-navigation"
        className={`primary-navigation${menuOpen ? ' is-open' : ''}`}
        aria-label="Hauptnavigation"
      >
        <div className="nav-links">
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={closeMenu}>{label}</a>
          ))}
        </div>
        <a className="header-cta" href={servicePage ? `${applicationBase}#kontakt` : '#kontakt'} onClick={closeMenu}>
          Angebot anfragen
          <Arrow />
        </a>
      </nav>
    </header>
  )
}

function SiteFooter({ servicePage = false }: { servicePage?: boolean }) {
  const homeLink = (hash: string) => (servicePage ? `${applicationBase}${hash}` : hash)

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <p>BIG SAIF</p>
          <span>BAU. FACILITY. TRANSPORT.</span>
        </div>
        <div className="footer-column">
          <h3>LEISTUNGEN</h3>
          <a href={servicePage ? `${applicationBase}baumanagement` : '#leistungen'}>Baumanagement</a>
          <a href={`${applicationBase}facility-management`}>Facility Management</a>
          <a href={`${applicationBase}transport`}>Transport</a>
        </div>
        <div className="footer-column">
          <h3>NAVIGATION</h3>
          <a href={homeLink('#top')}>Start</a>
          <a href={homeLink('#leistungen')}>Leistungen</a>
          <a href={homeLink('#referenzen')}>Referenzen</a>
          <a href={homeLink('#ueber-uns')}>Über BIG SAIF</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 BIG SAIF</span>
        <div>
          <a href="#impressum">Impressum</a>
          <a href="#datenschutz">Datenschutz</a>
        </div>
      </div>
    </footer>
  )
}

function BaumanagementPage({
  onContactOpen,
  onContactTriggerRef,
}: {
  onContactOpen: () => void
  onContactTriggerRef: (element: HTMLAnchorElement | null) => void
}) {
  return (
    <div className="site-shell baumanagement-page">
      <SiteHeader servicePage />
      <main>
        <section className="baumanagement-hero" aria-label="Baumanagement">
          <div className="baumanagement-logo-reveal">
            <img className="baumanagement-hero-logo" src={`${applicationBase}baumanagement-logo-transparent.png`} alt="BIG SAIF Baumanagement" />
          </div>
          <div className="baumanagement-editorial">
            <div className="baumanagement-editorial-content">
              <h1><span>BAU &amp;</span><span>RENOVIERUNG.</span></h1>
              <p>Durchdachte Lösungen für Bau, Umbau und Renovierung.</p>
              <a
                ref={onContactTriggerRef}
                className="baumanagement-button"
                href={`${applicationBase}#kontakt`}
                onClick={(event) => {
                  event.preventDefault()
                  onContactOpen()
                }}
              >
                PROJEKT ANFRAGEN <Arrow />
              </a>
            </div>
          </div>
        </section>

        <BaumanagementServiceAreas />
        <BaumanagementProjectShowcase />
      </main>
      <div className="baumanagement-footer-shell"><SiteFooter servicePage /></div>
    </div>
  )
}

function FacilityManagementPage() {
  const [facilityReveal, setFacilityReveal] = useState(50)
  const facilityComparisonRef = useRef<HTMLDivElement>(null)
  const updateFacilityReveal = (clientX: number) => {
    const frame = facilityComparisonRef.current
    if (!frame) return
    const bounds = frame.getBoundingClientRect()
    setFacilityReveal(Math.max(0, Math.min(100, ((clientX - bounds.left) / bounds.width) * 100)))
  }

  return (
    <div className="site-shell facility-management-page">
      <SiteHeader servicePage />
      <main>
        <section className="facility-management-hero" aria-labelledby="facility-management-title">
          <div className="facility-management-editorial">
            <h1 id="facility-management-title"><span>SAUBERKEIT.</span><span>PFLEGE.</span><span>SERVICE.</span></h1>
            <p className="facility-management-intro">Professionelle Reinigung und Gebäudepflege für gewerbliche und private Bereiche.</p>
            <a className="facility-management-button" href={`${applicationBase}#kontakt`}>SERVICE ANFRAGEN <Arrow /></a>
          </div>

          <div className="facility-management-logo-stage">
            <img src={`${applicationBase}facility-management-logo.png`} alt="BIG SAIF Facility Management" />
          </div>

        </section>

        <section className="facility-management-services" aria-labelledby="facility-management-services-title">
          <div className="facility-management-services-inner">
            <header className="facility-management-services-intro">
              <p className="facility-management-services-label">UNSERE LEISTUNGEN</p>
              <h2 id="facility-management-services-title"><span>FACILITY MANAGEMENT</span><span>MIT SYSTEM.</span></h2>
              <p className="facility-management-services-copy">Professionelle Reinigung und kontinuierliche Gebäudepflege für Unternehmen, Gewerbe und private Objekte. Zuverlässig organisiert, flexibel ausgeführt und auf Ihre Anforderungen abgestimmt.</p>
              <p className="facility-management-services-signature"><span>SAUBER.</span><span>ZUVERLÄSSIG.</span><span>REGELMÄSSIG.</span></p>
            </header>

            <ol className="facility-management-services-index">
              <li><span>01</span><h3>GEBÄUDEREINIGUNG</h3></li>
              <li><span>02</span><h3>BÜRO &amp; GEWERBE</h3></li>
              <li><span>03</span><h3>AUSSENBEREICHE</h3></li>
              <li><span>04</span><h3>GLASREINIGUNG</h3></li>
              <li><span>05</span><h3>PARKPLATZ &amp; UMFELD</h3></li>
              <li><span>06</span><h3>LAUFENDE GEBÄUDEPFLEGE</h3></li>
            </ol>
          </div>
        </section>

        <section className="facility-management-areas" aria-labelledby="facility-management-areas-title">
          <div className="facility-management-areas-inner">
            <header className="facility-management-areas-header">
              <p className="facility-management-areas-label">EINSATZBEREICHE</p>
              <h2 id="facility-management-areas-title"><span>WO WIR</span><span>ARBEITEN.</span></h2>
              <p>Facility Management für gewerbliche und private Bereiche.</p>
            </header>

            <ul className="facility-management-areas-grid">
              <li>
                <span>01</span>
                <div><h3>BÜROS &amp; UNTERNEHMEN</h3><p>Saubere und gepflegte Arbeitsumgebungen für Unternehmen und Büroflächen.</p></div>
              </li>
              <li>
                <span>02</span>
                <div><h3>GEWERBE &amp; GESCHÄFTE</h3><p>Professionelle Pflege für Verkaufsflächen und gewerblich genutzte Objekte.</p></div>
              </li>
              <li>
                <span>03</span>
                <div><h3>RESTAURANTS &amp; CAFÉS</h3><p>Sauberkeit und Gebäudepflege für gastronomisch genutzte Bereiche.</p></div>
              </li>
              <li>
                <span>04</span>
                <div><h3>PRIVATE OBJEKTE</h3><p>Zuverlässige Reinigung und Pflege für private Häuser und Objekte.</p></div>
              </li>
              <li>
                <span>05</span>
                <div><h3>AUSSENBEREICHE &amp; GÄRTEN</h3><p>Pflege von Außenflächen, Gärten und angrenzenden Bereichen.</p></div>
              </li>
              <li>
                <span>06</span>
                <div><h3>PARKPLÄTZE &amp; UMFELD</h3><p>Saubere Parkflächen und gepflegte Bereiche rund um das Objekt.</p></div>
              </li>
            </ul>
          </div>
        </section>

        <section className="facility-management-process" aria-labelledby="facility-management-process-title">
          <div className="facility-management-process-inner">
            <header className="facility-management-process-header">
              <div>
                <p className="facility-management-process-label">UNSER ABLAUF</p>
                <h2 id="facility-management-process-title"><span>SO ARBEITEN</span><span>WIR.</span></h2>
              </div>
              <p className="facility-management-process-signature"><span>KLAR.</span><span>DIREKT.</span><span>ZUVERLÄSSIG.</span></p>
            </header>

            <ol className="facility-management-process-steps">
              <li><p>01</p><h3>ANFRAGE</h3><span>Sie kontaktieren uns und teilen uns mit, welche Leistung Sie benötigen.</span></li>
              <li><p>02</p><h3>ABSTIMMUNG</h3><span>Wir klären die Anforderungen und stimmen den passenden Leistungsumfang ab.</span></li>
              <li><p>03</p><h3>DURCHFÜHRUNG</h3><span>Die vereinbarten Arbeiten werden organisiert und professionell ausgeführt.</span></li>
              <li><p>04</p><h3>BETREUUNG</h3><span>Auch nach der Leistung bleiben wir für weitere Abstimmungen erreichbar.</span></li>
            </ol>
          </div>
        </section>

        <section className="facility-management-gallery" aria-labelledby="facility-management-gallery-title">
          <div className="facility-management-gallery-inner">
            <header className="facility-management-gallery-header">
              <p>EINBLICKE</p>
              <h2 id="facility-management-gallery-title"><span>SAUBERKEIT,</span><span>DIE MAN SIEHT.</span></h2>
              <span>Einblicke in unsere Arbeit im Bereich Reinigung und Gebäudepflege.</span>
            </header>
            <div className="facility-management-gallery-grid" aria-label="Galerieentwicklung">
              <figure className="facility-management-gallery-slot facility-management-gallery-slot-1">
                <div
                  className="facility-management-comparison"
                  ref={facilityComparisonRef}
                  role="slider"
                  tabIndex={0}
                  aria-label="Vorher-Nachher Vergleich"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(facilityReveal)}
                  onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); updateFacilityReveal(event.clientX) }}
                  onPointerMove={(event) => { if (event.currentTarget.hasPointerCapture(event.pointerId)) updateFacilityReveal(event.clientX) }}
                  onKeyDown={(event) => {
                    if (event.key === 'ArrowLeft') { event.preventDefault(); setFacilityReveal((value) => Math.max(0, value - 5)) }
                    if (event.key === 'ArrowRight') { event.preventDefault(); setFacilityReveal((value) => Math.min(100, value + 5)) }
                  }}
                >
                  <img src={`${applicationBase}facility-before-01.png`} alt="Vorher: Reinigungsbereich" />
                  <div className="facility-management-comparison-after" style={{ clipPath: `inset(0 0 0 ${facilityReveal}%)` }}><img src={`${applicationBase}facility-after-01.png`} alt="Nachher: gereinigter Bereich" /></div>
                  <div className="facility-management-comparison-divider" style={{ left: `${facilityReveal}%` }}><span /></div>
                  <small className="facility-management-comparison-before-label">VORHER</small><small className="facility-management-comparison-after-label">NACHHER</small>
                </div>
              </figure>
              {[2, 3, 4, 5].map((slot) => <figure className={`facility-management-gallery-slot facility-management-gallery-slot-${slot}`} key={slot}><span>{String(slot).padStart(2, '0')}</span></figure>)}
            </div>
          </div>
        </section>
        <section className="facility-management-cta" aria-labelledby="facility-management-cta-title"><div className="facility-management-cta-inner"><h2 id="facility-management-cta-title"><span>BEREIT FÜR</span><span>EIN SAUBERES OBJEKT?</span></h2><div><p>Sprechen Sie mit uns über die passende Reinigung und Gebäudepflege für Ihr Objekt.</p><a href={`${applicationBase}#kontakt`}>SERVICE ANFRAGEN <Arrow /></a></div></div></section>
      </main>
      <SiteFooter servicePage />
    </div>
  )
}

function TransportPage() {
  return (
    <div className="site-shell transport-page">
      <SiteHeader servicePage />
      <main>
        <section className="transport-hero" aria-labelledby="transport-title">
          <img className="transport-hero-artwork" src={`${applicationBase}transport-hero-bg.png`} alt="" aria-hidden="true" />
          <div className="transport-hero-content">
            <h1 id="transport-title"><span>SICHER.</span><span>PÜNKTLICH.</span><span>AM ZIEL.</span></h1>
            <p>Transport und Lieferung innerhalb Deutschlands.</p>
            <a className="transport-hero-button" href={`${applicationBase}#kontakt`}>TRANSPORT ANFRAGEN <Arrow /></a>
          </div>
          <div className="transport-hero-logo-stage"><img className="transport-hero-logo" src={`${applicationBase}transport-logo.png`} alt="BIG SAIF Transport" /></div>
        </section>
        <section className="transport-overview" aria-labelledby="transport-overview-title">
          <div className="transport-overview-inner">
            <h2 id="transport-overview-title"><span>TRANSPORT,</span><span>DER</span><span>ANKOMMT.</span></h2>
            <div className="transport-overview-details">
              <p>Zuverlässiger Transport und Lieferung für Unternehmen, Gewerbe und private Kunden innerhalb Deutschlands.</p>
              <ol>
                <li><span>01</span><strong>SICHER</strong></li>
                <li><span>02</span><strong>PÜNKTLICH</strong></li>
                <li><span>03</span><strong>DEUTSCHLANDWEIT</strong></li>
              </ol>
            </div>
          </div>
        </section>
        <section className="transport-services" aria-labelledby="transport-services-title">
          <img className="transport-services-artwork" src={`${applicationBase}transport-services-bg.png`} alt="BIG SAIF Transport vehicle on a highway at nightfall" />
          <div className="transport-services-inner">
            <div className="transport-services-content">
              <p className="transport-services-eyebrow">UNSERE LEISTUNGEN</p>
              <h2 id="transport-services-title"><span>WIR TRANSPORTIEREN.</span><span>FAST ALLES.</span></h2>
              <p className="transport-services-intro">Flexibler Transport für unterschiedliche Anforderungen.<br />Sicher. Pünktlich. Deutschlandweit.</p>
              <ol className="transport-services-list">
                <li><span className="transport-services-number">01</span><div><h3>WAREN &amp; GÜTER</h3><p>Sicherer Transport von Waren, Paketen und verschiedenen Gütern innerhalb Deutschlands.</p></div><span className="transport-services-arrow" aria-hidden="true">↗</span></li>
                <li><span className="transport-services-number">02</span><div><h3>MÖBEL &amp; EINRICHTUNG</h3><p>Professioneller Transport von Möbeln und Einrichtungsgegenständen für Privat- und Geschäftskunden.</p></div><span className="transport-services-arrow" aria-hidden="true">↗</span></li>
                <li><span className="transport-services-number">03</span><div><h3>DIREKTTRANSPORTE</h3><p>Direkte Lieferung von der Abholung bis zum Ziel. Schnell, zuverlässig und flexibel.</p></div><span className="transport-services-arrow" aria-hidden="true">↗</span></li>
                <li><span className="transport-services-number">04</span><div><h3>TRANSPORT DEUTSCHLANDWEIT</h3><p>Zuverlässige Transporte zwischen Städten und Regionen in Deutschland.</p></div><span className="transport-services-arrow" aria-hidden="true">↗</span></li>
                <li className="transport-services-more"><span className="transport-services-number">+</span><div><h3>UND VIELES MEHR.</h3><p>Individuelle Transportlösungen nach Bedarf. Kontaktieren Sie uns für Ihre Anfrage.</p></div></li>
              </ol>
              <div className="transport-services-cta"><a href={`${applicationBase}#kontakt`}>TRANSPORT ANFRAGEN <Arrow /></a><p>Egal was Sie transportieren möchten —<br />wir bringen es sicher ans Ziel.</p></div>
            </div>
          </div>
        </section>
        <section className="transport-process" aria-labelledby="transport-process-title">
          <div className="transport-process-inner">
            <header className="transport-process-header">
              <div>
                <p className="transport-process-eyebrow">SO FUNKTIONIERT'S</p>
                <h2 id="transport-process-title"><span>SO LÄUFT DER</span><span>TRANSPORT AB.</span></h2>
              </div>
              <p className="transport-process-intro">Von der ersten Anfrage bis zur sicheren Lieferung — einfach, direkt und zuverlässig.</p>
            </header>
            <ol className="transport-process-stages" role="list">
              <li>
                <span className="transport-process-number" aria-hidden="true">01</span>
                <h3>ANFRAGE</h3>
                <p>Sie senden uns Ihre Transportanfrage und die wichtigsten Details.</p>
              </li>
              <li>
                <span className="transport-process-number" aria-hidden="true">02</span>
                <h3>ABHOLUNG</h3>
                <p>Wir koordinieren Termin und Abholung passend zu Ihren Anforderungen.</p>
              </li>
              <li>
                <span className="transport-process-number" aria-hidden="true">03</span>
                <h3>TRANSPORT</h3>
                <p>Ihre Güter werden sicher und zuverlässig zum Ziel transportiert.</p>
              </li>
              <li>
                <span className="transport-process-number" aria-hidden="true">04</span>
                <h3>LIEFERUNG</h3>
                <p>Pünktliche Übergabe am vereinbarten Zielort.</p>
              </li>
            </ol>
          </div>
        </section>
        <section className="transport-trust" aria-labelledby="transport-trust-title">
          <div className="transport-trust-inner">
            <header className="transport-trust-intro">
              <p className="transport-trust-eyebrow">WARUM BIG SAIF</p>
              <h2 id="transport-trust-title"><span>WARUM</span><span>BIG SAIF?</span></h2>
              <p className="transport-trust-copy">Transport braucht Vertrauen. Wir sorgen dafür, dass Ihre Lieferung sicher, direkt und zuverlässig ans Ziel kommt.</p>
            </header>
            <ol className="transport-trust-reasons" role="list">
              <li>
                <span className="transport-trust-number" aria-hidden="true">01</span>
                <div><h3>ZUVERLÄSSIG</h3><p>Klare Planung und zuverlässige Durchführung vom Start bis zum Ziel.</p></div>
              </li>
              <li>
                <span className="transport-trust-number" aria-hidden="true">02</span>
                <div><h3>FLEXIBEL</h3><p>Transportlösungen passend zu unterschiedlichen Anforderungen.</p></div>
              </li>
              <li>
                <span className="transport-trust-number" aria-hidden="true">03</span>
                <div><h3>DIREKT</h3><p>Direkte Kommunikation und unkomplizierte Abstimmung.</p></div>
              </li>
              <li>
                <span className="transport-trust-number" aria-hidden="true">04</span>
                <div><h3>SICHER</h3><p>Sorgfältiger Umgang mit Ihrer Lieferung während des gesamten Transports.</p></div>
              </li>
            </ol>
          </div>
        </section>
        <section className="transport-contact" aria-labelledby="transport-contact-title">
          <div className="transport-contact-inner">
            <header>
              <p className="transport-contact-eyebrow">BEREIT FÜR DEN TRANSPORT?</p>
              <h2 id="transport-contact-title"><span>WIR BRINGEN ES</span><span>SICHER ANS ZIEL.</span></h2>
            </header>
            <div className="transport-contact-support">
              <p>Teilen Sie uns mit, was transportiert werden soll. Wir kümmern uns um den passenden Ablauf.</p>
              <a className="transport-contact-button" href={`${applicationBase}#kontakt`}>TRANSPORT ANFRAGEN <Arrow /></a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter servicePage />
    </div>
  )
}

function App() {
  const [aboutStageActive, setAboutStageActive] = useState(false)
  const [contactModalOpen, setContactModalOpen] = useState(false)
  const aboutStageRef = useRef<HTMLDivElement>(null)
  const contactTriggerRef = useRef<HTMLElement | null>(null)
  const directPathname = window.location.pathname.startsWith(applicationBase)
    ? `/${window.location.pathname.slice(applicationBase.length)}`.replace(/\/$/, '') || '/'
    : window.location.pathname
  const fallbackPathname = new URLSearchParams(window.location.search).get('p')
  const applicationPathname = fallbackPathname ?? directPathname
  const isBaumanagementPage = applicationPathname === '/baumanagement'
  const isFacilityManagementPage = applicationPathname === '/facility-management'
  const isTransportPage = applicationPathname === '/transport'

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration

    window.history.scrollRestoration = 'manual'

    const target = window.location.hash
      ? document.getElementById(window.location.hash.slice(1))
      : null

    if (target) {
      target.scrollIntoView({ behavior: 'auto', block: 'start' })
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }

    return () => {
      window.history.scrollRestoration = previousScrollRestoration
    }
  }, [])

  useEffect(() => {
    if (!fallbackPathname) return

    window.history.replaceState(
      window.history.state,
      '',
      `${applicationBase}${fallbackPathname.replace(/^\//, '')}${window.location.hash}`,
    )
  }, [fallbackPathname])

  useEffect(() => {
    const stage = aboutStageRef.current

    if (!stage) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAboutStageActive(true)
          observer.disconnect()
        }
      },
      { threshold: 0.35 },
    )

    observer.observe(stage)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!contactModalOpen) return

    const contactTrigger = contactTriggerRef.current
    const previousOverflow = document.body.style.overflow
    const previousPaddingRight = document.body.style.paddingRight
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setContactModalOpen(false)
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.body.style.paddingRight = previousPaddingRight
      window.removeEventListener('keydown', handleKeyDown)
      contactTrigger?.focus()
    }
  }, [contactModalOpen])

  if (isBaumanagementPage) {
    return (
      <>
        <BaumanagementPage
          onContactOpen={() => setContactModalOpen(true)}
          onContactTriggerRef={(element) => { contactTriggerRef.current = element }}
        />
        {contactModalOpen && <ContactModal onClose={() => setContactModalOpen(false)} />}
      </>
    )
  }
  if (isFacilityManagementPage) return <FacilityManagementPage />
  if (isTransportPage) return <TransportPage />

  return (
    <div className="site-shell">
      <SiteHeader />

      <main id="top">
        <section
          className="hero"
          aria-labelledby="hero-title"
        >
          <div className="hero-main">

            <div className="hero-copy">
              <div className="brand-lockup">
                <span
                  className="brand-axis"
                  aria-hidden="true"
                />

                <div
                  className="hero-brand"
                  aria-label="BIG SAIF"
                >
                  <img
                    src={mainLogo}
                    alt="BIG SAIF"
                  />
                </div>

                <span
                  className="brand-rule brand-rule-left"
                  aria-hidden="true"
                />

                <span
                  className="brand-rule brand-rule-right"
                  aria-hidden="true"
                />
              </div>

              <p className="eyebrow">
                <span>PROFESSIONELLE LÖSUNGEN</span>
                <span>IN DEUTSCHLAND</span>
              </p>

              <h1 id="hero-title">
                <span>BAU.</span>
                <span>FACILITY.</span>
                <span>TRANSPORT.</span>
              </h1>

              <div className="hero-intro">
                <p>
                  Professionelle Lösungen für Unternehmen und Privatkunden –
                  zuverlässig geplant, präzise umgesetzt.
                </p>

                <div className="hero-actions">
                  <a
                    className="button button-primary"
                    href="#kontakt"
                  >
                    Angebot anfragen
                    <Arrow />
                  </a>

                  <a
                    className="button button-secondary"
                    href="#referenzen"
                  >
                    Referenzen ansehen
                    <Arrow />
                  </a>
                </div>
              </div>
            </div>

            <aside
              className="project-visual"
              aria-label="BIG SAIF Projektbilder"
            >

              {/* الخطوط الهندسية الجديدة */}
              <svg
                className="engineering-map"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >

                {/* FRAME 01 */}
                <path
                  className="engineering-path engineering-path-white"
                  d="
                    M73 2
                    L73 43.2
                    L5.9 43.2
                    L5.9 25
                    L27.3 9.2
                    Z
                  "
                />

                {/* FRAME 02 */}
                <path
                  className="engineering-path engineering-path-white"
                  d="
                    M95.9 10.5
                    L95.9 65.4
                    L52.1 65.4
                    L44.4 67.5
                    L44.4 44.4
                    L74.5 44.4
                    L74.5 10.5
                    Z
                  "
                />

                {/* FRAME 03 */}
                <path
                  className="engineering-path engineering-path-white"
                  d="
                    M42.9 44.4
                    L42.9 68.2
                    L6.2 77.7
                    L6.2 44.4
                    Z
                  "
                />

                {/* FRAME 04 */}
                <path
                  className="engineering-path engineering-path-white"
                  d="
                    M95.6 66.6
                    L95.1 82.6
                    L82.5 93.6
                    L6.5 93.6
                    L6.5 78.8
                    L52.8 66.6
                    Z
                  "
                />

                {/* Accent فوق FRAME 01 */}
                <path
                  className="engineering-path engineering-path-orange engineering-path-moving"
                  d="M27.3 9.2 L73 2"
                />

                {/* Accent بمنتصف الـComposition */}
                <path
                  className="engineering-path engineering-path-orange engineering-path-moving engineering-delay-1"
                  d="M44.4 44.4 L74.5 44.4"
                />

                {/* Accent فوق FRAME 04 */}
                <path
                  className="engineering-path engineering-path-orange engineering-path-moving engineering-delay-2"
                  d="M52.8 66.6 L95.6 66.6"
                />

              </svg>

              <div className="project-frame frame-primary">
                <img
                  src={buildingImage}
                  alt="BIG SAIF Bau und Renovierung"
                />
              </div>

              <div className="project-frame frame-secondary">
                <img
                  src={constructionImage}
                  alt="BIG SAIF Gebäudemanagement"
                />
              </div>

              <div className="project-frame frame-tertiary">
                <img
                  src={facilityImage}
                  alt="BIG SAIF Facility Management"
                />
              </div>

              <div className="project-frame frame-wide">
                <img
                  src={transportImage}
                  alt="BIG SAIF Transport und Lieferung"
                />
              </div>

            </aside>

          </div>

        </section>

        <section
          id="leistungen"
          className="services-section"
          aria-labelledby="services-title"
        >
          <div className="services-inner">
            <header className="services-intro">
              <p className="services-eyebrow">UNSERE LEISTUNGEN</p>

              <h2 id="services-title">
                <span>DREI BEREICHE.</span>
                <span>EIN ZUVERLÄSSIGER PARTNER.</span>
              </h2>

              <p className="services-summary">
                BIG SAIF verbindet Leistungen rund um Bau und Renovierung,
                Reinigung und Gebäudepflege sowie Transport und Lieferung in
                einer klar koordinierten Zusammenarbeit.
              </p>
            </header>

            <div className="services-grid">
              {services.map((service) => (
                <a
                  id={service.id}
                  className="service-panel"
                  key={service.id}
                  href={service.id === 'leistung-bau'
                    ? `${applicationBase}baumanagement`
                    : service.id === 'leistung-facility'
                      ? `${applicationBase}facility-management`
                      : service.id === 'leistung-transport'
                        ? `${applicationBase}transport`
                        : `#${service.id}`}
                  aria-label={`Mehr über ${service.title.join(' ')} erfahren`}
                >
                  <div className="service-image">
                    <img
                      className="service-background"
                      src={service.backgroundImage}
                      alt=""
                      aria-hidden="true"
                    />

                    <img
                      className="service-logo"
                      src={service.brandLogo}
                      alt={service.brandLogoAlt}
                    />
                  </div>

                  <div className="service-content">
                    <p>{service.description}</p>

                    <span className="service-link">
                      Mehr erfahren
                      <Arrow />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section
          id="referenzen"
          className="projects-section"
          aria-labelledby="projects-title"
        >
          <div className="projects-inner">
            <header className="projects-intro">
              <p className="projects-eyebrow">AUSGEWÄHLTE PROJEKTE</p>

              <h2 id="projects-title">
                <span>ARBEIT,</span>
                <span>DIE FÜR SICH SPRICHT.</span>
              </h2>

              <p className="projects-summary">
                Ausgewählte Referenzen aus Baumanagement, Facility Management
                und Transport zeigen die Bandbreite unserer täglichen Arbeit.
              </p>
            </header>

            <div className="projects-grid">
              {projects.map((project) => (
                <article
                  id={project.id}
                  className={`project-tile${project.featured ? ' project-tile-featured' : ''}`}
                  key={project.id}
                >
                  <a
                    className="project-link"
                    href={project.id === 'projekt-baumanagement'
                      ? `${applicationBase}baumanagement`
                      : project.id === 'projekt-facility-management'
                        ? `${applicationBase}facility-management`
                        : project.id === 'projekt-transport'
                          ? `${applicationBase}transport`
                          : `#${project.id}`}
                    aria-label={`${project.category}: Projekt ansehen`}
                  >
                    <img
                      src={project.image}
                      alt={project.imageAlt}
                    />

                    <span className="project-overlay" aria-hidden="true" />

                    <span className="project-content">
                      <span className="project-descriptor">
                        {project.descriptor}
                      </span>

                      <strong>{project.category}</strong>

                      <span className="project-action">
                        Projekt ansehen
                        <Arrow />
                      </span>
                    </span>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section
          id="ueber-uns"
          className="about-section"
          aria-labelledby="about-title"
        >
          <div className="about-inner">
            <p className="about-eyebrow">ÜBER BIG SAIF</p>

            <div className="about-composition">
              <div className="about-copy">
                <h2 id="about-title">
                  <span>EIN PARTNER.</span>
                  <span className="about-title-accent">DREI</span>
                  <span>LEISTUNGSBEREICHE.</span>
                </h2>

                <p className="about-summary">
                  BIG SAIF verbindet Baumanagement, Facility Management und
                  Transport in einem zuverlässigen Leistungsverbund. Klare
                  Abläufe, direkte Kommunikation und eine professionelle
                  Umsetzung stehen dabei im Mittelpunkt.
                </p>
              </div>

              <div
                ref={aboutStageRef}
                className={`about-brand-stage${aboutStageActive ? ' is-active' : ''}`}
                aria-label="BIG SAIF Markenauftritt"
              >
                <div className="about-stage-logo">
                  <img src={mainLogo} alt="BIG SAIF" loading="lazy" />
                </div>
                <div className="about-stage-platform" aria-hidden="true">
                  <span className="about-stage-platform-front" />
                  <span className="about-stage-platform-base" />
                </div>
              </div>
            </div>

          </div>
        </section>
        <section
          id="warum-big-saif"
          className="why-section"
          aria-labelledby="why-title"
        >
          <div className="why-inner">
            <header className="why-intro">
              <p className="why-eyebrow">WARUM BIG SAIF</p>

              <h2 id="why-title">
                <span>ALLES AUS</span>
                <span>EINER HAND.</span>
              </h2>

              <p>
                BIG SAIF verbindet zuverlässige Umsetzung, direkte Kommunikation
                und koordinierte Leistungen unter einem Unternehmen.
              </p>
            </header>

            <div className="why-strengths">
              <article className="why-strength">
                <span className="why-strength-number">01</span>
                <h3>SCHNELL</h3>
                <p>Schnelle Rückmeldung und effiziente Umsetzung für klare Abläufe.</p>
              </article>

              <article className="why-strength">
                <span className="why-strength-number">02</span>
                <h3>PROFESSIONELL</h3>
                <p>Strukturiert geplant und zuverlässig ausgeführt.</p>
              </article>

              <article className="why-strength">
                <span className="why-strength-number">03</span>
                <h3>ZUVERLÄSSIG</h3>
                <p>Direkte Kommunikation und Begleitung auch nach der Leistung.</p>
              </article>
            </div>

          </div>
        </section>
        <section
          id="kontakt"
          className="closing-section"
          aria-labelledby="contact-title"
        >
          <div className="closing-inner">
            <div className="closing-cta">
              <p className="closing-eyebrow">KONTAKT</p>

              <div className="closing-cta-content">
                <h2 id="contact-title">
                  <span>BEREIT FÜR IHR</span>
                  <span>NÄCHSTES PROJEKT?</span>
                </h2>

                <div className="closing-cta-action">
                  <p>
                    Sprechen Sie mit BIG SAIF über Ihr Projekt oder Ihren
                    konkreten Leistungsbedarf.
                  </p>

                  <button
                    ref={(element) => { contactTriggerRef.current = element }}
                    className="closing-button"
                    type="button"
                    onClick={() => setContactModalOpen(true)}
                  >
                    PROJEKT ANFRAGEN
                    <Arrow />
                  </button>
                </div>
              </div>
            </div>

            <div className="closing-signature" aria-hidden="true">BIG SAIF</div>

            <SiteFooter />
          </div>
        </section>
      </main>
      {contactModalOpen && <ContactModal onClose={() => setContactModalOpen(false)} />}
    </div>
  )
}

export default App
