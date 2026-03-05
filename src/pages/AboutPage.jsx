import HeaderLg from "../components/Header/HeaderLg";
import HeaderSm from "../components/Header/HeaderSm";
import Footer from "../components/Footer/Footer";
import AboutMe from "../components/AboutMe/AboutMe";
import Testimonials from "@/components/Testimonials/Testimonials";
import Contact from "@/components/Contact/Contact";
import { Helmet } from "react-helmet";

const AboutPage = () => {
    return (
        <>
            <Helmet>
                <title>About Stanley Owarieta | Software Developer</title>

                <meta
                name="description"
                content="Learn about Stanley Owarieta, a Nigerian software developer focused on building scalable web applications, SaaS tools, and digital experiences that solve real-world problems."
                />

                <meta
                name="keywords"
                content="About Stanley Owarieta, Nigerian software developer, frontend developer Nigeria, backend developer Nigeria, JavaScript developer, TypeScript developer, React developer, software engineer Nigeria"
                />

                <link rel="canonical" href="https://stanleyowarieta.com/about" />
            </Helmet>
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