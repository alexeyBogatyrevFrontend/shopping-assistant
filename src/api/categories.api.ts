import type { Category } from '../types/category';
import type { PaginatedResponse, Product } from '../types/product';
import { api } from './axios';

export const getCategories = async () => {
	const response = await api.get<Category[]>('/products/categories');

	return response.data;
};

export const getCategory = async (query: string) => {
	const response = await api.get<PaginatedResponse<Product>>(
		`/products/category/${query}`,
	);

	return response.data;
};
