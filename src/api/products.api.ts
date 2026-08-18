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
