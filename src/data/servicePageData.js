// Pricing tiers shown separately in PricingSection — these cards drive the service list + payments
export const services = [
  {
    title: "Ecommerce Launch Package",
    description:
      "Stop losing sales to a slow or non-existent online store. Get a fast, mobile-first shop with Paystack or Flutterwave built-in, real-time order tracking, and everything you need to start selling online — delivered in 4–6 weeks.",
    price: "800000",
    displayPrice: "From ₦800K",
    cta: "Launch Store",
    tag: "Starter",
  },
  {
    title: "Smart Operations System (Custom ERP)",
    description:
      "Stop losing money to manual errors and scattered spreadsheets. Get one clean system that handles your sales, inventory, finance, and staff — fully customized to how your business runs in Nigeria. Save hours every week and make better decisions with real-time data.",
    price: "3500000",
    displayPrice: "From ₦3.5M",
    cta: "Schedule Call",
    tag: "Most Popular",
  },
  {
    title: "Fintech-Ready Apps",
    description:
      "Build secure payment platforms, lending tools, wallets, or merchant dashboards that are CBN-compliant from day one. Local payment integrations (Paystack, Flutterwave) included. No compliance headaches.",
    price: "2300000",
    displayPrice: "From ₦2.3M",
    cta: "Build Fintech",
    tag: null,
  },
  {
    title: "AI Automation Add-on",
    description:
      "Let your software work while you sleep. Automate repetitive workflows, get AI-powered sales forecasting, intelligent inventory alerts, or a customer-facing chatbot — built into any existing or new platform.",
    price: "1500000",
    displayPrice: "From ₦1.5M",
    cta: "Add AI",
    tag: "High ROI",
  },
  {
    title: "Custom Dashboards & Portals",
    description:
      "Need a powerful control panel, client portal, or data dashboard? Get a fully responsive, real-time web app tailored to your exact workflows — with CRM, reporting, or social integrations as needed.",
    price: "900000",
    displayPrice: "₦900K – ₦1.4M",
    cta: "Schedule Call",
    tag: null,
  },
  {
    title: "Community & Social Platforms",
    description:
      "Build the local network your industry needs. Custom community platforms with profiles, messaging, feeds, and local features that generic tools like WhatsApp groups can't give you.",
    price: "1200000",
    displayPrice: "From ₦1.2M",
    cta: "Start Social",
    tag: null,
  },
  {
    title: "Full Business OS (Enterprise Custom)",
    description:
      "The complete package — ERP + AI insights + mobile app, built around your specific business processes. For businesses ready to scale seriously and stop duct-taping different tools together.",
    price: "5000000",
    displayPrice: "₦4M – ₦7M+",
    cta: "Schedule Call",
    tag: "Enterprise",
  },
];

// Pricing tiers for PricingSection
export const pricingTiers = [
  {
    name: "Starter / MVP",
    price: "₦800K – ₦1.5M",
    duration: "4–6 weeks",
    description: "Core features only. Perfect for launching fast and validating your idea.",
    features: [
      "Core feature set scoped to your needs",
      "Paystack or Flutterwave integration",
      "Mobile-first responsive design",
      "2 months post-launch support included",
      "Basic training & handover",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Growth",
    price: "₦2M – ₦3.5M",
    duration: "8–12 weeks",
    description: "Full features, integrations, and automation for businesses ready to scale.",
    features: [
      "Everything in Starter",
      "Full integrations (CRM, payments, analytics)",
      "Basic AI automation or workflow tools",
      "3 months post-launch support included",
      "Staff training sessions",
      "Priority support channel",
    ],
    cta: "Scale Up",
    highlight: true,
  },
  {
    name: "Enterprise / Full Custom",
    price: "₦4M – ₦7M+",
    duration: "3–12 months",
    description: "Complete bespoke solution — ERP, AI, mobile app, and compliance built-in.",
    features: [
      "Everything in Growth",
      "Custom ERP or full business OS",
      "AI insights & forecasting",
      "CBN-compliance ready (fintech)",
      "Mobile app (iOS & Android)",
      "Dedicated post-launch retainer available",
    ],
    cta: "Schedule Call",
    highlight: false,
  },
];