import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaEye, FaPlus } from 'react-icons/fa';
import {useGetEntity, useDeleteEntity} from "../../APIs"
import toast from 'react-hot-toast';
import { useGlobalContext } from '../../utils/GlobalContext';

const ProjectList = () => {
  const {allProjects, setAllProjects} = useGlobalContext()
  const { data } = useGetEntity('portfolio/project', setAllProjects )

  const {mutate:deleteProject} = useDeleteEntity('portfolio/project')
  const [error, setError] = useState('')
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (allProjects == undefined) {
      setError("Net working Error try again later")
      error && toast.error(error)
      setLoading(false);
      return
    }else{
      setProjects(allProjects);
      setLoading(false);
    }
  }, [allProjects, error]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      deleteProject()
      setProjects(projects.filter(project => project._id !== id));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  if (loading) {
    return <div className="text-center p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Projects</h2>
        <Link
          to="/admin/projects/create"
          className="btn inline-flex items-center"
        >
          <FaPlus className="mr-2" />
          New Project
        </Link>
      </div>

      <div className="overflow-x-auto ">
        <table className="min-w-full border border-[var(--border)] ">
          <thead>
            <tr className="bg-[var(--orange)]">
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Featured</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className='flex-center flex-col w-full p-5'>
            { projects.length > 0 ? projects.map((project) => (
              <tr key={project._id} className="border-t border-[var(--border)] hover:bg-[var(--dark-orange)] transition-colors">
                <td className="p-4">{project.title}</td>
                <td className="p-4">{project.category.name}</td>
                <td className="p-4">{project.status}</td>
                <td className="p-4">{project.isFeatured ? 'Yes' : 'No'}</td>
                <td className="p-4">
                  <div className="flex justify-center space-x-2">
                    <Link
                      to={`/project/${project._id}`}
                      className="p-2 text-[var(--green)] hover:opacity-80"
                      title="View"
                    >
                      <FaEye />
                    </Link>
                    <Link
                      to={`/admin/project/${project._id}`}
                      className="p-2 text-[var(--orange)] hover:opacity-80"
                      title="Edit"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => handleDelete(project._id)}
                      className="p-2 text-red-500 hover:opacity-80"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            )) : <span className='w-full text-center'>There is no Projects had been added Yet . . . </span>

          }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectList;
