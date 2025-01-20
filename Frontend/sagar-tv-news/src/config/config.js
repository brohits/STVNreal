import { fetchWithConfig } from './api';

export const endpoints = {
    news: {
        all: '/news',
        byId: (id) => `/news/${id}`,
        byCategory: (categoryId) => `/news/category/${categoryId}?sort=id,desc`,
        byCategoryName: (categoryName) => `/news/category/name/${categoryName}?sort=id,desc`,
        byDistrict: (districtName) => `/news/district/name/${districtName}?sort=id,desc`,
        videos: '/news/video?sort=id,desc'
    },
    categories: {
        all: '/categories',
        byId: (id) => `/categories/${id}`,
        byName: (name) => `/categories/${name}`
    },
    districts: {
        all: '/districts',
        byId: (id) => `/districts/${id}`,
        byName: (name) => `/districts/${name}`
    }
};

export const fetchNews = async () => {
    try {
        const response = await fetchWithConfig(endpoints.news.all);
        const data = await response.json();
        return Array.isArray(data) ? data : (data.content || []);
    } catch (error) {
        console.error('Error fetching news:', error);
        throw error;
    }
};

export const fetchNewsByCategory = async (categoryId) => {
    try {
        const response = await fetchWithConfig(endpoints.news.byCategory(categoryId));
        const data = await response.json();
        return Array.isArray(data) ? data : (data.content || []);
    } catch (error) {
        console.error('Error fetching news by category:', error);
        throw error;
    }
};

export const fetchNewsByDistrict = async (districtName) => {
    try {
        const response = await fetchWithConfig(endpoints.news.byDistrict(districtName));
        const data = await response.json();
        return Array.isArray(data) ? data : (data.content || []);
    } catch (error) {
        console.error('Error fetching district news:', error);
        throw error;
    }
};

export const fetchNewsVideos = async () => {
    try {
        const response = await fetchWithConfig(endpoints.news.videos);
        const data = await response.json();
        const newsData = Array.isArray(data) ? data : (data.content || []);
        return newsData.filter(item => item && item.videoUrl && item.videoUrl.trim() !== '')
            .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
    } catch (error) {
        console.error('Error fetching video news:', error);
        throw error;
    }
};
