// App.js
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./Screens/HomePage";
import ProductList from "./Screens/ProductList";
import ProductDetails from "./Screens/ProductDetails";

function App() {
  return (
    <Router>
      <div className="App">
        {/* Route configuration */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:productName" element={<ProductDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
