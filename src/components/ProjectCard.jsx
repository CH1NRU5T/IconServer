import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector } from "react-redux";

function ProjectCard({ project }) {
  let icon = useSelector((state) => state.icon);
  return (
    <div className="flex border my-4 border-white flex-row hover:bg-gray-900 cursor-pointer rounded-xl">
      <div className="flex flex-col w-full">
        <div className="flex flex-row p-4 items-center">
          <div className="rounded-full flex items-center justify-center mr-4 border border-white w-8 h-8">
            <FontAwesomeIcon icon={icon.icon} className="text-white" />
          </div>
          <h1 className="text-white font-bold">{project.title}</h1>
        </div>
        <div className="w-full bg-white h-px"></div>
        <div className="p-4">
          {project.pointers &&
            project.pointers.length > 0 &&
            project.pointers.map((pointer) => (
              <p key={pointer} className="text-gray-300">{`- ${pointer}`}</p>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
