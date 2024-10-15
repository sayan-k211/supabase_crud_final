// Importing necessary hooks and components from React and React Router
import { useState, useEffect } from 'react'; // useState to manage state, useEffect to run side effects (data fetching)
import { NavLink } from 'react-router-dom'; // NavLink for navigation links that are aware of which route is active
import { supabase } from './supabase'; // Importing supabase 
import './NavMenu.css'; // Importing NavMenu css

function NavMenu() {
    const [isOpen, setIsOpen] = useState(false); // State to handle whether the mobile menu is open or closed
    const [items, setItems] = useState([]); // State to store the SCP items fetched from the database
    const [loading, setLoading] = useState(true); // State to handle loading state while fetching SCP items
    const [error, setError] = useState(null); // State to handle any error during the fetch operation

    // Function to toggle the mobile menu between open and closed states
    const toggleMenu = () => {
        setIsOpen(!isOpen); // Toggles the state of 'isOpen' between true and false
    };

    // Function to close the menu when any navigation link is clicked
    const closeMenu = () => {
        setIsOpen(false); // Closes the menu by setting 'isOpen' to false
    };
    
    // useEffect hook to fetch SCP items from the database when the component mounts
    useEffect(() => {
        const fetchItems = async () => {
            // Fetching SCP items from the 'scp' table in Supabase
            const { data, error } = await supabase.from('scp').select('id, item');
    
            if (error) { // If there's an error during fetching, setting the error state
                setError('Error fetching items');
                console.error('Error fetching items:', error);
            } else { // Otherwise, setting the fetched data to the items state
                setItems(data || []); // If no data is returned, setting items to an empty array
            }
            setLoading(false); // To stop loading after fetching the data
        };
        fetchItems(); // To call the function to fetch the items
    }, []); // Empty dependency array means this effect runs only once when the component mounts
    
    return (
        <div>
            {/* Mobile menu icon, displays '☰' when closed and '✖' when open */}
            <div className="mobile-menu-icon" onClick={toggleMenu}>
                {isOpen ? '✖' : '☰'} {/* Ternary operator to switch between icons based on 'isOpen' */}
            </div>
            {/* The navigation menu, which gets a dynamic 'open' class if the menu is open */}
            <nav className={`nav ${isOpen ? 'open' : ''}`}>
                <ul>
                    {/* Link to the home page */}
                    <li>
                        <NavLink to="/" className={({ isActive }) => isActive ? 'active-link' : undefined} onClick={closeMenu}>
                            Home {/* Displays 'Home' component and the link will be highlighted when it's active */}
                        </NavLink>
                    </li>
                    {/* If the items are still loading, show a loading message */}
                    {loading && <li>Loading...</li>}
                    {/* If there's an error, display the error message */}
                    {error && <li>{error}</li>}
                    {/* If data is successfully loaded and no error occurred, map over the fetched items */}
                    {!loading && !error && (
                        items.map((item) => (
                            <li key={item.id}> {/* Each item will get a unique key from its 'id' */}
                                <NavLink to={`/item/${item.id}`} className={({ isActive }) => isActive ? 'active-link' : undefined} onClick={closeMenu}>
                                    {item.item} {/* To dynamically display the item name as a link */}
                                </NavLink>
                            </li>
                        ))
                    )}
                    {/* To link to the admin panel */}
                    <li>
                        <NavLink to="/admin" className={({ isActive }) => isActive ? 'active-link' : undefined} onClick={closeMenu}>
                            Admin Panel {/* Displays 'Admin Panel' as a link */}
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default NavMenu; // Exporting the NavMenu component to be used in other parts of the application
