// Importing the function to create a Supabase client.
import { createClient } from '@supabase/supabase-js';

// Supabase project URL where the database is hosted.
const supabaseUrl = 'https://ooeqadhhizyeiuqdtcnl.supabase.co';

// The secret key that allows us to interact with the Supabase database.
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vZXFhZGhoaXp5ZWl1cWR0Y25sIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNTkyMTY2MSwiZXhwIjoyMDQxNDk3NjYxfQ.vwSx53WJZ7Rx4uYcvMbkhF0HggBQiS06KRj4_GSl_mU';

// Creating and exporting the Supabase client to be used in other parts of the app
export const supabase = createClient(supabaseUrl, supabaseKey);
