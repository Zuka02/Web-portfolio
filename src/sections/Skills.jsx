import { useEffect, useRef, useState } from 'react'

const content = {
  bs: {
    section: 'Vještine',
    titleFirst: 'Alati koje koristim.',
    titleSecond: 'Način na koji radim.',
    description:
      'Tehničko znanje razvijam kroz projekte, a komunikaciju i organizaciju kroz rad s ljudima.',
    languages: 'Jezici',
    bosnian: 'Bosanski — maternji',
    english: 'Engleski — napredni nivo',
  },
  en: {
    section: 'Skills',
    titleFirst: 'Tools I use.',
    titleSecond: 'How I work.',
    description:
      'I develop my technical skills through projects and my communication and organization skills through working with people.',
    languages: 'Languages',
    bosnian: 'Bosnian — native',
    english: 'English — advanced',
  },
}

const skillGroups = [
  {
    number: '01',
    title: { bs: 'Web razvoj', en: 'Web development' },
    items: [
      { bs: 'HTML i CSS', en: 'HTML and CSS' },
      { bs: 'JavaScript', en: 'JavaScript' },
      { bs: 'React', en: 'React' },
      { bs: 'Next.js', en: 'Next.js' },
      { bs: 'Node.js', en: 'Node.js' },
      { bs: 'Tailwind CSS', en: 'Tailwind CSS' },
    ],
  },
  {
    number: '02',
    title: { bs: 'Podaci i alati', en: 'Data and tools' },
    items: [
      { bs: 'SQL i PostgreSQL', en: 'SQL and PostgreSQL' },
      { bs: 'Git i GitHub', en: 'Git and GitHub' },
      { bs: 'Postman', en: 'Postman' },
      { bs: 'Firebase', en: 'Firebase' },
    ],
  },
  {
    number: '03',
    title: { bs: 'Rad s ljudima', en: 'Working with people' },
    items: [
      { bs: 'Komunikacija s klijentima', en: 'Client communication' },
      { bs: 'Organizacija posla', en: 'Organizing work' },
      { bs: 'Rad s podacima', en: 'Working with data' },
      { bs: 'Timski rad', en: 'Teamwork' },
    ],
  },
]

function SkillGroup({ group, language }) {
  const groupRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 },
    )

    const element = groupRef.current

    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={groupRef}
      className={`skill-group border-b border-[#D9E1EC] py-8 md:border-r md:px-7 md:last:border-r-0 md:first:pl-0 ${
        isVisible ? 'skill-group-visible' : ''
      }`}
    >
      <div className="skill-group-heading">
        <span className="text-xs font-medium text-[#4C84CF]">
          {group.number} / 03
        </span>

        <h3 className="mt-5 text-xl font-semibold tracking-tight">
          {group.title[language]}
        </h3>
      </div>

      <ul className="mt-6">
        {group.items.map((item, index) => (
          <li
            key={index}
            className="skill-item flex items-center gap-3 border-t border-[#D9E1EC] py-3 text-sm text-[#526781]"
            style={{ animationDelay: `${180 + index * 90}ms` }}
          >
            <span
              className="skill-dot h-1.5 w-1.5 shrink-0 rounded-full bg-[#5B93DF]"
              aria-hidden="true"
            />
            {item[language]}
          </li>
        ))}
      </ul>
    </div>
  )
}

function Skills({ language = 'bs' }) {
  const headingRef = useRef(null)
  const languagesRef = useRef(null)
  const [headingVisible, setHeadingVisible] = useState(false)
  const [languagesVisible, setLanguagesVisible] = useState(false)
  const text = content[language] ?? content.bs

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === headingRef.current) {
            setHeadingVisible(entry.isIntersecting)
          }

          if (entry.target === languagesRef.current) {
            setLanguagesVisible(entry.isIntersecting)
          }
        })
      },
      { threshold: 0.2 },
    )

    const heading = headingRef.current
    const languages = languagesRef.current

    if (heading) observer.observe(heading)
    if (languages) observer.observe(languages)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="vjestine"
      className="relative isolate scroll-mt-20 overflow-hidden bg-[#F5F7FB] px-6 py-20 text-[#101827] lg:px-10 lg:py-24"
    >
      <style>{`
        .skills-background-lines {
          background-image: linear-gradient(
            to bottom,
            rgba(91, 147, 223, 0.13) 1px,
            transparent 1px
          );
          background-size: 100% 72px;
          mask-image: linear-gradient(
            to right,
            transparent,
            black 20%,
            black 80%,
            transparent
          );
          animation: skillsLinesMove 18s linear infinite;
        }

        .skills-background-glow {
          animation: skillsGlowMove 14s ease-in-out infinite;
        }

        .skills-heading-visible,
        .skill-group-visible .skill-group-heading,
        .skills-languages-visible {
          animation: skillsRise 650ms ease-out both;
        }

        .skill-group-visible .skill-item {
          animation: skillItemIn 500ms ease-out both;
        }

        .skill-group-visible .skill-dot {
          animation: skillDotPulse 500ms ease-out both;
        }

        @keyframes skillsLinesMove {
          to {
            background-position: 0 72px;
          }
        }

        @keyframes skillsGlowMove {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(120px);
          }
        }

        @keyframes skillsRise {
          from {
            opacity: 0.35;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes skillItemIn {
          from {
            opacity: 0.25;
            transform: translateX(-18px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes skillDotPulse {
          50% {
            transform: scale(1.8);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .skills-heading-visible,
          .skill-group-visible .skill-group-heading,
          .skill-group-visible .skill-item,
          .skills-languages-visible,
          .skill-group-visible .skill-dot,
          .skills-background-lines,
          .skills-background-glow {
            animation: none;
          }
        }
      `}</style>

      <div
        aria-hidden="true"
        className="skills-background-lines pointer-events-none absolute inset-0"
      />

      <div
        aria-hidden="true"
        className="skills-background-glow pointer-events-none absolute -left-52 top-24 h-[450px] w-[450px] rounded-full bg-[#8DBCF7]/20 blur-[90px]"
      />

      <div className="relative mx-auto max-w-7xl">
        <div
          ref={headingRef}
          className={`skills-heading ${
            headingVisible ? 'skills-heading-visible' : ''
          }`}
        >
          <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[#526781]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5B93DF]" />
            <span>04 / {text.section}</span>
          </div>

          <div className="mt-11 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
            <h2 className="max-w-lg text-[clamp(2.5rem,4vw,4rem)] font-semibold leading-[1.08] tracking-[-0.06em]">
              {text.titleFirst}
              <br />
              <span className="text-[#4C84CF]">{text.titleSecond}</span>
            </h2>

            <p className="max-w-2xl text-base leading-8 text-[#526781] lg:pt-2">
              {text.description}
            </p>
          </div>
        </div>

        <div className="mt-14 grid border-t border-[#D9E1EC] md:grid-cols-3">
          {skillGroups.map((group) => (
            <SkillGroup
              key={group.number}
              group={group}
              language={language}
            />
          ))}
        </div>

        <div
          ref={languagesRef}
          className={`skills-languages mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm ${
            languagesVisible ? 'skills-languages-visible' : ''
          }`}
        >
          <span className="font-semibold text-[#101827]">
            {text.languages}
          </span>
          <span className="text-[#526781]">{text.bosnian}</span>
          <span className="text-[#526781]">{text.english}</span>
        </div>
      </div>
    </section>
  )
}

export default Skills