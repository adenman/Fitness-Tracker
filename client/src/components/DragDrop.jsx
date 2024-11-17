import React, { useState } from "react";

const fileTypes = ["JPG", "PNG", "GIF", "SVG", "BMP", "TIFF", "WEBP"];

function DragDrop({ onFileChange, showPreview  }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleBothFunctions = (e) => {
    handleFileUpload(e.target.files[0]);
    handleChange(e.target.files[0]);
  };


  const handleFileUpload = (uploadedFile) => {
    setFile(uploadedFile);
    

    if (uploadedFile) {
      onFileChange(uploadedFile); // Pass file back to parent component
    }
  };

 const handleChange = (file) => {
  const selectedFile = Array.isArray(file) ? file[0] : file;
  setFile(selectedFile);
  const previewURL = URL.createObjectURL(selectedFile);
  setPreview(previewURL);
  // Instead of creating a blob URL, you might want to upload to a server
  const reader = new FileReader();
  reader.onloadend = () => {
    const base64String = reader.result;
    
    const info = {
      name: selectedFile.name,
      size: (selectedFile.size / 1024).toFixed(2),
      type: selectedFile.type,
      base64: base64String  // Store base64 representation
    };

    if (onFileChange) {
      onFileChange(info);
    }
  };
  reader.readAsDataURL(selectedFile);
};

return (
  <div>
    <input 
      type="file" 
      onChange={handleBothFunctions}
      accept="image/*" 
    />
    <button>Cancel</button>
    {/* Only show preview if showPreview prop is true */}
    {showPreview && file && (
      <div>
        <img src={preview} alt="Preview" />
      </div>
    )}
  </div>
);
}

export default DragDrop;
