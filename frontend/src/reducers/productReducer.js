const productReducer = (state, action) => {
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

export default productReducer;
