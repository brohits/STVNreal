import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Box,
  Typography,
  Paper,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { fetchWithConfig } from '../../../config/api';
import { endpoints } from '../../../config/config';

const NewsForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [openDistrictDialog, setOpenDistrictDialog] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [newDistrictName, setNewDistrictName] = useState('');
  const [newDistrictState, setNewDistrictState] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    fullContent: '',
    imageUrl: '',
    videoUrl: '',
    type: 'NEWS',
    categoryId: '',
    districtId: '',
    author: '',
    breaking: false,
    trending: false,
    publishedDate: new Date().toISOString(),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching categories and districts...');
        const [categoriesRes, districtsRes] = await Promise.all([
          fetchWithConfig(endpoints.categories.all),
          fetchWithConfig(endpoints.districts.all)
        ]);
        
        if (!categoriesRes.ok) {
          throw new Error(`Failed to fetch categories: ${categoriesRes.status} ${categoriesRes.statusText}`);
        }
        if (!districtsRes.ok) {
          throw new Error(`Failed to fetch districts: ${districtsRes.status} ${districtsRes.statusText}`);
        }
        
        const categoriesData = await categoriesRes.json();
        const districtsData = await districtsRes.json();
        
        console.log('Categories data:', categoriesData);
        console.log('Districts data:', districtsData);
        
        setCategories(categoriesData);
        setDistricts(districtsData);

        if (id) {
          const newsRes = await fetchWithConfig(endpoints.news.byId(id));
          if (!newsRes.ok) {
            throw new Error(`Failed to fetch news: ${newsRes.status} ${newsRes.statusText}`);
          }
          const newsData = await newsRes.json();
          setFormData({
            ...newsData,
            categoryId: newsData.category?.id || '',
            districtId: newsData.district?.id || '',
          });
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setSnackbar({
          open: true,
          message: `Failed to load data: ${error.message}`,
          severity: 'error'
        });
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: e.target.type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        title: formData.title,
        content: formData.content,
        fullContent: formData.fullContent,
        imageUrl: formData.imageUrl,
        videoUrl: formData.videoUrl,
        type: formData.type,
        category: categories.find(cat => cat.id === formData.categoryId)?.name || '',
        district: districts.find(dist => dist.id === formData.districtId)?.name || '',
        author: formData.author,
        breaking: formData.breaking,
        trending: formData.trending,
        publishedDate: formData.publishedDate,
      };

      // Debug logs
      console.log('Form Data:', formData);
      console.log('Final Payload:', payload);

      let response;
      try {
        if (id) {
          response = await fetchWithConfig(endpoints.news.byId(id), {
            method: 'PUT',
            body: JSON.stringify(payload),
            headers: {
              'Content-Type': 'application/json'
            }
          });
        } else {
          response = await fetchWithConfig(endpoints.news.all, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
              'Content-Type': 'application/json'
            }
          });
        }
        const responseData = await response.json();
        console.log('Success Response:', responseData);
        
        setSnackbar({
          open: true,
          message: id ? 'News article updated successfully!' : 'News article created successfully!',
          severity: 'success'
        });

        // Wait for a short time to show the success message
        setTimeout(() => {
          navigate('/admin/news');
        }, 1500);
      } catch (error) {
        console.error('API Error Details:', {
          status: error.status,
          statusText: error.statusText,
          data: error.data,
          headers: error.headers,
          config: {
            url: error.config?.url,
            method: error.config?.method,
            data: JSON.parse(error.config?.data || '{}')
          }
        });

        let errorMessage = 'Failed to save news article. ';
        if (error.data?.message) {
          errorMessage += error.data.message;
        } else if (error.data?.error) {
          errorMessage += error.data.error;
        } else {
          errorMessage += 'Please check the console for more details.';
        }

        setSnackbar({
          open: true,
          message: errorMessage,
          severity: 'error'
        });
      }
    } catch (error) {
      console.error('General Error:', error);
      setSnackbar({
        open: true,
        message: 'An unexpected error occurred. Please try again.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async () => {
    try {
      const response = await fetchWithConfig(endpoints.categories.all, {
        method: 'POST',
        body: JSON.stringify({ name: newCategory }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const responseData = await response.json();
      setCategories([...categories, responseData]);
      setFormData({ ...formData, categoryId: responseData.id });
      setNewCategory('');
      setOpenCategoryDialog(false);
      setSnackbar({
        open: true,
        message: 'Category added successfully!',
        severity: 'success'
      });
    } catch (error) {
      console.error('Failed to add category:', error);
      setSnackbar({
        open: true,
        message: 'Failed to add category. Please try again.',
        severity: 'error'
      });
    }
  };

  const handleAddDistrict = async () => {
    try {
      const response = await fetchWithConfig(endpoints.districts.all, {
        method: 'POST',
        body: JSON.stringify({
          name: newDistrictName,
          state: newDistrictState
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const responseData = await response.json();
      setDistricts([...districts, responseData]);
      setFormData({ ...formData, districtId: responseData.id });
      setNewDistrictName('');
      setNewDistrictState('');
      setOpenDistrictDialog(false);
      setSnackbar({
        open: true,
        message: 'District added successfully!',
        severity: 'success'
      });
    } catch (error) {
      console.error('Failed to add district:', error);
      setSnackbar({
        open: true,
        message: 'Failed to add district. Please try again.',
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          {id ? 'Edit News Article' : 'Create News Article'}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Short Content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              multiline
              rows={3}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Full Content"
              name="fullContent"
              value={formData.fullContent}
              onChange={handleChange}
              multiline
              rows={6}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Image URL"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="Enter image URL"
              helperText="Enter the URL of the image"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Video URL"
              name="videoUrl"
              value={formData.videoUrl}
              onChange={handleChange}
              placeholder="Enter video URL"
              helperText="Enter the URL of the video"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                required
              >
                {categories.map(category => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>District</InputLabel>
              <Select
                name="districtId"
                value={formData.districtId}
                onChange={handleChange}
                required
              >
                {districts.map(district => (
                  <MenuItem key={district.id} value={district.id}>
                    {district.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Author"
              name="author"
              value={formData.author}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.breaking}
                    onChange={handleChange}
                    name="breaking"
                  />
                }
                label="Breaking News"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.trending}
                    onChange={handleChange}
                    name="trending"
                  />
                }
                label="Trending"
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/admin/news')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {loading ? 'Saving...' : id ? 'Update' : 'Create'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Add Category Dialog */}
      <Dialog open={openCategoryDialog} onClose={() => setOpenCategoryDialog(false)}>
        <DialogTitle>Add New Category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Category Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCategoryDialog(false)}>Cancel</Button>
          <Button onClick={handleAddCategory} variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add District Dialog */}
      <Dialog open={openDistrictDialog} onClose={() => setOpenDistrictDialog(false)}>
        <DialogTitle>Add New District</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                label="District Name"
                type="text"
                fullWidth
                variant="outlined"
                value={newDistrictName}
                onChange={(e) => setNewDistrictName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="State"
                type="text"
                fullWidth
                variant="outlined"
                value={newDistrictState}
                onChange={(e) => setNewDistrictState(e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDistrictDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleAddDistrict} 
            variant="contained" 
            color="primary"
            disabled={!newDistrictName || !newDistrictState}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default NewsForm;
