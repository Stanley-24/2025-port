import ProjectCard from "./ProjectCard";
import projectsData from "../../data/projectsData";
import SectionIntro from "../SectionIntro/SectionIntro";
import { useState } from "react";
import ProjectModal from "../ProjectModal/ProjectModal";

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    return (
        <section 
            className="w-full py-16 bg-dkcharles" 
            id="projects"
        >
            <div className="container flex flex-col items-center gap-10 md:gap-12">
                <SectionIntro 
                    heading="current projects"
                    subtitle="A showcase of my recent work and creative solutions, click product cards to learn more."
                />

                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 ">
                    {
                        projectsData.map(project => {
                            return (
                                <ProjectCard 
                                    key={project.id}
                                    {...project}
                                    onClick={() => setSelectedProject(project)}
                                />
                            )        
                        })
                    }
                </div>
            </div>

            {
                selectedProject && 
                <ProjectModal 
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                />
            }
        </section>
    )
}

export default Projects;