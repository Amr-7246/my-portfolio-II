import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { MdMovieEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { useGetEntity, useDeleteEntity } from '../../APIs';
import toast from 'react-hot-toast';
import CategoryForm from './CategoryForm';
import PopupCard from '../../../components/PopupCard';
import { useGlobalContext } from '../../utils/GlobalContext';
import {
  AIDeveloper, backend, freelancer, frontend, fullstack, mern1, mern2, programmer, projectManger, systemDesign, systemDesign2
} from '../../assets'


const CategoryList = () => {
  const {allCategories, setallCategories} = useGlobalContext()
  const { data } = useGetEntity( 'portfolio/category', setallCategories );
  const { mutate: deleteCategory } = useDeleteEntity('portfolio/category');
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false)
  const [editedCateId, setEditedCateId] = useState('')

  useEffect(() => {
    console.log(data)
    console.log(allCategories)
    if (allCategories == undefined) {
      setError("Net working Error, try again later")
      error ? toast.error(error) : null
      setLoading(false);
    }else{
      setCategories(allCategories);
      setLoading(false);
    }
  }, [allCategories, error]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    deleteCategory(id);
  };

  if (loading) {
    return <div className="text-center p-8">Loading...</div>;
  }
  const truncate = (text, max) =>
  text && text.length > max ? text.slice(0, max) + "..." : text;
  const images = [frontend,  backend, freelancer, fullstack, mern1, mern2, programmer, projectManger, systemDesign, systemDesign2, AIDeveloper]
  return (
    <div className="space-y-6 relative">

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Categories</h2>
        <Link
          to="/admin/category/create"
          className="btn inline-flex items-center"
        >
          <FaPlus className="mr-2" />
          New Category
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 w-full">
        {categories.length > 0 ? categories.map((category,idx) => (
          <div
            key={category._id}
            className=" flex-center gap-3 h-[150px]"
          >

            <div className='h-full w-[200px] flex-center border border-[var(--border)] rounded-lg p-4'>
              {/* {category.image[0] ? ( //& change it later */}
              {false ? (
                <img
                  src={ category.image[0].secure_url != undefined ?
                        category.image[0].secure_url :
                        images.length > (idx - 1) ? images[idx] :
                        images[0] }
                  alt={category.name}
                  className="w-full object-cover rounded-lg" />
              ) :
                <img src={images.length > (idx - 1) ? images[idx] : images[0] } alt={'alt image'} className="w-full object-cover rounded-lg" />
              }
            </div>

            <div className='relative border border-[var(--border)] rounded-lg p-4 w-full h-full'>
              <div>
                <h3 className="text-xl font-bold">{category.name}</h3>
                <p className="text-gray-400">{truncate(category.description, 40) || 'No description'}</p>
              </div>

              <div className=" absolute bottom-3 right-5 py-0 px-6 rounded-3xl bg-stone-900 flex justify-end space-x-2">
                <button onClick={() => { setIsEdit(true),  setEditedCateId(category._id)} } className="p-2 text-sky-500/50 hover:opacity-80" >
                  <RiEdit2Fill />
                </button>
                <button
                  onClick={() => handleDelete(category._id)}
                  className="p-2 text-rose-500/50 hover:opacity-80"
                  title="Delete"
                >
                  <MdDelete />
                </button>
              </div>

            </div>

          </div>
        )) : <span className='w-full text-center flex-center '>There is no categories had been added Yet . . . </span>
        }
      </div>

      <PopupCard
        isOpen={isEdit}
        setIsOpen={setIsEdit}
        CardContetnt={CategoryForm}
        CardContetntProps = {{id : editedCateId, closeFnc: setIsEdit}}
        cardStyle=""
      />
    </div>
  );
};

export default CategoryList;
