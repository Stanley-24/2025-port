// src/pages/PipelineLanding.jsx
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import HeaderLg from "../components/Header/HeaderLg";
import FooterComponent from "../components/Footer/new-footer";
import productMockup from '../assets/product-mockup.webp';

const PipelineLanding = () => {
    // --- Calculator state ---
    const [tickets, setTickets] = useState(1000);
    const [price, setPrice] = useState(20000);
    const [displayRevenue, setDisplayRevenue] = useState(0);
    const [displayLossLow, setDisplayLossLow] = useState(0);
    const [displayLossHigh, setDisplayLossHigh] = useState(0);

    // --- Animate numbers ---
    useEffect(() => {
        const total = tickets * price;
        const low = total * 0.1;
        const high = total * 0.15;

        setDisplayRevenue(0);
        setDisplayLossLow(0);
        setDisplayLossHigh(0);

        let start = 0;
        const duration = 800;
        const stepTime = 20;
        const steps = duration / stepTime;

        const incrementRevenue = total / steps;
        const incrementLow = low / steps;
        const incrementHigh = high / steps;

        const interval = setInterval(() => {
            start++;
            setDisplayRevenue(Math.min(start * incrementRevenue, total));
            setDisplayLossLow(Math.min(start * incrementLow, low));
            setDisplayLossHigh(Math.min(start * incrementHigh, high));

            if (start >= steps) clearInterval(interval);
        }, stepTime);

        return () => clearInterval(interval);
    }, [tickets, price]);

    return (
        <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-goldmaize selection:text-black">
            <Helmet>
                <title>Revenue Retention Infrastructure | Pipeline & Lead Engine</title>
                <meta name="description" content="One-time infrastructure for elite event brands. Keep all ticket revenue, own your data, and eliminate middlemen fees." />
            </Helmet>

            <HeaderLg isHomePage={false} />

            {/* --- HERO SECTION --- */}
            <section className="relative pt-15 pb-12 px-4 flex flex-col items-center text-center border-b border-white/5">
                <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-goldmaize/30 to-transparent" />
                
                <div className="inline-block px-4 py-1 border border-goldmaize/40 mb-8">
                    <span className="uppercase tracking-[0.5em] text-goldmaize text-[10px] font-bold">
                        Private Infrastructure
                    </span>
                </div>
                
                <h1 className="serif-heading text-5xl md:text-7xl lg:text-8xl mb-8 leading-[1.1] max-w-6xl tracking-tight">
                    Stop Giving Away Your Revenue. <br />
                    <span className="text-goldmaize">Start Owning Your System.</span>
                </h1>

                <p className="montserrat-regular text-lite-gray max-w-3xl text-lg lg:text-xl mb-12 leading-relaxed">
                    The <span className="font-bold">Revenue Retention Infrastructure</span> is a fully private ticketing engine designed for event curators who refuse to lose 15% to middlemen. Own the platform. Own the data. Keep every naira you earn.
                </p>

                <div className="flex flex-col gap-6 items-center">
                    <Button 
                        size="lg"
                        className="bg-goldmaize hover:bg-white text-black cursor-pointer 
                        px-6 md:px-16 py-5 md:py-8 
                        text-base md:text-xl 
                        font-black rounded-none 
                        transition-all duration-500 
                        shadow-[0_10px_40px_rgba(212,175,55,0.2)] 
                        whitespace-normal break-words text-center"
                        onClick={() => window.open("https://cal.com/stanley-24/discovery-call")}
                        aria-label="Book a discovery call to install your revenue retention infrastructure"
                        aria-describedby="Clicking this button will open a new tab to schedule a discovery call for installing your revenue retention infrastructure, which is priced at ₦649,989."
                    >
                        INSTALL YOUR ENGINE — ₦649,989
                    </Button>
                    <p className="text-sm mt-4 uppercase tracking-widest font-bold animate-pulse text-white/70">
                        ⚠️ Every ticket sold through 3rd party platforms = revenue lost in real time
                    </p>
                </div>
            </section>

            {/* --- PRODUCT SHOWCASE --- */}
            <section className="py-14 bg-[#080808] border-y border-white/5 overflow-hidden">
                <div className="container max-w-7xl px-4 mx-auto">
                    <div className="flex flex-col lg:flex-row gap-16 items-center lg:items-start">
                        
                        <div className="relative group w-full lg:w-[40%] max-w-md mx-auto lg:mx-0">
                            <div className="absolute -inset-4 border border-goldmaize/20 translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700" />
                            
                            <div className="relative bg-[#111] border border-white/10 p-2 shadow-2xl overflow-hidden">
                                <img 
                                    src={productMockup} 
                                    alt="Revenue Retention System Dashboard" 
                                    className="w-full h-auto grayscale-[30%] hover:grayscale-0 transition-all duration-1000 object-cover"
                                />
                                <div className="absolute top-4 right-4 bg-goldmaize text-black font-black px-4 py-3 shadow-lg">
                                    <p className="text-[8px] uppercase leading-none mb-1">Infrastructure</p>
                                    <p className="text-xl leading-none tracking-tighter font-black">₦649,989</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col justify-center w-full lg:w-[60%]">
                            <h2 className="serif-heading text-4xl lg:text-6xl mb-8 text-white leading-tight">
                                The <span className="text-goldmaize">Revenue Retention</span> <br/> 
                                Infrastructure Package
                            </h2>
                            
                            <div className="space-y-10">
                                <div>
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="h-[1px] w-8 bg-goldmaize" />
                                        <h3 className="montserrat-bold text-goldmaize uppercase text-xs tracking-widest">Core Engine</h3>
                                    </div>
                                    <p className="text-lite-gray text-lg leading-relaxed">
                                        Built with Node.js & TypeScript, our modular system handles high-volume ticket sales seamlessly. Payments hit your account instantly, no delays, no middlemen.
                                    </p>
                                </div>

                                <div>
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="h-[1px] w-8 bg-goldmaize" />
                                        <h3 className="montserrat-bold text-goldmaize uppercase text-xs tracking-widest">Full Data Ownership</h3>
                                    </div>
                                    <p className="text-lite-gray text-lg leading-relaxed">
                                        All customer leads, ticket history, and pixel events are yours. No 3rd party apps. Private PostgreSQL/Redis database included.
                                    </p>
                                </div>

                                <div className="pt-8 border-t border-white/10">
                                    <ul className="grid grid-cols-2 gap-4 mb-8">
                                        {['Automated QR Delivery', 'WhatsApp Integrations', 'Custom Dashboards', 'Lead Nurture Flows'].map(feat => (
                                            <li key={feat} className="text-[10px] uppercase tracking-widest text-white/60 flex items-center gap-2 font-bold">
                                                <span className="text-goldmaize">✓</span> {feat}
                                            </li>
                                        ))}
                                    </ul>
                                    <Button 
                                        className="bg-white text-black hover:bg-goldmaize cursor-pointer w-full py-8 text-xl font-black rounded-none transition-colors"
                                        onClick={() => window.open("https://cal.com/stanley-24/discovery-call")}
                                    >
                                        CLAIM YOUR SYSTEM
                                    </Button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* --- CALCULATOR SECTION --- */}
            <section className="py-16 bg-[#111] border-t border-b border-white/10">
                <div className="container max-w-5xl mx-auto px-4 text-center">
                    <h2 className="serif-heading text-4xl lg:text-5xl text-goldmaize mb-8">Calculate Your Revenue Loss</h2>
                    <p className="text-white/70 mb-8 text-lg">
                        See how much money you lose every time someone buys a ticket through 3rd party platforms.
                    </p>

                    <div className="flex flex-col md:flex-row justify-center gap-6 mb-12">
                        <div>
                            <label className="block text-white/70 mb-1 uppercase text-xs font-bold">Tickets per Event</label>
                            <input 
                                type="number"
                                min={0}
                                value={tickets}
                                onChange={e => setTickets(Number(e.target.value))}
                                className="px-4 py-3 rounded-none text-white/67 w-36 border border-amaericagold/50 focus:ring-2 focus:ring-goldmaize focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-white/70 mb-1 uppercase text-xs font-bold">Ticket Price (₦)</label>
                            <input 
                                type="number"
                                min={0}
                                value={price}
                                onChange={e => setPrice(Number(e.target.value))}
                                className="px-4 py-3 rounded-none text-white/67 w-36 border border-amaericagold/50 focus:ring-2 focus:ring-goldmaize focus:outline-none"
                            />
                        </div>
                    </div>

                    <div className="text-white mb-6">
                        <p className="text-lg">
                            Total Revenue: <span className="text-goldmaize font-black">₦{Math.floor(displayRevenue).toLocaleString()}</span>
                        </p>
                        <p className="text-lg">
                            Potential Loss (10–15%): <span className="text-red-500 font-black">
                                ₦{Math.floor(displayLossLow).toLocaleString()} — ₦{Math.floor(displayLossHigh).toLocaleString()}
                            </span>
                        </p>
                    </div>

                    {tickets > 0 && price > 0 && (
                        <div className="mt-8 pt-6 border-t border-white/10">
                            <p className="text-white/60 text-sm uppercase tracking-widest mb-2">
                                Break-even
                            </p>

                            <h4 className="text-2xl font-black text-white mb-2 leading-tight">
                                ₦649,989 recovered in{" "}
                                <span className="text-goldmaize">
                                    {Math.ceil(649989 / (tickets * price * 0.1))}
                                </span>{" "}
                                event(s)
                            </h4>

                            <p className="text-white/50 text-sm">
                                After that, the 10–15% you used to lose stays with you.
                            </p>

                            <p className="mt-6 text-red-400 text-sm font-bold animate-pulse">
                                Delay = continued loss per event
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* --- STRATEGIC INVESTMENT --- */}
            <section className="py-14 container max-w-4xl px-4 mx-auto">
                <h2 className="serif-heading text-3xl mb-12 text-center uppercase tracking-[0.2em] text-goldmaize">Strategic Investment</h2>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1" className="border-white/10">
                        <AccordionTrigger className="text-xl hover:text-goldmaize montserrat-bold py-6 text-left">
                            Not a SaaS Model
                        </AccordionTrigger>
                        <AccordionContent className="text-lite-gray text-lg py-4 leading-relaxed">
                            This is an <span className="font-bold">Asset</span>, not a subscription.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2" className="border-white/10">
                        <AccordionTrigger className="text-xl hover:text-goldmaize montserrat-bold py-6 text-left">
                            Delivery Timeline
                        </AccordionTrigger>
                        <AccordionContent className="text-lite-gray text-lg py-4 leading-relaxed">
                            Your system will be fully functional in 4–6 weeks.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3" className="border-white/10">
                        <AccordionTrigger className="text-xl hover:text-goldmaize montserrat-bold py-6 text-left">
                            Payment Terms
                        </AccordionTrigger>
                        <AccordionContent className="text-lite-gray text-lg py-4 leading-relaxed">
                            50% upfront guarantees your slot.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </section>

            {/* --- FINAL CTA --- */}
            <section className="py-12 bg-goldmaize text-black text-center px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="serif-heading text-5xl md:text-6xl mb-8 leading-tight font-black uppercase tracking-tighter">
                        Stop Funding Other People's Growth.
                    </h2>
                    <p className="montserrat-bold text-xl mb-12 opacity-80 uppercase tracking-widest">
                        Only 3 clients per month are accepted to maintain quality. <br/>
                        Current Availability: <span className="underline">1 Slot Left for March 2026.</span>
                    </p>
                    <Button 
                        className="bg-white text-black hover:bg-gray-700 cursor-pointer py-8 text-xl font-black rounded-none transition-colors"
                        onClick={() => window.open("https://cal.com/stanley-24/discovery-call")}
                    >
                        SECURE YOUR REVENUE ENGINE
                    </Button>
                </div>
            </section>

            <FooterComponent />
        </div>
    );
};

export default PipelineLanding;




