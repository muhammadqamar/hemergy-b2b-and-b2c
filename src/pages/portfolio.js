import { useEffect, useState } from 'react';
import SideBar from '@/dashboard/sideBar';
import PortfolioPage from '@/dashboard/portfolio';
import { projectDetail } from '@/services/project';
import { useSelector } from 'react-redux';

const Portfolio = () => {
  const state = useSelector((state) => state);

  const [userProject, setUserProject] = useState([]);
  const [userInvestor, setUserInvestor] = useState([]);

  useEffect(() => {
    setUserInvestor();
  }, []);

  useEffect(() => {
    (async () => {
      const project = await projectDetail();
      setUserProject(project?.data?.projectDetail);
    })();
  }, []);

  return (
    <div>
      <SideBar />
      <PortfolioPage />
    </div>
  );
};

export default Portfolio;
