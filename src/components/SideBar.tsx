import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  onToggle: () => void;
  children?: React.ReactNode;
}

const Sidebar = ({ onToggle, children }: SidebarProps) => {
  return (
    <div className="w-[60px] h-full bg-gray-100 flex flex-col items-center py-4">
      <Button variant="ghost" size="icon" onClick={onToggle}>
        <ChevronLeft className="h-6 w-6" />
      </Button>
      {children}
    </div>
  );
};

export default Sidebar;
