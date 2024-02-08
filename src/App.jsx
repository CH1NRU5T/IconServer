import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import ProjectSearch from "./components/ProjectSearch";
import ProjectSections from "./components/ProjectSections";
function App() {
  return (
    <div className=" w-full h-full flex flex-col p-12">
      <ProjectSearch />
      <ProjectSections />
    </div>
  );
}
library.add(fas, fab, far);

export default App;
