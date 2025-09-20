import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaSave, FaTimes, FaUpload, FaLink, FaGithub, FaStar, FaEye } from 'react-icons/fa';
import { useGetEntity, usePostEntity, usePatchEntity, useGetOneFromEntity } from '../../APIs';
import {uploadAsset} from "../../utils/assetsUpload"
import toast from 'react-hot-toast';
// import { Project, ProjectCategory } from '../../types/projectsTypes';
import { IoCloseCircle } from "react-icons/io5";

const ProjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: categories } = useGetEntity('portfolio/category');
  const { mutate: createProject } = usePostEntity('portfolio/project');
  const { mutate: updateProject } = usePatchEntity('portfolio/project');
  const { mutate: getProject, data: projectData } = useGetOneFromEntity('portfolio/project', id);

  const [images, setImages] = useState([])
  const [videos, setVideos] = useState([])
  const [formData, setFormData] = useState({
    title: '',
    shortDesc: '',
    description: '',
    liveDemo: '',
    repoLink: '',
    isFeatured: false,
    rating: 0,
    views: 0,
    status: 'planning',
    techStack: '',
    category: '',
    images: [],
    videos: []
  });

  useEffect(() => {
    if (id) {
      getProject();
    }
  }, [id]);

  useEffect(() => {
    if (projectData) {
      setFormData({
        ...projectData,
        category: projectData.category._id,
        techStack: projectData.techStack.map(tech => tech.name).join(', ')
      });
    }
  }, [projectData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imagesLinks = uploadAsset(images)
    if (!imagesLinks) return toast.error("feild to upload images")
    setFormData(prev => ({
      ...prev,
      images : imagesLinks
    }))
    const projectData = {
      ...formData,
      techStack: formData.techStack.split(',').map(tech => ({
        name: tech.trim()
      }))
    };

    if (id) {
      updateProject({ data: projectData, id });
    } else {
      createProject(projectData);
    }

    navigate('/admin/projects');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  //& set images for previw it befor uplading
    const handleAssetsChange = (e, assetsType) => {
      const files = e.target.files ;
      const localUrl = URL.createObjectURL(files[0])

      if ( assetsType == "image") {
        setImages(prev => [...prev , localUrl])
      }
      if ( assetsType == "video") {
        setVideos(prev => [...prev , localUrl])
      }

    };
    const deleteAsset = (url, assetsType) => {
      if ( assetsType == "image") {
        setImages(images.filter((thisUrl) => thisUrl == url ? null : thisUrl ))
        console.log("deleted")
      }
      if ( assetsType == "video") {
        setVideos(videos.filter((thisUrl) => thisUrl == url ? null : thisUrl ))
      }
    }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6 p-6 bg-[var(--black)] rounded-lg">

      <h2 className="text-2xl font-bold text-[var(--text)]">
        {id ? 'Edit Project' : 'New Project'}
      </h2>

      <div className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-[var(--text)]">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 bg-[var(--black)] border border-[var(--border)] rounded-lg text-[var(--text)]"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-[var(--text)]">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 bg-[var(--black)] border border-[var(--border)] rounded-lg text-[var(--text)]"
              required
            >
              <option value="">Select Category</option>
              {categories?.map(category => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Descriptions */}
        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-[var(--text)]">Short Description</label>
            <input
              type="text"
              name="shortDesc"
              value={formData.shortDesc}
              onChange={handleChange}
              className="w-full p-3 bg-[var(--black)] border border-[var(--border)] rounded-lg text-[var(--text)]"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-[var(--text)]">Full Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              className="w-full p-3 bg-[var(--black)] border border-[var(--border)] rounded-lg text-[var(--text)]"
              required
            />
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-[var(--text)] flex items-center">
              <FaLink className="mr-2" /> Live Demo URL
            </label>
            <input
              type="url"
              name="liveDemo"
              value={formData.liveDemo}
              onChange={handleChange}
              className="w-full p-3 bg-[var(--black)] border border-[var(--border)] rounded-lg text-[var(--text)]"
            />
          </div>
          <div>
            <label className="block mb-2 text-[var(--text)] flex items-center">
              <FaGithub className="mr-2" /> Repository URL
            </label>
            <input
              type="url"
              name="repoLink"
              value={formData.repoLink}
              onChange={handleChange}
              className="w-full p-3 bg-[var(--black)] border border-[var(--border)] rounded-lg text-[var(--text)]"
            />
          </div>
        </div>

        {/* Stats & Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block mb-2 text-[var(--text)] flex items-center">
              <FaStar className="mr-2" /> Rating
            </label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              min="0"
              max="5"
              step="0.1"
              className="w-full p-3 bg-[var(--black)] border border-[var(--border)] rounded-lg text-[var(--text)]"
            />
          </div>
          <div>
            <label className="block mb-2 text-[var(--text)] flex items-center">
              <FaEye className="mr-2" /> Views
            </label>
            <input
              type="number"
              name="views"
              value={formData.views}
              onChange={handleChange}
              min="0"
              className="w-full p-3 bg-[var(--black)] border border-[var(--border)] rounded-lg text-[var(--text)]"
            />
          </div>
          <div>
            <label className="block mb-2 text-[var(--text)]">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-3 bg-[var(--black)] border border-[var(--border)] rounded-lg text-[var(--text)]"
              required
            >
              <option value="planning">Planning</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Tech Stack */}
        <div>
          <label className="block mb-2 text-[var(--text)]">Tech Stack (comma-separated)</label>
          <input
            type="text"
            name="techStack"
            value={formData.techStack}
            onChange={handleChange}
            placeholder="React, Node.js, MongoDB"
            className="w-full p-3 bg-[var(--black)] border border-[var(--border)] rounded-lg text-[var(--text)]"
            required
          />
        </div>

        {/* Featured Toggle */}
        <div>
          <label className="flex items-center space-x-2 text-[var(--text)] cursor-pointer">
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
              className="w-5 h-5"
            />
            <span>Featured Project</span>
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
              { images.length > 0 ? (
                <div className='w-[100%] h-[90%] overflow-auto flex-center flex-wrap gap-3'>
                      {images.map((imgSrc, idx) => (
                        <div className='relative'>
                          <img
                            key={idx}
                            src={imgSrc}
                            alt={`uploaded-${idx}`}
                            className="w-42 h-32 object-cover rounded-md shadow"
                          />
                          <span onClick={() => deleteAsset(imgSrc, "image")} className=' text-[20px] cursor-pointer text-rose-500 flex-center absolute top-1 left-1 hover:text-rose-800 duration-700 '>
                            <IoCloseCircle/>
                          </span>
                        </div>
                      ))}
                    </div>
                ):  <span className="text-[var(--text)] text-[12px]"> No umages added Yet. . .  </span>
              }

            </div>
          </div>
        </div>

        {/* Videos */}
          <div className="my-10 py-10 border-y border-white/50">
            <label className="block mb-2 text-[var(--text)] w-fit">Videos</label>
            <div className="flex items-center justify-between space-x-4">
              <label className="btn cursor-pointer inline-flex items-center">
                <FaUpload className="mr-2" />
                Upload Videos
                <input
                  type="file"
                  multiple
                  accept="video/*"
                  onChange={(e) => handleAssetsChange(e, "video")}
                  className="hidden"
                />
              </label>

              {/* Video Preview */}
              <div className="w-[500px] h-[150px] border-white/50 border rounded-xl flex-center">
                {videos.length > 0 ? (
                  <div className="w-full h-[90%] overflow-auto flex-center flex-wrap gap-3">
                    {videos.map((vidSrc, idx) => (
                      <div className='relative'>
                        <video
                          key={idx}
                          src={vidSrc}
                          controls
                          className="w-62 h-32 object-cover rounded-md shadow"
                        />
                          <span onClick={() => deleteAsset(vidSrc, "video")} className=' text-[20px] cursor-pointer text-rose-500 flex-center absolute top-1 left-1 hover:text-rose-800 duration-700 '>
                            <IoCloseCircle/>
                          </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="text-[var(--text)] text-[12px]">
                    No videos added yet...
                  </span>
                )}
              </div>
            </div>
          </div>

      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-4 pt-6">
        <button
          type="button"
          onClick={() => navigate('/admin/projects')}
          className="btn bg-gray-500 hover:bg-gray-600 flex-center gap-3"
        >
          <FaTimes className="mr-2" />
          Cancel
        </button>
        <button
          type="submit"
          className="btn flex-center gap-3"
        >
          <FaSave className="mr-2" />
          {id ? 'Update' : 'Create'} Project
        </button>
      </div>

    </form>
  );
};

export default ProjectForm;
