import { useEffect, useState } from 'react';
import SideBar from '@/dashboard/sideBar';
import PortfolioPage from '@/dashboard/portfolio';
import { projectDetail } from '@/services/project';
import { useSelector } from 'react-redux';

const Portfolio = () => {
  const state = useSelector((state) => state);

  const [userProject, setUserProject] = useState([]);
  const [userInvestor, setUserInvestor] = useState([]);

  function filterData(userProject, userInvestor) {
    const filteredData = [];

    userProject.forEach((item1) => {
      const item2 = userInvestor.find(
        (item2) => item2.projectAddress === item1.projectAddress
      );
      if (item2) {
        filteredData.push({ ...item1, ...item2 });
      }
    });

    return filteredData;
  }

  const filteredData = filterData(userProject, userInvestor);

  useEffect(() => {
    (async () => {
      const project = await projectDetail();
      setUserProject(project?.data?.projectDetail);
    })();
    setUserInvestor(state?.user?.user?.projectsasInvestor);
  }, []);

  return (
    <div>
      <SideBar />
      <PortfolioPage userProject={filteredData} />
    </div>
  );
};

export default Portfolio;
