import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import ExportToPdf from '../components/ExportToPdf';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        products: action.payload,
        loading: false,
        searchResult: action.payload,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'SORT_NUMBERVALUES':
      const sortedProductsByNumberValues = [...state.searchResult].sort(
        (a, b) => {
          if (action.payload.direction === 'asc') {
            return a[action.payload.field] - b[action.payload.field];
          } else {
            return b[action.payload.field] - a[action.payload.field];
          }
        }
      );
      return {
        ...state,
        searchResult: sortedProductsByNumberValues,
      };
    case 'SORT_STRINGVALUES':
      const { field, direction } = action.payload;
      const sortedProducts = [...state.searchResult].sort((a, b) => {
        const aValue = a[field];
        const bValue = b[field];
        return direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      });
      return { ...state, searchResult: sortedProducts };
    case 'REVERSE_SORT':
      return {
        ...state,
        searchResult: [...state.searchResult.reverse()],
      };
    case 'SEARCH':
      const searchTerm = action.payload.toLowerCase();
      const searchResult = state.products.filter((product) => {
        return Object.values(product).some((value) => {
          if (
            typeof value === 'string' &&
            value.toLowerCase().includes(searchTerm)
          ) {
            return true;
          }
          if (
            typeof value === 'number' &&
            value.toString().includes(searchTerm)
          ) {
            return true;
          }
          return false;
        });
      });

      return {
        ...state,
        searchResult,
        invalidSearchMessage: searchResult.length === 0 ? 'Nincs találat.' : '',
      };
    default:
      return state;
  }
};

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
  const labels = ['Cikkszám', 'Cikk megnevezése', 'Nettó ár (Ft)', 'Áfa (%)'];

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

  const getHighlightedText = (text, highlight, searchLabel) => {
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
          <ExportToPdf
            labels={labels}
            products={products}
            searchResult={searchResult}
          />
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
