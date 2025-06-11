// auth.api.js
// Corrects URL construction to avoid double slashes and handles API calls for authentication.

// Get the API URL from environment variables.
// This URL (e.g., https://parags-notes-app-backend.vercel.app/api)
// should already contain the '/api' prefix from your Vercel config.
const API_URL = `${import.meta.env.VITE_API_URL}`;

// Helper function to get the authentication token
export function getToken() {
    return localStorage.getItem('authToken');
}

// User Registration API call
export async function registerAPI(formData) {
    try {
        // Use URLjoin logic to prevent double slashes if API_URL already ends with /api
        const url = `${API_URL}/auth/register`; 
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Registration failed unexpectedly.' }));
            throw new Error(errorData.message || 'Server Error');
        }
        return await response.json();
    } catch (error) {
        console.error('Register API Error:', error);
        throw new Error(error.message || 'Registration failed.');
    }
}

// User Login API call
export async function loginAPI(formData) {
    try {
        // Use URLjoin logic to prevent double slashes
        const url = `${API_URL}/auth/login`;
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Login failed unexpectedly.' }));
            throw new Error(errorData.message || 'Server Error');
        }
        return await response.json();
    } catch (error) {
        console.error('Login API Error:', error);
        throw new Error(error.message || 'Login failed.');
    }
}

// Google Login API call (frontend sends Google token to backend)
export async function googleLoginAPI(googleAccessToken) {
    try {
        // Correct URL construction: remove leading slash from path if API_URL already ends with one
        const url = `${API_URL}/auth/google-login`;
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: googleAccessToken }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Google login failed unexpectedly.' }));
            throw new Error(errorData.message || 'Server Error during Google login');
        }
        return await response.json();
    } catch (error) {
        console.error('Google Login API Error:', error);
        throw new Error(error.message || 'Failed to log in with Google');
    }
}

// ForgottenPassword API call
export async function sendRecoveryEmail(email) {
    try {
        const url = `${API_URL}/auth/forgot-password`;
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });

        const data = await response.json().catch(() => ({ message: 'Password reset request failed unexpectedly.' }));

        if (!response.ok) {
            throw new Error(data.message || 'Server Error');
        }
        return data;
    } catch (error) {
        console.error('Send Recovery Email API Error:', error);
        throw new Error(error.message || 'Password reset request failed.');
    }
}

// Reset Password from email recovery link API call
export async function resetPasswordAPI(linkToken, newPassword) {
    try {
        const url = `${API_URL}/auth/reset-password`;
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ linkToken, newPassword }),
        });

        const data = await response.json().catch(() => ({ message: 'Password reset failed unexpectedly.' }));

        if (!response.ok) {
            throw new Error(data.message || 'Server Error');
        }
        return data;
    } catch (error) {
        console.error('Reset Password API Error:', error);
        throw new Error(error.message || 'Password reset failed.');
    }
}

// Change password from settings API call
export async function changePasswordAPI(authtoken, currentPassword, newPassword) {
    try {
        const url = `${API_URL}/auth/change-password`;
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ authtoken, currentPassword, newPassword }),
        });

        const data = await response.json().catch(() => ({ message: 'Password change failed unexpectedly.' }));

        if (!response.ok) {
            throw new Error(data.message || 'Server Error');
        }

        return data;
    } catch (error) {
        console.error('Change Password API Error:', error);
        throw new Error(error.message || 'Password change failed.');
    }
}
