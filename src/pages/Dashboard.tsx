import SearchAddNewProject from '@/components/pages/dashboard/SearchAddNewProject';
import ProjectCard from '@/components/pages/dashboard/ProjectCard';
import { useEffect, useState } from 'react';
import { supabase } from '@/supabaseClient';
import Sidebar from '@/components/SideBar';
import ProjectDetail from '@/components/pages/dashboard/ProjectDetail';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import ProjectDialog from '@/components/pages/dashboard/ProjectDialog';
import { DialogTrigger } from '@/components/ui/dialog';

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
  const [projects, setProjects] = useState<ProjectType[] | null>([]);
  const [showProjectList, setShowProjectList] = useState(true);
  const [selectProject, setSelectProject] = useState<ProjectType | undefined>();
  // const [isOpenProjectDialog, setIsOpenProjectDialog] = useState(false);

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

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleDialogOpen = () => {
    setIsDialogOpen((prev) => !prev);
  };

  const handleProjectSelect = (id: number) => {
    setSelectProject(projects?.find((item) => item.id === id));
    // setShowProjectList(false);
    // console.log(isOpenProjectDialog);
    // setIsOpenProjectDialog((prev) => !prev);
    handleDialogOpen();
  };

  const handleToggleSidebar = () => {
    setShowProjectList(true);
  };

  return (
    <div className="flex-1 h-screen">
      {/* <AnimatePresence initial={false}> */}
      {/* {showProjectList ? (
          <motion.div
            key="project-list"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="mx-4 mt-6 h-full"
          > */}

      <SearchAddNewProject setProjects={setProjects} />

      {projects?.map((project) => (
        <ProjectCard
          onClick={() => handleProjectSelect(project.id)}
          key={project.id}
          project={project}
        />
      ))}
      <ProjectDialog
        key={isDialogOpen ? 'open' : 'closed'} // key 를 사용해서, 열릴때와 닫힐때 key 값을 변경하므로써, 새로운 인스턴스로 인식하게 하고, 기존 컴포넌트 재사용을 막는다.
        action="detail"
        isOpen={isDialogOpen}
        setIsOpen={handleDialogOpen}
        selectProject={selectProject}
      />
      {/* </motion.div>
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
              <ProjectDetail selectProject={selectProject}></ProjectDetail>
            </motion.div>
          </div>
        )} */}
      {/* </AnimatePresence> */}
    </div>
  );
};

export default Dashboard;
