import React, { useState, useRef } from 'react';

const FileUpload = ({ onFileSelect, isLoading }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    setUploadedFile(file);
    if (onFileSelect) {
      onFileSelect(file);
    }
  };

  const clearFile = (e) => {
    e.stopPropagation();
    setUploadedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    // Call parent to clear if needed, but not strictly specified in instructions
  };

  return (
    <div 
      className={`min-h-48 border-2 border-dashed rounded-card p-12 text-center transition-all cursor-pointer relative
        ${isDragging ? 'border-primary bg-primary/5 shadow-glow-primary' : 
          uploadedFile ? 'border-secondary bg-secondary/5' : 'border-outline-variant'}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => !isLoading && fileInputRef.current?.click()}
    >
      <input 
        type="file" 
        className="hidden" 
        ref={fileInputRef} 
        accept=".pdf,.png,.jpg,.jpeg" 
        onChange={handleFileInput} 
        disabled={isLoading}
      />
      
      {!uploadedFile && !isLoading && (
        <div className="flex flex-col items-center justify-center pointer-events-none">
          <div className="text-4xl animate-float mb-4">📤</div>
          <p className="text-on-background/60">Drag & drop your fact sheet here</p>
          <p className="text-on-background/30 text-sm mt-1">or click to browse</p>
          <p className="text-on-background/20 text-xs mt-4">Accepted: PDF · PNG · JPG — max 10MB</p>
        </div>
      )}

      {isLoading && (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-on-background/60">Reading your fact sheet...</p>
        </div>
      )}

      {uploadedFile && !isLoading && (
        <div className="flex flex-col items-center justify-center">
          <div className="text-secondary text-5xl mb-4" style={{ animation: 'countUp 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>✓</div>
          <p className="font-medium text-on-background">{uploadedFile.name}</p>
          <p className="text-sm text-on-background/50 mt-1">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
          <button 
            onClick={clearFile}
            className="mt-6 text-red-400 text-sm hover:underline"
          >
            Remove file
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
