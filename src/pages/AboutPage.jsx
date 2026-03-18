import HeaderLg from "../components/Header/HeaderLg";
import HeaderSm from "../components/Header/HeaderSm";
import FooterComponent from "../components/Footer/new-footer";
import AboutMe from "../components/AboutMe/AboutMe";
import Testimonials from "@/components/Testimonials/Testimonials";
import Contact from "@/components/Contact/Contact";
import { Helmet } from "react-helmet";

const AboutPage = () => {
    return (
        <>
            <Helmet>
                <title>About Stanley Owarieta | Nigerian Software Developer</title>

                <meta
                name="description"
                content="Learn about Stanley Owarieta, a Nigerian software developer and a tech entrepreneur building scalable digital products and modern web applications."
                />

                <meta
                name="keywords"
                content="Stanley Owarieta story, Nigerian software developer journey, coding career Nigeria, tech entrepreneur Nigeria"
                />

                <link rel="canonical" href="https://stanleyowarieta.com/about" />
            </Helmet>
            <HeaderLg isHomePage={false} />
            <HeaderSm isHomePage={false} />

            <AboutMe />
            <Testimonials/>
            <Contact />
            <FooterComponent />
        </>
    )
}

export default AboutPage;