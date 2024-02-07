import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import ProjectCard from "./components/ProjectCard";
function App() {
  const INITIAL_ICON = "fas fa-magnifying-glass";
  const loadingIcon = "fas fa-spinner";
  const errorIcon = "fas fa-exclamation-triangle";
  const initialColor = "bg-gray-200";
  const errorColor = "bg-red-400";
  const successColor = "bg-green-400";

  const [prompt, setPrompt] = useState("");
  const [projects, setProjects] = useState([]);
  const [icon, setIcon] = useState({
    icon: INITIAL_ICON,
    color: initialColor,
  });
  useEffect(() => {
    if (!prompt || prompt.length < 1) {
      setIcon({ icon: INITIAL_ICON, color: initialColor });

      return;
    }
    setIcon({ icon: loadingIcon, color: initialColor });
    setProjects([]);
    const getData = setTimeout(async () => {
      try {
        const data = await axios.post("http://localhost:3000/search", {
          query: prompt.trim(),
        });
        if (data.status == 200) {
          setIcon({ icon: data.data.icon, color: successColor });
          setProjects(data.data.projects);
        }
      } catch (e) {
        console.log(e);
        setIcon({ icon: errorIcon, color: errorColor });
        setProjects(e.data.projects);
      }
    }, 2000);
    return () => {
      console.log("calling");
      clearTimeout(getData);
    };
  }, [prompt]);

  return (
    <div className="bg-gray-800 w-full h-screen flex flex-col p-12">
      <div className="border px-2 py-1.5 rounded-xl flex flex-row items-center justify-between mb-4 h-14">
        <input
          type="text"
          value={prompt}
          onChange={(e) => {
            setPrompt(e.target.value);
          }}
          className="w-full rounded-l-xl px-3 h-full bg-transparent outline-none text-white"
        />
        <div
          className={`rounded-xl h-full center flex items-center w-10 justify-center ${icon.color}`}
        >
          <FontAwesomeIcon
            icon={icon.icon}
            className={`text-black
              w-5
              h-4
            ${icon.icon === loadingIcon ? "animate-spin" : ""}`}
          />
        </div>
      </div>

      {projects &&
        projects.length > 0 &&
        projects.map((project) => (
          <ProjectCard key={project.title} project={project} icon={icon} />
        ))}
    </div>
  );
}
library.add(fas, fab, far);

export default App;
