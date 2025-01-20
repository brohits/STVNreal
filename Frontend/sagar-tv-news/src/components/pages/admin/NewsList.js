import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Alert,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { fetchWithConfig } from '../../../config/api';
import { endpoints } from '../../../config/config';

const NewsList = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedNewsId, setSelectedNewsId] = useState(null);
  const [error, setError] = useState(null);

  const fetchNews = async () => {
    try {
      const response = await fetchWithConfig(endpoints.news.all);
      const data = await response.json();
      console.log('Fetched news:', data);
      setNews(Array.isArray(data) ? data : data.content || []);
      setError(null);
    } catch (error) {
      console.error('Failed to fetch news:', error);
      setError('Failed to fetch news. Please make sure you are logged in.');
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleEdit = (id) => {
    navigate(`/admin/news/edit/${id}`);
  };

  const handleDelete = async () => {
    try {
      await fetchWithConfig(`${endpoints.news.byId(selectedNewsId)}`, {
        method: 'DELETE',
      });
      setDeleteDialogOpen(false);
      fetchNews();
      setError(null);
    } catch (error) {
      console.error('Failed to delete news:', error);
      setError('Failed to delete news. Please try again.');
    }
  };

  const openDeleteDialog = (id) => {
    setSelectedNewsId(id);
    setDeleteDialogOpen(true);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">News Articles</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/admin/news/create')}
        >
          Create News
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>District</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {news.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>
                  <Chip 
                    label={item.category?.name || 'No Category'} 
                    color="primary" 
                    variant="outlined" 
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {item.district ? (
                    <Chip 
                      label={item.district.name} 
                      color="secondary" 
                      variant="outlined" 
                      size="small"
                    />
                  ) : 'N/A'}
                </TableCell>
                <TableCell>{item.author || 'Anonymous'}</TableCell>
                <TableCell>
                  <Chip 
                    label={item.type || 'Standard'} 
                    color="default" 
                    variant="outlined" 
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(item.id)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => openDeleteDialog(item.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this news article?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default NewsList;
