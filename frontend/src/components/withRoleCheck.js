import React from 'react';
import AdminScreen from '../screens/AdminScreen';
import ProductScreen from '../screens/ProductScreen';

// HOC to conditionally render components based on user role
const withRoleCheck = (WrappedComponent) => {
  return (props) => {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    // Conditionally render based on isAdmin
    return isAdmin ? <AdminScreen {...props} /> : <ProductScreen {...props} />;
  };
};

export default withRoleCheck;
