import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion, type MotionValue } from "framer-motion";
import "./maritime.css";

const ShipScene = lazy(() => import("@/components/ship-scene"));

const EMAIL = "hello@carbiooai.com";
const GRADES = ["A", "B", "C", "D", "E"] as const;
type Grade = (typeof GRADES)[number];
const GRADE_COLOUR: Record<Grade, string> = { A: "#44a04d", B: "#8fd39a", C: "#c9d6cf", D: "#f2b441", E: "#ef6a5b" };

const CII_MEANING: Record<Grade, [string, string]> = {
  A: ["Major superior", "Well below the required line. Carbioo AI keeps the evidence that holds the rating."],
  B: ["Minor superior", "Below the required line. Monthly tracking shows how much margin is left."],
  C: ["Moderate", "On the required line. The projection is watched month by month, so it never slips unseen."],
  D: ["Minor inferior", "Three years at D means a corrective action plan. The slide is flagged early and the plan is tracked."],
  E: ["Inferior", "One year at E means a corrective action plan. The operator is alerted and the plan is built on evidence."],
};
const LEVEL_MEANING: Record<Grade, [string, string]> = {
  A: ["Sustained", "Complete records and verified efficiency gains, held over time."],
  B: ["Improving", "Complete records and verified efficiency gains."],
  C: ["Registered", "Complete records, submitted on time."],
  D: ["Partial reporting", "Gaps in records or evidence. Carbioo AI shows exactly what is missing."],
  E: ["Not reporting", "Little or no usable records yet. The baseline starts here."],
};
const BANDS = [
  { name: "Below 400 GT", cii: false, rules: "Small craft below the IMO limits. No annual CII, so efficiency is measured in practical terms: fuel per passenger-km, per tonne-km or per engine hour.", checks: "Fuel reconciled monthly, bunker notes matched where available, AIS spot checks." },
  { name: "400 to 5,000 GT", cii: false, rules: "Coastal and regional vessels. EEXI and SEEMP Part I apply from 400 GT, without an annual CII rating, so progress levels show where each vessel stands.", checks: "Fuel reconciled monthly, every bunker delivery matched, EEXI particulars verified." },
  { name: "5,000 to 20,000 GT", cii: true, rules: "Rated A to E every year under the IMO carbon intensity indicator, with EEXI and SEEMP. The required cut reaches 21.5% below 2019 by 2030.", checks: "Every voyage cross-checked with AIS, every delivery matched, CII checked against IMO fuel data." },
  { name: "20,000 GT and above", cii: true, rules: "The largest ships, rated A to E every year under IMO CII, on the same tightening line to 2030.", checks: "Every voyage cross-checked with AIS, CII checked against IMO fuel data, monthly analyst review." },
];
const STAGES = [
  { name: "Log", title: "Crews log fuel and voyages", text: "On a phone or computer, at sea or in port. Records save offline and sync when the signal returns. No onboard hardware." },
  { name: "Verify", title: "Every record is checked", text: "Fuel stock is reconciled against bunker delivery notes, and distance against AIS positions. Gaps are marked, never guessed." },
  { name: "Rate", title: "Each vessel gets its grade", text: "The IMO carbon intensity indicator, calculated every month, so the year-end rating is never a surprise." },
  { name: "Warn", title: "Operators hear before it fails", text: "When a vessel heads towards D or E, its operator is alerted while there is still time to correct course." },
];
const SCREENS = [
  { name: "Captain portal", src: "/media/ui/captain-rating.webp", w: 1560, h: 920, alt: "Captain portal showing the vessel's CII rating of A with buttons to submit a fuel delivery or a position report", fact: "Each captain sees their own vessel's rating and the next record to send." },
  { name: "Vessel intelligence", src: "/media/ui/vessel-performance.webp", w: 2170, h: 790, alt: "Monthly CO2 emissions chart for one vessel, 15% below its required carbon intensity line", fact: "Monthly CO₂ against the required line, with the projected year-end grade." },
  { name: "Confirm a voyage", src: "/media/ui/captain-voyage-m.webp", w: 1688, h: 1140, alt: "Confirm voyage arrival form with route, dates, distance and cargo", fact: "Arrival, distance, cargo and fuel in one form. The rating updates on confirm." },
];
const POINTS = [
  ["Works offline", "Records save at sea and sync when the signal returns."],
  ["No onboard hardware", "A named focal person with a phone is enough."],
  ["Bunker note matching", "Every delivery reconciled against fuel stock."],
  ["AIS cross checks", "Distance and activity checked against vessel positions."],
  ["IMO CII and EEXI", "Calculated from the MEPC resolutions, tested in code."],
  ["Early warning", "Alerts when a vessel heads towards a D or E rating."],
  ["Small craft too", "Ferries, barges and tugs get practical progress levels."],
  ["Evidence exports", "Reports ready for surveys, audits and port state control."],
  ["Role based access", "Captains see their vessel, operators their fleet."],
];
const STATEMENT = "Carbon rules tighten every year to 2030. Most fleets still prove compliance on paper. Carbioo AI turns fuel logs, bunker notes and voyage records into a verified rating for every ship, and warns you before it fails.";

