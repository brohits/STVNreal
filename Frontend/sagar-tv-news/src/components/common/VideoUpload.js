import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Box,
  Typography,
  LinearProgress,
  IconButton,
  Paper,
  Alert,
} from '@mui/material';
import { CloudUpload as CloudUploadIcon, Delete as DeleteIcon } from '@mui/icons-material';
import axios from 'axios';
import { API_BASE_URL } from '../../config/config';

const VideoUpload = ({ onVideoUpload, initialVideo }) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState('');
  const [videoPreview, setVideoPreview] = useState(initialVideo || '');

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) {
      setUploadError('No file selected');
      return;
    }

    console.log('File selected:', {
      name: file.name,
      type: file.type,
      size: file.size
    });

    // Check file size (limit to 100MB)
    if (file.size > 100 * 1024 * 1024) {
      setUploadError('Video size should be less than 100MB');
      return;
    }

    // Check file type
    if (!file.type.startsWith('video/')) {
      setUploadError('Please upload a valid video file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file); // Changed from 'video' to 'file' to match backend

    try {
      console.log('Uploading to:', `${API_BASE_URL}/upload/video`);
      
      const response = await axios.post(`${API_BASE_URL}/upload/video`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(progress);
          console.log('Upload progress:', progress);
        },
        withCredentials: true
      });

      console.log('Upload response:', response.data);

      if (response.data && response.data.url) {
        const videoUrl = API_BASE_URL + response.data.url;
        console.log('Final video URL:', videoUrl);
        setVideoPreview(videoUrl);
        onVideoUpload(videoUrl);
        setUploadError('');
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Video upload error:', error);
      setUploadError(
        error.response?.data?.error || 
        error.message || 
        'Failed to upload video. Please try again.'
      );
    } finally {
      setUploadProgress(0);
    }
  }, [onVideoUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi', '.mkv']
    },
    multiple: false,
    maxSize: 100 * 1024 * 1024 // 100MB
  });

  const handleDelete = () => {
    setVideoPreview('');
    onVideoUpload('');
    setUploadError('');
  };

  return (
    <Box sx={{ width: '100%', mb: 2 }}>
      {uploadError && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setUploadError('')}>
          {uploadError}
        </Alert>
      )}

      {!videoPreview ? (
        <Paper
          {...getRootProps()}
          sx={{
            p: 3,
            border: '2px dashed #ccc',
            borderRadius: 2,
            cursor: 'pointer',
            bgcolor: isDragActive ? 'action.hover' : 'background.paper',
            '&:hover': {
              bgcolor: 'action.hover',
            },
          }}
        >
          <input {...getInputProps()} />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <CloudUploadIcon sx={{ fontSize: 48, color: 'action.active' }} />
            <Typography variant="body1" align="center">
              {isDragActive
                ? 'Drop the video here'
                : 'Drag & drop a video here, or click to select'}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Supported formats: MP4, MOV, AVI, MKV (max 100MB)
            </Typography>
          </Box>
        </Paper>
      ) : (
        <Box sx={{ position: 'relative', width: '100%', mb: 2 }}>
          <video
            controls
            style={{
              width: '100%',
              maxHeight: '300px',
              objectFit: 'contain',
            }}
            src={videoPreview}
          >
            Your browser does not support the video tag.
          </video>
          <IconButton
            onClick={handleDelete}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              bgcolor: 'background.paper',
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )}

      {uploadProgress > 0 && (
        <Box sx={{ width: '100%', mt: 2 }}>
          <LinearProgress variant="determinate" value={uploadProgress} />
          <Typography variant="caption" sx={{ mt: 1 }}>
            Uploading: {uploadProgress}%
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default VideoUpload;
