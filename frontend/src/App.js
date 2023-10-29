import data from './data';

function App() {
  return (
    <div>
      <header>
        <a href="/">
          Netlient Kft. - Teszt feladat - Készítette: Szigetvári Katalin
        </a>
      </header>
      <main>
        <h1>Termékeink</h1>
        <div>
          <table className="product-table">
            <thead>
              <tr>
                <th>Cikkszám</th>
                <th>Cikk megnevezése</th>
                <th>Nettó ár</th>
                <th>Áfa</th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((product) => (
                <tr className="product" key={product._id}>
                  <td>{product.number}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.vat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default App;
