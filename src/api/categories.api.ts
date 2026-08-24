import type { Category } from '../types/category';
import type { PaginatedResponse, Product } from '../types/product';
import { api } from './axios';

export const getCategories = async () => {
	const response = await api.get<Category[]>('/products/categories');

	return response.data;
};

export const getProductsByCategory = async (
	category: string,
	limit: number,
	skip: number,
) => {
	const response = await api.get<PaginatedResponse<Product>>(
		`/products/category/${category}`,
		{
			params: {
				limit,
				skip,
			},
		},
	);

	return response.data;
};
