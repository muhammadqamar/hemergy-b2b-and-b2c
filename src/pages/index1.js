import SideBar from '@/dashboard/sideBar';
import CreateProjects from '@/dashboard/createProjects/create-projects';

export default function CreateProjectsPage() {
  return (
    <div className="min-h-[960px]">
      <SideBar />
      <CreateProjects />
    </div>
  );
}
