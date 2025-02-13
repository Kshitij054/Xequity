import React from 'react';
import './CompanyProfile.css';
import ProductCard from './ProductCard';

const CompanyProfile = () => {
  const company = {
    name: "Tech Innovations Inc.",
    email: "info@techinnovations.com",
    logo: "https://via.placeholder.com/150", // Replace with actual logo URL
  };

  const products = [
    {
      id: 1,
      name: "Pika 2.1",
      description: "Meet Pika, the mind-blowing AI video maker that brings your wildest dreams and weirdest ideas to life.",
      image: "https://via.placeholder.com/100", // Replace with actual image URL
    },
    {
      id: 2,
      name: "Remy AI",
      description: "Remy is a free AI-powered video answer engine that changes the way you consume the world’s videos.",
      image: "https://via.placeholder.com/100", // Replace with actual image URL
    },
    // Add more products as needed
  ];

  return (
    <div className="company-profile">
      <div className="company-info">
        <img src={company.logo} alt="Company Logo" className="company-logo" />
        <h2>{company.name}</h2>
        <p>{company.email}</p>
      </div>
      <div className="products-section">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CompanyProfile;