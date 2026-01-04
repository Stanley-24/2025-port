import React from 'react';
import HeaderLg from "../components/Header/HeaderLg";
import HeaderSm from "../components/Header/HeaderSm";
import ServiceHero from "../components/ServicesPage/ServiceHero";
import ServiceList from "../components/ServicesPage/ServiceList";
import PricingSection from "../components/ServicesPage/PricingSection";
import DeliverySection from "../components/ServicesPage/DeliverySection";
import PaymentSection from "../components/ServicesPage/PaymentSection";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";

const Services = () => {
    return (
        <>
            <HeaderLg isHomePage={false} />
            <HeaderSm isHomePage={false} />
            <ServiceHero />
            <ServiceList />
            <PricingSection />
            <DeliverySection />
            <PaymentSection />
            <Contact />
            <Footer />
        </>
    );
};

export default Services;