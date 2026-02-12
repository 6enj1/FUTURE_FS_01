import { ThemeProvider } from '@/utils/theme'
import GlassNavbar from '@/components/GlassNavbar'
import Hero from '@/sections/Hero'
import Projects from '@/sections/Projects'
import About from '@/sections/About'
import Contact from '@/sections/Contact'
import Footer from '@/sections/Footer'

export default function App() {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-mesh">
        <GlassNavbar />
        <main>
          <Hero />
          <Projects />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
