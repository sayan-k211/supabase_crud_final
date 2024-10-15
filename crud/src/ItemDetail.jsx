// Importing hooks from React and the necessary functions from react-router-dom and supabase.
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from './supabase';
import './style.css'; // Importing the global CSS file for styling

// Defining the ItemDetail component
function ItemDetail() {
  const { id } = useParams(); // Getting the item ID from the URL
  const [itemData, setItemData] = useState(null); // State to store the item details
  const [loading, setLoading] = useState(true); // State to handle loading indicator
  const [error, setError] = useState(''); // State to handle any error messages

  // Effect to fetch the item details when the component loads or when the ID changes.
  useEffect(() => {
    fetchItemDetails(); // Call the function to fetch item details.
  }, [id]); // Run this effect whenever the ID changes.

  // Function to fetch the details of the SCP item by its ID from the database.
  const fetchItemDetails = async () => {
    try {
      // Querying the database to get the SCP item details based on the ID.
      const { data, error } = await supabase
        .from('scp') // To access the 'scp' table from my supabase data
        .select('*') // To select all fields
        .eq('id', id) // To match the ID in the URL
        .single(); // Fetching only one result.

      if (error) throw error; // To handle error
      setItemData(data); // To store the fetched item data in state
    } catch (error) {
      console.error('Failed to fetch item details:', error.message); // To log the error to the console.
      setError('Failed to load item details. Please try again.'); // Setting the error message in state.
    } finally {
      setLoading(false); // To stop the loading spinner.
    }
  };

  // Display a loading message if the data is still being fetched
  if (loading) return <p className="loading-message">Loading...</p>;
  // Display an error message if there was an issue fetching the data
  if (error) return <p className="loading-message">{error}</p>;


  //This is what viewed in front end for scp item details
  return (
    <div className="item-detail-container">
      {itemData && ( // To heck if we have the item data before rendering the details
        <div>
          <h1>{itemData.item}</h1> {/* To display the SCP item number */}
          <h2>{itemData.class}</h2> {/* To isplay the SCP class */}
          
          {itemData.image && ( // To display image
            <img 
              src={itemData.image} 
              alt={`SCP-${itemData.item} Illustration`} 
            />
          )}

          <h3>Description</h3>
          <p>{itemData.description}</p> {/* To isplay the description */}

          <h3>Containment</h3>
          <p>{itemData.containment}</p> {/* To isplay the containment information */}
        </div>
      )}
    </div>
  );
}

export default ItemDetail; // Export the component to use it in other parts of the app.
