import { useEffect, useRef, useState } from "react";
import "./maritime.css";

const EMAIL = "hello@carbiooai.com";
const GRADES = ["A", "B", "C", "D", "E"] as const;
type Grade = (typeof GRADES)[number];
const GRADE_COLOUR: Record<Grade, string> = { A: "var(--a)", B: "var(--b)", C: "var(--c)", D: "var(--d)", E: "var(--e)" };
// What each grade means: IMO CII for ships of 5,000 GT and above, progress levels below that.
const CII_MEANING: Record<Grade, [string, string]> = {
  A: ["Major superior", "Well below the required line. Carbioo AI keeps the evidence that holds the rating."],
  B: ["Minor superior", "Below the required line. Monthly tracking shows how much margin is left."],
  C: ["Moderate", "On the required line. The projection is watched month by month so it does not slip."],
  D: ["Minor inferior", "Three years at D means a corrective action plan. Carbioo AI flags it early and tracks the plan."],
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
  { name: "Below 400 GT", cii: false, rules: "Small craft below the IMO limits. No annual CII rating, so Carbioo AI measures practical efficiency instead: fuel per passenger-km for ferries, per tonne-km for barges, per engine-hour for tugs.", checks: "Fuel reconciled every month, bunker notes matched where available, AIS spot checks." },
  { name: "400 to 5,000 GT", cii: false, rules: "Coastal and regional vessels. EEXI and SEEMP Part I apply from 400 GT, but there is no annual CII rating, so progress levels show where each vessel stands.", checks: "Fuel reconciled every month, every bunker delivery matched, engine and fuel particulars verified for EEXI." },
  { name: "5,000 to 20,000 GT", cii: true, rules: "Rated A to E every year under the IMO carbon intensity indicator, with EEXI and SEEMP. The required cut reaches 21.5% below 2019 levels by 2030.", checks: "Every voyage cross-checked with AIS, every delivery matched, CII checked against IMO fuel data each year." },
  { name: "20,000 GT and above", cii: true, rules: "The largest ships, rated A to E every year under IMO CII, with EEXI and SEEMP and the same tightening line to 2030.", checks: "Every voyage cross-checked with AIS, CII checked against IMO fuel data, anomalies reviewed by an analyst every month." },
];

const STAGES = [
  { name: "Log", clause: "First, crews log fuel and voyages.", text: "On a phone or computer, at sea or in port. Records save offline and sync when the signal returns. No onboard hardware." },
  { name: "Verify", clause: "Then every record is checked.", text: "Fuel stock is reconciled against bunker delivery notes, and distance against AIS positions. Gaps are marked, never guessed." },
  { name: "Rate", clause: "Each vessel gets its grade.", text: "The IMO carbon intensity indicator, calculated every month, so the year-end rating is never a surprise." },
  { name: "Warn", clause: "Operators hear before it fails.", text: "When a vessel heads towards D or E, its operator is alerted while there is still time to correct course." },
];

const SCREENS = [
  { name: "Vessel intelligence", src: "/media/ui/vessel-detail.webp", alt: "Vessel page for a product tanker showing a CII grade of A, monthly CO2 emissions and a performance snapshot", fact: "Monthly CO₂, attained against required CII, and the projected year-end grade for one ship." },
  { name: "Fleet registry", src: "/media/ui/fleet-registry.webp", alt: "Fleet registry listing vessels with their CII grades and progress against the required line", fact: "Every vessel in one list, graded A to E against its own required line." },
  { name: "Bunker notes", src: "/media/ui/fuel-records.webp", alt: "Bunker delivery note log with verified receipts and two telemetry variance flags", fact: "Each delivery matched against AIS fuel burn. Matches are verified and variances are flagged." },
  { name: "DCS reporting", src: "/media/ui/reporting.webp", alt: "DCS compliance centre tracking annual fuel data submissions for each vessel", fact: "Annual IMO fuel data prepared and tracked, ready for flag, class and port state control." },
];

