import React from 'react';
import '../assets/styles/sidebar.css';
import { NavLink } from 'react-router-dom';

const AdminSidebar = () => {
  const menuItems = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Incident Management', path: '/incidents' },
    { name: 'Poll Management', path: '/polls' },
    { name: 'Feedback Management', path: '/feedbacks' },
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

export default AdminSidebar;