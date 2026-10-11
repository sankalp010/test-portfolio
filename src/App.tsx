import { useEffect, useState } from 'react'
import { portfolio, type IconName } from './content'

const iconPaths: Record<IconName, string> = {
  code: 'M8 3 3 8l5 5M16 3l5 5-5 5M14 2l-4 12',
  briefcase: 'M3 7h18v13H3zM8 7V4h8v3M3 12h18M10 12v2h4v-2',
  layers: 'm12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5',
  sparkles: 'm12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Zm7 11 .9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9L19 14ZM5 3l.7 1.3L7 5l-1.3.7L5 7l-.7-1.3L3 5l1.3-.7L5 3Z',
  graduation: 'm2 9 10-5 10 5-10 5L2 9Zm4 2v5c4 3 8 3 12 0v-5M22 9v6',
  flask: 'M9 3h6M10 3v6l-5.6 9.2A2 2 0 0 0 6.1 21h11.8a2 2 0 0 0 1.7-2.8L14 9V3M7 16h10',
  github: 'M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.2-1.5 6.2-6.7a5.2 5.2 0 0 0-1.4-3.6 4.8 4.8 0 0 0-.1-3.6s-1.2-.4-3.8 1.4a13 13 0 0 0-7 0C5.4 1.2 4.2 1.6 4.2 1.6a4.8 4.8 0 0 0-.1 3.6 5.2 5.2 0 0 0-1.4 3.6c0 5.2 3.2 6.4 6.2 6.7A3.4 3.4 0 0 0 8 18v4',
  arrow: 'M5 12h14m-6-6 6 6-6 6',
  sun: 'M12 3v2m0 14v2m9-9h-2M5 12H3m15.4-6.4L17 7m-10 10-1.4 1.4m12.8 0L17 17M7 7 5.6 5.6M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z',
  moon: 'M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z',
  external: 'M14 3h7v7m0-7-9 9M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6',
  menu: 'M4 6h16M4 12h16M4 18h16',
  close: 'm6 6 12 12M18 6 6 18',
  terminal: 'm4 17 6-5-6-5m8 10h8',
  globe: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z',
  database: 'M12 3c5 0 9 1.3 9 3s-4 3-9 3-9-1.3-9-3 4-3 9-3Zm-9 3v6c0 1.7 4 3 9 3s9-1.3 9-3V6M3 12v6c0 1.7 4 3 9 3s9-1.3 9-3v-6',
  server: 'M4 4h16v6H4zM4 14h16v6H4zM8 7h.01M8 17h.01M12 7h5M12 17h5',
}

function Icon({ name, size = 18, className = '' }: { name: IconName; size?: number; className?: string }) {
  return <svg aria-hidden="true" className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={iconPaths[name]} /></svg>
}

