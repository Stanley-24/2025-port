import salesFunnel from "../assets/salesFunnel.png";
import rentalwave from "../assets/rental-wave.png";
import natureimg from "../assets/nature-ent.png";
import photoPilot from "../assets/photoPilot.png";

const projectsData = [
    {
        id: 1,
        imgUrl: rentalwave,
        imgAltText: "Rental Wave homepage Image",
        title: "Rental Wave",
        description: "A modern full-stack web application for Real Estate property marketplace, built with MERN stack.",
        tools: ["React", "Tailwind CSS", "Zustand", "TypeScript", "Redis", "Node.js", "Express.JS", "MongoDB"],
        liveUrl: "https://realtor-app-mcoo.onrender.com/",
        codeUrl: "https://github.com/Stanley-24/Realtor-App.git",
        isLive: true,
        features: [
            "Secure user authentication & authorization (login, logout, protected routes)",
            "Password recovery",
            "Create and manage property listings",
            "Image upload to Cloudinary",
            "User roles: Admin, Agent, Buyer",
            "Filter and sort properties by various criteria",
            "Interactive dashboards and data visualizations",
        ]
    },
    {
        id: 2,
        imgUrl: natureimg,
        imgAltText: "Nature Entertainment Website Image",
        title: "Nature Entertainment Website",
        description: "Developed a full-stack ticketing solution focused on user conversion and secure financial transactions. Integrated Flutterwave API to process secure payments, handling validation logic and edge cases to prevent failed transactions.",
        tools: ["Html", " CSS Bootstrap", "Python", "FastApi", "JavaScript"],
        liveUrl: "https://www.wearenatureent.com/",
        codeUrl: "git@github.com:Stanley-24/nature-entertainment.git",
        isLive: true,
        features: [
            "Implemented form validation and data processing pipelines to ensure clean user data entry.",
            "Create three different ticket price and sales handling",
            "Secure backend contact form with FastApi",
            "Responsive UI using Html and CSS",
            "Payment handling and integration with Flutterwave API",
            "Email notifications for ticket purchases and inquiries"
        ]
    },
    {
        id: 3,
        imgUrl: photoPilot,
        imgAltText: "Photo Pilot Website Image",
        title: "Photo Pilot",
        description: "A cutting-edge AI-powered photo editing web application that enables users to enhance and transform their images with ease. server is currently down right now.",
        tools: ["React", "Tailwind CSS", "Express.JS", "Node.js", "MongoDB", "JWT", "OAuth"],
        liveUrl: "https://photo-pilot.vercel.app/",
        codeUrl: "https://github.com/Stanley-24/Photo_pilot_client",
        isLive: true,
        features: [
            "User Authentication: Secure sign-up and login functionality using JWT, Google OAuth, and GitHub OAuth.",
            "Edit photo using AI, remove background, enhance image quality.",
            "Pricing Section: Simple, transparent pricing plans.",
            "Testimonials Section: Social proof with user feedback.",
            "Responsive Design: Optimized for all devices.",
            "server is down right now"
        ]
    },
    {
        id: 4,
        imgUrl: salesFunnel,
        imgAltText: "AI Sales Funnel Image",
        title: "Ai Sales Funnel",
        description: "A webpage that allows users to submit emails for automating their business needs. The system interviews clients using their emails, employs agentic AI to conduct interviews, and uses the Llama 3 model to provide personalized business scaling solutions after each interview.",
        tools: ["JavaScript", "Tailwind CSS", "React", "Node.js", "Express.JS", "MongoDB", "Ollama 3"],
        liveUrl: "https://sales-funnel-psi.vercel.app/",
        codeUrl: "https://github.com/Stanley-24/sales-funnel",
        isLive: true,
        features: [
            "User friendly interface for email submission",
            "Responsive Design: Built with modern CSS techniques to ensure a great user experience on all devices.",
            "Interview Process: Uses agentic AI to conduct interviews based on user emails.",
            "Llama 3 Integration: Utilizes the Llama 3 model to provide personalized business scaling solutions.",
            "Email Notifications: Sends confirmation emails after each interview.",
            "Secure Data Handling: Ensures user data is handled securely and privately.",
            "server down right now "
        ]

    }
];

export default projectsData;