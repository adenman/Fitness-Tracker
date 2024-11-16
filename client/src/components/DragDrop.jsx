import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF", "SVG", "BMP", "TIFF", "WEBP"];

function DragDrop({ onFileChange }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileUpload = (uploadedFile) => {
    setFile(uploadedFile);
    
    // Optional: File validation
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
      {/* File upload logic */}
      <input 
        type="file" 
        onChange={(e) => handleFileUpload(e.target.files[0])}
        accept="image/*" 
      />
      <button >Cancel</button>
    </div>
  );
}

export default DragDrop;
