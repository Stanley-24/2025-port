import HeaderLg from "../components/Header/HeaderLg";
import HeaderSm from "../components/Header/HeaderSm";
import Footer from "../components/Footer/Footer";
import AboutMe from "../components/AboutMe/AboutMe";
import Testimonials from "@/components/Testimonials/Testimonials";
import Contact from "@/components/Contact/Contact";

const AboutPage = () => {
    return (
        <>
            <HeaderLg isHomePage={false} />
            <HeaderSm isHomePage={false} />

            <AboutMe />
            <Testimonials/>
            <Contact />
            <Footer />
        </>
    )
}

export default AboutPage;