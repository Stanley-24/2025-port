import HeaderLg from "../components/Header/HeaderLg";
import HeaderSm from "../components/Header/HeaderSm";
import Hero from "../components/Hero/Hero";
import MyServices from "../components/MyServices/MyServices";
import MySkills from "../components/Skills/Skills";
import Projects from "../components/Projects/Projects";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";
import Testimonials from "@/components/Testimonials/Testimonials";

const HomePage = () => {
    return (
        <>
            <HeaderLg isHomePage={true} />
            <HeaderSm isHomePage={true} />
            <Hero />
            <MyServices />
            <MySkills />
            <Projects />
            <Testimonials/>
            <Contact />
            <Footer />
        </>
    )
}

export default HomePage;