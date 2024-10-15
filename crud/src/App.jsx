// Importing necessary things from react-router-dom and my components.
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavMenu from './NavMenu'; // Importing navigation menu component
import Home from './Home'; // Importing Home component
import ItemDetail from './ItemDetail'; // Importing Item detail page component
import AdminPanel from './AdminPanel'; //Importing Admin panel component
import './App.css'; // Importing the CSS for my app.

// Defining the main App component.
function App() {
  return (
    // Setting up the Router to handle navigation.
    <Router>
      {/* This navigation menu will show up on every page */}
      <NavMenu />
      {/* Adding a container for the main content  */}
      <div className='content'> 
        {/* Defining the routes for different pages */}
        <Routes>
          {/* Route for the home page */}
          <Route path="/" element={<Home />} /> 
          {/* Route for individual item details, with dynamic ID in the URL */}
          <Route path="/item/:id" element={<ItemDetail />} />
          {/* Route for the admin panel page.*/}
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
    </Router>
  );
}

// Exporting the App component so it can be used elsewhere
export default App;
