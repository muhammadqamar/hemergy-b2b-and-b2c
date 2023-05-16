import SideBar from '@/dashboard/sideBar';
import ProjectDetails from '@/dashboard/projectDetails';
import { projectDetailId } from '@/services/project';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BalanceCom from '@/components/balance';

const ProjectDetail = ({ projectId }) => {
  const [projectData, setProjectData] = useState();

  console.log(projectData);

  useEffect(() => {
    (async () => {

      const response = await projectDetailId(projectId?.path);
      setProjectData(response?.data?.projectDetail);
    })();
  }, [projectId]);
  return (
    <div>
      <SideBar />
      <ProjectDetails projectData={projectData} />
      <BalanceCom />
    </div>
  );
};

export default ProjectDetail;

export async function getServerSideProps(context) {
  const projectId = context?.params;

  return {
    props: {
      projectId,
    },
  };
}
