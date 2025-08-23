import { useRef, useState, useEffect } from 'react';
import { LuUserRound, LuUpload, LuTrash } from 'react-icons/lu';

const ProfilePhotoPlaceholder = ({ image, setImage, preview, setPreview }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(preview ?? null);

  
  const onChooseFile = () => inputRef.current?.click();

  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    
    if (previewUrl) URL.revokeObjectURL(previewUrl);

    const url = URL.createObjectURL(file);

    setImage?.(file);          
    setPreview?.(url);
    setPreviewUrl(url);        

    
    inputRef.current.value = '';
  };


  const handleImageRemove = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);

    setImage?.(null);
    setPreview?.(null);
    setPreviewUrl(null);

  
    if (inputRef.current) inputRef.current.value = '';
  };

 
  useEffect(() => {
    if (preview && preview !== previewUrl) {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(preview);
    }
    
  }, [preview]);

  
  return (
    <div className="flex justify-center">
      
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />

      {!image ? (
       
        <div className="relative w-28 h-28 md:w-32 md:h-32 dark:border-blue-500 rounded-full border-2 border-dashed dark:text-blue-500 border-blue-900 flex items-center justify-center text-blue-900">
          <LuUserRound size={48}  />
          <button
            type="button"
            onClick={onChooseFile}
            aria-label="Upload profile photo"
            className="absolute bottom-0 right-0 cursor-pointer translate-x-1/4 translate-y-1/4 bg-blue-900 text-white p-2 rounded-full shadow-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <LuUpload size={18} />
          </button>
        </div>
      ) : (
       
        <div className="relative w-32 h-32">
          <img
            src={previewUrl}
            alt="Profile"
            className="w-full h-full object-cover rounded-full border-2 dark:border-blue-500 border-blue-900"
          />
          <button
            type="button"
            onClick={handleImageRemove}
            aria-label="Remove profile photo"
            className="absolute bottom-0 right-0 translate-x-1/6 translate-y-1/5 dark:border-red-500 bg-red-700 text-white p-2 rounded-full shadow-lg hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-600"
          >
            <LuTrash size={18} />
          </button>
        </div>
      )}
    </div>
  );
};


export default ProfilePhotoPlaceholder
