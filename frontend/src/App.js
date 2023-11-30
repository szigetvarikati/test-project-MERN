import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductScreen from './screens/ProductScreen';
import LoginScreen from './screens/LoginScreen';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import RegistrationScreen from './screens/RegistrationScreen';
import AdminScreen from './screens/AdminScreen';
import ProductScreenAdmin from './screens/ProductScreenAdmin';
import UserTable from './components/UserTable';
import withRoleCheck from './components/withRoleCheck';

const ProtectedProductTable = withRoleCheck(ProductScreen); // Wrap ProductTable
const ProtectedAdminPage = withRoleCheck(AdminScreen); // Wrap AdminPage
function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <Navbar bg="dark" variant="dark">
          <Container className="mx-auto">
            <Navbar.Brand className="text-center mx-auto">
              Pet Project - Készítette: Szigetvári Katalin
            </Navbar.Brand>
          </Container>
        </Navbar>

        <main>
          <Container>
            <Routes>
              <Route path="/" element={<LoginScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/products" element={<ProtectedProductTable />} />
              <Route path="/registration" element={<RegistrationScreen />} />
              <Route path="/admin" element={<ProtectedAdminPage />} />
              <Route path="/admin/products" element={<ProductScreenAdmin />} />
              <Route path="/admin/users" element={<UserTable />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">© Minden jog fenntartva</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
