import { useEffect, useRef, useState } from 'react'

const content = {
  bs: {
    section: 'O meni',
    titleFirst: 'Tehnologija',
    titleSecond: 'i ljudi.',
    firstParagraph:
      'Apsolvent sam informacionih tehnologija i volim pretvarati ideje u korisne web projekte. Kroz različite poslove stekao sam iskustvo u komunikaciji s ljudima, radu s informacijama i organizaciji svakodnevnih zadataka.',
    secondParagraph:
      'Pristupam poslu odgovorno, volim učiti i nastojim razumjeti problem prije nego što krenem tražiti rješenje.',
    items: [
      {
        title: 'IT i projekti',
        description:
          'Razvoj web i mobilnih projekata kroz studij, praksu i vlastiti rad.',
      },
      {
        title: 'Komunikacija',
        description:
          'Rad s klijentima i ispitanicima, slušanje potreba i jasan dogovor.',
      },
      {
        title: 'Odgovornost',
        description:
          'Organizacija obaveza, pažnja prema detaljima i spremnost na učenje.',
      },
    ],
  },
  en: {
    section: 'About me',
    titleFirst: 'Technology',
    titleSecond: 'and people.',
    firstParagraph:
      'I am a final-year Information Technology student who enjoys turning ideas into useful web projects. Through different jobs, I have gained experience communicating with people, working with information, and organizing day-to-day tasks.',
    secondParagraph:
      'I approach work responsibly, enjoy learning, and try to understand a problem before looking for a solution.',
    items: [
      {
        title: 'IT and projects',
        description:
          'Building web and mobile projects through my studies, internship, and independent work.',
      },
      {
        title: 'Communication',
        description:
          'Working with clients and survey participants, listening to their needs, and communicating clearly.',
      },
      {
        title: 'Responsibility',
        description:
          'Organizing tasks, paying attention to detail, and being ready to learn.',
      },
    ],
  },
}

function About({ language = 'bs' }) {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const text = content[language] ?? content.bs

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.15 },
    )

    const section = sectionRef.current

    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="o-meni"
      className={`about-section relative isolate scroll-mt-20 overflow-hidden bg-[#F5F7FB] px-6 py-20 text-[#101827] lg:px-10 lg:py-24 ${
        isVisible ? 'about-visible' : ''
      }`}
    >
      <style>{`
        .about-label,
        .about-title,
        .about-copy,
        .about-item {
          opacity: 0;
        }

        .about-title {
          clip-path: inset(0 100% 0 0);
        }

        .about-copy {
          transform: translateX(35px);
        }

        .about-item {
          transform: translateY(35px);
        }

        .about-visible .about-label {
          animation: aboutFade 500ms ease-out 50ms forwards;
        }

        .about-visible .about-title {
          animation: aboutWipe 850ms cubic-bezier(.22, 1, .36, 1) 150ms forwards;
        }

        .about-visible .about-copy {
          animation: aboutSlide 700ms cubic-bezier(.22, 1, .36, 1) 350ms forwards;
        }

        .about-visible .about-item:nth-child(1) {
          animation: aboutRise 650ms ease-out 500ms forwards;
        }

        .about-visible .about-item:nth-child(2) {
          animation: aboutRise 650ms ease-out 650ms forwards;
        }

        .about-visible .about-item:nth-child(3) {
          animation: aboutRise 650ms ease-out 800ms forwards;
        }

        .about-ambient {
          background: radial-gradient(
            circle,
            rgba(91, 147, 223, 0.13) 0%,
            rgba(91, 147, 223, 0) 65%
          );
          animation: aboutAmbientMove 14s ease-in-out infinite;
        }

        .about-rings {
          animation: aboutRingsRotate 35s linear infinite;
        }

        @keyframes aboutFade {
          to { opacity: 1; }
        }

        @keyframes aboutWipe {
          to {
            opacity: 1;
            clip-path: inset(0 0 0 0);
          }
        }

        @keyframes aboutSlide {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes aboutRise {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes aboutAmbientMove {
          0%, 100% {
            transform: translate(-15%, 0);
          }
          50% {
            transform: translate(30%, -10%);
          }
        }

        @keyframes aboutRingsRotate {
          to {
            transform: rotate(360deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .about-label,
          .about-title,
          .about-copy,
          .about-item {
            animation: none !important;
            opacity: 1;
            transform: none;
            clip-path: none;
          }

          .about-ambient,
          .about-rings {
            animation: none;
          }
        }
      `}</style>

      <div
        aria-hidden="true"
        className="about-ambient pointer-events-none absolute -left-40 top-0 h-[600px] w-[600px]"
      />

      <div
        aria-hidden="true"
        className="about-rings pointer-events-none absolute -right-48 top-20 h-[420px] w-[420px] rounded-full border border-[#5B93DF]/10"
      >
        <span className="absolute inset-12 rounded-full border border-[#5B93DF]/10" />
        <span className="absolute inset-28 rounded-full border border-[#5B93DF]/10" />
        <span className="absolute left-1/2 top-0 h-2 w-2 rounded-full bg-[#5B93DF]/30" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="about-label flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[#526781]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#5B93DF]" />
          <span>01 / {text.section}</span>
        </div>

        <div className="mt-11 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
          <div>
            <h2 className="about-title max-w-md text-[clamp(2.5rem,4vw,4rem)] font-semibold leading-[1.08] tracking-[-0.06em]">
              {text.titleFirst}
              <br />
              <span className="text-[#4C84CF]">{text.titleSecond}</span>
            </h2>
          </div>

          <div className="about-copy lg:pt-2">
            <p className="max-w-2xl text-base leading-8 text-[#26364D] sm:text-lg">
              {text.firstParagraph}
            </p>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#64748B] sm:text-base">
              {text.secondParagraph}
            </p>
          </div>
        </div>

        <div className="mt-14 grid border-t border-[#D9E1EC] md:grid-cols-3">
          {text.items.map((item, index) => (
            <div
              key={index}
              className="about-item border-b border-[#D9E1EC] py-7 transition-colors duration-300 hover:bg-[#EBF2FC] md:border-r md:px-7 md:last:border-r-0 md:first:pl-0"
            >
              <span className="text-xs font-medium text-[#4C84CF]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#64748B]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About