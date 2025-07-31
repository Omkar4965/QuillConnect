// In your context/UserContext.js file

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the context
export const UserContext = createContext();

// Create the provider component
export const UserProvider = ({ children }) => {
    // State to hold the full user object
    const [user, setUser] = useState(null);
    // State to handle loading state while verifying user
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // This function will run once when the app component mounts
        const verifyUser = async () => {
            try {
              console.log("bcd", process.env.REACT_APP_API_URL)
                // Make a request to your new backend endpoint to check for a valid cookie
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/verify-user`);
                
                // If the request is successful, the backend sends back the user data
                if (response.data.success) {
                    setUser(response.data.data); // Set the user state with the data from the backend
                }
            } catch (error) {
                // If the request fails (e.g., 401 Unauthorized), it means no valid cookie was found.
                // The user is not logged in, so we do nothing and the 'user' state remains null.
                console.log("User not authenticated.");
            } finally {
                // Set loading to false after the verification check is complete
                setIsLoading(false);
            }
        };

        verifyUser();
    }, []); // The empty dependency array ensures this runs only once

    // The value provided to any consuming components
    const contextValue = {
        user: user,
        userId: user ? user._id : null, // Provide the user ID specifically for convenience
        setUser: setUser, // Provide setUser for login/logout functionality
        isLoading: isLoading
    };

    // We can prevent rendering the app until the user check is complete.
    // This avoids a flicker or showing a logged-out state briefly to a logged-in user.
    return (
        <UserContext.Provider value={contextValue}>
            {!isLoading && children}
        </UserContext.Provider>
    );
};
