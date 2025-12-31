import HeaderLg from "../components/Header/HeaderLg";
import HeaderSm from "../components/Header/HeaderSm";
import Footer from "../components/Footer/Footer";
import AboutMe from "../components/AboutMe/AboutMe";

const AboutPage = () => {
    return (
        <>
            <HeaderLg isHomePage={false} />
            <HeaderSm isHomePage={false} />

            <AboutMe />
            <Footer />
        </>
    )
}

export default AboutPage;