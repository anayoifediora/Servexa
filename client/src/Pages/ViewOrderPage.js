import React from 'react';
import { useQuery } from '@apollo/client/react';

//Components
import ProfileNavbar from '../Components/ProfileNavbar';
import SidebarMenu from '../Components/SidebarMenu';

const ViewOrderPage = () => {
  return (
    <div className="dashboard-page">
      <ProfileNavbar />
      <SidebarMenu />
      <div className="custom-info-area">
        <p>hello</p>
      </div>
    </div>
  );
};

export default ViewOrderPage;
