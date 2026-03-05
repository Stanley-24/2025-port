import HeaderLg from "../components/Header/HeaderLg";
import HeaderSm from "../components/Header/HeaderSm";
import Hero from "../components/Hero/Hero";
import MyServices from "../components/MyServices/MyServices";
import MySkills from "../components/Skills/Skills";
import Projects from "../components/Projects/Projects";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";
import Testimonials from "@/components/Testimonials/Testimonials";
import { Helmet } from "react-helmet";

const HomePage = () => {
    return (
        <>
            <Helmet>
                <title>Stanley Owarieta | Software Developer in Nigeria</title>

                <meta
                name="description"
                content="Stanley Owarieta is a Nigerian software developer specializing in modern web applications, SaaS platforms, and scalable digital products using JavaScript/TypeScript, React, and modern web technologies."
                />

                <meta
                name="keywords"
                content="Stanley Owarieta, software developer Nigeria, web developer Nigeria, React developer, JavaScript developer, TypeScript developer, developer Nigeria"
                />

                <link rel="canonical" href="https://stanleyowarieta.com/" />
            </Helmet>

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