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

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [aboutStageActive, setAboutStageActive] = useState(false)
  const aboutStageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration

    window.history.scrollRestoration = 'manual'

    if (window.location.hash) {
      window.history.replaceState(
        window.history.state,
        '',
        `${window.location.pathname}${window.location.search}`,
      )
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })

    return () => {
      window.history.scrollRestoration = previousScrollRestoration
    }
  }, [])

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

  const closeMenu = () => {
    setMenuOpen(false)
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <a
          className="brand"
          href="#top"
          aria-label="BIG SAIF Startseite"
        >
          <img
            src={mainLogo}
            alt="BIG SAIF"
          />
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span>
            {menuOpen ? 'Schließen' : 'Menü'}
          </span>

          <span
            className="menu-icon"
            aria-hidden="true"
          >
            <i />
            <i />
          </span>
        </button>

        <nav
          id="primary-navigation"
          className={`primary-navigation${menuOpen ? ' is-open' : ''}`}
          aria-label="Hauptnavigation"
        >
          <div className="nav-links">
            {navigation.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={closeMenu}
              >
                {label}
              </a>
            ))}
          </div>

          <a
            className="header-cta"
            href="#kontakt"
            onClick={closeMenu}
          >
            Angebot anfragen
            <Arrow />
          </a>
        </nav>
      </header>

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
                <article
                  id={service.id}
                  className="service-panel"
                  key={service.id}
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

                    <a
                      className="service-link"
                      href={`#${service.id}`}
                      aria-label={`Mehr über ${service.title.join(' ')} erfahren`}
                    >
                      Mehr erfahren
                      <Arrow />
                    </a>
                  </div>
                </article>
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
                    href={`#${project.id}`}
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

                  <a className="closing-button" href="#kontakt">
                    PROJEKT ANFRAGEN
                    <Arrow />
                  </a>
                </div>
              </div>
            </div>

            <div className="closing-signature" aria-hidden="true">BIG SAIF</div>

            <footer className="site-footer">
              <div className="footer-grid">
                <div className="footer-brand">
                  <p>BIG SAIF</p>
                  <span>BAU. FACILITY. TRANSPORT.</span>
                </div>

                <div className="footer-column">
                  <h3>LEISTUNGEN</h3>
                  <a href="#leistungen">Baumanagement</a>
                  <a href="#leistungen">Facility Management</a>
                  <a href="#leistungen">Transport</a>
                </div>

                <div className="footer-column">
                  <h3>NAVIGATION</h3>
                  <a href="#top">Start</a>
                  <a href="#leistungen">Leistungen</a>
                  <a href="#referenzen">Referenzen</a>
                  <a href="#ueber-uns">Über BIG SAIF</a>
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
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
