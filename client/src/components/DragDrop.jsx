import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF", "SVG", "BMP", "TIFF", "WEBP"];

function DragDrop() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (file) => {
    const selectedFile = Array.isArray(file) ? file[0] : file;
    setFile(selectedFile);

    // Generate a preview URL for the uploaded file
    const previewURL = URL.createObjectURL(selectedFile);
    setPreview(previewURL);
  };

  return (
    <div className="drag-drop-container  t">
      <FileUploader
        handleChange={handleChange}
        name="file"
        types={fileTypes}
        label="Drag & drop your image files here or click to select"
        uploadedLabel="Image uploaded successfully!"
        
        hoverTitle="Drop your image here"
        classes="custom-drop-area"
        
      />
      
      {preview && (
        <img src={preview} alt="Uploaded Preview" style={{ width: "300px", marginTop: "10px" }} />
      )}
    </div>
  );
}

export default DragDrop;

