import type { PaginatedResponse, Product } from '../types/product';
import { api } from './axios';

export const getProducts = async (limit: number, skip: number) => {
	const response = await api.get<PaginatedResponse<Product>>('/products', {
		params: {
			limit,
			skip,
		},
	});

	return response.data;
};

export const getProduct = async (id: number) => {
	const response = await api.get<Product>(`/products/${id}`);

	return response.data;
};

export const searchProducts = async (
	query: string,
	limit: number,
	skip: number,
) => {
	const response = await api.get<PaginatedResponse<Product>>(
		'/products/search',
		{
			params: {
				q: query,
				limit,
				skip,
			},
		},
	);

	return response.data;
};
