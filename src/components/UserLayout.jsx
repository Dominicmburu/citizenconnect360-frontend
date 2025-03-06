import React from 'react';
import UserHeader from './UserHeader';
import Footer from './Footer';

const UserLayout = ({ children }) => {
  return (
    <div className="app-container">
      <UserHeader />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;