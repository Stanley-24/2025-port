import HeaderLg from "../components/Header/HeaderLg";
import HeaderSm from "../components/Header/HeaderSm";
import ServiceHero from "../components/ServicesPage/ServiceHero";
import ServiceList from "../components/ServicesPage/ServiceList";
import PricingSection from "../components/ServicesPage/PricingSection";
import DeliverySection from "../components/ServicesPage/DeliverySection";
import PaymentSection from "../components/ServicesPage/PaymentSection";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";
import Testimonials from '@/components/Testimonials/Testimonials';
import { Helmet } from 'react-helmet';

const Services = () => {
    return (
        <>
            <Helmet>
                <title>Web Development Services | Stanley Owarieta</title>

                <meta
                name="description"
                content="Explore the web development services offered by Stanley Owarieta including website development, SaaS applications, frontend engineering, and modern digital product development."
                />

                <meta
                name="keywords"
                content="web development services Nigeria, React developer services, frontend development services, software developer Nigeria, SaaS development services, digital product development Nigeria, Stanley Owarieta services, web app development services, scalable web applications Nigeria, modern web development services, software development services Nigeria, web development solutions Nigeria"
                />

                <link rel="canonical" href="https://stanleyowarieta.com/services" />
            </Helmet>
            <HeaderLg isHomePage={false} />
            <HeaderSm isHomePage={false} />
            <ServiceHero />
            <ServiceList />
            <PricingSection />
            <DeliverySection />
            <PaymentSection />
            <Testimonials/>
            <Contact />
            <Footer />
        </>
    );
};

export default Services;