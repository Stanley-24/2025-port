import HeaderLg from "../components/Header/HeaderLg";
import HeaderSm from "../components/Header/HeaderSm";
import ServiceHero from "../components/ServicesPage/ServiceHero";
import ServiceList from "../components/ServicesPage/ServiceList";
import PricingSection from "../components/ServicesPage/PricingSection";
import DeliverySection from "../components/ServicesPage/DeliverySection";
import PaymentSection from "../components/ServicesPage/PaymentSection";
import Contact from "../components/Contact/Contact";
import FooterComponent from "../components/Footer/new-footer";
import Testimonials from '@/components/Testimonials/Testimonials';
import { Helmet } from 'react-helmet';

const Services = () => {
    return (
        <>
            <Helmet>
                <title>Web Development Services | Stanley Owarieta</title>

                <meta
                name="description"
                content="Hire Stanley Owarieta, a Nigerian software developer helping startups and businesses build modern websites, SaaS platforms, and scalable web applications using React, JavaScript, TypeScript and modern web technologies."
                />

                <meta
                name="keywords"
                content="hire web developer Nigeria, React developer Nigeria, SaaS frontend developer, custom website developer Nigeria, hire backend developer Nigeria, full-stack developer Nigeria, web application developer Nigeria, software developer Nigeria, freelance web developer Nigeria"
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
            <FooterComponent />
        </>
    );
};

export default Services;