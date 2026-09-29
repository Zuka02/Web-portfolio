import { useEffect, useRef, useState } from 'react'

const experiences = [
  {
    company: 'Dubinsko čišćenje Zuka',
    period: { bs: '2026 — danas', en: '2026 — present' },
    category: { bs: 'Samostalni rad', en: 'Independent work' },
    role: {
      bs: 'Pružanje usluga dubinskog čišćenja',
      en: 'Deep cleaning services',
    },
    description: {
      bs: 'Dubinsko čišćenje namještaja i automobila, komunikacija s klijentima, dogovaranje termina i online promocija usluga.',
      en: 'Deep cleaning of furniture and car interiors, communicating with clients, scheduling appointments, and promoting services online.',
    },
  },
  {
    company: 'HulkApps',
    period: { bs: '2024', en: '2024' },
    category: { bs: 'Praksa', en: 'Internship' },
    role: { bs: 'Praksa u web razvoju', en: 'Web development intern' },
    description: {
      bs: 'Rad na razvoju web aplikacija u timskom okruženju, uz React i Node.js.',
      en: 'Worked on web applications in a team environment using React and Node.js.',
    },
  },
  {
    company: 'Tepih servis „Aga“',
    period: { bs: '2023–2026', en: '2023–2026' },
    category: { bs: 'Radno iskustvo', en: 'Work experience' },
    role: {
      bs: 'Dubinsko čišćenje i pranje tepiha',
      en: 'Deep cleaning and carpet washing',
    },
    description: {
      bs: 'Rad s opremom, održavanje i organizacija prostora te odgovornost u svakodnevnom radu.',
      en: 'Worked with cleaning equipment, maintained and organized the workspace, and handled day-to-day responsibilities.',
    },
  },
  {
    company: 'Urban Drive',
    period: { bs: '2025', en: '2025' },
    category: { bs: 'Web projekat', en: 'Web project' },
    role: { bs: 'Član projektnog tima', en: 'Project team member' },
    description: {
      bs: 'Učešće u izradi web stranice za predstavljanje ponude iznajmljivanja automobila.',
      en: 'Contributed to a website presenting car rental services and available vehicles.',
    },
  },
  {
    company: 'Taka d.o.o.',
    period: { bs: '2025', en: '2025' },
    category: { bs: 'Radno iskustvo', en: 'Work experience' },
    role: { bs: 'Analitičar utakmica', en: 'Football match analyst' },
    description: {
      bs: 'Analiza nogometnih utakmica, bilježenje podataka i izvještavanje.',
      en: 'Analyzed football matches, recorded data, and prepared reports.',
    },
  },
  {
    company: 'Valicon d.o.o.',
    period: { bs: '2024', en: '2024' },
    category: { bs: 'Radno iskustvo', en: 'Work experience' },
    role: { bs: 'Telefonski anketar', en: 'Telephone survey interviewer' },
    description: {
      bs: 'Komunikacija s različitim ljudima i prikupljanje podataka putem telefonskih anketa.',
      en: 'Communicated with a range of respondents and collected data through telephone surveys.',
    },
  },
]

const intro = {
  bs: {
    section: 'Iskustvo',
    titleFirst: 'Iskustvo kroz',
    titleSecond: 'različite uloge.',
    description:
      'Od web razvoja i timskih projekata do rada s ljudima i podacima. Svaka uloga pomogla mi je da razvijem nove vještine i preuzmem više odgovornosti.',
  },
  en: {
    section: 'Experience',
    titleFirst: 'Experience across',
    titleSecond: 'different roles.',
    description:
      'From web development and team projects to working with people and data. Each role has helped me develop new skills and take on more responsibility.',
  },
}

function useInView(threshold = 0.2) {
  const elementRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold },
    )

    const element = elementRef.current

    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [threshold])

  return [elementRef, isVisible]
}

