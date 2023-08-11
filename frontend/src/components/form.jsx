import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, Typography, Container } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { useContext } from 'react';
import { Appcontext } from '../App';
import { toastify } from '../utils/toastify';
import Loader from '../utils/loader';

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

const ProductForm = () => {
  const { productDetails, loading, setLoading, setProductDetails } =
    useContext(Appcontext);

  useEffect(() => {
    function products() {
      setProductDetails(null);
    }
    products();
  }, [productDetails]);
  const product = productDetails;

  const [btnText, setBtnText] = useState(
    product?.id ? 'Update Product' : 'Create Product',
  );

  // const { setProductDetails } = useContext(Appcontext);

  const [formData, setFormData] = useState({
    id: product?.id || '',
    name: product?.name || '',
    image: product?.image || '',
    battery: product?.battery || '',
    camera: product?.camera || '',
    price: product?.price || '',
    operation: product?.id ? 'update' : 'create',
  });

  useEffect(() => {
    setBtnText(product?.id ? 'Update Product' : 'Create Product');
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('Factorytoken');

    const link =
      formData?.id && formData?.operation === 'update'
        ? 'updateAndTransferProduct'
        : 'createAndTransferProduct';
    console.log(formData, link);
    const response = await fetch(`http://localhost:5000/${link}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    setTimeout(() => {
      const toastMessage = formData?.id
        ? 'Product Updated Successfully'
        : 'Product Created Successfully';
      setLoading(false);
      if (response) {
        toastify('success', toastMessage);
      } else {
        toastify('success', 'Product Creation failed');
      }
    }, 3000);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
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
                className={`bg-black text-white  `}
                fullWidth
              >
                {loading && <Loader />}
                {btnText}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </ThemeProvider>
  );
};

export default ProductForm;
