import { Button } from "@/components/ui/button.jsx";

const ServiceHero = () => {
    return (
        <section className="w-full bg-main-dark-bg py-13 lg:py-24 flex flex-col items-center text-center px-4">
            <h1 className="montserrat-bold text-4xl sm:text-5xl lg:text-6xl text-white-shade mb-6">
                Tailored Software Solutions<br />for <span className="text-goldmaize">Nigerian Businesses</span>
            </h1>
            <p className="montserrat-regular text-lite-gray max-w-3xl text-base lg:text-lg mb-8">
                Custom ERP, Fintech, Ecommerce & AI apps built for your hustle. 
                Local integrations (Paystack, Flutterwave), CBN compliance — starting from ₦800k.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                    size="lg" 
                    className="bg-gold text-white-shade text-1xl hover:bg-purple hover:text-white-shade"
                    asChild
                >
                    <a href="#services">Explore Services</a>
                </Button>
                <Button 
                    size="lg" 
                    variant="transparent" 
                    className="border-gold border-b-2 border-t-1 text-purple text-1xl hover:bg-purple hover:text-white-shade hover:border-purple"
                    onClick={() => window.open("https://cal.com/stanley-owarieta-wcfe8m/30min", "_blank")}
                >
                    Book a Discovery Call
                </Button>
            </div>
        </section>
    );
};

export default ServiceHero;