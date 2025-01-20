import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import axios from 'axios';
import { API_BASE_URL } from '../../../config/api';

const DistrictList = () => {
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingDistrict, setEditingDistrict] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    state: '',
  });

  const fetchDistricts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/districts`);
      setDistricts(response.data);
    } catch (error) {
      console.error('Failed to fetch districts:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDistricts();
  }, []);

  const handleOpenDialog = (district = null) => {
    if (district) {
      setEditingDistrict(district);
      setFormData({
        name: district.name,
        state: district.state,
      });
    } else {
      setEditingDistrict(null);
      setFormData({
        name: '',
        state: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingDistrict(null);
    setFormData({
      name: '',
      state: '',
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingDistrict) {
        await axios.put(`${API_BASE_URL}/api/districts/${editingDistrict.id}`, formData);
      } else {
        await axios.post(`${API_BASE_URL}/api/districts`, formData);
      }
      fetchDistricts();
      handleCloseDialog();
    } catch (error) {
      console.error('Failed to save district:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this district?')) {
      try {
        await axios.delete(`${API_BASE_URL}/api/districts/${id}`);
        fetchDistricts();
      } catch (error) {
        console.error('Failed to delete district:', error);
      }
    }
  };

  const columns = [
    { id: 'name', label: 'District Name', minWidth: 170 },
    { id: 'state', label: 'State', minWidth: 170 },
    { id: 'actions', label: 'Actions', minWidth: 120 },
  ];

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h2">
          Districts
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add District
        </Button>
      </Box>

      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {districts.map((district) => (
              <TableRow hover key={district.id}>
                <TableCell>{district.name}</TableCell>
                <TableCell>{district.state}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenDialog(district)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(district.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit District Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingDistrict ? 'Edit District' : 'Add District'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  margin="dense"
                  name="name"
                  label="District Name"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  name="state"
                  label="State"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              {editingDistrict ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Paper>
  );
};

export default DistrictList;
