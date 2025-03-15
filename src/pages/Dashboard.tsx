import SearchAddNewProject from '@/components/pages/dashboard/SearchAddNewProject';
import ProjectCard from '@/components/pages/dashboard/ProjectCard';
import { useEffect, useState } from 'react';
import { supabase } from '@/supabaseClient';
import { DefaultDialog } from '../components/common/DefaultDialog';
import useDialog from '@/hooks/useDialog';
import ModalProjectDetail from '@/components/common/modalContent/ModalProjectDetail';
import { SquarePen } from 'lucide-react';
import ModalProjectUpdate from '@/components/common/modalContent/ModalProjectUpdate';
import { useProjectStore } from '@/store/useProjectStore';

export type Status = 'not-in-progress' | 'in-progress' | 'completed';
export interface ProjectType {
  created_at?: string;
  created_by?: string;
  description?: string;
  due_date: string;
  id?: number | string | undefined;
  status: Status;
  title: string;
}
type ActionType = 'update' | 'create' | 'detail';

const Dashboard = () => {
  const [action, setAction] = useState<ActionType>('detail');
  const [selectedProject, setSelectedProject] = useState<
    ProjectType | undefined
  >();
  const { projects, setProjects, setOriginalProjects } = useProjectStore();
  const { isOpen, handleToggleDialog } = useDialog();

  useEffect(() => {
    getProjects();
  }, []);

  async function getProjects() {
    const { data } = await supabase.from('project').select();
    if (data) {
      setProjects(data as ProjectType[]);
      setOriginalProjects(data as ProjectType[]);
      console.log(data);
    }
    // else {
    //   setProjects([]);
    //   setOriginalProjects([]);
    // }
  }

  const handleProjectSelect = (id: number) => {
    setSelectedProject(projects?.find((item) => item.id === id));
    setAction('detail');
    handleToggleDialog();
  };

  const handleChangeAction = (action: ActionType) => {
    setAction(action);
  };

  const handleUpdateProject = async (projectData: ProjectType) => {
    const { error, data } = await supabase
      .from('project')
      .update({ ...projectData })
      .eq('id', projectData.id)
      .select();
    console.log(data);
    if (error) {
      console.error(error);
    }
    handleToggleDialog();
  };

  return (
    <div className="flex-1 h-screen">
      <SearchAddNewProject />
      {projects?.map((project) => (
        <ProjectCard
          onClick={() => handleProjectSelect(project.id as number)}
          key={project.id}
          project={project}
        />
      ))}
      {projects.length === 0 && <p>프로젝트가 없습니다.</p>}
      {action === 'detail' ? (
        <DefaultDialog
          open={isOpen}
          onOpenChange={handleToggleDialog}
          title="프로젝트 상세"
          icon={
            <SquarePen
              className="w-4 h-4 ml-2 cursor-pointer text-zinc-500"
              onClick={() => handleChangeAction('update')}
            />
          }
          content={
            <ModalProjectDetail
              selectedProject={selectedProject}
              handleToggle={handleToggleDialog}
            />
          }
        />
      ) : (
        <DefaultDialog
          open={isOpen}
          onOpenChange={handleToggleDialog}
          title="프로젝트 수정"
          content={
            <ModalProjectUpdate
              action="update"
              handleSubmit={handleUpdateProject}
              selectedProject={selectedProject}
              handleCancel={handleToggleDialog} // 추가된 prop
            />
          }
        />
      )}
    </div>
  );
};

export default Dashboard;
