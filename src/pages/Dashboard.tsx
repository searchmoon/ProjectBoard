import AddNewProject from '@/components/pages/dashboard/SearchAddNewProject';
import ProjectCard from '@/components/pages/dashboard/ProjectCard';

const Dashboard = () => {
  return (
    <div className="p-6 bg-slate-100 h-screen">
      <AddNewProject />
      <ProjectCard />
    </div>
  );
};

export default Dashboard;
