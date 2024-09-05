import React, { useState } from "react";

const MultipleImageUpload = () => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setSelectedImages((prevImages) => [...prevImages, ...filesArray]);
    }
  };

  const removeImage = (indexToRemove: number) => {
    setSelectedImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <div className="w-full">
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
        className="block w-full text-sm text-gray-500 border border-gray-300 rounded-md mb-2 py-2 px-4 focus:outline-none focus:ring-gray-500 focus:border-gray-500"
      />

      {selectedImages.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mb-4">
          {selectedImages.map((image, index) => (
            <div
              key={index}
              className="relative border border-gray-300 rounded-md p-2"
            >
              <img
                src={URL.createObjectURL(image)}
                alt={`Selected ${index}`}
                className="w-full h-32 object-cover rounded-md"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full text-xs"
              >
                X
              </button>
            </div>
          ))}
        </div>
      )}
      <button
        className="block w-full bg-gray-700 text-white py-2 px-4 rounded-md font-semibold hover:bg-gray-800 transition"
        onClick={() => console.log("Images to upload:", selectedImages)}
      >
        Upload Images
      </button>
    </div>
  );
};

export default MultipleImageUpload;
