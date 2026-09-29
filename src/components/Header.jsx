import { useEffect, useRef, useState } from 'react'

const links = [
  { bs: 'Početna', en: 'Home', href: '#pocetna' },
  { bs: 'O meni', en: 'About', href: '#o-meni' },
  { bs: 'Iskustvo', en: 'Experience', href: '#iskustvo' },
  { bs: 'Projekti', en: 'Projects', href: '#projekti' },
  { bs: 'Vještine', en: 'Skills', href: '#vjestine' },
  { bs: 'Obrazovanje', en: 'Education', href: '#obrazovanje' },
]

function Header({ language, onLanguageChange }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('#pocetna')
  const [scrollProgress, setScrollProgress] = useState(0)
  const languageMenuRef = useRef(null)

  useEffect(() => {
    const updateScroll = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight

      setScrollProgress(
        scrollableHeight > 0
          ? (window.scrollY / scrollableHeight) * 100
          : 0,
      )

      let currentSection = '#pocetna'

      for (const link of links) {
        const section = document.querySelector(link.href)

        if (section && section.getBoundingClientRect().top <= 160) {
          currentSection = link.href
        }
      }

      setActiveSection(currentSection)
    }

    updateScroll()

    window.addEventListener('scroll', updateScroll, { passive: true })
    window.addEventListener('resize', updateScroll)

    return () => {
      window.removeEventListener('scroll', updateScroll)
      window.removeEventListener('resize', updateScroll)
    }
  }, [])

  useEffect(() => {
    const closeLanguageMenu = (event) => {
      if (
        event.type === 'keydown' &&
        event.key !== 'Escape'
      ) {
        return
      }

      if (
        event.type === 'pointerdown' &&
        languageMenuRef.current?.contains(event.target)
      ) {
        return
      }

      setLanguageMenuOpen(false)
    }

    document.addEventListener('pointerdown', closeLanguageMenu)
    document.addEventListener('keydown', closeLanguageMenu)

    return () => {
      document.removeEventListener('pointerdown', closeLanguageMenu)
      document.removeEventListener('keydown', closeLanguageMenu)
    }
  }, [])

  const selectLanguage = (selectedLanguage) => {
    onLanguageChange(selectedLanguage)
    setLanguageMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#D9E1EC] bg-white/95 shadow-[0_4px_24px_rgba(16,24,39,0.04)] backdrop-blur-md">
      <style>{`
        @keyframes headerMenuIn {
          from {
            opacity: 0;
            transform: translateY(-12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .header-mobile-menu,
        .header-language-menu {
          animation: headerMenuIn 250ms ease-out both;
        }

        .header-link::after {
          content: '';
          position: absolute;
          right: 14px;
          bottom: 6px;
          left: 14px;
          height: 2px;
          border-radius: 999px;
          background: #5B93DF;
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 300ms ease;
        }

        .header-link:hover::after,
        .header-link[aria-current='location']::after {
          transform: scaleX(1);
        }

        @media (prefers-reduced-motion: reduce) {
          .header-mobile-menu,
          .header-language-menu {
            animation: none;
          }

          .header-link::after {
            transition: none;
          }
        }
      `}</style>

      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-3 px-6 lg:px-10 xl:gap-5">
        <a
          href="#pocetna"
          onClick={() => setMenuOpen(false)}
          className="group flex shrink-0 items-center gap-3"
          aria-label={`Asmir Zukić — ${language === 'bs' ? 'početna' : 'home'}`}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#101827] text-xs font-bold text-white transition-all duration-300 group-hover:-translate-y-1 group-hover:-rotate-6 group-hover:bg-[#294C78] group-hover:shadow-[0_8px_18px_rgba(41,76,120,0.25)]">
            AZ<span className="text-[#8DBCF7]">.</span>
          </span>

          <span className="hidden text-sm font-semibold tracking-tight text-[#101827] transition-colors duration-300 group-hover:text-[#376BAE] sm:inline sm:text-base">
            Asmir Zukić
          </span>
        </a>

        <nav
          aria-label={language === 'bs' ? 'Glavna navigacija' : 'Main navigation'}
          className="hidden xl:block"
        >
          <ul className="flex items-center gap-1">
            {links.map((link) => {
              const isActive = activeSection === link.href

              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isActive ? 'location' : undefined}
                    className={`header-link relative block rounded-xl px-3 py-3 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#EEF4FC] hover:text-[#376BAE] ${
                      isActive
                        ? 'bg-[#EEF4FC] text-[#376BAE]'
                        : 'text-[#526781]'
                    }`}
                  >
                    {link[language]}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 xl:ml-0 xl:gap-4">
          <div ref={languageMenuRef} className="relative">
            <button
              type="button"
              onClick={() => setLanguageMenuOpen((open) => !open)}
              aria-label={
                language === 'bs'
                  ? 'Promijeni jezik'
                  : 'Change language'
              }
              aria-expanded={languageMenuOpen}
              aria-controls="language-options"
              className={`flex h-10 items-center gap-2 rounded-full border px-3 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:border-[#9DBDE8] hover:bg-[#EEF4FC] hover:text-[#376BAE] ${
                languageMenuOpen
                  ? 'border-[#9DBDE8] bg-[#EEF4FC] text-[#376BAE]'
                  : 'border-[#D9E1EC] bg-white text-[#101827]'
              }`}
            >
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
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9S14.5 18.5 12 21c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3Z" />
              </svg>

              <span>{language.toUpperCase()}</span>

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  languageMenuOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {languageMenuOpen && (
              <div
                id="language-options"
                className="header-language-menu absolute right-0 top-full z-50 mt-2 w-44 rounded-2xl border border-[#D9E1EC] bg-white p-1.5 shadow-[0_16px_40px_rgba(16,24,39,0.14)]"
              >
                <button
                  type="button"
                  onClick={() => selectLanguage('bs')}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition-colors hover:bg-[#EEF4FC] ${
                    language === 'bs'
                      ? 'font-semibold text-[#376BAE]'
                      : 'text-[#415A78]'
                  }`}
                >
                  Bosanski
                  {language === 'bs' && <span aria-hidden="true">✓</span>}
                </button>

                <button
                  type="button"
                  onClick={() => selectLanguage('en')}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition-colors hover:bg-[#EEF4FC] ${
                    language === 'en'
                      ? 'font-semibold text-[#376BAE]'
                      : 'text-[#415A78]'
                  }`}
                >
                  English
                  {language === 'en' && <span aria-hidden="true">✓</span>}
                </button>
              </div>
            )}
          </div>

          <a
            href="mailto:asmir.zukic19@gmail.com"
            className="group hidden min-h-10 shrink-0 items-center gap-2 rounded-full bg-[#101827] px-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#294C78] hover:shadow-[0_10px_22px_rgba(41,76,120,0.25)] xl:inline-flex"
          >
            {language === 'bs' ? 'Kontakt' : 'Contact'}
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

          <button
            type="button"
            aria-label={
              menuOpen
                ? language === 'bs' ? 'Zatvori meni' : 'Close menu'
                : language === 'bs' ? 'Otvori meni' : 'Open menu'
            }
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => {
              setMenuOpen((open) => !open)
              setLanguageMenuOpen(false)
            }}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#D9E1EC] text-[#101827] transition-all duration-300 hover:border-[#9DBDE8] hover:bg-[#EEF4FC] hover:text-[#376BAE] xl:hidden"
          >
            {menuOpen ? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M5 5 19 19M19 5 5 19" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-navigation"
          aria-label={
            language === 'bs' ? 'Mobilna navigacija' : 'Mobile navigation'
          }
          className="header-mobile-menu border-t border-[#D9E1EC] bg-white px-6 pb-5 pt-2 xl:hidden"
        >
          <ul>
            {links.map((link) => {
              const isActive = activeSection === link.href

              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={isActive ? 'location' : undefined}
                    className={`block border-b border-[#E8EDF4] px-2 py-3 text-sm font-medium transition-all duration-200 hover:translate-x-1 hover:bg-[#EEF4FC] hover:text-[#376BAE] ${
                      isActive
                        ? 'text-[#376BAE]'
                        : 'text-[#415A78]'
                    }`}
                  >
                    {link[language]}
                  </a>
                </li>
              )
            })}
          </ul>

          <a
            href="mailto:asmir.zukic19@gmail.com"
            onClick={() => setMenuOpen(false)}
            className="mt-5 inline-flex min-h-11 items-center rounded-full bg-[#101827] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#294C78]"
          >
            {language === 'bs' ? 'Pošalji email' : 'Send an email'} ↗
          </a>
        </nav>
      )}

      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-0.5 bg-[#5B93DF]"
        style={{ width: `${scrollProgress}%` }}
      />
    </header>
  )
}

export default Header