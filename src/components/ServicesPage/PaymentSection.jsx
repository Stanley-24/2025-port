// src/components/ServicesPage/PaymentSection.tsx
import { Button } from "@/components/ui/button";

const PaymentSection = () => {
    return (
        <section className="bg-main-dark-bg py-16">
            <div className="container text-center">
                <h2 className="amatic-sc-bold text-4xl lg:text-5xl text-white-shade mb-8">
                    Payment Terms
                </h2>
                <p className="text-lite-gray max-w-2xl mx-auto text-lg mb-10">
                    <strong>70% upfront</strong> to secure your slot and start work immediately.<br />
                    <strong>30% on final delivery</strong> after approval.<br /><br />
                    We accept Flutterwave (cards, transfer), bank transfer, or USDT for international clients.
                </p>
                <Button 
                    size="lg" 
                    className="bg-gold hover:bg-purple text-white-shade text-lg px-10"
                    onClick={() => window.open("https://cal.com/stanley-owarieta-wcfe8m/discovery-call", "_blank")}
                >
                    Start Your Project Today
                </Button>
            </div>
        </section>
    );
};

export default PaymentSection;