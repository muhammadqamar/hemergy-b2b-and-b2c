import { useSelector } from 'react-redux';

import SideBar from '@/dashboard/sideBar';
import LocationForm from '@/dashboard/loaction';
import CreateProjects from '@/dashboard/createProjects/create-projects';
import { useEffect, useState } from 'react';

const Projects = () => {
  const { user } = useSelector((state) => state.user);

  const [userCheck, setUserCheck] = useState('');

  useEffect(() => {
    setUserCheck(user?.userType);
  }, [userCheck]);

  return (
    <div>
      <SideBar />
      {userCheck === 'INVESTOR' ? <LocationForm /> : <CreateProjects />}
    </div>
  );
};

export default Projects;
