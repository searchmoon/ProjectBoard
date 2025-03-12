import { Label } from '@/components/ui/label';
import { ProjectType } from '@/pages/Dashboard';

export default function ModalProjectDetail({
  selectedProject,
  handleToggle,
}: {
  selectedProject: ProjectType | undefined;
  handleToggle: () => void;
}) {
  const modalGridStyle = 'grid grid-cols-4 items-center gap-4';

  return (
    <div className="grid gap-4 py-4">
      <div className={modalGridStyle}>
        <Label htmlFor="title" className="text-right">
          프로젝트 이름
        </Label>
        <p className="col-span-3">{selectedProject?.title}</p>
      </div>
      <div className={modalGridStyle}>
        <Label htmlFor="dueDate" className="text-right">
          마감일자
        </Label>
        <p className="col-span-3">{selectedProject?.due_date}</p>
      </div>
      <div className={modalGridStyle}>
        <Label htmlFor="status" className="text-right">
          상태
        </Label>
        <p className="col-span-3">{selectedProject?.status}</p>
      </div>
      <div className={modalGridStyle}>
        <Label htmlFor="description" className="text-right">
          설명
        </Label>
        <p className="col-span-3">{selectedProject?.description}</p>
      </div>
      <div className={modalGridStyle}>
        <Label htmlFor="description" className="text-right">
          멤버 이름
        </Label>
        <p className="col-span-3">{selectedProject?.created_by}</p>
      </div>
      <button onClick={handleToggle}>확인</button>
    </div>
  );
}
