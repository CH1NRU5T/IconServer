import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearProjects,
  fetchIconsAndProjects,
  initalIcon,
  loadIcon,
} from "../features/iconSlice";
function ProjectSearch() {
  const dispatch = useDispatch();
  const icon = useSelector((state) => state.icon);
  const [prompt, setPrompt] = useState("");
  useEffect(() => {
    let promise;
    if (prompt.length < 1) {
      dispatch(initalIcon());
      dispatch(clearProjects());
      return;
    }
    dispatch(loadIcon());
    dispatch(clearProjects());

    const getDebouncingData = setTimeout(() => {
      promise = dispatch(fetchIconsAndProjects(prompt));
    }, 2000);
    return () => {
      clearTimeout(getDebouncingData);
      promise?.abort();
    };
  }, [prompt]);

  return (
    <div className="border px-2 py-1.5 rounded-xl flex flex-row items-center justify-between mb-4 h-14">
      <input
        type="text"
        placeholder="Write your thoughts here..."
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
          className={`text-white w-5 h-4 ${icon.loading ? "animate-spin" : ""}`}
        />
      </div>
    </div>
  );
}

export default ProjectSearch;
