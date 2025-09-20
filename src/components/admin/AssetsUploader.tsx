import React, { useEffect } from 'react'
import { FaUpload } from 'react-icons/fa'
import { IoCloseCircle, IoAdd, IoImagesOutline } from 'react-icons/io5'
import { AiFillPicture, AiOutlineCloudUpload } from 'react-icons/ai'
import { motion } from 'framer-motion'
import {uploadAsset, deleteAsset as cloudAssetsDelete } from "../../utils/assetsUpload"
import { Project } from '../../types/projectsTypes'

export interface IImages {
  localLink: string,
  file: any
}

export interface IGallery {
  localLink: string,
  file: any
}

export interface ITeckStack {
  name: string,
  virsion?: number,
  iconLocalLink: string,
  file: any
}

export interface IVideo {
  localLink: string,
  file: any
}

interface Props {
  setIsUploaderOpened : React.Dispatch<React.SetStateAction<boolean>>

  images : IImages[] | null
  setImages : React.Dispatch<React.SetStateAction< IImages[] >>

  gallery : IGallery[] | null
  setGallery : React.Dispatch<React.SetStateAction< IGallery[] >>

  teckStack : ITeckStack[] | null
  setTeckStack : React.Dispatch<React.SetStateAction< ITeckStack[] >>

  video : IVideo
  setVideo : React.Dispatch<React.SetStateAction<IVideo>>

  formData :  Project
  setFormData : React.Dispatch<React.SetStateAction<Project>>
}

