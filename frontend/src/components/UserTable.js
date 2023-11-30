import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import ExportToPdf from '../components/ExportToPdf';
import productReducer from '../reducers/productReducer';
import { Button } from 'react-bootstrap';

const reducer = productReducer;

function UserTable() {
  const [
    { loading, error, users, searchResult, invalidSearchMessage },
    dispatch,
  ] = useReducer(logger(reducer), {
    users: [],
    loading: true,
    error: '',
    searchResult: [],
    invalidSearchMessage: '',
  });

  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const labels = ['Felhasználónév', 'Név', 'E-mail', 'Hozzáférés'];

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/users');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, []);

  /*  const handleSortClickByNumberValues = (field) => {
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
*/
  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length === 0) {
      dispatch({ type: 'SEARCH', payload: e.target.value });
    } else {
      dispatch({ type: 'SEARCH', payload: e.target.value });
    }
  };

  return (
    <div>
      <Helmet>
        <title>Admin</title>
      </Helmet>
      <h1>Felhasználók</h1>
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
            users={users}
            searchResult={searchResult}
          />
        </div>
        <table className="table table-hover">
          <thead>
            <tr className="sortable-header">
              <th
                scope="col"
                onClick={
                  () => {} /* handleSortClickByStringValues('username') */
                }
              >
                Felhasználónév{' '}
                {sortField === 'username' && sortDirection === 'asc'
                  ? '▲'
                  : '▼'}
              </th>
              <th
                scope="col"
                onClick={
                  () => {} /* handleSortClickByStringValues('firstname') */
                }
              >
                Keresztnév{' '}
                {sortField === 'firstname' && sortDirection === 'asc'
                  ? '▲'
                  : '▼'}
              </th>
              <th
                scope="col"
                onClick={
                  () => {} /* handleSortClickByStringValues('lastname') */
                }
              >
                Vezetéknév{' '}
                {sortField === 'lastname' && sortDirection === 'asc'
                  ? '▲'
                  : '▼'}
              </th>
              <th
                scope="col"
                onClick={() => {} /* handleSortClickByStringValues('vat') */}
              >
                Jogosultság{' '}
                {sortField === 'isAdmin' && sortDirection === 'asc' ? '▲' : '▼'}
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <LoadingBox />
            ) : error ? (
              <div>{error}</div>
            ) : (
              (searchResult.length > 0 ? searchResult : users).map((user) => (
                <tr key={user._id}>
                  <th scope="row">{user.username}</th>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.isAdmin ? 'admin' : 'user'}</td>
                  <td>
                    <Button variant="dark">Jogosultság módosítás</Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserTable;
