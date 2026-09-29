const links = [
  { bs: 'O meni', en: 'About', href: '#o-meni' },
  { bs: 'Iskustvo', en: 'Experience', href: '#iskustvo' },
  { bs: 'Projekti', en: 'Projects', href: '#projekti' },
  { bs: 'Vještine', en: 'Skills', href: '#vjestine' },
  { bs: 'Obrazovanje', en: 'Education', href: '#obrazovanje' },
]

function Footer({ language = 'bs' }) {
  return (
    <footer className="relative isolate overflow-hidden bg-[#101827] px-6 text-white lg:px-10">
      <style>{`
        .footer-glow {
          animation: footerGlowMove 14s ease-in-out infinite;
        }

        @keyframes footerGlowMove {
          0%, 100% {
            transform: translateX(-30%);
            opacity: 0.5;
          }
          50% {
            transform: translateX(60%);
            opacity: 1;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .footer-glow {
            animation: none;
          }
        }
      `}</style>

      <div
        aria-hidden="true"
        className="footer-glow pointer-events-none absolute -bottom-52 left-1/4 h-[400px] w-[500px] rounded-full bg-[#3B82F6]/15 blur-[100px]"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-9 py-10 lg:grid-cols-[1fr_1.5fr_auto] lg:items-start lg:gap-10">
          <div>
            <a
              href="#pocetna"
              className="text-lg font-semibold tracking-tight transition-colors hover:text-[#8DBCF7]"
            >
              Asmir Zukić<span className="text-[#8DBCF7]">.</span>
            </a>

            <p className="mt-2 text-sm text-[#9AACC4]">
              {language === 'bs'
                ? 'Sarajevo, Bosna i Hercegovina'
                : 'Sarajevo, Bosnia and Herzegovina'}
            </p>
          </div>

          <nav
            aria-label={
              language === 'bs'
                ? 'Navigacija u podnožju'
                : 'Footer navigation'
            }
          >
            <ul className="flex flex-wrap gap-x-5 gap-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-[#C5D2E3] transition-colors hover:text-[#8DBCF7]"
                  >
                    {link[language]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col items-start gap-3 lg:items-end">
            <a
              href="mailto:asmir.zukic19@gmail.com"
              className="text-sm text-[#C5D2E3] transition-colors hover:text-[#8DBCF7]"
            >
              asmir.zukic19@gmail.com
            </a>

            <a
              href="tel:+387603208411"
              className="text-sm text-[#C5D2E3] transition-colors hover:text-[#8DBCF7]"
            >
              +387 60 320 8411
            </a>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/15 py-5 text-xs text-[#9AACC4]">
          <span>© {new Date().getFullYear()} Asmir Zukić</span>

          <a
            href="#pocetna"
            className="group inline-flex items-center gap-2 text-[#C5D2E3] transition-colors hover:text-[#8DBCF7]"
          >
            {language === 'bs' ? 'Nazad na vrh' : 'Back to top'}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1"
              aria-hidden="true"
            >
              <path d="M12 19V5" />
              <path d="m6 11 6-6 6 6" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer