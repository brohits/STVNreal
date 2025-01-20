import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Box, TextField, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox, Button } from '@mui/material';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import CampaignIcon from '@mui/icons-material/Campaign';
import './AdminPanel.css';

const AdminPanel = () => {
  const [selectedOption, setSelectedOption] = useState('news');
  const [formData, setFormData] = useState({
    title: '',
    imageUrl: '',
    description: '',
    videoUrl: '',
    author: '',
    category: '',
    districtCategory: '',
    isTrending: false,
    isViral: false
  });

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: e.target.type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Add API call here to submit the form data
  };

  const NewsForm = () => (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 3, maxWidth: 600 }}>
      <Typography variant="h6" gutterBottom>Add New News</Typography>
      <TextField
        fullWidth
        label="News Title"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Image URL"
        name="imageUrl"
        value={formData.imageUrl}
        onChange={handleInputChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        margin="normal"
        multiline
        rows={4}
      />
      <TextField
        fullWidth
        label="Video URL"
        name="videoUrl"
        value={formData.videoUrl}
        onChange={handleInputChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Author"
        name="author"
        value={formData.author}
        onChange={handleInputChange}
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Category</InputLabel>
        <Select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          label="Category"
        >
          <MenuItem value="politics">Politics</MenuItem>
          <MenuItem value="sports">Sports</MenuItem>
          <MenuItem value="entertainment">Entertainment</MenuItem>
          <MenuItem value="technology">Technology</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>District Category</InputLabel>
        <Select
          name="districtCategory"
          value={formData.districtCategory}
          onChange={handleInputChange}
          label="District Category"
        >
          <MenuItem value="mumbai">Mumbai</MenuItem>
          <MenuItem value="pune">Pune</MenuItem>
          <MenuItem value="nagpur">Nagpur</MenuItem>
          <MenuItem value="nashik">Nashik</MenuItem>
        </Select>
      </FormControl>
      <FormControlLabel
        control={
          <Checkbox
            name="isTrending"
            checked={formData.isTrending}
            onChange={handleInputChange}
          />
        }
        label="Is Trending"
      />
      <FormControlLabel
        control={
          <Checkbox
            name="isViral"
            checked={formData.isViral}
            onChange={handleInputChange}
          />
        }
        label="Is Viral"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        fullWidth
      >
        Submit
      </Button>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: 'flex', flex: 1 }}>
        <Drawer
          variant="permanent"
          sx={{
            width: 240,
            flexShrink: 0,
            position: 'relative',
            '& .MuiDrawer-paper': {
              width: 240,
              boxSizing: 'border-box',
              position: 'relative',
              overflowY: 'auto'
            },
          }}
        >
          <List>
            <ListItem 
              onClick={() => setSelectedOption('news')}
              selected={selectedOption === 'news'}
              sx={{ cursor: 'pointer' }}
            >
              <ListItemIcon>
                <NewspaperIcon />
              </ListItemIcon>
              <ListItemText primary="News" />
            </ListItem>
            <ListItem 
              onClick={() => setSelectedOption('advertisement')}
              selected={selectedOption === 'advertisement'}
              sx={{ cursor: 'pointer' }}
            >
              <ListItemIcon>
                <CampaignIcon />
              </ListItemIcon>
              <ListItemText primary="Advertisement" />
            </ListItem>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            backgroundColor: '#f5f5f5',
          }}
        >
          {selectedOption === 'news' && <NewsForm />}
          {selectedOption === 'advertisement' && (
            <Typography variant="h6">Advertisement Form (Coming Soon)</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminPanel;