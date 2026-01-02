import myPic from "../../assets/stan-abt.jpeg";
import { CiUser } from "react-icons/ci";
import BackendSkillsItem from "./BackendSkillItem";
import backendSkillsData from "../../data/backendSkillsData";
import backendtoolsData from "../../data/backendtoolsData";
import BackendToolsItem from "./BackendToolsItem";

const AboutMe = () => {
    return (
        <div className="container flex flex-col md:flex-row gap-8 mt-8 min-h-screen">
            {/* Left Sidebar - Stays Fixed */}
            <div className="w-full md:w-[17rem] flex-shrink-0">
                <div className="border border-white-shade/15 rounded-lg flex flex-col items-center gap-3.5 py-3 px-4 sticky top-20 md:top-22">
                    {/* Adjust top-20 or top-24 depending on your navbar/header height */}
                    <div className="w-48 h-48 rounded-full overflow-hidden bg-dark-gray/10 border-2 border-purple top-4">
                        <img
                            src={myPic}
                            alt="Stanley Owarieta picture"
                            className="w-full h-full object-cover relative flip-horizontal scale-x-[-1]"
                        />
                    </div>

                    <h4 className="text-white-shade amatic-sc-regular flex items-center gap-2 self-center text-2xl">
                        <CiUser className="text-purple" /> Stanley Owarieta
                    </h4>

                    <p className="text-white-shade/60 text-sm nunito-regular text-center">
                        Software Engineer @ Rental Wave
                    </p>

                    <button
                        className="text-white-shade bg-gold inline-block w-55 text-1xl my-3 py-2 px-8 text-center capitalize rounded-full hover:bg-transparent duration-300 hover:border-purple hover:border-2"
                        onClick={() => window.open("https://cal.com/stanley-owarieta-wcfe8m/10-mins-virtual-call", "_blank")}
                    >
                        Book a 10min call
                    </button>
                </div>
            </div>

            {/* Right Content - Only This Part Scrolls */}
            <div className="w-full md:flex-1 overflow-y-auto border border-white-shade/15 rounded-lg py-3 px-4 lg:px-6 max-h-[calc(100vh-6rem)] pb-7">
                {/* Adjust max-h-[calc(100vh-6rem)] based on your top margin + header */}
                <h2 className="capitalize text-white-shade jetbrains-mono-bold font-bold sm:text-lg lg:text-xl">
                    Everything you need to know
                </h2>

                <div className="text-white-shade/60 text-sm min-[900px]:text-base flex flex-col gap-5 mt-6">
                    <p className="leading-7">
                        From music production to a Full-Stack Developer with a strong focus on backend engineering, building clean, scalable, and secure web applications using modern technologies.
                    </p>

                    <p className="leading-7">
                        My development journey has been driven by curiosity, consistent learning, and a passion for solving real-world problems. I began in frontend development with a drag and drop web builder, crafting intuitive and responsive user interfaces, and gradually transitioned into writing of codes and switching to backend engineering—where I now specialize in designing and maintaining reliable APIs and server-side systems.
                    </p>

                    <h4 className="text-white-shade jetbrains-mono-bold font-bold sm:text-md lg:text-lg">Backend Expertise</h4>

                    <p className="leading-7">
                        I have experience building and maintaining production-ready systems with a strong emphasis on performance, security, and maintainability, including:
                    </p>

                    <ul className="list-inside flex flex-col gap-2">
                        {backendSkillsData.map((skill) => (
                            <BackendSkillsItem key={skill.id} {...skill} />
                        ))}
                    </ul>

                    <h4 className="text-white-shade jetbrains-mono-bold font-bold sm:text-md lg:text-lg">Technologies</h4>

                    <p className="leading-7">
                        I currently work with and continue to deepen my expertise in:
                    </p>

                    <ul className="list-inside flex flex-col gap-2">
                        {backendtoolsData.map((tool) => (
                            <BackendToolsItem key={tool.id} {...tool} />
                        ))}
                    </ul>

                    <p className="leading-7">
                        In 2026, my focus is on mastering backend engineering best practices and system design while building robust, scalable APIs that meet real business needs.
                    </p>

                    <h4 className="text-white-shade jetbrains-mono-bold font-bold sm:text-md lg:text-lg">How I Work</h4>

                    <p className="leading-7">
                        I’m highly practical in my approach—what I learn, I apply immediately to real projects. I value clean code, clear communication, and collaboration, and I enjoy working in teams that care about quality and long-term impact.
                    </p>

                    <p className="leading-7">
                        Beyond technical contributions, I’m passionate about mentorship and knowledge sharing, supporting junior developers, and fostering environments where people grow together.
                    </p>

                    <h4 className="text-white-shade jetbrains-mono-bold font-bold sm:text-md lg:text-lg">Interests & Personality</h4>

                    <p className="leading-7">
                        Outside of coding, I enjoy mobile games, table tennis, soccer, instrumental music, reading, drawing, technology, sports cars, and fashion. These interests help keep me balanced, creative, and energized.
                    </p>

                    <h4 className="text-white-shade jetbrains-mono-bold font-bold sm:text-md lg:text-lg">Current Work & Opportunities</h4>

                    <p className="leading-7">
                        I’m currently building the future at RentalWave and am open to full-time roles, contract work, and freelance opportunities where I can contribute meaningfully and grow with a strong team.
                    </p>

                    <p className="leading-7">
                        If you’re building a product and need a reliable engineer who cares about quality, impact, and collaboration, feel free to reach out or book a 10-minute discovery call.
                    </p>

                    <p className="leading-7">
                        I also offer free mentorship for junior developers (limited to 3 available spots).
                    </p>

                    <p className="amatic-sc-bold font-bold text-white-shade text-4xl mt-4">
                        <span className="text-goldmaize">St</span>an<span className="text-purple">ley</span><span className="text-goldmeat">...</span>
                    </p>
                </div>

                <a
                    className="flex items-center gap-2 bg-gold py-3 justify-center rounded-full text-white-shade font-semibold tracking-wide lg:text-lg hover:bg-transparent hover:border-2 hover:border-purple duration-200 cursor-pointer active:scale-95 max-w-[170px] mx-auto mt-10"
                    href="https://tinyurl.com/owarieta"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Button to view CV in about section"
                    aria-description="button to open google drive and view CV"
                >
                    View CV
                </a>
            </div>
        </div>
    );
};

export default AboutMe;