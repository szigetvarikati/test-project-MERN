import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'SORT_NUMBERVALUES':
      const sortedProductsByNumberValues = [...state.products].sort((a, b) => {
        if (action.payload.direction === 'asc') {
          return a[action.payload.field] - b[action.payload.field];
        } else {
          return b[action.payload.field] - a[action.payload.field];
        }
      });
      return { ...state, products: sortedProductsByNumberValues };
    case 'SORT_STRINGVALUES':
      const { field, direction } = action.payload;
      const sortedProducts = [...state.products].sort((a, b) => {
        const aValue = a[field];
        const bValue = b[field];
        return direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      });
      return { ...state, products: sortedProducts };
    case 'REVERSE_SORT':
      return {
        ...state,
        products: [...state.products.reverse()],
      };
    default:
      return state;
  }
};

function ProductTable() {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
  });

  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, []);

  const handleSortClickByNumberValues = (field) => {
    let direction = 'asc';
    if (sortDirection === 'asc' && sortField === field) {
      direction = 'desc';
    }
    setSortDirection(direction);
    setSortField(field);

    dispatch({ type: 'SORT_NUMBERVALUES', payload: { field, direction } });
  };

  const handleSortClickByStringValues = (field) => {
    let direction = 'asc';
    if (sortDirection === 'asc' && sortField === field) {
      direction = 'desc';
    }
    setSortDirection(direction);
    setSortField(field);

    dispatch({ type: 'SORT_STRINGVALUES', payload: { field, direction } });
  };
  return (
    <div>
      <Helmet>
        <title>Termékek</title>
      </Helmet>
      <h1>Termékeink</h1>
      <div>
        <table className="table table-hover table-dark">
          <thead>
            <tr className="sortable-header">
              <th
                scope="col"
                onClick={() => handleSortClickByNumberValues('number')}
              >
                Cikkszám{' '}
                {sortField === 'number' && sortDirection === 'asc' ? '▲' : '▼'}
              </th>
              <th
                scope="col"
                onClick={() => handleSortClickByStringValues('name')}
              >
                Cikk megnevezése{' '}
                {sortField === 'name' && sortDirection === 'asc' ? '▲' : '▼'}
              </th>
              <th
                scope="col"
                onClick={() => handleSortClickByNumberValues('price')}
              >
                Nettó ár (Ft){' '}
                {sortField === 'price' && sortDirection === 'asc' ? '▲' : '▼'}
              </th>
              <th
                scope="col"
                onClick={() => handleSortClickByNumberValues('vat')}
              >
                Áfa (%){' '}
                {sortField === 'vat' && sortDirection === 'asc' ? '▲' : '▼'}
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <LoadingBox />
            ) : error ? (
              <div>{error}</div>
            ) : (
              products.map((product) => (
                <tr className="product" key={product._id}>
                  <th scope="row">{product.number}</th>
                  <td>{product.name}</td>
                  <td className="text-center">{product.price}</td>
                  <td className="text-center">{product.vat}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductTable;
