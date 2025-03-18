// ProductDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Install axios if not already installed

function ProductDetails() {
  const { id } = useParams(); // Get the product name from the URL
  const [product, setProduct] = useState(null); // State to store the product details
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    // Fetch product details from the API
    const fetchProduct = async () => {
        console.log("Product name: ", id)
      try {
        const response = await axios.get(
          `https://adminecommerce.resnova.dev/api/productInformation?id=${id}`
        );
        console.log("single product: ", response.data)
        if (response.data) {
          setProduct(response.data); // Assuming the API returns an array of products
        } else {
          setError('Product not found!!!!');
        }
      } catch (err) {
        setError('Failed to fetch product details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]); // Re-run the effect when the productName changes

  if (loading) {
    return <div>Loading...</div>; // Display a loading message
  }

  if (error) {
    return <div>{error}</div>; // Display an error message
  }

  if (!product) {
    return <div>Product not found</div>; // Handle case where product is not found
  }

  return (
    <div>
      <h1>{product.productName}</h1>
      {/* Add more product details as needed */}
    </div>
  );
}

export default ProductDetails;