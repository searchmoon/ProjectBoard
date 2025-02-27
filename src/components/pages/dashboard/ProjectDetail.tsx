import type React from 'react';
interface ProjectDetailProps {
  projectId: number | null;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ projectId }) => {
  return (
    <div className="p-4 mx-4">
      <h2 className="text-2xl font-bold mb-4">프로젝트 {projectId} 상세</h2>
    </div>
  );
};

export default ProjectDetail;
