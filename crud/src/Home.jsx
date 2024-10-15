import React from 'react';
import { Link } from 'react-router-dom'; // Importing Link for navigation.
import './Home.css'; // Importing Home css which is made specially for home page.

function Home() {
    return (
        <div className="main-content"> {/* Adding a wrapper for flexbox centering */}
            <div className="home-container">
                <div className="text-backdrop"></div> {/* For blur backdrop text */}
                <h1>Welcome to the SCP CRUD Application</h1> {/* Main heading */}
                <p>This application allows you to manage, update, and delete SCP entries with ease.</p> {/* App description */}
                
                {/* Adding buttons for navigating to the Admin Panel and SCP items */}
                <div className="home-buttons">
                    <Link to="/admin" className="home-button">Go to Admin Panel</Link> {/* Link to admin page */}
                    <Link to="/item/17" className="home-button">View SCP Entries</Link> {/* Link to view an SCP entry */}
                </div>
            </div>
        </div>
    );
}

export default Home; // Exporting the Home component for use in other files