const mailto = (subject: string, body: string) => `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
const rise = { hidden: { opacity: 0, y: 18 }, show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.07, ease: [0.22, 0.61, 0.36, 1] } }) };

function Logo({ light = false, size = 34 }: { light?: boolean; size?: number }) {
  return <img className="logo-img" src={light ? "/brand/carbioo-logo-light.png" : "/brand/carbioo-logo.png"} width={Math.round(size * 309 / 90)} height={size} alt="Carbioo AI" translate="no" />;
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);
  useEffect(() => {
    const on = () => setDark(window.scrollY < window.innerHeight * 1.2);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);
  const links = [["#how", "How It Works"], ["#platform", "Platform"], ["#ratings", "Ratings"], ["#contact", "Contact"]];
  return (
    <header className={`nav ${dark ? "on-dark" : "on-light"} ${open ? "open" : ""}`}>
      <div className="nav-bar">
        <a href="#top" className="nav-logo" aria-label="Carbioo AI, back to top"><Logo light={dark && !open} /></a>
        <nav aria-label="Main" className="nav-links">{links.map(([h, l]) => <a key={h} href={h}>{l}</a>)}</nav>
        <a className="pill pill-accent nav-cta" href="#contact">Book a Walkthrough</a>
        <button className="nav-menu" type="button" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>
          <span /><span />
        </button>
      </div>
      <div id="mobile-menu" className="nav-sheet" hidden={!open}>
        {links.map(([h, l]) => <a key={h} href={h} onClick={() => setOpen(false)}>{l}</a>)}
        <a className="pill pill-accent" href="#contact" onClick={() => setOpen(false)}>Book a Walkthrough</a>
      </div>
    </header>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const [verified, setVerified] = useState(!!reduce);
  useMotionValueEvent(scrollYProgress, "change", (v) => { progress.current = Math.min(1, v * 1.7); setVerified(v > 0.22); });
  const copyY = useTransform(scrollYProgress, [0, 0.5], [0, -60]);
  const copyO = useTransform(scrollYProgress, [0.3, 0.55], [1, 0]);
  return (
    <section ref={ref} className="hero" aria-labelledby="hero-title">
      <div className="hero-stick">
        <Suspense fallback={<div className="ship-scene" />}><ShipScene progress={progress} /></Suspense>
        <div className="hero-vignette" aria-hidden="true" />
        <motion.div className="hero-copy" style={reduce ? undefined : { y: copyY, opacity: copyO }}>
          <motion.h1 id="hero-title" initial="hidden" animate="show" variants={rise}>Every ship, rated and verified.</motion.h1>
          <motion.p className="hero-lead" initial="hidden" animate="show" custom={1} variants={rise}>Verified IMO carbon ratings from the records your fleet already keeps. Built for captains, operators and regulators.</motion.p>
          <motion.div className="hero-actions" initial="hidden" animate="show" custom={2} variants={rise}>
            <a className="pill pill-accent" href="#contact">Book a Walkthrough <span aria-hidden="true">→</span></a>
            <a className="pill pill-ghost" href="#how">See How It Works</a>
          </motion.div>
        </motion.div>
        <motion.div className={`hero-chip ${verified ? "ok" : ""}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.6 } }} aria-live="polite">
          <span className="chip-dot" aria-hidden="true" />
          <span className="chip-ship">Live CII status</span>
          <span className="chip-state">{verified ? "Records verified · Grade A" : "Checking fuel records…"}</span>
        </motion.div>
        <div className="hero-hint" aria-hidden="true">Scroll to verify</div>
      </div>
    </section>
  );
}

