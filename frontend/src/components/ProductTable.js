import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import ExportToPdf from '../components/ExportToPdf';
import productReducer from '../reducers/productReducer';

const reducer = productReducer;

function ProductTable() {
  const [
    { loading, error, products, searchResult, invalidSearchMessage },
    dispatch,
  ] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
    searchResult: [],
    invalidSearchMessage: '',
  });

  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const labels = [
    'Cikkszám',
    'Cikk megnevezése',
    'Nettó ár (Ft)',
    'Áfa (%)',
    'Készlet (db)',
  ];

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

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length === 0) {
      dispatch({ type: 'SEARCH', payload: e.target.value });
    } else {
      dispatch({ type: 'SEARCH', payload: e.target.value });
    }
  };

  const getHighlightedText = (text, highlight) => {
    const parts = text.toString().split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, i) => (
      <span
        key={i}
        style={
          part.toLowerCase() === highlight.toLowerCase()
            ? {
                color: 'white',
                backgroundColor: 'black',
                fontWeight: 'bold',
              }
            : {}
        }
      >
        {part}
      </span>
    ));
  };

  return (
    <div>
      <Helmet>
        <title>Termékek</title>
      </Helmet>
      <h1>Termékeink</h1>
      <div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Keresés..."
            value={searchTerm}
            onChange={handleSearchInputChange}
          />
          {invalidSearchMessage && (
            <div className="error-message">{invalidSearchMessage}</div>
          )}
          {<ExportToPdf
            labels={labels}
            products={products}
            searchResult={searchResult}
          />}
        </div>
        <table className="table table-hover">
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
              <th
                scope="col"
                onClick={() => handleSortClickByNumberValues('inventory')}
              >
                Készlet (db){' '}
                {sortField === 'inventory' && sortDirection === 'asc'
                  ? '▲'
                  : '▼'}
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <LoadingBox />
            ) : error ? (
              <div>{error}</div>
            ) : (
              (searchResult.length > 0 ? searchResult : products).map(
                (product) => (
                  <tr key={product._id}>
                    <th scope="row">
                      {getHighlightedText(product.number, searchTerm)}
                    </th>
                    <td>{getHighlightedText(product.name, searchTerm)}</td>
                    <td>{getHighlightedText(product.price, searchTerm)}</td>
                    <td>{getHighlightedText(product.vat, searchTerm)}</td>
                    <td>{getHighlightedText(product.inventory, searchTerm)}</td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductTable;
