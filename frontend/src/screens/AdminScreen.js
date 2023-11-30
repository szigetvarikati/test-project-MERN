import ProductTable from '../components/ProductTable';
import AdminMenuBar from '../components/AdminMenuBar';
import ProductTableAdmin from '../components/ProductTableAdmin';

function AdminScreen() {
  return (
    <div>
      <AdminMenuBar />
      <ProductTableAdmin />
      <ProductTable />
    </div>
  );
}

export default AdminScreen;
