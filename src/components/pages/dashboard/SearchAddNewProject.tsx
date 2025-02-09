import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import NewProjectDialog from './NewProjectDialog';

const SearchAddNewProject = () => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex-1 max-w-lg">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="프로젝트 검색..."
            type="text"
          />
        </div>
      </div>
      <div className="ml-3">
        <NewProjectDialog />
      </div>
    </div>
  );
};

export default SearchAddNewProject;
