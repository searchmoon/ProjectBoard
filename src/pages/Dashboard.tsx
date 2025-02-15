import AddNewProject from '@/components/pages/dashboard/SearchAddNewProject';
import ProjectCard from '@/components/pages/dashboard/ProjectCard';
import { useEffect, useState } from 'react';
import { supabase } from '@/supabaseClient';

export interface ProjectType {
  created_at: string;
  created_by?: string;
  description?: string;
  due_date: string;
  id: number;
  status: string;
  title: string;
}

const Dashboard = () => {
  const [projects, setProjects] = useState<ProjectType[]>([]);

  useEffect(() => {
    getProjects();
  }, []);

  async function getProjects() {
    const { data } = await supabase.from('project').select();
    if (data) {
      setProjects(data as ProjectType[]);
    } else {
      setProjects([]);
    }
  }
  return (
    <div className="p-6 bg-slate-100 h-screen">
      <AddNewProject />
      {projects?.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default Dashboard;
