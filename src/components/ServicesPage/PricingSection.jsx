// src/components/ServicesPage/PricingSection.jsx
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pricingTiers } from "../../data/servicePageData";

const MEETING_LINK = "https://cal.com/stanley-24/discovery-call";

const PricingSection = () => {
    return (
        <section className="py-16 bg-main-dark-bg w-full px-4">
            <div className="container">
                <h2 className="amatic-sc-bold text-4xl lg:text-5xl text-white-shade text-center mb-4">
                    Transparent Pricing
                </h2>
                <p className="text-lite-gray text-center max-w-2xl mx-auto mb-12">
                    Fixed starting prices for clear budgeting. Complex or custom scopes are quoted after a free discovery call.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {pricingTiers.map((tier) => (
                        <div
                            key={tier.name}
                            className={`rounded-2xl p-8 flex flex-col border ${
                                tier.highlight
                                    ? "border-gold bg-dark-bg shadow-lg shadow-gold/10"
                                    : "border-purple bg-dark-bg"
                            }`}
                        >
                            {tier.highlight && (
                                <span className="text-xs font-bold uppercase tracking-widest text-white bg-purple rounded-full px-3 py-1 self-start mb-4">
                                    Most Popular
                                </span>
                            )}
                            <h3 className="text-2xl font-bold text-goldmaize mb-1">{tier.name}</h3>
                            <p className="text-3xl font-extrabold text-white-shade mb-1">{tier.price}</p>
                            <p className="text-sm text-lite-gray mb-4">{tier.duration}</p>
                            <p className="text-lite-gray mb-6">{tier.description}</p>
                            <ul className="space-y-2 mb-8 grow">
                                {tier.features.map((f) => (
                                    <li key={f} className="flex items-start gap-2 text-lite-gray">
                                        <Check className="text-gold mt-0.5 shrink-0" size={16} />
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ul>
                            <Button
                                className={`w-full ${
                                    tier.highlight
                                        ? "bg-gold hover:bg-purple text-black hover:text-white-shade"
                                        : "bg-purple hover:bg-gold text-white-shade hover:text-black"
                                }`}
                                onClick={() =>
                                    window.open(MEETING_LINK, "_blank", "noopener,noreferrer")
                                }
                                aria-label={`Book a call for the ${tier.name} tier`}
                            >
                                {tier.cta}
                            </Button>
                        </div>
                    ))}
                </div>

                <p className="text-center text-lite-gray mt-10 text-sm">
                    All prices are starting points. Final quote based on your exact scope.{" "}
                    <strong className="text-goldmaize">70% upfront · 30% on final delivery.</strong>{" "}
                    Monthly retainers available (₦150K–₦300K/month) for ongoing support.
                </p>
            </div>
        </section>
    );
};

export default PricingSection;

