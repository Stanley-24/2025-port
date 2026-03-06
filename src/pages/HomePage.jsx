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

                <script type="application/ld+json">
                    {`
                        {
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            "mainEntity": [
                                {
                                    "@type": "Question",
                                    "name": "Who is Stanley Owarieta?",
                                    "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Stanley Owarieta is a Nigerian Entrepreneur, founder and a software developer specializing in modern web applications, SaaS platforms, and full-stack development, from frontend design to backend security and data management to project deployment and smooth running."
                                    }
                                },
                                {
                                    "@type": "Question",
                                    "name": "What services does Stanley Owarieta offer?",
                                    "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Stanley Owarieta offers web development services including website development, SaaS application development, full-stack engineering and business consultants for fellow founders and business owners."
                                    }
                                    },
                                {
                                    "@type": "Question",
                                    "name": "Where is Stanley Owarieta based?",
                                    "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Stanley Owarieta is based in Nigeria and works with startups and businesses globally."
                                    }
                                }
                            ]
                        }
                        {
                            "@context":"https://schema.org",
                            "@type":"Person",
                            "name":"Stanley Owarieta",
                            "url":"https://stanleyowarieta.com",
                            "jobTitle":"Software Developer",
                            "sameAs": [
                                "https://www.linkedin.com/in/stanley-owarieta",
                                "https://x.com/Stanley_24_",
                                "https://github.com/Stanley-24"
                            ]
                        }
                    `}
                 </script>
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