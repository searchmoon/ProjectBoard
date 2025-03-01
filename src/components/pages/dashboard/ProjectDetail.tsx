import { ProjectType } from '@/pages/Dashboard';
import type React from 'react';
interface ProjectDetailProps {
  selectProject: ProjectType | undefined;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({
  selectProject,
}: ProjectDetailProps) => {
  const { created_at, created_by, description, due_date, id, status, title } =
    selectProject as ProjectType;
  return (
    <div className="p-4 mx-4">
      <h2 className="text-2xl font-bold mb-4">프로젝트: {title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default ProjectDetail;
