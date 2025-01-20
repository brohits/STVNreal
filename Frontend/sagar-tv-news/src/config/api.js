export const API_BASE_URL = 'http://localhost:8080';

// List of public endpoint patterns
const publicEndpoints = [
    '/api/signup',
    '/api/signin',
    '/api/news',
    '/api/news/category',
    '/api/news/video',
    '/api/news/district',
    '/api/categories',
    '/api/districts'
];

const isPublicEndpoint = (url) => {
    return publicEndpoints.some(endpoint => url.endsWith(endpoint) || url.startsWith(endpoint));
};

export const fetchWithConfig = async (endpoint, options = {}) => {
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        credentials: 'include',
    };

    const apiUrl = `${API_BASE_URL}/api${endpoint}`;
    console.log('Fetching from URL:', apiUrl);

    try {
        // Only add authorization header if it's not a public endpoint
        if (!isPublicEndpoint(apiUrl)) {
            const token = localStorage.getItem('token');
            if (token) {
                defaultOptions.headers['Authorization'] = `Bearer ${token}`;
            } else {
                throw new Error('Unauthorized: Please log in again');
            }
        }

        const mergedOptions = {
            ...defaultOptions,
            ...options,
            headers: {
                ...defaultOptions.headers,
                ...(options.headers || {})
            }
        };

        const response = await fetch(apiUrl, mergedOptions);

        if (!response.ok) {
            // Try to get error details from response
            let errorDetails = '';
            try {
                const errorData = await response.json();
                errorDetails = errorData.message || errorData.error || JSON.stringify(errorData);
            } catch (e) {
                errorDetails = response.statusText;
            }

            if (response.status === 401) {
                // Handle unauthorized access
                if (!isPublicEndpoint(apiUrl)) {
                    localStorage.removeItem('token'); // Clear invalid token
                    throw new Error('Unauthorized: Please log in again');
                }
            }
            
            throw new Error(`HTTP error! status: ${response.status} - ${errorDetails}`);
        }

        return response;
    } catch (error) {
        console.error('API request failed:', error);
        throw error;
    }
};
