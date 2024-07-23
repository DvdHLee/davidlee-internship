import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Explore from "./pages/Explore";
import Author from "./pages/Author";
import ItemDetails from "./pages/ItemDetails";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
<<<<<<< HEAD
        <Route path="/author/:authorId" element={<Author />} />
        <Route path="/item-details/:nftId" element={<ItemDetails />} />
=======
        <Route path="/author" element={<Author />} />
        <Route path="/item-details" element={<ItemDetails />} />
>>>>>>> 0e8bb57c313a3d52d154888f78188aa414248118
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