function ExperienceRow({ experience, index, language }) {
  const [rowRef, isVisible] = useInView(0.2)

  return (
    <article
      ref={rowRef}
      className={`experience-row grid gap-5 border-b border-white/15 py-8 transition-colors hover:bg-white/[0.03] md:grid-cols-[0.8fr_1.2fr] md:gap-10 md:py-9 ${
        isVisible ? 'experience-row-visible' : ''
      }`}
    >
      <div className="experience-row-meta flex items-start gap-5">
        <span className="pt-1 text-xs font-medium text-[#8DBCF7]">
          {String(index + 1).padStart(2, '0')}
        </span>

        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-[#A4B2C8]">
            {experience.category[language]}
          </p>
          <p className="mt-2 text-sm text-[#8B9DB6]">
            {experience.period[language]}
          </p>
        </div>
      </div>

      <div className="experience-row-content">
        <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
          {experience.company}
        </h3>

        <p className="mt-2 text-sm font-medium text-[#8DBCF7]">
          {experience.role[language]}
        </p>

        <p className="mt-4 max-w-2xl text-sm leading-7 text-[#C5D2E3] sm:text-base">
          {experience.description[language]}
        </p>
      </div>
    </article>
  )
}

function Experience({ language = 'bs' }) {
  const [introRef, introVisible] = useInView(0.2)
  const text = intro[language] ?? intro.bs

  return (
    <section
      id="iskustvo"
      className="relative isolate scroll-mt-20 overflow-hidden bg-[#101827] px-6 py-20 text-white lg:px-10 lg:py-24"
    >
      <style>{`
        .experience-intro,
        .experience-row-meta,
        .experience-row-content {
          opacity: 0;
        }

        .experience-intro {
          transform: translateY(25px);
        }

        .experience-row-meta {
          transform: translateX(-25px);
        }

        .experience-row-content {
          transform: translateX(25px);
        }

        .experience-intro-visible {
          animation: experienceIntro 700ms ease-out forwards;
        }

        .experience-row-visible .experience-row-meta {
          animation: experienceFromLeft 650ms ease-out forwards;
        }

        .experience-row-visible .experience-row-content {
          animation: experienceFromRight 650ms ease-out 120ms forwards;
        }

        .experience-background-lines {
          background-image: linear-gradient(
            90deg,
            rgba(141, 188, 247, 0.08) 1px,
            transparent 1px
          );
          background-size: 110px 100%;
          mask-image: linear-gradient(
            to right,
            transparent,
            black 20%,
            black 80%,
            transparent
          );
          animation: experienceLinesMove 24s linear infinite;
        }

        .experience-background-glow {
          animation: experienceGlowMove 13s ease-in-out infinite;
        }

        @keyframes experienceIntro {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes experienceFromLeft {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes experienceFromRight {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes experienceLinesMove {
          to {
            background-position: 110px 0;
          }
        }

        @keyframes experienceGlowMove {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.6;
          }
          50% {
            transform: translate(90px, 100px);
            opacity: 1;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .experience-intro,
          .experience-row-meta,
          .experience-row-content {
            animation: none !important;
            opacity: 1;
            transform: none;
          }

          .experience-background-lines,
          .experience-background-glow {
            animation: none;
          }
        }
      `}</style>

      <div
        aria-hidden="true"
        className="experience-background-lines pointer-events-none absolute inset-0"
      />

      <div
        aria-hidden="true"
        className="experience-background-glow pointer-events-none absolute -left-48 top-20 h-[400px] w-[400px] rounded-full bg-[#3B82F6]/10 blur-[110px]"
      />

      <div className="relative mx-auto max-w-7xl">
        <div
          ref={introRef}
          className={`experience-intro ${
            introVisible ? 'experience-intro-visible' : ''
          }`}
        >
          <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[#A4B2C8]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#7DB4FA]" />
            <span>02 / {text.section}</span>
          </div>

          <div className="mt-11 grid gap-6 pb-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
            <h2 className="max-w-lg text-[clamp(2.5rem,4vw,4rem)] font-semibold leading-[1.08] tracking-[-0.06em]">
              {text.titleFirst}
              <br />
              <span className="text-[#8DBCF7]">{text.titleSecond}</span>
            </h2>

            <p className="max-w-2xl text-base leading-8 text-[#C5D2E3] lg:pt-2">
              {text.description}
            </p>
          </div>
        </div>

        <div className="border-t border-white/15">
          {experiences.map((experience, index) => (
            <ExperienceRow
              key={experience.company}
              experience={experience}
              index={index}
              language={language}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience