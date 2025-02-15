import { Card } from '@/components/ui/card';
import { CardHeader } from '@/components/ui/card';
import { CardTitle } from '@/components/ui/card';
import { MoreHorizontal, Plus } from 'lucide-react';
import { CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { DropdownMenuContent } from '@radix-ui/react-dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const tasks = [
  {
    id: '1',
    title: '태스크 1-1',
    description: '이 태스크에 대한 설명이 들어갑니다.',
    priority: '우선순위 높음',
  },
  {
    id: '2',
    title: '태스크 1-2',
    description: '이 태스크에 대한 설명이 들어갑니다.',
    priority: '우선순위 높음',
  },
  {
    id: '3',
    title: '태스크 1-3',
    description: '이 태스크에 대한 설명이 들어갑니다.',
    priority: '우선순위 높음',
  },
];

const teamMembers = [
  { name: 'Team member 1', image: '/placeholder.svg?height=32&width=32' },
  { name: 'Team member 2', image: '/placeholder.svg?height=32&width=32' },
  { name: 'Team member 3', image: '/placeholder.svg?height=32&width=32' },
  { name: 'Team member 4', image: '/placeholder.svg?height=32&width=32' },
];

function TaskMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>작업</DropdownMenuLabel>
        <DropdownMenuItem>태스크 편집</DropdownMenuItem>
        <DropdownMenuItem>담당자 변경</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>태스크 삭제</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function KanbanTask({
  task,
}: {
  task: { title: string; description: string; priority: string };
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="text-sm font-medium">{task.title}</p>
            <p className="text-sm text-muted-foreground">{task.description}</p>
          </div>
          <TaskMenu />
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex -space-x-2">
            {teamMembers.map((member, index) => (
              <Avatar key={index} className="border-2 border-white">
                <AvatarImage src={member.image} alt={member.name} />
                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
              </Avatar>
            ))}
          </div>
          <Badge variant="secondary">{task.priority}</Badge>
        </div>
      </CardContent>
    </Card>
  );
}

const KanbanColumn = ({
  title,
  taskCount,
}: {
  title: string;
  taskCount: number;
}) => {
  return (
    <Card className="w-[300px] bg-gray-100">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Badge variant="secondary">{taskCount}</Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tasks.map((task) => (
            <KanbanTask key={task.id} task={task} />
          ))}
          <Button variant="outline" className="w-full">
            <Plus className="mr-2 h-4 w-4" />새 태스크 추가
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default KanbanColumn;