function Word({ word, range, progress }: { word: string; range: [number, number]; progress: MotionValue<number> }) {
  const o = useTransform(progress, range, [0.18, 1]);
  return <motion.span style={{ opacity: o }}>{word} </motion.span>;
}
function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = STATEMENT.split(" ");
  return (
    <section className="statement wrap" aria-label="Why Carbioo AI">
      <p ref={ref} className="statement-text">
        {reduce ? STATEMENT : words.map((w, i) => <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />)}
      </p>
      <div className="facts">
        {[["21.5%", "Required cut in carbon intensity versus 2019, reached by 2030 under IMO CII."], ["A to E", "Every ship of 5,000 GT and above is rated each year."], ["3 × D or 1 × E", "Either one triggers a corrective action plan for the ship."]].map(([n, t], i) => (
          <motion.div key={n} className="fact card" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} custom={i} variants={rise}>
            <span className="fact-n">{n}</span><p>{t}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function StageFragment({ i }: { i: number }) {
  if (i === 0) return (
    <div className="ui ui-form">
      <label>Voyage<div className="in">Rotterdam to Hamburg · 284 nm</div></label>
      <label>Fuel bunkered<div className="in">480.5 MT VLSFO</div></label>
      <label>Fuel on board at arrival<div className="in">312.4 MT</div></label>
      <span className="ui-chip ok">Saved offline · syncs when back online</span>
    </div>
  );
  if (i === 1) return (
    <div className="ui ui-list">
      {[["BDN-0481 · 480.5 MT", "VLSFO", "Matched"], ["BDN-0482 · 220.0 MT", "MGO", "Matched"], ["BDN-0483 · 480.5 MT", "VLSFO", "Variance"], ["Voyage · 284 nm", "AIS", "Checked"]].map(([a, b, c]) => (
        <div className="ui-row" key={a}><span className="v">{a}</span><span className="k">{b}</span><span className={c === "Variance" ? "warn" : "okc"}>{c}</span></div>
      ))}
    </div>
  );
  if (i === 2) return (
    <div className="ui ui-vessel">
      <div className="ui-head"><div><p className="vname" translate="no">MV NORDIC BAY</p><p className="k">Bulk carrier · 32,500 DWT</p></div><span className="ui-grade" style={{ background: GRADE_COLOUR.B }}>B</span></div>
      <div className="ui-band">{GRADES.map((g) => <span key={g} className={g === "B" ? "on" : ""} style={{ background: GRADE_COLOUR[g] }}>{g}</span>)}</div>
      <div className="ui-row plain"><span className="k">Attained 6.133 · Required 6.595</span><span className="okc">7.0% below</span></div>
    </div>
  );
  return (
    <div className="ui ui-alert">
      <b>Early warning</b>
      <p>MV ATLANTIC PRIDE is trending 2.0% above its required line.</p>
      <div className="ui-row plain"><span className="k">Projected year end</span><span className="warn">Grade D</span></div>
    </div>
  );
}

function How() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.4 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!auto || !inView || reduce) return;
    const t = setTimeout(() => setI((x) => (x + 1) % STAGES.length), 4800);
    return () => clearTimeout(t);
  }, [i, auto, inView, reduce]);
  const pick = (n: number) => { setI(n); setAuto(false); };
  return (
    <section id="how" ref={ref} className="how wrap" aria-labelledby="how-title">
      <motion.h2 id="how-title" className="h2" initial="hidden" whileInView="show" viewport={{ once: true }} variants={rise}>How it works</motion.h2>
      <div className="tabs" role="tablist" aria-label="Steps" onKeyDown={(e) => { if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return; e.preventDefault(); const n = (i + (e.key === "ArrowRight" ? 1 : STAGES.length - 1)) % STAGES.length; pick(n); document.getElementById(`tab-${n}`)?.focus(); }}>
        {STAGES.map((s, n) => (
          <button key={s.name} role="tab" type="button" id={`tab-${n}`} aria-selected={n === i} tabIndex={n === i ? 0 : -1} aria-controls="how-panel" className={`tab ${n === i ? "on" : ""}`} onClick={() => pick(n)}>
            {s.name}{n === i && auto && inView && !reduce && <span className="tab-timer" aria-hidden="true" />}
          </button>
        ))}
        <button type="button" className="tab tab-pause" onClick={() => setAuto(!auto)} aria-label={auto ? "Pause steps" : "Play steps"}>{auto
          ? <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><rect x="2" y="1" width="3.5" height="12" rx="1" fill="currentColor" /><rect x="8.5" y="1" width="3.5" height="12" rx="1" fill="currentColor" /></svg>
          : <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M3 1.5v11l9-5.5z" fill="currentColor" /></svg>}</button>
      </div>
      <div id="how-panel" role="tabpanel" aria-labelledby={`tab-${i}`} className="how-panel card dark">
        <motion.div key={i} className="how-copy" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <h3>{STAGES[i].title}</h3>
          <p>{STAGES[i].text}</p>
        </motion.div>
        <motion.div key={`f${i}`} className="how-frag" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.45 }}>
          <StageFragment i={i} />
        </motion.div>
      </div>
    </section>
  );
}

