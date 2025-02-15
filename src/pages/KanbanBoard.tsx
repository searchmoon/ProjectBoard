import { Plus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import KanbanColumn from '@/components/pages/kanbanboard/KanbanColumn';

const KanbanBoard = () => {
  const teamMembers = [
    { name: 'Team member 1', image: '/placeholder.svg?height=32&width=32' },
    { name: 'Team member 2', image: '/placeholder.svg?height=32&width=32' },
    { name: 'Team member 3', image: '/placeholder.svg?height=32&width=32' },
    { name: 'Team member 4', image: '/placeholder.svg?height=32&width=32' },
  ];

  const columns = [
    { title: '할 일', tasks: 2 },
    { title: '진행 중', tasks: 3 },
    { title: '검토', tasks: 4 },
    { title: '완료', tasks: 5 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              프로젝트 칸반 보드
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              팀 프로젝트 진행 상황을 관리하세요
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex -space-x-2">
              {teamMembers.map((member, index) => (
                <Avatar key={index} className="border-2 border-white">
                  <AvatarImage src={member.image} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> 멤버 초대
            </Button>
          </div>
        </div>
      </div>
      <ScrollArea className="w-full whitespace-nowrap rounded-md border">
        <div className="flex w-max space-x-4 p-4">
          {columns.map((column) => (
            <KanbanColumn
              key={column.title}
              title={column.title}
              taskCount={column.tasks}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default KanbanBoard;
