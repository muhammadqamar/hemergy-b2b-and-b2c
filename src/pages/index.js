import { useSelector } from 'react-redux';

import SideBar from '@/dashboard/sideBar';
import LocationForm from '@/dashboard/loaction';
import CreateProjects from '@/dashboard/createProjects/create-projects';
import { useEffect, useState } from 'react';

const Projects = () => {
  return (
    <div>
      <SideBar />
      {localStorage.getItem('user-type') === 'developer' ? (
        <CreateProjects />
      ) : (
        <LocationForm />
      )}
    </div>
  );
};

export default Projects;
