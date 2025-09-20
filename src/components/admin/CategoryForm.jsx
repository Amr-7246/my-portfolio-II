import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaSave, FaTimes, FaUpload } from 'react-icons/fa';
import { useGetEntity, usePostEntity, usePatchEntity, useGetOneFromEntity } from '../../APIs';
import {uploadAsset, deleteAsset as cloudAssetsDelete } from "../../utils/assetsUpload"
import toast from 'react-hot-toast';
import { IoCloseCircle } from "react-icons/io5";
import { useGlobalContext } from '../../utils/GlobalContext';

const CategoryForm = ({id = null, closeFnc = null }) => {
//~ Start Data & hooks 
  const navigate = useNavigate();
  const {allCategories: categories} = useGlobalContext()
  const { mutate: createCategory } = usePostEntity('portfolio/category');
  const { mutate: updateCategory } = usePatchEntity('portfolio/category');
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState(null)
  const [isSend, setIsSend] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    isActive: true,
    image: null
  });
//~ end Data & hooks

//~ start logic
  //& populate data at the form if editing
    useEffect(() => {
      console.log(id)
      if (id) {
        try {
          if (categories == undefined) {
            console.log("There is no categoris Yet")
          }else{
            setLoading(true);
            const editedCategory = categories.filter((thisCate) => thisCate._id == id )
            console.log(editedCategory[0])
            setFormData({
              ...editedCategory[0],
            });
            console.log(formData)

          }
        } catch (error) {
          console.error('Error fetching category:', error);
        } finally {
          setLoading(false);
        }
      }
      
    }, [id, categories]);

  //& set images for previw it before uplading
    const handleAssetsChange = (e, assetsType) => {
      const files = e.target.files ;
      const localUrl = URL.createObjectURL(files[0])

      if ( assetsType == "image") {
        if (images) {
          setImages(prev => [...prev , { link : localUrl, file: files[0] }])
        }else{
          setImages([{ link : localUrl, file: files[0] }])
        }
      }

    };
    const deleteAsset = async (url, assetsType) => {
      if ( assetsType == "image") {
        if (images) {
          setImages(images.filter((thisUrl) => thisUrl.link == url ? null : thisUrl ))
          console.log("deleted")
        }
      }

      if ( assetsType == "cloud_image") {
        if (formData.image) {
          await cloudAssetsDelete(url)
          setFormData((prev) => ({
            ...prev,
            image : prev.image.filter((img) => img.publicId != url )
          }))
          console.log("deleted")
        }
      }
    }
    useEffect(() => {
      console.log(images)
    }, [images])
    
  //& Submit Data
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true)
      if (images && images.length > 0) {
        try {
          const imagesLinks = await uploadAsset(images[0].file)
          if (!imagesLinks) return toast.error("feild to upload images")
            console.log( "Here is images links " + imagesLinks)
          setFormData(prev => ({
            ...prev,
            image : imagesLinks
          }))
          setIsSend(true)
          
        } catch (error) {
          console.error(error);
        }
      }else {
        setIsSend(true)
      }
    };
    useEffect(() => {
      if (isSend ) {
        if (id) {
          updateCategory({ data: formData, id });
          closeFnc(false)
        } else {
          createCategory(formData);
        }
        setIsSend(false)
        setLoading(false)
        setImages(null)
        setFormData({
          name: '',
          slug: '',
          description: '',
          isActive: true,
          image: null
        })
      }
    }, [formData, isSend])
    
  //& collect form data
    const handleChange = (e) => {
      const { name, value, type, checked, files } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked :
                type === 'file' ? files[0] :
                value
      }));
    };
//~ end logic

  return (
    <form onSubmit={handleSubmit} className="w-[80%] mx-auto space-y-6">
      <h2 className="text-2xl font-bold">
        {id ? 'Edit Category' : 'New Category'}
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 bg-[var(--black)] border border-[var(--border)] rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Slug</label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            className="w-full p-2 bg-[var(--black)] border border-[var(--border)] rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full p-2 bg-[var(--black)] border border-[var(--border)] rounded-lg"
          />
        </div>

        <div>
          <label className="block mb-2">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="mr-2"
            />
            Active Category
          </label>
        </div>

        {/* Images */}
        <div className=' my-10 py-10 border-y border-white/50' >
          <label className="block mb-2 text-[var(--text)] w-fit">Images</label>
          <div className=" items-center space-x-4 flex justify-between">
            <label className="btn cursor-pointer inline-flex items-center">
              <FaUpload className="mr-2" />
              Upload Images
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleAssetsChange(e, "image")}
                className="hidden"
              />
            </label>
            {/*//& images preview befor uploading */}
            <div className='w-[500px] h-[150px] border-white/50 border rounded-xl flex-center '>
              { images && images.length > 0  ?  (
                <div className='w-[100%] h-[90%] overflow-auto flex-center flex-wrap gap-3'>
                      {images.map((imgSrc, idx) => (
                        <div className='relative'>
                          <img
                            key={idx}
                            src={imgSrc.link}
                            alt={`uploaded-${idx}`}
                            className="w-42 h-32 object-cover rounded-md shadow"
                          />
                          <span onClick={() => deleteAsset(imgSrc.link, "image")} className=' text-[20px] cursor-pointer text-rose-500 flex-center absolute top-1 left-1 hover:text-rose-800 duration-700 '>
                            <IoCloseCircle/>
                          </span>
                        </div>
                      ))}
                    </div>
                ) : id && formData.image ? 
                <div className='w-[100%] h-[90%] overflow-auto flex-center flex-wrap gap-3'>
                      {formData.image.map((imgSrc, idx) => (
                        <div className='relative'>
                          <img
                            key={idx}
                            src={imgSrc.secure_url}
                            alt={`uploaded-${idx}`}
                            className="w-42 h-32 object-cover rounded-md shadow"
                          />
                          <span onClick={() => deleteAsset(imgSrc.publicId , "cloud_image")} className=' text-[20px] cursor-pointer text-rose-500 flex-center absolute top-1 left-1 hover:text-rose-800 duration-700 '>
                            <IoCloseCircle/>
                          </span>
                        </div>
                      ))}
                    </div>
                :  <span className="text-[var(--text)] text-[12px]"> No umages added Yet. . .  </span>
              }

            </div>
          </div>
        </div>

      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => navigate('/admin/categories')}
          className="btn flex-center gap-3 bg-gray-500 hover:bg-gray-600"
        >
          <FaTimes className="mr-2" />
          Cancel
        </button>
        <button
          type="submit"
          className="btn flex-center gap-3"
          disabled={loading}
        >
          <FaSave className="mr-2" />
          {loading && id ? 'Saving...' : loading ? "Creating.... " : id ? 'Save Category' : 'create' }
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
