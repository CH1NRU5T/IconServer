import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const INITIAL_ICON = "fas fa-magnifying-glass";
const LOADING_ICON = "fas fa-spinner";
const ERROR_ICON = "fas fa-exclamation-triangle";
const INITIAL_COLOR = "bg-gray-600";
const ERROR_COLOR = "bg-red-400";
const SUCCESS_COLOR = "bg-green-600";
export const fetchIconsAndProjects = createAsyncThunk(
  "fetchIconsAndProjects",
  async (query) => {
    let icon;
    let projects = [];
    try {
      const data = await axios.post(
        "https://iconserver-server.onrender.com/search",
        {
          query: query.trim(),
        }
      );
      if (data.status == 200) {
        icon = { icon: data.data.icon, color: SUCCESS_COLOR, loading: false };
        projects = data.data.projects;
      }
    } catch (e) {
      projects = e.data.projects;
    }
    return { icon, projects };
  }
);
const initialState = {
  projects: [],
  icon: {
    icon: INITIAL_ICON,
    color: INITIAL_COLOR,
    loading: false,
  },
};
export const iconSlice = createSlice({
  name: "icon",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchIconsAndProjects.fulfilled, (state, action) => {
      if (state.icon.icon !== INITIAL_ICON) {
        state.icon = action.payload.icon;
        state.projects = action.payload.projects;
      }
    });
    builder.addCase(fetchIconsAndProjects.rejected, (state) => {
      state.icon = { icon: ERROR_ICON, color: ERROR_COLOR, loading: false };
      state.projects = [];
    });
    builder.addCase(fetchIconsAndProjects.pending, (state) => {
      if (state.icon.icon !== LOADING_ICON)
        state.icon = {
          icon: LOADING_ICON,
          color: INITIAL_COLOR,
          loading: true,
        };
      if (state.projects.length > 0) state.projects = [];
    });
  },
  reducers: {
    initalIcon: (state) => {
      if (state.icon.icon !== INITIAL_ICON)
        state.icon = {
          icon: INITIAL_ICON,
          color: INITIAL_COLOR,
          loading: false,
        };
    },
    loadIcon: (state) => {
      if (state.icon.icon !== LOADING_ICON)
        state.icon = {
          icon: LOADING_ICON,
          color: INITIAL_COLOR,
          loading: true,
        };
    },
    clearProjects: (state) => {
      if (state.projects.length > 0) state.projects = [];
    },
  },
});
export const { fetchAndSetIcon, loadIcon, initalIcon, clearProjects } =
  iconSlice.actions;
export default iconSlice.reducer;
