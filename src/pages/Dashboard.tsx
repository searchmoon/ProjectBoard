import SearchAddNewProject from '@/components/pages/dashboard/SearchAddNewProject';
import ProjectCard from '@/components/pages/dashboard/ProjectCard';
import { useEffect, useState } from 'react';
import { supabase } from '@/supabaseClient';
import { DefaultDialog } from '../components/common/DefaultDialog';
import useDialog from '@/hooks/useDialog';
import ModalProjectDetail from '@/components/common/modalContent/ModalProjectDetail';
import { SquarePen } from 'lucide-react';
import ModalProjectUpdate from '@/components/common/modalContent/ModalProjectUpdate';

export interface ProjectType {
  created_at: string;
  created_by?: string;
  description?: string;
  due_date: string;
  id: number;
  status: 'not-in-progress' | 'in-progress' | 'completed';
  title: string;
}
type ActionType = 'update' | 'create' | 'detail';

const Dashboard = () => {
  const [projects, setProjects] = useState<ProjectType[] | null>([]);
  const [action, setAction] = useState<ActionType>('detail');
  const [selectedProject, setSelectedProject] = useState<
    ProjectType | undefined
  >();
  const { isOpen, handleToggleDialog } = useDialog();

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

  const handleProjectSelect = (id: number) => {
    setSelectedProject(projects?.find((item) => item.id === id));
    setAction('detail');
    handleToggleDialog();
  };

  const handleChangeAction = (action: ActionType) => {
    setAction(action);
  };

  const handleProjectUpdate = (id: number | undefined) => {
    console.log(id);
  };

  return (
    <div className="flex-1 h-screen">
      <SearchAddNewProject setProjects={setProjects} />

      {projects?.map((project) => (
        <ProjectCard
          onClick={() => handleProjectSelect(project.id)}
          key={project.id}
          project={project}
        />
      ))}
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
          content={<ModalProjectDetail selectedProject={selectedProject} />}
          buttons={<button onClick={handleToggleDialog}>확인</button>}
        />
      ) : (
        <DefaultDialog
          // key={isOpen ? 'open' : 'closed'} // key 를 사용해서, 열릴때와 닫힐때 key 값을 변경하므로써, 새로운 인스턴스로 인식하게 하고, 기존 컴포넌트 재사용을 막는다.
          open={isOpen}
          onOpenChange={handleToggleDialog}
          title="프로젝트 수정"
          content={
            <ModalProjectUpdate
              action="update"
              selectedProject={selectedProject}
            />
          }
          buttons={
            <>
              <button>취소</button>
              <button onClick={() => handleProjectUpdate(selectedProject?.id)}>
                저장
              </button>
            </>
          }
        />
      )}
    </div>
  );
};

export default Dashboard;
