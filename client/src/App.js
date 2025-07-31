import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios'; // <--- ADD THIS LINE BACK

// Import your pages and context
import Home from './pages/home';
import Profile from './pages/profile';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import NoPage from './pages/NoPage';
import EditDetails from './pages/editDetails';
import Messenger from './pages/messenger';
import BookmarkPage from './pages/bookmark';
import { UserContext } from './context/UserContext';

function App() {
  const { userId } = useContext(UserContext); // Destructure userId directly
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if userId exists before fetching
    if (userId) {
      const fetchUser = async () => {
        try {
          // The axios.get call requires axios to be imported in this file
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/getUser/${userId}`);
          setUser(response.data.data);
        } catch (err) {
          console.error("Error fetching user:", err);
          // Handle error, e.g., clear user data or show a notification
        }
      };
      fetchUser();
    }
  }, [userId]); // Dependency array is correct

  return (
    <BrowserRouter>
      <Routes>
        {/* Pass the fetched user data to the Home and Profile components */}
        <Route path="/" element={<Home user={user} />} />
        
        {/* Pass the fetched user data to the main profile route */}
        <Route 
          path="/profile" 
          element={<Profile user={user} />} 
        />
        {/* This route is for viewing other users' profiles */}
        <Route path="/profile/:id" element={<Profile />} />
        
        {/* Login and Register */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path='/editDetails' element={<EditDetails user={user} />} />
        <Route path='/messenger' element={<Messenger user={user} />} />
        <Route path='/bookmarks' element={<BookmarkPage />} />
        
        {/* No match route */}
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