function Platform() {
  const track = useRef<HTMLDivElement>(null);
  const [at, setAt] = useState(0);
  const step = () => { const el = track.current; const card = el?.querySelector<HTMLElement>(".shot"); return (card?.offsetWidth || 320) + 16; };
  const go = (d: number) => track.current?.scrollBy({ left: d * step(), behavior: "smooth" });
  const onScroll = () => { const el = track.current; if (el) setAt(Math.round(el.scrollLeft / step())); };
  return (
    <section id="platform" className="platform" aria-labelledby="platform-title">
      <div className="wrap platform-head">
        <motion.h2 id="platform-title" className="h2" initial="hidden" whileInView="show" viewport={{ once: true }} variants={rise}>The vessel view</motion.h2>
        <div className="arrows">
          <button type="button" className="round" onClick={() => go(-1)} disabled={at <= 0} aria-label="Previous screen">←</button>
          <button type="button" className="round" onClick={() => go(1)} disabled={at >= SCREENS.length - 1} aria-label="Next screen">→</button>
        </div>
      </div>
      <div className="shots" ref={track} onScroll={onScroll} tabIndex={0} aria-label="Product screens, scroll sideways">
        {SCREENS.map((s, n) => (
          <motion.figure key={s.name} className="shot card" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} custom={n} variants={rise}>
            <div className="shot-img"><img src={s.src} width={s.w} height={s.h} alt={s.alt} loading="lazy" /></div>
            <figcaption><b>{s.name}</b><span>{s.fact}</span></figcaption>
          </motion.figure>
        ))}
      </div>
      <p className="wrap note">Actual software screens, demonstration data.</p>
    </section>
  );
}

