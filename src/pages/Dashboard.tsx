import AddNewProject from '@/components/pages/dashboard/SearchAddNewProject';
import ProjectCard from '@/components/pages/dashboard/ProjectCard';
import { useEffect, useState } from 'react';
import { supabase } from '@/supabaseClient';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects();
  }, []);

  async function getProjects() {
    const { data } = await supabase.from('project').select();
    setProjects(data);
  }
  return (
    <div className="p-6 bg-slate-100 h-screen">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
      <AddNewProject />
    </div>
  );
};

export default Dashboard;
