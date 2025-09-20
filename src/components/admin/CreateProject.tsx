//@ts-nocheck

import React, { useEffect, useState } from 'react'
import { useGetEntity, usePostEntity } from '../../APIs';
import { Video, TechStackItem, Project } from '../../types/projectsTypes';
import { uploadAsset, deleteAsset as cloudAssetsDelete  } from '../../utils/assetsUpload'; //& A pre-built ready to use file uploader
import { motion } from 'framer-motion';
import { FaUpload, FaGithub, FaLink } from 'react-icons/fa';
import { IoCloseCircle } from 'react-icons/io5';
import { AiFillPicture } from 'react-icons/ai';
import { useGlobalContext } from '../../utils/GlobalContext';
import PopupCard from '../../../components/PopupCard';
import AssetsUploader, { IGallery, IImages, ITeckStack, IVideo } from "./AssetsUploader"
import toast from 'react-hot-toast';

interface ILocalImages {
  localLink: string ; //& for Image previw & delete
  imageFile: any ;    //& for uploading the image on clodnary
}

const CreateProject = () => {

//~ ###### Start Hooks & Data
  const { data } = useGetEntity('portfolio/category');
  const {allCategories} = useGlobalContext()
  const { mutate: createProject, isError, isPending, isSuccess } = usePostEntity('portfolio/project');
  const [isLoading, setLoading] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const [formData, setFormData] = useState<Project>({
    title: '',
    shortDesc: '',
    description: '',
    liveDemo: '',
    repoLink: '',
    isFeatured: false,
    rating: 0,
    views: 0,
    thumbnail: null,
    images: [],
    gallery: [],
    videos: [],
    techStack: [],
    categoryId: [],
    status: 'planning',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
  const [isUploaderOpened, setIsUploaderOpened] = useState(false);

  const [images, setImages] = useState<IImages[]>([]);
  const [gallery, setGallery] = useState<IGallery[]>([]);
  const [teckStack, setTeckStack] = useState<ITeckStack[]>([]);
  const [FormteckStack, setFormTeckStack] = useState<TechStackItem[]>([]);
  const [video, setVideo] = useState<IVideo | null>(null);

  const [isEdit, setIsEdit] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

    const AssetsUploaderProps = {
    isUploaderOpened,
    setIsUploaderOpened,
    images,
    setImages,
    gallery,
    setGallery,
    teckStack,
    setTeckStack,
    video,
    setVideo,
    formData,
    setFormData,
  };
  useEffect(() => {
    console.log(formData)
  }, [formData])

//~ ###### End Hooks & Data
//~ ###### Start Logics
  //& Submit Data

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.title || !formData.shortDesc) {
      toast.error('Title and short description are required');
      return;
    }

    setLoading(true);
    try {
      // Upload media assets in parallel for better performance
      const [imagesLinks, galleryLinks, teckStackLinks, videoLinks] = await Promise.all([
        images.length > 0 ? uploadAsset(images.map( (img) => img.file) ) : Promise.resolve([]),
        gallery.length > 0 ? uploadAsset(gallery.map( (img) => img.file) ) : Promise.resolve([]),
        teckStack.length > 0 ? uploadAsset(teckStack.map( (img) => img.file) ) : Promise.resolve([]),
        video?.file ? uploadAsset(video.file) : Promise.resolve(null)
      ]);

      // Process tech stack
      const processedTechStack: TechStackItem[] = teckStack.map((stack, idx) => ({
        name: stack.name,
        version: stack.virsion,
        secure_url: teckStackLinks[idx]?.secure_url || '',
        publicId: teckStackLinks[idx]?.publicId || ''
      }));

      // Update form data with processed assets
      const updatedFormData = {
        ...formData,
        thumbnail: imagesLinks[0] || null, // Use first image as thumbnail
        images: imagesLinks,
        gallery: galleryLinks,
        videos: videoLinks ? [{ url: videoLinks.secure_url }] : [],
        techStack: processedTechStack,
        updatedAt: new Date().toISOString()
      };

      createProject(updatedFormData);
      toast.success('Project created successfully!');

      // Reset form
      setFormData({
        title: '',
        shortDesc: '',
        description: '',
        liveDemo: '',
        repoLink: '',
        isFeatured: false,
        rating: 0,
        views: 0,
        thumbnail: null,
        images: [],
        gallery: [],
        videos: [],
        techStack: [],
        categoryId: [],
        status: 'planning',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      setImages([]);
      setGallery([]);
      setTeckStack([]);
      setVideo(null);
      setSelectedCategories([]);

    } catch (error) {
      console.error('Error creating project:', error);
      toast.error('Failed to create project. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle success/error states
  useEffect(() => {
    if (isSuccess) {
      toast.success('Project created successfully!');
    }
    if (isError) {
      toast.error('Failed to create project');
    }
  }, [isSuccess, isError]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev => {
      const isSelected = prev.includes(categoryId);
      const newCategories = isSelected
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId];

      setFormData(prevData => ({
        ...prevData,
        categoryId: newCategories
      }));

      return newCategories;
    });
  };

  const handleAssetUpload = () => {
    setIsEdit(true);
  };
//~ ###### end Logics


  return (
    <div className=' mx-auto p-6 bg-stone-900 rounded-lg shadow-lg relative'>
      <form onSubmit={handleSubmit} className='space-y-6'>
        {/* Project Title */}
        <div className='space-y-2'>
          <label htmlFor="title" className="block text-[var(--text)] font-medium">Project Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-3 rounded-lg bg-stone-800 border border-[var(--border)] text-[var(--text)] focus:ring-2 focus:ring-[var(--orange)] outline-none"
            placeholder="Enter project title"
          />
        </div>

        {/* Media Section */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 p-6 border-b border-[var(--border)]'>
          {/* Media Upload Area */}
          <div className='md:col-span-2 h-[400px] border-2 border-dashed border-[var(--border)] rounded-lg flex items-center justify-center cursor-pointer hover:border-[var(--orange)] transition-colors'
                onClick={handleAssetUpload}>
            <div className='text-center'>
              <AiFillPicture className='mx-auto text-4xl text-[var(--orange)]' />
              <p className='mt-2 text-[var(--text)]'>Click to upload media</p>
            </div>
          </div>

          {/* Links Section */}
          <div className='space-y-4'>
            <div className='flex items-center space-x-3 p-3 bg-stone-800 rounded-lg'>
              <FaGithub className='text-xl text-[var(--orange)]' />
              <input
                type="url"
                name="repoLink"
                value={formData.repoLink}
                onChange={handleInputChange}
                placeholder="Repository URL"
                className='flex-1 bg-transparent border-none outline-none text-[var(--text)]'
              />
            </div>

            <div className='flex items-center space-x-3 p-3 bg-stone-800 rounded-lg'>
              <FaLink className='text-xl text-[var(--orange)]' />
              <input
                type="url"
                name="liveDemo"
                value={formData.liveDemo}
                onChange={handleInputChange}
                placeholder="Live Demo URL"
                className='flex-1 bg-transparent border-none outline-none text-[var(--text)]'
              />
            </div>

            <button
              type="button"
              onClick={handleAssetUpload}
              className='w-full flex items-center justify-center space-x-2 p-3 bg-stone-800 rounded-lg hover:bg-stone-700 transition-colors'
            >
              <AiFillPicture className='text-xl text-[var(--orange)]' />
              <span className='text-[var(--text)]'>
                {gallery.length > 0 ? `${gallery.length} items in gallery` : 'Add to Gallery'}
              </span>
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4 p-6 border-b border-[var(--border)]'>
          {allCategories && allCategories.map((category, idx) => (
            <div key={category._id}
                 className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors
                            ${selectedCategories.includes(category._id)
                              ? 'bg-[var(--orange)] text-white'
                              : 'bg-stone-800 text-[var(--text)]'}`}
                 onClick={() => handleCategoryToggle(category._id)}>
              <div className='w-4 h-4 border-2 rounded flex items-center justify-center'>
                {selectedCategories.includes(category._id) && '✓'}
              </div>
              <span>{category.name}</span>
            </div>
          ))}
        </div>

        {/* Short Description & Tech Stack */}
        <div className='space-y-4 p-6 border-b border-[var(--border)]'>
          <div>
            <label htmlFor="shortDesc" className="block text-[var(--text)] font-medium mb-2">Short Description</label>
            <input
              type="text"
              id="shortDesc"
              name="shortDesc"
              value={formData.shortDesc}
              onChange={handleInputChange}
              className="w-full p-3 rounded-lg bg-stone-800 border border-[var(--border)] text-[var(--text)]"
              placeholder="Brief project description"
            />
          </div>

          <button
            type="button"
            onClick={handleAssetUpload}
            className='flex items-center space-x-2 p-3 bg-stone-800 rounded-lg hover:bg-stone-700 transition-colors'
          >
            <span className='text-xl text-[var(--orange)]'>+</span>
            <span className='text-[var(--text)]'>Add Tech Stack</span>
          </button>

          {teckStack.length > 0 && (
            <div className='flex flex-wrap gap-2'>
              {teckStack.map((tech, idx) => (
                <div key={idx} className='flex items-center space-x-2 p-2 bg-stone-800 rounded-lg'>
                  <img src={tech.iconLocalLink} alt={tech.name} className="w-6 h-6" />
                  <span className='text-[var(--text)]'>{tech.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Full Description */}
        <div className='space-y-2'>
          <label htmlFor="description" className="block text-[var(--text)] font-medium">Full Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={6}
            className="w-full p-3 rounded-lg bg-stone-800 border border-[var(--border)] text-[var(--text)]"
            placeholder="Detailed project description"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className='w-full p-4 bg-[var(--orange)] text-white rounded-lg hover:bg-[var(--dark-orange)] transition-colors disabled:opacity-50'
        >
          {isLoading ? 'Creating Project...' : 'Create Project'}
        </button>
      </form>

      <PopupCard
        isOpen={isEdit}
        setIsOpen={setIsEdit}
        CardContetnt={AssetsUploader}
        CardContetntProps={AssetsUploaderProps}
        cardStyle="max-w-4xl"
      />
    </div>
  )
}

export default CreateProject