function Ratings() {
  const [band, setBand] = useState(2);
  const [grade, setGrade] = useState<Grade>("C");
  const b = BANDS[band];
  const meaning = (b.cii ? CII_MEANING : LEVEL_MEANING)[grade];
  return (
    <section id="ratings" className="ratings wrap" aria-labelledby="ratings-title">
      <div className="ratings-card card green">
        <div className="ratings-left">
          <h2 id="ratings-title" className="h2">What does the rating mean for your vessel?</h2>
          <p className="soft">Choose a size and a grade.</p>
          <div className="seg" role="group" aria-label="Vessel size">
            {BANDS.map((x, n) => <button key={x.name} type="button" aria-pressed={n === band} className={`seg-btn ${n === band ? "on" : ""}`} onClick={() => setBand(n)}>{x.name}</button>)}
          </div>
          <p className="rules">{b.rules}</p>
        </div>
        <div className="ratings-right" aria-live="polite">
          <div className="grade-row" role="group" aria-label={b.cii ? "CII rating" : "Progress level"}>
            {GRADES.map((g) => <button key={g} type="button" aria-pressed={g === grade} className={`grade-btn ${g === grade ? "on" : ""}`} style={{ background: GRADE_COLOUR[g] }} onClick={() => setGrade(g)} aria-label={`${b.cii ? "Rating" : "Level"} ${g}`}>{g}</button>)}
          </div>
          <motion.div key={`${band}${grade}`} className="verdict" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
            <span className="verdict-letter" style={{ background: GRADE_COLOUR[grade] }} aria-hidden="true">{grade}</span>
            <div><h3>{meaning[0]}</h3><p>{meaning[1]}</p></div>
          </motion.div>
          <p className="checks"><b>How it is verified:</b> {b.checks}</p>
          <a className="pill pill-light" href={mailto(`Carbioo AI for ${b.name} vessels`, `We operate vessels in the ${b.name} range and would like a walkthrough of Carbioo AI.`)}>Talk to Us About Your Fleet <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className="features wrap" aria-labelledby="features-title">
      <motion.h2 id="features-title" className="h2" initial="hidden" whileInView="show" viewport={{ once: true }} variants={rise}>Built for the whole fleet</motion.h2>
      <div className="feature-grid">
        {POINTS.map(([t, d], n) => (
          <motion.div key={t} className="feature card" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }} custom={n % 3} variants={rise}>
            <span className="feature-dot" aria-hidden="true" />
            <h3>{t}</h3>
            <p>{d}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = `Name: ${f.get("name")}\nCompany: ${f.get("company")}\nEmail: ${f.get("email")}\nFleet: ${f.get("fleet")}\n\nPlease arrange a walkthrough of Carbioo AI for this fleet.`;
    window.location.href = mailto(`Walkthrough request from ${f.get("company") || f.get("name")}`, body);
  }
  return (
    <section id="contact" className="contact wrap" aria-labelledby="contact-title">
      <div className="contact-card card dark">
        <div className="contact-copy">
          <h2 id="contact-title" className="h2">See your fleet rated.</h2>
          <p>Tell us about your vessels and get a walkthrough built around them. Or write to <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>
        </div>
        <form onSubmit={submit} className="form">
          <label htmlFor="f-name">Name</label>
          <input id="f-name" name="name" placeholder="e.g. Amara Okafor…" required autoComplete="name" />
          <label htmlFor="f-company">Company or agency</label>
          <input id="f-company" name="company" placeholder="e.g. Seaways Ltd…" autoComplete="organization" />
          <label htmlFor="f-email">Work email</label>
          <input id="f-email" name="email" type="email" inputMode="email" spellCheck={false} placeholder="e.g. ops@seaways.com…" required autoComplete="email" />
          <label htmlFor="f-fleet">Fleet size</label>
          <select id="f-fleet" name="fleet" defaultValue="">
            <option value="" disabled>Choose one…</option>
            <option>1 to 5 vessels</option><option>6 to 20 vessels</option><option>21 to 100 vessels</option><option>More than 100 vessels</option><option>Regulator or partner</option>
          </select>
          <button className="pill pill-accent" type="submit">Request a Walkthrough <span aria-hidden="true">→</span></button>
        </form>
      </div>
    </section>
  );
}

export default function Maritime() {
  useEffect(() => { document.title = "Carbioo AI · Maritime carbon intelligence"; }, []);
  return (
    <div className="cb" id="top">
      <a className="skip" href="#main">Skip to content</a>
      <Nav />
      <main id="main">
        <Hero />
        <Statement />
        <How />
        <Platform />
        <Ratings />
        <Features />
        <Contact />
      </main>
      <footer className="foot wrap">
        <div className="foot-top">
          <div><Logo size={38} /><p>Maritime carbon intelligence for fleets, ports and regulators.</p></div>
          <nav aria-label="Footer" className="foot-links">
            <a href="#how">How It Works</a><a href="#platform">Platform</a><a href="#ratings">Ratings</a><a href="#contact">Contact</a>
            <a href="https://www.linkedin.com/company/carbiooai/" rel="noopener">LinkedIn</a><a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </nav>
        </div>
        <p className="legal">© 2026 Carbioo AI. Carbioo AI® is a UK trademark.</p>
      </footer>
    </div>
  );
}
