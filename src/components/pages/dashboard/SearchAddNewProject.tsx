import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { supabase } from '@/supabaseClient';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import useDebounce from '../../../hooks/useDebounce';
import { ProjectType } from '@/pages/Dashboard';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { DefaultDialog } from '@/components/common/DefaultDialog';
import useDialog from '../../../hooks/useDialog';
import ModalProjectUpdate from '@/components/common/modalContent/ModalProjectUpdate';

interface SearchAddNewProjectProp {
  setProjects: Dispatch<SetStateAction<ProjectType[] | null>>;
}

const SearchAddNewProject = ({ setProjects }: SearchAddNewProjectProp) => {
  const [search, setSearch] = useState('');
  const debounceValue = useDebounce(search);

  const handleSearchProject = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      if (debounceValue) {
        const { data: filteredData } = await supabase
          .from('project')
          .select('*')
          .like('title', `%${debounceValue}%`);
        setProjects(filteredData);
      }
    };

    fetchProjects();
  }, [debounceValue]);

  const { isOpen, handleToggleDialog } = useDialog();

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex-1">
        <div className="relative mr-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="프로젝트 검색..."
            type="text"
            value={search}
            onChange={handleSearchProject}
          />
        </div>
      </div>
      <div className="ml-3">
        <Button
          onClick={handleToggleDialog}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />새 프로젝트
        </Button>
        <DefaultDialog
          open={isOpen}
          onOpenChange={handleToggleDialog}
          title="프로젝트 생성"
          content={<ModalProjectUpdate />}
        />
      </div>
    </div>
  );
};

export default SearchAddNewProject;
