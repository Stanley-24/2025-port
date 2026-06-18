import { Button } from "@/components/ui/button.jsx";

const ServiceHero = () => {
    return (
        <section className="w-full bg-main-dark-bg py-13 lg:py-24 flex flex-col items-center text-center px-4">
            <h1 className="montserrat-bold text-4xl sm:text-5xl lg:text-6xl text-white-shade mb-6">
                Custom Software That Actually<br />Works for <span className="text-goldmaize">Nigerian Businesses</span>
            </h1>
            <p className="montserrat-regular text-lite-gray max-w-3xl text-base lg:text-lg mb-4">
                Built by a Nigerian developer who understands local payments, CBN rules, and the real hustle of running operations here.
            </p>
            <p className="montserrat-regular text-lite-gray max-w-2xl text-sm lg:text-base mb-8">
                Agile delivery &nbsp;·&nbsp; Local integrations (Paystack, Flutterwave) &nbsp;·&nbsp; Post-launch support included &nbsp;·&nbsp; Starting from ₦800K
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                    size="lg" 
                    className="bg-gold text-black text-1xl hover:bg-purple hover:text-white-shade"
                    asChild
                >
                    <a href="#services">Explore Services</a>
                </Button>
                <Button 
                    size="lg" 
                    variant="transparent" 
                    className="border-gold border-b-2 border-t-1 text-purple text-1xl hover:bg-purple hover:text-white-shade hover:border-purple"
                    onClick={() => window.open("https://cal.com/stanley-24/discovery-call", "_blank", "noopener,noreferrer")}
                    aria-label="Button to book a free discovery call"
                    aria-description="button to open cal.com and book a free 30-minute discovery call"
                >
                    Book a Free 30-Min Discovery Call
                </Button>
            </div>
        </section>
    );
};

export default ServiceHero;