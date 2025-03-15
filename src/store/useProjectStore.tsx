import { ProjectType } from '@/pages/Dashboard';
import { create } from 'zustand';

interface ProjectState {
  projects: ProjectType[];
  originalProjects: ProjectType[];
  setProjects: (projects: ProjectType[]) => void;
  setOriginalProjects: (projects: ProjectType[]) => void;
}

export const useProjectStore = create<ProjectState>((set) => {
  return {
    projects: [],
    originalProjects: [],
    setProjects: (projects: ProjectType[]) => set({ projects: projects }),
    setOriginalProjects: (projects: ProjectType[]) =>
      set({ originalProjects: projects }),
  };
});
