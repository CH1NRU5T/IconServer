import React from "react";
import { useSelector } from "react-redux";
import ProjectCard from "./ProjectCard";
function ProjectSections() {
  const projects = useSelector((state) => state.projects);
  return (
    projects &&
    projects.length > 0 &&
    projects.map((project) => (
      <ProjectCard key={project.title} project={project} />
    ))
  );
}

export default ProjectSections;
