import Navbar from './Navbar'
import Hero from './Hero'
import About from './About'
import Team from './Team'
import Projects from './Projects'
import Partners from './Partners'
import Contact from './Contact'
import Footer from './Footer'

const MainSite = () => {
    return (
        <div className="min-h-screen bg-ergenekon-dark">
            <Navbar />
            <Hero />
            <About />
            <Team />
            <Projects />
            <Partners />
            <Contact />
            <Footer />
        </div>
    )
}

export default MainSite
