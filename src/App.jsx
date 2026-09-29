import { useEffect, useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import About from './sections/About'
import Experience from './sections/Experience'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Education from './sections/Education'

function App() {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('portfolio-language') === 'en' ? 'en' : 'bs'
  })

  useEffect(() => {
    localStorage.setItem('portfolio-language', language)
    document.documentElement.lang = language
  }, [language])

  return (
    <div className="min-h-screen bg-white text-[#171717]">
      <Header language={language} onLanguageChange={setLanguage} />

      <main>
        <Hero language={language} />
        <About language={language} />
        <Experience language={language} />
        <Projects language={language} />
        <Skills language={language} />
        <Education language={language} />
      </main>

      <Footer language={language} />
    </div>
  )
}

export default App