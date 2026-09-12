import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowUpRight,
  FileDown,
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
} from "lucide-react";

const systems = [
  {
    index: "001",
    title: "JPMC RDaaS Agent",
    description:
      "LLM-powered data onboarding system backed by a 16-tool MCP server across four operational domains.",
    stack: "MCP · LLM · AWS ECS",
  },
  {
    index: "002",
    title: "Safo Sports",
    description:
      "AI-powered NIL platform with a hybrid rules-and-LLM athlete-to-brand matching engine.",
    stack: "React · Spring Boot · FastAPI",
  },
  {
    index: "003",
    title: "Benefits Review Portal",
    description:
      "System design for a benefits-review portal supporting more than 83,000 monthly SNAP households.",
    stack: "Blazor · .NET 9 · SQL Server",
  },
  {
    index: "004",
    title: "CareerVillage AI Coach",
    description:
      "Career platform for 1,000+ learners that doubled mock-interview completion and improved résumé engagement.",
    stack: "OpenAI · Node.js · Power BI",
  },
];

const experience = [
  {
    company: "JPMorgan Chase & Co.",
    role: "Software Engineering Program Intern",
    description:
      "Built an LLM-powered RDaaS onboarding agent and a 16-tool MCP server spanning status, data, definitions, and onboarding workflows, deployed on AWS ECS.",
    location: "Chicago, IL",
    period: "Jun—Aug 2026",
  },
  {
    company: "Safo Sports Group",
    role: "Founding Engineer",
    description:
      "Engineering an AI-powered NIL platform with secure profiles and a hybrid rules-and-LLM matching engine that scores athlete-brand fit.",
    location: "College Park, MD",
    period: "Jun 2025—Present",
  },
  {
    company: "DC Department of Human Services",
    role: "Software Developer Intern · Coding it Forward",
    description:
      "Implemented three-role, claims-based access control in Blazor Server and ASP.NET Core Identity, plus monitoring and incident-notification routing.",
    location: "Washington, DC",
    period: "Jan—Mar 2026",
  },
  {
    company: "PwC",
    role: "Cloud & AI Engineering Intern",
    description:
      "Analyzed 10,000+ rows in Power BI and helped four teams improve agent adaptability, engagement, discoverability, and model iteration.",
    location: "Washington, DC",
    period: "Jun—Jul 2025",
  },
];

const skills = [
  ["Languages", "Python · Java · JavaScript · TypeScript · C · C# · OCaml · Assembly"],
  ["Frontend", "React · HTML/CSS · Blazor · Power BI"],
  ["Backend / AI", "Node.js · FastAPI · Spring Boot · .NET · MCP Services · REST APIs"],
  ["Cloud / Data", "AWS ECS · AWS RDS · SQL · SQL Server · Linux · Git"],
];

