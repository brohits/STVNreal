import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Box,
  Typography,
  CircularProgress,
  IconButton,
  Paper,
  Alert,
} from '@mui/material';
import { CloudUpload as CloudUploadIcon, Delete as DeleteIcon } from '@mui/icons-material';
import axios from 'axios';
import { API_BASE_URL } from '../../config/config';
import { getImageUrl } from '../../utils/imageUtils';

const ImageUpload = ({ onImageUpload, initialImage }) => {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(initialImage || '');
  const [error, setError] = useState('');

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size too large. Maximum size is 5MB.');
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload only image files.');
      return;
    }

    // Preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload
    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(`${API_BASE_URL}/upload/image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data && response.data.url) {
        onImageUpload(response.data.url); // Pass the URL from backend directly
        setPreviewUrl(getImageUrl(response.data.url)); // Convert to absolute URL for display
        setError('');
      } else if (response.data && response.data.error) {
        throw new Error(response.data.error);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.response?.data?.error || err.message || 'Failed to upload image. Please try again.');
      if (!initialImage) {
        setPreviewUrl('');
      }
    } finally {
      setUploading(false);
    }
  }, [onImageUpload, initialImage]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    multiple: false,
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  const handleDelete = () => {
    setPreviewUrl('');
    onImageUpload('');
    setError('');
  };

  return (
    <Box sx={{ width: '100%', mt: 2, mb: 2 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <Paper
        {...getRootProps()}
        sx={{
          p: 2,
          border: '2px dashed',
          borderColor: isDragActive ? 'primary.main' : 'grey.300',
          backgroundColor: isDragActive ? 'action.hover' : 'background.paper',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 200,
          position: 'relative',
        }}
      >
        <input {...getInputProps()} />
        
        {uploading ? (
          <CircularProgress />
        ) : previewUrl ? (
          <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
            <img
              src={getImageUrl(previewUrl)}
              alt="Preview"
              style={{
                maxWidth: '100%',
                maxHeight: 200,
                objectFit: 'contain',
              }}
            />
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                },
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ) : (
          <>
            <CloudUploadIcon sx={{ fontSize: 48, mb: 1 }} />
            <Typography variant="body1" align="center">
              {isDragActive
                ? 'Drop the image here'
                : 'Drag and drop an image here, or click to select'}
            </Typography>
            <Typography variant="caption" color="textSecondary" align="center">
              Supported formats: JPEG, PNG, GIF (max 5MB)
            </Typography>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default ImageUpload;
