import type { Category } from '../types/category';
import { api } from './axios';

export const getCategories = async () => {
	const response = await api.get<Category[]>('/products/categories');

	return response.data;
};
