import { useEffect, useRef, useState } from 'react'

const projects = [
  {
    number: '01',
    category: { bs: 'WEB APLIKACIJA', en: 'WEB APPLICATION' },
    title: 'StudyFlow',
    description: {
      bs: 'Platforma za učenje s predmetima, materijalima, kvizovima, flashcards karticama, statistikom i praćenjem napretka studenata.',
      en: 'A learning platform with courses, materials, quizzes, flashcards, statistics, and student progress tracking.',
    },
    technologies: ['React', 'Node.js', 'Express', 'PostgreSQL'],
  },
  {
    number: '02',
    category: { bs: 'WEB STRANICA', en: 'WEBSITE' },
    title: 'Urban Drive',
    description: {
      bs: 'Web stranica za predstavljanje ponude i usluga iznajmljivanja automobila.',
      en: 'A website presenting a car rental company’s vehicles and services.',
    },
    technologies: ['HTML', 'Tailwind CSS', 'JavaScript'],
  },
  {
    number: '03',
    category: { bs: 'WEB STRANICA', en: 'WEBSITE' },
    title: 'Dubinsko čišćenje Zuka',
    description: {
      bs: 'Poslovna web stranica za predstavljanje usluga dubinskog čišćenja i direktan kontakt s klijentima.',
      en: 'A business website showcasing deep cleaning services and providing a direct way for clients to get in touch.',
    },
    technologies: ['HTML', 'Tailwind CSS', 'JavaScript'],
  },
  {
    number: '04',
    category: { bs: 'MOBILNA APLIKACIJA', en: 'MOBILE APPLICATION' },
    title: 'GraspAI',
    description: {
      bs: 'Timski Android projekat s autentifikacijom i upravljanjem podacima, razvijan uz Firebase.',
      en: 'A team Android project with authentication and data management, built using Firebase.',
    },
    technologies: ['Kotlin', 'Jetpack Compose', 'MVVM', 'Firebase'],
  },
  {
    number: '05',
    category: { bs: 'MOBILNA APLIKACIJA', en: 'MOBILE APPLICATION' },
    title: 'FlickInfo',
    description: {
      bs: 'Android aplikacija za pregled i pretragu filmova i recenzija.',
      en: 'An Android application for browsing and searching films and reviews.',
    },
    technologies: ['Kotlin', 'Jetpack Compose'],
  },
  {
    number: '06',
    category: { bs: 'WEB APLIKACIJA', en: 'WEB APPLICATION' },
    title: 'Događaji',
    description: {
      bs: 'Aplikacija za kreiranje i upravljanje događajima, registraciju korisnika, prijave na događaje, recenzije i chat.',
      en: 'An application for creating and managing events, user registration, event sign-ups, reviews, and chat.',
    },
    technologies: ['Node.js'],
  },
  {
    number: '07',
    category: { bs: 'MOBILNA APLIKACIJA', en: 'MOBILE APPLICATION' },
    title: 'Dadilje App',
    description: {
      bs: 'Mobilna aplikacija za usluge čuvanja djece i životinja.',
      en: 'A mobile application for childcare and pet sitting services.',
    },
    technologies: [],
  },
]

const intro = {
  bs: {
    section: 'Projekti',
    titleFirst: 'Ideje pretvorene',
    titleSecond: 'u konkretan rad.',
    description:
      'Izbor web stranica, aplikacija i projekata na kojima sam radio tokom studija i izvan njega.',
  },
  en: {
    section: 'Projects',
    titleFirst: 'Ideas turned',
    titleSecond: 'into real projects.',
    description:
      'A selection of websites, applications, and projects I have worked on during my studies and beyond.',
  },
}

