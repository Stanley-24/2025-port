// src/components/ServicesPage/PricingSection.tsx
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const PricingSection = () => {
    return (
        <section className="container py-10 bg-main-dark-bg w-full px-4">
            <h2 className="amatic-sc-bold text-4xl text-white-shade mb-8">Pricing Details</h2>
            <p className="text-lite-gray mb-6">
                Open with the icon to view below for our pricing details.
            </p>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="model">
                    <AccordionTrigger className="text-goldmaize">Our Pricing Model</AccordionTrigger>
                    <AccordionContent className="text-lite-gray">
                        These are fixed prices for standard services. Custom solutions may vary based on specific requirements. Contact us for tailored quotes.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </section>
    );
};

export default PricingSection;

