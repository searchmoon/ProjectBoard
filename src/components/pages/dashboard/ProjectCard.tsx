import { Menu, Calendar, Users } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import dayjs from 'dayjs';

const ProjectCard = ({ project }) => {
  const projectCreatedDate = dayjs(project.created_at);
  const projectDueDate = dayjs(project.due_date);

  const duration = projectDueDate.diff(projectCreatedDate, 'days');
  return (
    <div className="p-5 border rounded-lg shadow-sm bg-white">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {project.title}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {project.status} • 마감일 {duration}
            {duration == 0 ? '당일' : '일 전'}
          </p>
        </div>
        <Menu className="h-5 w-5 text-gray-400" />
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-600">{project.description}</p>
      </div>
      <div className="mt-4">
        <div className="flex items-center space-x-2">
          <div className="flex -space-x-2">
            <Avatar className="h-8 w-8 border-2 border-white">
              <AvatarImage src="/api/placeholder/32/32" alt="Team member 1" />
              <AvatarFallback></AvatarFallback>
            </Avatar>
            <Avatar className="h-8 w-8 border-2 border-white">
              <AvatarImage src="/api/placeholder/32/32" alt="Team member 2" />
              <AvatarFallback></AvatarFallback>
            </Avatar>
            <Avatar className="h-8 w-8 border-2 border-white">
              <AvatarImage src="/api/placeholder/32/32" alt="Team member 3" />
              <AvatarFallback></AvatarFallback>
            </Avatar>
          </div>
          <span className="text-sm text-gray-500">+2 명</span>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 text-gray-400 mr-1" />
            <span className="text-sm text-gray-500">{project.created_at}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 text-gray-400 mr-1" />
            <span className="text-sm text-gray-500">5명</span>
          </div>
        </div>
        <div className="w-full max-w-[120px]">
          <Progress value={45} className="h-2" />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