const POINTS = [
  ["Works offline", "Records save at sea and sync when the signal returns."],
  ["No onboard hardware", "A named focal person with a phone is enough."],
  ["Bunker note matching", "Every delivery reconciled against fuel stock."],
  ["AIS cross checks", "Distance and activity checked against vessel positions."],
  ["IMO CII and EEXI", "Calculated from the MEPC resolutions, tested in code."],
  ["Early warning", "Alerts when a vessel heads towards a D or E rating."],
  ["Domestic craft too", "Ferries, barges and tugs get practical progress levels."],
  ["Evidence exports", "Reports ready for surveys, audits and port state control."],
  ["Role based access", "Operators see their own vessels, regulators see the fleet."],
];

const mailto = (subject: string, body: string) => `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

function useReveal(root: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    el.classList.add("js");
    const targets = el.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.18 });
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [root]);
}

function Logo({ link = true, size = 40 }: { link?: boolean; size?: number }) {
  const img = <img src="/brand/carbioo-logo.png" width={Math.round(size * 309 / 90)} height={size} alt="Carbioo AI" />;
  return link
    ? <a className="logo" href="#top" aria-label="Carbioo AI, back to top">{img}<sup aria-label="registered trademark">®</sup></a>
    : <span className="logo">{img}<sup aria-label="registered trademark">®</sup></span>;
}

function HeroFragment() {
  const [grade, setGrade] = useState<Grade>("B");
  const [ratio, setRatio] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => { setGrade("A"); setRatio(85); }, 1500);
    return () => clearTimeout(t1);
  }, []);
  return (
    <div className="ui vessel" data-ui>
      <div className="row">
        <div>
          <h4>MT ECO HORIZON</h4>
          <div className="meta">IMO 9921044 · Product tanker · 29,000 DWT</div>
        </div>
        <div className="grade" style={{ background: GRADE_COLOUR[grade] }} aria-label={`CII grade ${grade}`}>{grade}</div>
      </div>
      <div className="band" aria-hidden="true">
        {GRADES.map((g) => <span key={g} className={g === grade ? "on" : ""} style={{ background: GRADE_COLOUR[g] }}>{g}</span>)}
      </div>
      <div className="meter">
        <div className="row"><span className="k">Attained CII</span><span className="v">7.528</span></div>
        <div className="track" style={{ marginTop: 8 }}>
          <div className="fill" style={{ width: `${ratio}%` }} />
          <div className="req" style={{ left: "85%" }} />
        </div>
        <div className="row" style={{ marginTop: 8 }}><span className="k">Required 8.856</span><span className="ok">15.0% below required</span></div>
      </div>
      <div className="row" style={{ marginTop: 20 }}>
        <span className="live"><i />AIS feed active</span>
        <span className="k">Projected year end: grade {grade}</span>
      </div>
    </div>
  );
}

function StageFragment({ i }: { i: number }) {
  if (i === 0) return (
    <div className="ui form-ui" data-ui>
      <label>Voyage<div className="in">Rotterdam to Hamburg · 284 nm</div></label>
      <label>Fuel bunkered<div className="in">480.5 MT VLSFO</div></label>
      <label>Fuel on board at arrival<div className="in">312.4 MT</div></label>
      <span className="chip" style={{ background: "#e7f7ee", color: "#17803f" }}>Saved offline · syncs when back online</span>
    </div>
  );
  if (i === 1) return (
    <div className="ui bdn" data-ui>
      {[["BDN-0481 · 480.5 MT", "VLSFO", "Matched"], ["BDN-0482 · 220.0 MT", "MGO", "Matched"], ["BDN-0483 · 480.5 MT", "VLSFO", "Variance"], ["Voyage · 284 nm", "AIS", "Checked"]].map(([a, b, c]) => (
        <div className="r" key={a}><span className="v">{a}</span><span className="k">{b}</span><span className={c === "Variance" ? "warnc" : "ok"}>{c}</span></div>
      ))}
    </div>
  );
  if (i === 2) return (
    <div className="ui vessel" data-ui>
      <div className="row"><div><h4>MV NORDIC BAY</h4><div className="meta">Bulk carrier · 32,500 DWT</div></div><div className="grade" style={{ background: "var(--b)" }}>B</div></div>
      <div className="band">{GRADES.map((g) => <span key={g} className={g === "B" ? "on" : ""} style={{ background: GRADE_COLOUR[g] }}>{g}</span>)}</div>
      <div className="row" style={{ marginTop: 16 }}><span className="k">Attained 6.133 · Required 6.595</span><span className="ok">7.0% below</span></div>
    </div>
  );
  return (
    <div className="ui alert" data-ui>
      <b>Early warning</b>
      <div>MV ATLANTIC PRIDE is trending 2.0% above its required line.</div>
      <div className="row" style={{ marginTop: 14 }}><span className="k">Projected year end</span><span className="warnc">Grade D</span></div>
    </div>
  );
}

export default function Maritime() {
  const root = useRef<HTMLDivElement>(null);
  useReveal(root);
  const [stage, setStage] = useState(0);
  const [stageShown, setStageShown] = useState(0);
  const [screen, setScreen] = useState(0);
  const [screenShown, setScreenShown] = useState(0);
  const [band, setBand] = useState(2);
  const [grade, setGrade] = useState<Grade>("C");
  const [open, setOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => { document.title = "Carbioo AI · Maritime carbon intelligence"; const t = setTimeout(() => setOpen(true), 250); return () => clearTimeout(t); }, []);
  useEffect(() => { if (stage === stageShown) return; const t = setTimeout(() => setStageShown(stage), 200); return () => clearTimeout(t); }, [stage, stageShown]);
  useEffect(() => { if (screen === screenShown) return; const t = setTimeout(() => setScreenShown(screen), 260); return () => clearTimeout(t); }, [screen, screenShown]);
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { v.pause(); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); }, { threshold: 0.2 });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const b = BANDS[band];
  const meaning = (b.cii ? CII_MEANING : LEVEL_MEANING)[grade];
  const fadingStage = stage !== stageShown;
  const fadingScreen = screen !== screenShown;

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = `Name: ${f.get("name")}\nCompany: ${f.get("company")}\nEmail: ${f.get("email")}\nFleet: ${f.get("fleet")}\n\nWe would like a walkthrough of Carbioo AI for our fleet.`;
    window.location.href = mailto(`Demo request from ${f.get("company") || f.get("name")}`, body);
  }

  return (
    <div className="cb" ref={root} id="top">
      <header className="nav">
        <Logo />
        <nav aria-label="Main">
          <ul>
            <li><a href="#how">How it works</a></li>
            <li><a href="#platform">Platform</a></li>
            <li><a href="#ratings">Ratings</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        <a className="btn notch" href="#contact"><span className="nav-long">Book a walkthrough</span><span className="nav-short">Contact</span></a>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title" data-reveal>
          <div className="hero-copy">
            <h1 id="hero-title" className="rise">Every ship, rated and verified.</h1>
            <p className="lead rise" style={{ ["--i" as string]: 1 }}>Carbioo AI turns fuel logs, bunker notes and voyage records into a verified IMO carbon rating for every vessel in your fleet, and warns you before a rating fails.</p>
            <div className="actions rise" style={{ ["--i" as string]: 2 }}>
              <a className="btn notch" href="#contact">Book a walkthrough <span className="arrow" aria-hidden="true">→</span></a>
              <a className="quiet" href="#how">See how it works</a>
            </div>
          </div>
          <div className={`stage shutter ${open ? "open" : ""}`}>
            <img className="stage-photo drift" src="/media/apapa-port-lagos.jpg" width="1920" height="1440" alt="" />
            <div className="stage-inner">
              <HeroFragment />
              <p className="demo-note">Live product view · demonstration data</p>
            </div>
          </div>
        </section>

        <section id="how" className="how" aria-labelledby="how-title" data-reveal>
          <div className="how-clause">
            <h2 id="how-title" className={`rise ${fadingStage ? "fading" : ""}`}>{STAGES[stageShown].clause}</h2>
            <p className={`rise ${fadingStage ? "fading" : ""}`} style={{ ["--i" as string]: 1 }}>{STAGES[stageShown].text}</p>
          </div>
          <div className="how-frag">
            <div className={fadingStage ? "fading" : ""} style={{ width: "min(460px, 100%)", transition: "opacity .2s ease" }}><StageFragment i={stageShown} /></div>
          </div>
          <div className="how-control" data-ui>
            <label className="sr" htmlFor="stage-range">How Carbioo AI works, stage {stage + 1} of 4: {STAGES[stage].name}</label>
            <div className="slider"><div className="rail" aria-hidden="true"><i style={{ width: `${(stage / 3) * 100}%` }} /></div>
            <input id="stage-range" type="range" min={0} max={3} step={1} value={stage} onChange={(e) => setStage(+e.target.value)}
              style={{ ["--p" as string]: `${(stage / 3) * 100}%` }} aria-valuetext={STAGES[stage].name} /></div>
            <div className="stops">
              {STAGES.map((s, i) => (
                <button key={s.name} type="button" className={i === stage ? "cur" : ""} onClick={() => setStage(i)} aria-current={i === stage}>{s.name}</button>
              ))}
            </div>
          </div>
        </section>

        <section id="platform" className="platform" aria-labelledby="platform-title" data-reveal>
          <div className="platform-list">
            <h2 id="platform-title" className="rise">The platform</h2>
            <ul className="rise" style={{ ["--i" as string]: 1 }}>
              {SCREENS.map((s, i) => (
                <li key={s.name}><button type="button" aria-pressed={i === screen} onClick={() => setScreen(i)} onMouseEnter={() => setScreen(i)}>
                  <span className="step-mark" aria-hidden="true" />{s.name}</button></li>
              ))}
            </ul>
            <p className={`platform-fact rise ${fadingScreen ? "fading" : ""}`} style={{ ["--i" as string]: 2 }}>{SCREENS[screenShown].fact}</p>
          </div>
          <div className="platform-stage notch rise" style={{ ["--i" as string]: 2 }}>
            <img className={fadingScreen ? "fading" : ""} src={SCREENS[screenShown].src} alt={SCREENS[screenShown].alt} width="1440" height="900" loading="lazy" />
          </div>
        </section>

        <figure className="reel" data-reveal>
          <video ref={videoRef} className="rise" muted loop playsInline preload="metadata" poster="/media/platform-loop.jpg" aria-label="Screen recording of Carbioo AI checking bunker notes and running the decarbonisation simulator">
            <source src="/media/platform-loop.mp4" type="video/mp4" />
          </video>
          <figcaption className="rise" style={{ ["--i" as string]: 1 }}>The working software, recorded on our staging environment with demonstration data.</figcaption>
        </figure>

        <section className="features" aria-labelledby="features-title" data-reveal>
          <figure className="notch-br rise">
            <img src="/media/container-ship-at-sea.jpg" width="1920" height="986" alt="A general cargo ship under way in rough open sea" loading="lazy" />
          </figure>
          <div>
            <h2 id="features-title" className="rise">Built for the whole fleet</h2>
            <div className="points">
              {POINTS.map(([t, d], i) => (
                <div key={t} className="rise" style={{ ["--i" as string]: 1 + (i % 3) }}>
                  <h3><span className="step-mark" aria-hidden="true" />{t}</h3>
                  <p>{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="ratings" className="ratings" aria-label="What the ratings mean for your vessels" data-reveal>
          <ul className="bands rise">
            {BANDS.map((x, i) => (
              <li key={x.name}><button type="button" aria-pressed={i === band} onClick={() => setBand(i)} onFocus={() => setBand(i)}>
                <span className="step-mark" aria-hidden="true" />{x.name}</button></li>
            ))}
          </ul>
          <div className="explain rise" style={{ ["--i" as string]: 1 }} aria-live="polite">
            <p className="rules">{b.rules}</p>
            <div className="grades" role="group" aria-label={b.cii ? "Choose a CII rating" : "Choose a progress level"}>
              {GRADES.map((g) => (
                <button key={g} type="button" className="notch" aria-pressed={g === grade} onClick={() => setGrade(g)} style={{ background: GRADE_COLOUR[g] }} aria-label={`${b.cii ? "Rating" : "Level"} ${g}`}>{g}</button>
              ))}
            </div>
            <div className="verdict">
              <span className="letter notch" style={{ background: GRADE_COLOUR[grade] }} aria-hidden="true">{grade}</span>
              <div>
                <h3>{meaning[0]}</h3>
                <p>{meaning[1]}</p>
              </div>
            </div>
            <p className="checks"><b>How we verify it:</b> {b.checks}</p>
            <a className="btn notch" href={mailto(`Carbioo AI for ${b.name} vessels`, `We operate vessels in the ${b.name} range and would like a walkthrough of Carbioo AI.`)}>Talk to us about your fleet <span className="arrow" aria-hidden="true">→</span></a>
          </div>
        </section>

        <section id="contact" className="contact" aria-labelledby="contact-title" data-reveal>
          <figure className="harbour notch rise">
            <img src="/media/container-terminal.jpg" width="1920" height="1264" alt="Container ships alongside the cranes of a deep-water container terminal" loading="lazy" />
          </figure>
          <div className="coupon rise" style={{ ["--i" as string]: 1 }}>
            <div className="coupon-left">
              <h2 id="contact-title">Bring your fleet aboard</h2>
              <p>Tell us about your fleet, your port or your agency, and we will walk you through the platform with your vessels in mind. Or write to <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>
            </div>
            <form onSubmit={submit}>
              <label className="sr" htmlFor="f-name">Your name</label>
              <input id="f-name" name="name" placeholder="Your name" required autoComplete="name" />
              <label className="sr" htmlFor="f-company">Company</label>
              <input id="f-company" name="company" placeholder="Company or agency" autoComplete="organization" />
              <label className="sr" htmlFor="f-email">Email</label>
              <input id="f-email" name="email" type="email" placeholder="Work email" required autoComplete="email" />
              <label className="sr" htmlFor="f-fleet">Fleet size</label>
              <select id="f-fleet" name="fleet" defaultValue="">
                <option value="" disabled>How many vessels?</option>
                <option>1 to 5</option><option>6 to 20</option><option>21 to 100</option><option>More than 100</option><option>Regulator or partner</option>
              </select>
              <button className="btn dark" type="submit">Request a walkthrough <span className="arrow" aria-hidden="true">→</span></button>
            </form>
          </div>
        </section>
      </main>

      <footer className="foot" data-reveal>
        <div className="blocks" aria-label="Carbioo">
          {"CARBIOO".split("").map((ch, i) => (
            <span key={i} style={{ ["--i" as string]: i, background: GRADE_COLOUR[GRADES[i % 5]], height: `${[100, 82, 92, 70, 88, 76, 96][i]}%` }} aria-hidden="true">{ch}</span>
          ))}
        </div>
        <div className="foot-grid">
          <div><span className="lab">Product</span><a href="#how">How it works</a><a href="#platform">Platform</a><a href="#ratings">Ratings</a></div>
          <div><span className="lab">Company</span><a href="#contact">Contact</a><a href="https://www.linkedin.com/company/carbiooai/" rel="noopener">LinkedIn</a></div>
          <div><Logo link={false} size={34} /><p style={{ marginTop: 14 }}>Maritime carbon intelligence for fleets, ports and regulators.</p><a href={`mailto:${EMAIL}`}>{EMAIL}</a></div>
        </div>
        <div className="legal">
          <span>© 2026 Carbioo AI. Carbioo AI® is a UK trademark.</span>
          <a href="#top">Back to top ↑</a>
        </div>
        <p className="credits">Pictures: <a href="https://commons.wikimedia.org/wiki/File:Apapa_port.lagos.jpg">“Apapa port.lagos”</a> by Quadrex24, <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>; <a href="https://commons.wikimedia.org/w/index.php?curid=56614530">“Container ship Reecon Whale on Black Sea”</a> by HopsonRoad, <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>; <a href="https://commons.wikimedia.org/w/index.php?curid=5751536">“Freeport, Malta”</a> by foxypar4, <a href="https://creativecommons.org/licenses/by/2.0">CC BY 2.0</a>; all via Wikimedia Commons. Product screens and footage are Carbioo AI’s own, with demonstration data.</p>
      </footer>
    </div>
  );
}


