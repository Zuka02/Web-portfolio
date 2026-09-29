import { useEffect, useRef, useState } from 'react'

const content = {
  bs: {
    section: 'Obrazovanje',
    titleFirst: 'Znanje koje',
    titleSecond: 'stalno nadograđujem.',
    description:
      'Od elektrotehnike do informacionih tehnologija i praktičnog rada na projektima.',
    currentPeriod: '2021 — danas',
    university: 'Prirodno-matematički fakultet u Sarajevu',
    status: 'Studij u toku',
    universityProgram: 'Stručni studij informacionih tehnologija',
    school: 'Elektrotehnička škola za energetiku',
    schoolProgram: 'Elektrotehničar energetike',
  },
  en: {
    section: 'Education',
    titleFirst: 'Knowledge I',
    titleSecond: 'keep building.',
    description:
      'From electrical engineering to information technology and practical project work.',
    currentPeriod: '2021 — present',
    university: 'Faculty of Science, University of Sarajevo',
    status: 'Studies in progress',
    universityProgram: 'Professional studies in Information Technology',
    school: 'Electrical Engineering School for Energy',
    schoolProgram: 'Electrical Engineering Technician — Energy',
  },
}

function Education({ language = 'bs' }) {
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

  return (
    <section
      ref={sectionRef}
      id="obrazovanje"
      className={`education-section relative isolate scroll-mt-20 overflow-hidden bg-white px-6 py-20 text-[#101827] lg:px-10 lg:py-24 ${
        isVisible ? 'education-visible' : ''
      }`}
    >
      <style>{`
        .education-background-light {
          background: linear-gradient(
            120deg,
            transparent 30%,
            rgba(141, 188, 247, 0.16) 50%,
            transparent 70%
          );
          animation: educationLightMove 14s ease-in-out infinite;
        }

        .education-background-circle {
          animation: educationCircleFloat 12s ease-in-out infinite;
        }

        .education-line {
          transform: scaleY(0);
          transform-origin: top;
        }

        .education-visible .education-heading {
          animation: educationHeadingIn 650ms ease-out both;
        }

        .education-visible .education-line {
          animation: educationLineIn 900ms ease-out 350ms forwards;
        }

        .education-visible .education-entry:nth-of-type(1) {
          animation: educationEntryIn 650ms ease-out 500ms both;
        }

        .education-visible .education-entry:nth-of-type(2) {
          animation: educationEntryIn 650ms ease-out 800ms both;
        }

        @keyframes educationLightMove {
          0%, 100% {
            transform: translateX(-45%);
          }
          50% {
            transform: translateX(45%);
          }
        }

        @keyframes educationCircleFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-45px);
          }
        }

        @keyframes educationHeadingIn {
          from {
            opacity: 0.35;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes educationLineIn {
          to {
            transform: scaleY(1);
          }
        }

        @keyframes educationEntryIn {
          from {
            opacity: 0.25;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .education-background-light,
          .education-background-circle,
          .education-heading,
          .education-entry {
            animation: none !important;
          }

          .education-line {
            animation: none !important;
            transform: none;
          }
        }
      `}</style>

      <div
        aria-hidden="true"
        className="education-background-light pointer-events-none absolute -inset-x-1/2 inset-y-0"
      />

      <div
        aria-hidden="true"
        className="education-background-circle pointer-events-none absolute -right-44 top-16 h-[360px] w-[360px] rounded-full border border-[#5B93DF]/15"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="education-heading">
          <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[#526781]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5B93DF]" />
            <span>05 / {text.section}</span>
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

        <div className="relative mt-14 border-t border-[#D9E1EC]">
          <span
            aria-hidden="true"
            className="education-line absolute bottom-0 left-0 top-0 w-0.5 bg-[#8DBCF7]"
          />

          <article className="education-entry grid gap-5 border-b border-[#D9E1EC] py-8 pl-6 md:grid-cols-[0.8fr_1.2fr] md:gap-10 md:py-10">
            <div className="flex items-start gap-5">
              <span className="pt-1 text-xs font-medium text-[#4C84CF]">
                01
              </span>
              <span className="text-sm text-[#64748B]">
                {text.currentPeriod}
              </span>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  {text.university}
                </h3>

                <span className="rounded-full border border-[#BCD3F0] bg-[#EEF5FE] px-3 py-1 text-xs font-medium text-[#376BAE]">
                  {text.status}
                </span>
              </div>

              <p className="mt-3 text-base text-[#526781]">
                {text.universityProgram}
              </p>
            </div>
          </article>

          <article className="education-entry grid gap-5 border-b border-[#D9E1EC] py-8 pl-6 md:grid-cols-[0.8fr_1.2fr] md:gap-10 md:py-10">
            <div className="flex items-start gap-5">
              <span className="pt-1 text-xs font-medium text-[#4C84CF]">
                02
              </span>
              <span className="text-sm text-[#64748B]">
                2017 — 2021
              </span>
            </div>

            <div>
              <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                {text.school}
              </h3>

              <p className="mt-3 text-base text-[#526781]">
                {text.schoolProgram}
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

export default Education