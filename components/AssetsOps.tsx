import React from 'react'
import { FaUpload } from 'react-icons/fa'
import { IoCloseCircle } from 'react-icons/io5'

interface Props {
  setImages : React.Dispatch<React.SetStateAction<string[]>>
  images : string[]
  setVideos : React.Dispatch<React.SetStateAction<string[]>>
  videos : string[]
}

const AssetsOps = ({setImages , images , setVideos , videos } : Props) => {
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
    <div>
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
  )
}

export default AssetsOps