const navItems = [
  ["About", "about"],
  ["Systems", "systems"],
  ["Experience", "experience"],
  ["Contact", "contact"],
];

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.14 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <h2 className="section-label">{children}</h2>;
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 26,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="portfolio-shell">
      <motion.div
        className="scroll-progress"
        style={{ scaleX: progressScale }}
        aria-hidden="true"
      />
      <div className="ambient-glow ambient-glow-one" aria-hidden="true" />
      <div className="ambient-glow ambient-glow-two" aria-hidden="true" />

      <aside className="system-rail" aria-hidden="true">
        <span>D//O</span>
        <span className="rail-copy">PORTFOLIO SYSTEM // LIVE</span>
        <span className="rail-nodes"><i /><i /><i /></span>
      </aside>

      <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
        <a className="wordmark" href="#home" aria-label="Daniel Odetoye, home">
          D/ODE — SYSTEMS
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map(([label, target]) => (
            <a key={target} href={`#${target}`}>{label}</a>
          ))}
        </nav>

        <a className="resume-link" href="/Daniel%20Odetoye%20Resume.pdf" target="_blank" rel="noreferrer">
          Résumé <ArrowUpRight size={14} aria-hidden="true" />
        </a>

        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            {navItems.map(([label, target], index) => (
              <motion.a
                key={target}
                href={`#${target}`}
                onClick={closeMenu}
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.06 + index * 0.055 }}
              >
                <span>0{index + 1}</span>{label}
              </motion.a>
            ))}
            <motion.a
              href="/Daniel%20Odetoye%20Resume.pdf"
              target="_blank"
              rel="noreferrer"
              onClick={closeMenu}
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.28 }}
            >
              <span>05</span>Résumé
            </motion.a>
          </motion.nav>
        )}
      </AnimatePresence>

      <main>
        <section className="hero" id="home">
          <div className="build-watermark" aria-hidden="true">BUILD_01</div>
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.p
              className="eyebrow"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.18, duration: 0.5 }}
            >
              Software Engineer · AI &amp; Agentic Systems
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.26, duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            >
              Daniel <span>Odetoye.</span>
            </motion.h1>
            <motion.p
              className="hero-intro"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.44, duration: 0.58 }}
            >
              I build <strong>agentic AI systems and full-stack platforms</strong> that turn manual,
              person-dependent workflows into reliable software.
            </motion.p>
            <motion.div
              className="terminal-readout"
              aria-label="Core technology profile"
              initial={{ opacity: 0, scaleX: 0.94 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.56, duration: 0.55 }}
            >
              <span>stack://</span><p>Python · Java · TypeScript · .NET</p>
              <span>systems://</span><p>MCP · FastAPI · AWS · SQL</p>
            </motion.div>
            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.66, duration: 0.48 }}
            >
              <a href="#systems">Explore systems <ArrowUpRight size={15} aria-hidden="true" /></a>
              <a href="/Daniel%20Odetoye%20Resume.pdf" target="_blank" rel="noreferrer">
                Download résumé <FileDown size={15} aria-hidden="true" />
              </a>
            </motion.div>
          </motion.div>

          <motion.aside
            className="identity-panel"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -7, rotate: 0.35 }}
            aria-label="Daniel Odetoye portrait and availability"
          >
            <div className="identity-code">IDENT // D/ODE</div>
            <div className="portrait-frame">
              <img src="/headshot1.jpg" alt="Daniel Odetoye" />
              <span>Human // Engineer</span>
            </div>
            <p className="status"><i aria-hidden="true" />Open to opportunities</p>
          </motion.aside>
        </section>

        <motion.section className="systems section-grid" id="systems" {...reveal}>
          <SectionLabel>01 — Build log</SectionLabel>
          <div className="system-list">
            {systems.map((system, index) => (
              <motion.article
                className="system-row"
                key={system.index}
                initial={{ opacity: 0, x: -26 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.52, delay: index * 0.075, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="system-index">{system.index}</span>
                <h3>{system.title}</h3>
                <p>{system.description}</p>
                <span className="system-stack">{system.stack}</span>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section className="about section-grid" id="about" {...reveal}>
          <SectionLabel>02 — Operator profile</SectionLabel>
          <div className="about-layout">
            <p className="about-statement">
              I’m a Computer Science student at the University of Maryland focused on
              <strong> agentic AI, backend systems, and full-stack products.</strong> I turn ambiguous
              operational workflows into dependable tools—from enterprise data onboarding to
              athlete-brand matching and public-service software.
            </p>
            <dl className="fact-list">
              {[
                ["Base", "College Park, Maryland"],
                ["Study", "University of Maryland · Computer Science"],
                ["Focus", "AI systems · Full-stack engineering"],
                ["Programs", "QUEST Honors · MLT Ascend"],
              ].map(([term, detail], index) => (
                <motion.div
                  key={term}
                  initial={{ opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.7 }}
                  transition={{ duration: 0.42, delay: index * 0.07 }}
                >
                  <dt>{term}</dt><dd>{detail}</dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </motion.section>

        <motion.section className="experience section-grid" id="experience" {...reveal}>
          <SectionLabel>03 — Experience log</SectionLabel>
          <div className="experience-list">
            {experience.map((item, index) => (
              <motion.article
                className="experience-row"
                key={`${item.company}-${item.period}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.48 }}
                transition={{ duration: 0.5, delay: index * 0.065, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ x: 8 }}
              >
                <div>
                  <h3>{item.company}</h3>
                  <p className="role">{item.role}</p>
                </div>
                <p className="experience-copy">{item.description}</p>
                <p className="experience-meta">{item.location}<br />{item.period}</p>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section className="toolkit section-grid" id="toolkit" {...reveal}>
          <SectionLabel>04 — Technical matrix</SectionLabel>
          <div className="skill-grid">
            {skills.map(([label, list], index) => (
              <motion.div
                className="skill-row"
                key={label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ duration: 0.45, delay: index * 0.07 }}
                whileHover={{ x: 6 }}
              >
                <h3>{label}</h3>
                <p>{list}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section className="formation section-grid" id="formation" {...reveal}>
          <SectionLabel>05 — Formation</SectionLabel>
          <div className="formation-grid">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.55 }}
            >
              <h3>University of Maryland</h3>
              <p>B.S. in Computer Science</p>
              <p className="formation-detail">
                Coursework in data structures and algorithms, object-oriented programming,
                computer systems, and calculus.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              <h3>Leadership &amp; community</h3>
              <ul>
                <li>QUEST Honors Program · Technology, business, and data strategy</li>
                <li>MLT Ascend Scholar</li>
                <li>UMD Code Black · Treasurer</li>
                <li>NSBE · ColorStack @ UMD · Code Black</li>
              </ul>
            </motion.div>
          </div>
        </motion.section>

        <motion.section className="contact section-grid" id="contact" {...reveal}>
          <SectionLabel>06 — Open channel</SectionLabel>
          <div className="contact-layout">
            <h2>Let’s build systems that <span>remove the manual work.</span></h2>
            <div className="contact-links">
              <motion.a href="mailto:dodetoye@terpmail.umd.edu" whileHover={{ x: 8 }}><Mail size={16} aria-hidden="true" />Email Daniel</motion.a>
              <motion.a href="https://www.linkedin.com/in/danielodetoye" target="_blank" rel="noreferrer" whileHover={{ x: 8 }}><Linkedin size={16} aria-hidden="true" />LinkedIn</motion.a>
              <motion.a href="https://github.com/thatsdan1" target="_blank" rel="noreferrer" whileHover={{ x: 8 }}><Github size={16} aria-hidden="true" />GitHub</motion.a>
            </div>
          </div>
        </motion.section>
      </main>

      <footer>
        <span>© 2026 Daniel Odetoye</span>
        <span>Built for the next system.</span>
      </footer>
    </div>
  );
}
