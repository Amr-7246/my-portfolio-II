import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaProjectDiagram, FaList } from 'react-icons/fa';

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-[var(--black)] text-[var(--text)]  ">
      <nav className="my-20 py-4 border-y border-white/50 w-[80%] mx-auto">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="space-x-4">
            <Link
              to="/admin/project/show"
              className="inline-flex items-center px-4 py-2 rounded-lg hover:bg-[var(--dark-orange)] transition-colors"
            >
              <FaProjectDiagram className="mr-2" />
              Projects
            </Link>
            <Link
              to="/admin/category/show"
              className="inline-flex items-center px-4 py-2 rounded-lg hover:bg-[var(--dark-orange)] transition-colors"
            >
              <FaList className="mr-2" />
              Categories
            </Link>
          </div>
        </div>
      </nav>
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
