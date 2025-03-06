import React from 'react';
import '../assets/styles/sidebar.css';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Reports', path: '/reports' },
    { name: 'Citizen Education', path: '/education' },
    { name: 'Feedback', path: '/feedback' },
  ];

  return (
    <nav className="sidebar">
      {menuItems.map((item, index) => (
        <NavLink 
          key={index} 
          to={item.path} 
          className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
        >
          {item.name}
        </NavLink>
      ))}
    </nav>
  );
};

export default Sidebar;