const AssetsUploader = ({
  setIsUploaderOpened,
  setImages, images,
  gallery, setGallery,
  teckStack,setTeckStack,
  setVideo, video,
  formData, setFormData
} : Props ) => {

  //& set images for previw it before uplading
    const handleAssetsChange = (e, assetsType) => {
      const files = e.target.files ;
      const localUrl = URL.createObjectURL(files[0])

      switch (assetsType) {
        case "image":
            if (images) {
              setImages((prev) => [...prev , { localLink : localUrl, file: files[0] }])
            }else{
              setImages([{ localLink : localUrl, file: files[0] }])
            }
          break;

        case "gallery":
            if (gallery) {
              setGallery((prev) => [...prev , { localLink : localUrl, file: files[0] }])
            }else{
              setGallery([{ localLink : localUrl, file: files[0] }])
            }
          break;

        case "techIcons":
            if (teckStack) {
              setTeckStack((prev) => [...prev.slice(0, -1) , {...prev[prev.length - 1 ], iconLocalLink : localUrl, file: files[0] } ])
            }else{
              setTeckStack([{name: "" , virsion: 0 , iconLocalLink : localUrl, file: files[0] }])
            }
          break;

        case "video" :
            setVideo({ localLink : localUrl, file: files[0] })
          break;

        default:
          break;
      }
    };

    const deleteAsset = async (url, assetsType) => {
      if ( assetsType == "image") {
        if (images) {
          setImages(images.filter((thisUrl) => thisUrl.localLink == url ? null : thisUrl ))
          console.log("deleted")
        }
      }

      if ( assetsType == "cloud_image") {
        if (formData.images) {
          await cloudAssetsDelete(url)
          setFormData((prev) => ({
            ...prev,
            image : prev?.images?.filter((img) => img.publicId != url )
          }))
          console.log("deleted")
        }
      }
    }

    useEffect(() => {
      console.log(images)
    }, [images])


  return (
    <div className="bg-stone-900 rounded-xl p-6 space-y-8">
      <h2 className="text-2xl font-bold text-[var(--text)] mb-6 border-b border-[var(--border)] pb-3">
        Upload Project Assets
      </h2>

      {/*//~ Images & Gallery inputs */}
      {["Project Images", "Project Gallery"].map((title, idx) => (
        <div key={idx} className="bg-stone-800 rounded-lg p-6 space-y-6 border border-[var(--border)] hover:border-[var(--orange)] transition-colors">
          <div className="flex items-center justify-between">
            <label className="text-lg font-semibold text-[var(--text)] flex items-center gap-2">
              {idx === 0 ? <AiFillPicture className="text-[var(--orange)]" /> : <IoImagesOutline className="text-[var(--orange)]" />}
              {title}
            </label>
          </div>

          {title === "Project technologies" && teckStack && teckStack[0]?.name === "" ? (
            <div className="flex items-center gap-4">
              <h3 className="text-[var(--text)]">Add another technology</h3>
              <button
                className="px-4 py-2 bg-[var(--orange)] text-white rounded-lg hover:bg-[var(--dark-orange)] transition-colors flex items-center gap-2"
                onClick={() => setTeckStack((prev) => prev != null ? [...prev, { name: "", virsion: 0, iconLocalLink: "", file: null }] : [{ name: "", virsion: 0, iconLocalLink: "", file: null }])}
              >
                <IoAdd /> Add
              </button>
            </div>
          ) : (
            <div className="flex gap-4 w-full">
              <input
                type="text"
                placeholder="Asset name"
                className="flex-1 px-4 py-2 rounded-lg bg-stone-700 border border-[var(--border)] text-[var(--text)] focus:outline-none focus:border-[var(--orange)]"
              />
              <input
                type="number"
                placeholder="Version"
                className="w-32 px-4 py-2 rounded-lg bg-stone-700 border border-[var(--border)] text-[var(--text)] focus:outline-none focus:border-[var(--orange)]"
              />
            </div>
          )}

            <div className="flex items-center justify-between gap-6 mt-4">
              <label className="px-6 py-3 bg-[var(--orange)] text-white rounded-lg hover:bg-[var(--dark-orange)] transition-colors cursor-pointer flex items-center gap-2 hover:shadow-lg">
                <FaUpload className="text-xl" />
                Upload {idx === 0 ? 'Images' : 'Gallery'}
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleAssetsChange(e, idx === 0 ? "image" : idx === 1 ? "gallery" : "image")}
                  className="hidden"
                />
              </label>

              {/* Preview Area */}
              <div className='flex-1 min-h-[200px] border-2 border-dashed border-[var(--border)] rounded-xl p-4 hover:border-[var(--orange)] transition-colors'>
                {idx === 0 && images && images.length > 0 ? (
                  <div className='grid grid-cols-3 gap-4 overflow-y-auto max-h-[300px] p-2'>
                    {images.map((imgSrc, imgIdx) => (
                      <div key={imgIdx} className='relative group'>
                        <img
                          src={imgSrc.localLink}
                          alt={`uploaded-${imgIdx}`}
                          className="w-full h-32 object-cover rounded-lg shadow-md transition-transform transform group-hover:scale-[1.02]"
                        />
                        <button
                          onClick={() => deleteAsset(imgSrc, "image")}
                          className='absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600'
                        >
                          <IoCloseCircle className="text-lg" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : idx === 1 && gallery && gallery.length > 0 ?
                    <div className='w-[100%] h-[90%] overflow-auto flex-center flex-wrap gap-3'>
                          {gallery.map((imgSrc, idx) => (
                            <div className='relative'>
                              <img
                                key={idx}
                                src={imgSrc.localLink}
                                alt={`uploaded-${idx}`}
                                className="w-42 h-32 object-cover rounded-md shadow"
                              />
                              <span onClick={() => deleteAsset(imgSrc, idx == 0 ? "image" : idx == 1 ? "gallery" : "image" )} className=' text-[20px] cursor-pointer text-rose-500 flex-center absolute top-1 left-1 hover:text-rose-800 duration-700 '>
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

      ))
      }

      {/*//TODO: Handle that logic . . . .  */}
      {/*//~ TeckStack inputs  */}
        <div className=' my-10 py-10 border-y border-white/50 flex flex-col gap-10' >
          <label className="block mb-2 text-[var(--text)] w-fit">Project technologies</label>

          { teckStack  && teckStack.length > 0 && teckStack[teckStack.length - 1].name === "" ?
            <div >
              <h3>Add another technology</h3>
              <button className='' onClick={() => setTeckStack((prev) => prev != null ? [...prev, {  name: "", virsion: 0, iconLocalLink: "", file: null}] : [{  name: "", virsion: 0, iconLocalLink: "", file: null}] )} >Add</button>
            </div>
            :
            <>

              <div className = 'flex justify-between w-full' >
                <input type="text" />
                <input type="number" name="" id="" />
              </div>

              <div className=" items-center space-x-4 flex justify-between">
                <label className="btn cursor-pointer inline-flex items-center">
                  <FaUpload className="mr-2" />
                  Upload Images
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleAssetsChange(e, "techIcons" )}
                    className="hidden"
                  />
                </label>
                {/*//& images preview befor uploading */}
                <div className='w-[500px] h-[150px] border-white/50 border rounded-xl flex-center '>
                  { teckStack && teckStack.length > 0 ? (
                    <div className='w-[100%] h-[90%] overflow-auto flex-center flex-wrap gap-3'>
                          <div className='relative'>
                            <img
                              src={teckStack[teckStack.length - 1 ].iconLocalLink}
                              alt={`uploaded teckicon`}
                              className="w-42 h-32 object-cover rounded-md shadow"
                            />
                            <span onClick={() => deleteAsset(teckStack[teckStack.length - 1 ].iconLocalLink , "techIcons")} className=' text-[20px] cursor-pointer text-rose-500 flex-center absolute top-1 left-1 hover:text-rose-800 duration-700 '>
                              <IoCloseCircle/>
                            </span>
                          </div>
                        </div>
                    ):  <span className="text-[var(--text)] text-[12px]"> No umages added Yet. . .  </span>
                  }

                </div>
              </div>
            </>
          }

        </div>

      {/* Video */}
        <div className="my-10 py-10 border-y border-white/50">
          <label className="block mb-2 text-[var(--text)] w-fit">Video</label>
          <div className="flex items-center justify-between space-x-4">
            <label className="btn cursor-pointer inline-flex items-center">
              <FaUpload className="mr-2" />
              Upload Video
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
              {video ? (
                <div className="w-full h-[90%] overflow-auto flex-center flex-wrap gap-3">
                    <div className='relative'>
                      <video
                        src={video.localLink}
                        controls
                        className="w-62 h-32 object-cover rounded-md shadow"
                      />
                        <span onClick={() => deleteAsset(video.localLink, "video")} className=' text-[20px] cursor-pointer text-rose-500 flex-center absolute top-1 left-1 hover:text-rose-800 duration-700 '>
                          <IoCloseCircle/>
                        </span>
                    </div>
                </div>
              ) : (
                <span className="text-[var(--text)] text-[12px]">
                  No video added yet...
                </span>
              )}
            </div>
          </div>
        </div>

    </div>
  )
}

export default AssetsUploader