function EmptyState({ title, description, icon }: { title: string; description: string; icon: IconName }) {
  return <div className="empty-state"><span className="empty-icon"><Icon name={icon} size={19} /></span><div><h3>{title}</h3><p>{description}</p></div></div>
}

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      return localStorage.getItem('sankalp-portfolio-theme') === 'light' ? 'light' : 'dark'
    } catch {
      return 'dark'
    }
  })
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('stack')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('sankalp-portfolio-theme', theme)
    } catch {
      // The page still works when browser storage is disabled.
    }
  }, [theme])

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  useEffect(() => {
    const sections = portfolio.navigation
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null)
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: [0, 0.15, 0.35, 0.6] })
    sections.forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site-shell min-h-screen">
      <div className="background-grid fixed inset-0 pointer-events-none" aria-hidden="true" />
      <div className="background-glow fixed pointer-events-none" aria-hidden="true" />
      <header className="mobile-header">
        <a className="wordmark" href="#top" onClick={closeMenu}><span className="wordmark-mark">S</span><span>Sankalp<span className="wordmark-dot">.</span></span></a>
        <div className="mobile-actions">
          <button className="icon-button" type="button" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}><Icon name={theme === 'dark' ? 'sun' : 'moon'} /></button>
          <button className="icon-button menu-button" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><Icon name={menuOpen ? 'close' : 'menu'} /></button>
        </div>
      </header>

      <aside className={`sidebar ${menuOpen ? 'sidebar-open' : ''}`}>
        <a className="wordmark desktop-wordmark" href="#top" onClick={closeMenu}><span className="wordmark-mark">S</span><span>Sankalp<span className="wordmark-dot">.</span></span></a>
        <div className="profile-card">
          <div className="avatar" aria-label="Sankalp initials">S<span>.</span></div>
          <div className="profile-name">{portfolio.name}</div>
          <div className="profile-role">{portfolio.headline}</div>
          <div className="profile-location"><Icon name="globe" size={13} /> {portfolio.location}</div>
        </div>
        <div className="sidebar-label">Explore</div>
        <nav className="side-nav" aria-label="Page sections">
          {portfolio.navigation.map((item, index) => <a key={item.id} href={`#${item.id}`} aria-current={activeSection === item.id ? 'location' : undefined} className={`nav-link ${activeSection === item.id ? 'nav-link-active' : ''}`} onClick={closeMenu}><Icon name={item.icon} size={16} /><span>{item.label}</span><span className="nav-index">0{index + 1}</span></a>)}
        </nav>
        <div className="sidebar-bottom">
          <div className="availability"><span className="status-dot" />{portfolio.availability}</div>
          <a className="github-link" href={portfolio.github} target="_blank" rel="noreferrer"><Icon name="github" size={16} /> <span>GitHub profile</span><Icon name="arrow" size={14} className="link-arrow" /></a>
          <button className="theme-toggle desktop-theme" type="button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}><Icon name={theme === 'dark' ? 'sun' : 'moon'} size={16} /><span>{theme === 'dark' ? 'Light appearance' : 'Dark appearance'}</span><span className={`switch ${theme === 'light' ? 'switch-on' : ''}`} /></button>
        </div>
      </aside>

      {menuOpen && <button type="button" className="mobile-scrim" aria-label="Close navigation" onClick={closeMenu} />}

      <main className="main-content" id="top">
        <section className="hero panel relative flex" aria-labelledby="hero-title">
          <div className="hero-copy relative z-10">
            <div className="eyebrow"><span className="eyebrow-line" /> HELLO, I’M {portfolio.firstName.toUpperCase()}</div>
            <h1 id="hero-title">Building with<br /><span>curiosity &amp; code.</span></h1>
            <p className="hero-intro">{portfolio.intro}</p>
            <div className="hero-actions"><a href="#builds" className="primary-button">Explore my work <Icon name="arrow" size={16} /></a><a href={portfolio.github} target="_blank" rel="noreferrer" className="text-button"><Icon name="github" size={16} /> GitHub</a></div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" />
            <div className="orbit-core"><span className="core-star">✳</span><span className="core-caption">LEARN<br />BUILD<br />REPEAT</span></div>
            <span className="orbit-node node-one"><Icon name="code" size={16} /></span><span className="orbit-node node-two"><Icon name="database" size={16} /></span><span className="orbit-node node-three"><Icon name="sparkles" size={16} /></span>
            <span className="art-coordinate">12°58' N<br />77°35' E</span>
          </div>
          <div className="hero-footer"><span><span className="status-dot" /> Building the next thing</span><span>Scroll to explore <span className="scroll-cue">↓</span></span><span className="hero-foot-id">PORTFOLIO / 2026</span></div>
        </section>

        <section id="stack" className="content-section">
          <SectionHeading number="01" title="Stack" kicker="TOOLS I BUILD WITH" icon="code" />
          <div className="stack-grid">
            {portfolio.stack.map((group, index) => <article className={`stack-card stack-card-${index + 1}`} key={group.category}><div className="stack-card-top"><span className="stack-icon"><Icon name={index === 0 ? 'terminal' : index < 3 ? 'code' : index === 3 ? 'database' : 'server'} size={16} /></span><span className="card-number">0{index + 1}</span></div><h3>{group.category}</h3><div className="tag-list">{group.items.map(item => <span className="tag" key={item}>{item}</span>)}</div></article>)}
          </div>
          <div className="focus-strip"><span className="focus-icon"><Icon name="sparkles" size={16} /></span><span><strong>Current direction</strong> <span>AI / ML engineering, grounded in end-to-end product building.</span></span><span className="focus-label">IN FOCUS</span></div>
        </section>

        <section id="experience" className="content-section">
          <SectionHeading number="02" title="Experience" kicker="WHERE I’VE BEEN" icon="briefcase" />
          {portfolio.experience.length ? <div className="experience-list">{portfolio.experience.map(role => <article className="experience-card" key={`${role.role}-${role.company}`}><div className="experience-mark"><Icon name="briefcase" /></div><div className="experience-detail"><div className="experience-topline"><h3>{role.role} <span>@ {role.company}</span></h3><span className="period">{role.period}</span></div><p>{role.description}</p><div className="tag-list">{role.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div></div></article>)}</div> : <EmptyState icon="briefcase" title="Role details coming soon" description="I’m focused on moving into AI / ML engineering. Verified professional experience can be added here when ready." />}
        </section>

        <section id="builds" className="content-section">
          <SectionHeading number="03" title="Builds" kicker="SELECTED PROJECTS" icon="layers" />
          <div className="project-grid">
            {portfolio.builds.map((project, index) => <article className={`project-card project-${project.accent}`} key={project.title}>
              <div className="project-visual"><span className="project-index">PROJECT / 0{index + 1}</span><span className="project-symbol"><Icon name={index === 0 ? 'globe' : index === 1 ? 'layers' : 'database'} size={32} /></span><span className="project-orb" /><span className="project-category">{project.category}</span></div>
              <div className="project-body"><div className="project-title-row"><h3>{project.title}</h3><span className="project-number">0{index + 1}</span></div><p>{project.description}</p><div className="tag-list project-tags">{project.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div><div className="project-links">{project.links.map(link => <a key={link.label} href={link.href} target="_blank" rel="noreferrer"><Icon name={link.icon} size={14} /> {link.label} <Icon name="arrow" size={13} /></a>)}</div></div>
            </article>)}
          </div>
          <a className="all-projects" href={portfolio.github} target="_blank" rel="noreferrer">More work on GitHub <Icon name="arrow" size={15} /></a>
        </section>

        <section id="dev-moments" className="content-section">
          <SectionHeading number="04" title="Dev moments" kicker="LITTLE WINS, BIG LESSONS" icon="sparkles" />
          {portfolio.devMoments.length ? <div className="moments-grid">{portfolio.devMoments.map(moment => <article className="moment-card" key={moment.title}><span className="moment-spark">✳</span><h3>{moment.title}</h3><p>{moment.description}</p>{moment.link && <a href={moment.link} target="_blank" rel="noreferrer">See details <Icon name="arrow" size={13} /></a>}</article>)}</div> : <EmptyState icon="sparkles" title="A space for the milestones" description="Hackathons, open-source contributions, and other verified highlights will live here." />}
        </section>

        <section id="education" className="content-section">
          <SectionHeading number="05" title="Education" kicker="FOUNDATIONS & LEARNING" icon="graduation" />
          {portfolio.education.length ? <div className="education-list">{portfolio.education.map(item => <article className="education-card" key={`${item.school}-${item.degree}`}><div className="education-icon"><Icon name="graduation" /></div><div><h3>{item.degree}</h3><p>{item.school}{item.detail ? ` · ${item.detail}` : ''}</p></div><span className="period">{item.period}</span></article>)}</div> : <EmptyState icon="graduation" title="Education details to come" description="This section is ready for verified degrees, courses, or certifications." />}
        </section>

        <section id="poc" className="content-section poc-section">
          <SectionHeading number="06" title="Proof of concept" kicker="IDEAS IN THE WORKSHOP" icon="flask" />
          {portfolio.poc.length ? <div className="poc-grid">{portfolio.poc.map(item => <article className="poc-card" key={item.title}><span className="poc-status"><span /> EXPERIMENT</span><h3>{item.title}</h3><p>{item.description}</p><div className="tag-list">{item.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div></article>)}</div> : <div className="poc-empty"><span className="poc-empty-icon"><Icon name="flask" size={21} /></span><div><span className="poc-kicker">THE NEXT EXPERIMENT</span><h3>Ideas are better when they’re tested.</h3><p>New prototypes and AI / ML experiments will appear here as they take shape.</p></div><span className="poc-empty-stamp">MORE<br />SOON <Icon name="arrow" size={15} /></span></div>}
        </section>

        <footer className="site-footer"><a className="footer-top" href="#top">Back to top ↑</a><span>Designed &amp; built with curiosity by {portfolio.name}.</span><a href={portfolio.github} target="_blank" rel="noreferrer">{portfolio.handle} <Icon name="arrow" size={13} /></a></footer>
      </main>
    </div>
  )
}

function SectionHeading({ number, title, kicker, icon }: { number: string; title: string; kicker: string; icon: IconName }) {
  return <div className="section-heading"><div className="section-heading-main"><span className="section-icon"><Icon name={icon} size={17} /></span><div><span className="section-kicker">{kicker}</span><h2>{title}</h2></div></div><span className="section-number">{number} <i /> 06</span></div>
}
