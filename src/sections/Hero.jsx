import { useEffect, useRef, useState } from 'react'

const content = {
  bs: {
    portfolio: 'Lični portfolio',
    location: 'Sarajevo, BiH',
    greeting: 'Zdravo, ja sam',
    aboutLabel: 'O meni ukratko',
    description:
      'Apsolvent informacionih tehnologija s iskustvom u izradi web projekata, radu s ljudima i organizaciji svakodnevnih poslova. Volim učiti, preuzeti odgovornost i pronaći praktično rješenje.',
    experienceButton: 'Pogledaj iskustvo',
    projectsButton: 'Istraži projekte',
    bottomLabel: 'IT · Projekti · Radno iskustvo',
    scroll: 'Skrolaj dalje',
  },
  en: {
    portfolio: 'Personal portfolio',
    location: 'Sarajevo, Bosnia and Herzegovina',
    greeting: "Hi, I'm",
    aboutLabel: 'A little about me',
    description:
      'I am a final-year Information Technology student with experience building web projects, working with people, and organizing day-to-day tasks. I enjoy learning, taking responsibility, and finding practical solutions.',
    experienceButton: 'View experience',
    projectsButton: 'Explore projects',
    bottomLabel: 'IT · Projects · Work experience',
    scroll: 'Scroll down',
  },
}

function Hero({ language = 'bs' }) {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const text = content[language] ?? content.bs

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 },
    )

    const section = sectionRef.current

    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  const revealClass = isVisible ? 'hero-reveal' : 'hero-hidden'

  return (
    <section
      ref={sectionRef}
      id="pocetna"
      className="relative isolate scroll-mt-20 overflow-hidden bg-[#101827] text-white"
    >
      <style>{`
        @keyframes heroReveal {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes heroGlow {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.7;
          }
          50% {
            transform: translate(-35px, 35px) scale(1.15);
            opacity: 1;
          }
        }

        @keyframes heroOrbFloat {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(55px, -35px) scale(1.2);
          }
        }

        @keyframes heroDotsDrift {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 36px 36px;
          }
        }

        .hero-hidden {
          opacity: 0;
        }

        .hero-reveal {
          opacity: 0;
          animation: heroReveal 700ms ease-out forwards;
        }

        .hero-glow {
          animation: heroGlow 9s ease-in-out infinite;
        }

        .hero-orb {
          animation: heroOrbFloat 12s ease-in-out infinite;
        }

        .hero-dots {
          background-image: radial-gradient(
            circle,
            rgba(141, 188, 247, 0.22) 1px,
            transparent 1px
          );
          background-size: 36px 36px;
          mask-image: linear-gradient(
            to right,
            transparent,
            black 35%,
            black 85%,
            transparent
          );
          animation: heroDotsDrift 16s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-hidden,
          .hero-reveal {
            animation: none;
            opacity: 1;
            transform: none;
          }

          .hero-glow,
          .hero-orb,
          .hero-dots {
            animation: none;
          }
        }
      `}</style>

      <div
        aria-hidden="true"
        className="hero-dots pointer-events-none absolute inset-0 opacity-35"
      />

      <div
        aria-hidden="true"
        className="hero-glow pointer-events-none absolute -right-40 -top-48 h-[450px] w-[450px] rounded-full bg-[#3B82F6]/10 blur-[110px]"
      />

      <div
        aria-hidden="true"
        className="hero-orb pointer-events-none absolute -bottom-44 left-1/4 h-[350px] w-[350px] rounded-full bg-[#5B93DF]/10 blur-[100px]"
      />

      <div className="relative mx-auto max-w-7xl px-6 pb-12 pt-16 sm:pt-20 lg:px-10 lg:pb-14 lg:pt-24">
        <div
          className={`${revealClass} flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[#A4B2C8]`}
          style={{ animationDelay: '80ms' }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#7DB4FA]" />
          <span>{text.portfolio}</span>
          <span className="mx-1 text-[#64748B]">/</span>
          <span>{text.location}</span>
        </div>

        <div className="mt-11">
          <p
            className={`${revealClass} mb-3 text-sm text-[#A9C9F5] sm:text-base`}
            style={{ animationDelay: '180ms' }}
          >
            {text.greeting}
          </p>

          <h1
            className={`${revealClass} text-[clamp(3.5rem,7vw,6.5rem)] font-semibold leading-[0.96] tracking-[-0.075em]`}
            style={{ animationDelay: '280ms' }}
          >
            Asmir <span className="text-[#8DBCF7]">Zukić.</span>
          </h1>
        </div>

        <div
          className={`${revealClass} mt-12 grid gap-6 border-t border-white/15 pt-7 md:grid-cols-[0.8fr_1.2fr] md:gap-10 lg:mt-14`}
          style={{ animationDelay: '420ms' }}
        >
          <div className="flex items-start gap-3">
            <span className="mt-2 h-px w-7 bg-[#8DBCF7]" />
            <p className="text-xs uppercase tracking-[0.14em] text-[#A4B2C8]">
              {text.aboutLabel}
            </p>
          </div>

          <div>
            <p className="max-w-2xl text-base leading-relaxed text-[#E0E8F3] sm:text-lg">
              {text.description}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#iskustvo"
                className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-[#8DBCF7] px-5 text-sm font-semibold text-[#101827] transition-all duration-300 hover:-translate-y-1 hover:bg-[#B6D4FA] hover:shadow-[0_12px_30px_rgba(91,147,223,0.25)]"
              >
                {text.experienceButton}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
              </a>

              <a
                href="#projekti"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 px-5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:border-[#8DBCF7] hover:text-[#8DBCF7]"
              >
                {text.projectsButton}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
                  <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
                  <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
                  <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div
          className={`${revealClass} mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-white/15 pt-5 text-[11px] uppercase tracking-[0.13em] text-[#9AACC4]`}
          style={{ animationDelay: '600ms' }}
        >
          <span>{text.bottomLabel}</span>
          <a
            href="#o-meni"
            className="transition-colors hover:text-white"
          >
            {text.scroll} ↓
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero