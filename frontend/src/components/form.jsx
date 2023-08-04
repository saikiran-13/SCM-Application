import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Container } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { useContext } from 'react';
import { Appcontext } from '../App';
const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#ffffff',
    },
  },

  typography: {
    fontFamily: 'IBM Plex Sans Condensed, sans-serif',
    fontSize: 18,
    fontWeightBold: 700,
  },
});

const ProductForm = ({ product, onSubmit }) => {
  const { setProductDetails } = useContext(Appcontext);
  const [formData, setFormData] = useState({
    id: product.id || '',
    name: product.name || '',
    image: product.image || '',
    battery: product.battery || '',
    camera: product.camera || '',
    price: product.price || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProductDetails({
      id: '',
      name: '',
      image: '',
      battery: '',
      camera: '',
      price: '',
    });
    onSubmit(formData);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        // maxWidth="md"
        maxWidth="md"
        className="glassmorphism-form p-5 font-roboto mb-28"
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" align="center">
                Product Form
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Product Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Image URL"
                name="image"
                value={formData.image}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Battery"
                name="battery"
                value={formData.battery}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Camera"
                name="camera"
                value={formData.camera}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                className="bg-black text-white  "
                fullWidth
              >
                {product.id ? 'Update Product' : 'Add Product'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </ThemeProvider>
  );
};

export default ProductForm;