function ProjectCard({ project, total, language }) {
  const cardRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 },
    )

    const card = cardRef.current

    if (card) observer.observe(card)

    return () => observer.disconnect()
  }, [])

  return (
    <article
      ref={cardRef}
      className={`project-card group relative flex min-h-72 flex-col overflow-hidden rounded-2xl border border-[#D9E1EC] bg-[#F5F7FB] p-6 hover:border-[#9DBDE8] hover:bg-[#EEF4FC] sm:p-8 ${
        isVisible ? 'project-card-visible' : ''
      }`}
    >
      <div
        aria-hidden="true"
        className="project-shine pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/70 to-transparent"
      />

      <div className="relative flex items-start justify-between gap-4">
        <span className="text-xs font-medium text-[#4C84CF]">
          {project.number} / {String(total).padStart(2, '0')}
        </span>

        <span className="text-right text-[11px] font-medium uppercase tracking-[0.12em] text-[#64748B]">
          {project.category[language]}
        </span>
      </div>

      <div className="relative mt-9">
        <h3 className="text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
          {project.title}
        </h3>

        <p className="mt-3 max-w-lg text-sm leading-7 text-[#526781]">
          {project.description[language]}
        </p>
      </div>

      {project.technologies.length > 0 && (
        <div className="relative mt-auto flex flex-wrap gap-2 pt-7">
          {project.technologies.map((technology) => (
            <span
              key={technology}
              className="rounded-full border border-[#D9E1EC] bg-white px-3 py-1 text-xs text-[#415A78]"
            >
              {technology}
            </span>
          ))}
        </div>
      )}
    </article>
  )
}

function Projects({ language = 'bs' }) {
  const headingRef = useRef(null)
  const [headingVisible, setHeadingVisible] = useState(false)
  const text = intro[language] ?? intro.bs

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setHeadingVisible(entry.isIntersecting),
      { threshold: 0.2 },
    )

    const heading = headingRef.current

    if (heading) observer.observe(heading)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="projekti"
      className="relative isolate scroll-mt-20 overflow-hidden bg-white px-6 py-20 text-[#101827] lg:px-10 lg:py-24"
    >
      <style>{`
        .projects-heading {
          opacity: 1;
        }

        .projects-heading-visible {
          animation: projectsHeadingIn 650ms ease-out forwards;
        }

        .project-card {
          opacity: 0;
          transform: perspective(900px) translateY(35px) rotateX(8deg) scale(.94);
          transition: border-color 300ms, background-color 300ms, box-shadow 300ms;
        }

        .project-card-visible {
          animation: projectCardIn 700ms cubic-bezier(.22, 1, .36, 1) forwards;
        }

        .project-card-visible:hover {
          box-shadow: 0 18px 45px rgba(25, 55, 95, .12);
        }

        .project-shine {
          opacity: 0;
          transform: translateX(0) rotate(12deg);
          transition: transform 800ms ease, opacity 300ms ease;
        }

        .project-card:hover .project-shine {
          opacity: 1;
          transform: translateX(600%) rotate(12deg);
        }

        .projects-background-orb {
          animation: projectsOrbMove 15s ease-in-out infinite;
        }

        .projects-background-orb-second {
          animation: projectsOrbMoveSecond 19s ease-in-out infinite;
        }

        @keyframes projectsHeadingIn {
          from {
            opacity: 0.4;
            transform: translateY(25px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes projectCardIn {
          to {
            opacity: 1;
            transform: perspective(900px) translateY(0) rotateX(0) scale(1);
          }
        }

        @keyframes projectsOrbMove {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(100px, 80px) scale(1.2);
          }
        }

        @keyframes projectsOrbMoveSecond {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-80px, -70px) scale(1.15);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .projects-heading,
          .project-card {
            animation: none !important;
            opacity: 1;
            transform: none;
          }

          .project-shine {
            display: none;
          }

          .projects-background-orb,
          .projects-background-orb-second {
            animation: none;
          }
        }
      `}</style>

      <div
        aria-hidden="true"
        className="projects-background-orb pointer-events-none absolute -left-48 top-40 h-[500px] w-[500px] rounded-full bg-[#8DBCF7]/25 blur-[75px]"
      />

      <div
        aria-hidden="true"
        className="projects-background-orb-second pointer-events-none absolute -right-52 bottom-20 h-[550px] w-[550px] rounded-full bg-[#5B93DF]/20 blur-[80px]"
      />

      <div className="relative mx-auto max-w-7xl">
        <div
          ref={headingRef}
          className={`projects-heading ${
            headingVisible ? 'projects-heading-visible' : ''
          }`}
        >
          <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[#526781]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5B93DF]" />
            <span>03 / {text.section}</span>
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

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard
              key={project.number}
              project={project}
              total={projects.length}
              language={language}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects