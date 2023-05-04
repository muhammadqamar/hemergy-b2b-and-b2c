import { useSelector } from 'react-redux';
import SideBarB2C from './sideBarB2C';
import SideBarB2B from './sideBarB2B';
import { useEffect, useState } from 'react';

const Index = ({ children }) => {
  const { user } = useSelector((state) => state.user);

  const [userCheck, setUserCheck] = useState('');

  useEffect(() => {
    setUserCheck(user?.userType);
  }, [userCheck]);

  return (
    <>
      {localStorage.getItem('user-type') !== 'developer' ? (
        <SideBarB2C />
      ) : (
        <SideBarB2B />
      )}
      <main>{children}</main>
    </>
  );
};

export default Index;
