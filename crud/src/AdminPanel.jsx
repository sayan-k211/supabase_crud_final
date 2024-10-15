// Importing necessary hooks and files for my component.
import { useState, useEffect } from 'react';
import { supabase } from './supabase';
import './style.css';

// Defining AdminPanel component
function AdminPanel() {
  // State for storing the list of items fetched from the database.
  const [items, setItems] = useState([]);
  // State to handle the form input for adding a new record.
  const [newRecord, setNewRecord] = useState({ item: '', class: '', description: '', containment: '', image: '' });
  // State to handle which item is being edited.
  const [editRecord, setEditRecord] = useState(null);
  // State to show whether data is being loaded or not.
  const [loading, setLoading] = useState(false);
  // State to show any feedback or error messages to the user.
  const [feedback, setFeedback] = useState('');

  // This runs when the component is mounted to fetch the SCP items.
  useEffect(() => {
    fetchItems(); // Fetching items when the component loads.
  }, []);

  // Function to fetch all items from the 'scp' table in Supabase.
  const fetchItems = async () => {
    setLoading(true); // To show loading message.
    try {
      let { data, error } = await supabase.from('scp').select('*'); // Fetch all items.
      if (error) throw error; // To handle error
      setItems(data); // Save the items to state.
    } catch (error) {
      setFeedback(`Error fetching items: ${error.message}`); // To show error message if something goes wrong.
    } finally {
      setLoading(false); // To stop showing the loading message.
    }
  };

  // Function to handle input changes for forms (both new and edit).
  const handleInputChange = (event, recordSetter) => {
    const { name, value } = event.target; // To get the input field name and value.
    recordSetter(prev => ({ ...prev, [name]: value })); // To update the state for the specific form.
  };

  // Function to add a new item to the database.
  const addItem = async (event) => {
    event.preventDefault(); // To prevent the default form submission behavior
    if (!newRecord.item || !newRecord.class) { // To check if required fields are filled
      setFeedback('Please fill all the required fields.');
      return; // To exit if fields are not filled.
    }
    try {
      const { error } = await supabase.from('scp').insert([newRecord]); // To insert the new record into the database.
      if (error) throw error; // To handle error
      fetchItems(); // Fetch the updated list of items.
      setNewRecord({ item: '', class: '', description: '', containment: '', image: '' }); // To clear the form after adding.
      setFeedback('Item added successfully!'); // To show success message
    } catch (error) {
      setFeedback(`Error adding item: ${error.message}`); // To show error message if something goes wrong
    }
  };

  // Function to delete an item from the database.
  const deleteItem = async (id) => {
    try {
      const { error } = await supabase.from('scp').delete().eq('id', id); // To delete item by its ID
      if (error) throw error; // To handle error
      fetchItems(); // To fetch the updated list of items.
      setFeedback('Item deleted successfully!'); // To show success message.
    } catch (error) {
      setFeedback(`Error deleting item: ${error.message}`); // To show error message if something goes wrong.
    }
  };

  // Function to save the edited item details.
  const saveEdit = async (event) => {
    event.preventDefault(); // To prevent default form submission.
    try {
      const { error } = await supabase.from('scp').update(editRecord).eq('id', editRecord.id); // to update item by its ID.
      if (error) throw error; // If there's an error, handle it.
      setEditRecord(null); // To clear the edit state after saving.
      fetchItems(); // To fetch the updated list of items.
      setFeedback('Item updated successfully!'); // To show success message.
    } catch (error) {
      setFeedback(`Error updating item: ${error.message}`); // To show error message if something goes wrong.
    }
  };

  // This section is what displayed in our front end
  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      {/* To display message */}
      {feedback && <p className="feedback-message">{feedback}</p>}
      {/* To show loading message if still fetching items. */}
      {loading ? <p>Loading...</p> : (
        <ul>
          {/* To loop through the items and display them. */}
          {items.map(item => (
            <li key={item.id}>
              {/* If we're editing this item, show the edit form. */}
              {editRecord && editRecord.id === item.id ? (
                <form onSubmit={saveEdit}>
                  {/* Inputs for editing the item. */}
                  <input value={editRecord.item} onChange={e => handleInputChange(e, setEditRecord)} name="item" />
                  <input value={editRecord.class} onChange={e => handleInputChange(e, setEditRecord)} name="class" />
                  <input value={editRecord.description} onChange={e => handleInputChange(e, setEditRecord)} name="description" />
                  <input value={editRecord.containment} onChange={e => handleInputChange(e, setEditRecord)} name="containment" />
                  <input value={editRecord.image} onChange={e => handleInputChange(e, setEditRecord)} name="image" />
                  <div>
                    {/* Save button for saving changes. */}
                    <button type="submit">Save</button>
                    {/* Cancel button to exit edit mode. */}
                    <button className='cancel-button' type="button" onClick={() => setEditRecord(null)}>Cancel</button>
                  </div>
                </form>
              ) : (
                <>
                  {/* To display the item details. */}
                  <p>{item.item}</p>
                  {/* Button to enter edit mode. */}
                  <button onClick={() => setEditRecord(item)}>Edit</button>
                  {/* Button to delete the item. */}
                  <button onClick={() => deleteItem(item.id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}

      <h3>Add New Record</h3>
      {/* Form to add a new item. */}
      <form onSubmit={addItem}>
        <div className='addNew-container'>
          {/* Input for item details */}
          <input name="item" value={newRecord.item} onChange={e => handleInputChange(e, setNewRecord)} placeholder="Item" required />
          <input name="class" value={newRecord.class} onChange={e => handleInputChange(e, setNewRecord)} placeholder="Class" required />
          <input name="description" value={newRecord.description} onChange={e => handleInputChange(e, setNewRecord)} placeholder="Description" />
          <input name="containment" value={newRecord.containment} onChange={e => handleInputChange(e, setNewRecord)} placeholder="Containment" />
          <input name="image" value={newRecord.image} onChange={e => handleInputChange(e, setNewRecord)} placeholder="Image" />
        </div>
        <div>
          {/* Button to submit and add the new item. */}
          <button className='addNew' type="submit">Add New Item</button>
        </div>
      </form>
    </div>
  );
}

// Exporting the AdminPanel component so it can be used elsewhere.
export default AdminPanel;
