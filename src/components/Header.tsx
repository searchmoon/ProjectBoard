import { Bell } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className=" shadow-sm border-b w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-indigo-600">TaskFlow</h1>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/dashboard"
                className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                대시보드
              </Link>
              <Link
                to="/projects"
                className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium"
              >
                프로젝트
              </Link>
              <Link
                to="/kanban"
                className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium"
              >
                칸반보드
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100"
            >
              <Bell className="h-5 w-5" />
            </Button>
            <div className="ml-3 relative">
              <Link to="/login">
                <Avatar>
                  <AvatarImage src="/api/placeholder/32/32" alt="User avatar" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
