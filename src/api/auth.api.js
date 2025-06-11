const API_URL = `${import.meta.env.VITE_API_URL}`;

export function getToken() {
    return localStorage.getItem('authToken');
}

export async function loginAPI(email, password) {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json().catch(() => ({ message: 'Login failed unexpectedly.' }));

        if (!response.ok) {
            throw new Error(data.message || 'Server Error');
        }

        return data.token;
    } catch (error) {
        console.error('Login API Error:', error);
        throw new Error(error.message || 'Login failed.');
    }
}

export async function registerAPI(email, password) {
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json().catch(() => ({ message: 'Registration failed unexpectedly.' }));

        if (!response.ok) {
            throw new Error(data.message || 'Server Error');
        }
        return data.token;
    } catch (error) {
        console.error('Register API Error:', error);
        throw new Error(error.message || 'Registration failed.');
    }
}

export async function googleLoginAPI(googleToken) {
    try {
        const response = await fetch(`${API_URL}/auth/google-login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: googleToken }),
        });

        const data = await response.json().catch(() => ({ message: 'Google login failed unexpectedly.' }));

        if (!response.ok) {
            throw new Error(data.message || 'Server Error during Google login');
        }
        return data.token;
    } catch (error) {
        console.error('Google Login API Error:', error);
        throw new Error(error.message || 'Failed to log in with Google');
    }
}

export async function sendRecoveryEmail(email) {
    try {
        const response = await fetch(`${API_URL}/auth/forgot-password`, {
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

export async function resetPasswordAPI(linkToken, newPassword) {
    try {
        const response = await fetch(`${API_URL}/auth/reset-password`, {
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

export async function changePasswordAPI(authtoken, currentPassword, newPassword) {
    try {
        const response = await fetch(`${API_URL}/auth/change-password`, {
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
