import StanleyOwarietaPic from "../../assets/stan-pic.jpg";
import { motion } from "motion/react" // eslint-disable-line no-unused-vars
const Hero = () => {
    return (
        <section className="w-full flex flex-col gap-6 lg:gap-8 items-center pt-12 pb-4 ">
            <div className="border-3 md:border-4 border-purple w-48 h-48 rounded-full overflow-hidden bg-white-shade/10">
                <img 
                    src={StanleyOwarietaPic} 
                    alt="Stanley Owarieta's picture" 
                    className="w-full h-full object-cover relative top-4"
                />
            </div>

            <motion.h2 
                className="text-white-shade capitalize amatic-sc-bold text-6xl sm:text-3xl lg:text-6xl tracking-wide"
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6, ease: "easeOut"}}
            >
                <span className="text-goldmaize">ST</span>AN<span className="text-purple">LEY</span> <span className="text-goldmeat">OW</span>AR<span className="text-goldmaize">IE</span><span className="text-purple">TA</span><span className="text-goldmaize">...</span>
            </motion.h2>

            <motion.p 
                className="text-lite-gray/90 w-[90%] max-w-[39rem] lg:max-w-[47rem] text-center text-sm sm:text-base lg:text-[1.25rem] leading-6 sm:leading-7 lg:leading-8 montserrat-regular"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            >
                Backend Software Engineer | Architecting Scalable API Backends & Secure Cloud Systems | Python (FastAPI) • TypeScript (Express) • PostgreSQL • MongoDB • Redis
            </motion.p>

            <div className="px-4 w-full flex flex-col min-[450px]:flex-row min-[450px]:justify-center gap-4 sm:gap-6 mt-2">
                <a 
                    href="https://tinyurl.com/owarieta"
                    target="_blank"
                    rel="openner noreferrer"
                    className="bg-gold text-white-shade py-3 lg:py-3.5 px-10 rounded-full font-semibold capitalize flex gap-2 items-center justify-center w-full text-center min-[450px]:w-fit hover:scale-105 duration-300 transition ease-in-out hover:border-2 hover:border-purple hover:bg-transparent"
                    aria-label="Button to view CV in hero section"
                    alt="Button to view CV in hero section"
                    aria-description="button to view CV of Stanley Owarieta"
                >
                    View my CV
                </a>

                <a 
                    href="#projects"
                    className="border-2 border-b-goldmeat text-gold rounded-full font-semibold capitalize inline-block w-full text-center py-3 lg:py-3.5 px-10 min-[450px]:w-fit sm:py-2  transition hover:bg-purple hover:text-white-shade duration-300"
                    aria-label="Button to view projects in hero section"
                    alt="Button to view projects in hero section"
                    aria-description="button to navigate to projects section of the webpage"
                >
                    view my work
                </a>
            </div>
        </section>
    )
}

export default Hero;