import AddNewProject from '@/components/pages/dashboard/SearchAddNewProject';
import ProjectCard from '@/components/pages/dashboard/ProjectCard';
import { useEffect, useState } from 'react';
import { supabase } from '@/supabaseClient';
import Sidebar from '@/components/SideBar';
import ProjectDetail from '@/components/pages/dashboard/ProjectDetail';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';

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

  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null,
  );
  const [showProjectList, setShowProjectList] = useState(true);

  const handleProjectSelect = (id: number) => {
    setSelectedProjectId(id);
    setShowProjectList(false);
  };

  const handleToggleSidebar = () => {
    setShowProjectList(true);
    setSelectedProjectId(null);
  };

  return (
    <div className="flex-1 h-screen overflow-hidden">
      <AnimatePresence initial={false}>
        {showProjectList ? (
          <motion.div
            key="project-list"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="mx-4 mt-6 h-full"
          >
            <AddNewProject />
            {projects?.map((project) => (
              <ProjectCard
                onClick={() => handleProjectSelect(project.id)}
                key={project.id}
                project={project}
              />
            ))}
          </motion.div>
        ) : (
          <div className="flex-1 h-full overflow-hidden">
            <motion.div
              key="project-detail"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="flex h-full"
            >
              <Sidebar onToggle={handleToggleSidebar}></Sidebar>
              <ProjectDetail projectId={selectedProjectId}></ProjectDetail>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
