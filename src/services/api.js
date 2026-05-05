import axios from 'axios';

const API_BASE_URL = 'http://localhost:5238/api';

const api = axios.create({
    baseURL: API_BASE_URL,
});


api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


api.interceptors.response.use(
    (response) => response, 
    async (error) => {
        const originalRequest = error.config;

        
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken');
                const accessToken = localStorage.getItem('token');

                
                const res = await axios.post(`${API_BASE_URL}/auth/refresh`, {
                    accessToken: accessToken,
                    refreshToken: refreshToken
                });

                if (res.status === 200) {
                    
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('refreshToken', res.data.refreshToken);

                    
                    originalRequest.headers.Authorization = `Bearer ${res.data.token}`;
                    return api(originalRequest);
                }
            } catch (refreshError) {
                
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);




export const loginUser = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('refreshToken', response.data.refreshToken); 
    }
    return response;
};


export const getDoctors = () => api.get('/doctors');
export const getDoctorById = (id) => api.get(`/doctors/${id}`);
export const createDoctor = (data) => api.post('/doctors', data);
export const updateDoctor = (id, data) => api.put(`/doctors/${id}`, data);
export const deleteDoctor = (id) => api.delete(`/doctors/${id}`);


export const getDepartments = () => api.get('/departments');

export default api;