import type {
	PaginatedResponse,
	Product,
	ProductsRequestParams,
} from '../types/product';
import { api } from './axios';

export const getProducts = async (params: ProductsRequestParams) => {
	const response = await api.get<PaginatedResponse<Product>>('/products', {
		params,
	});

	return response.data;
};

export const getProduct = async (id: number) => {
	const response = await api.get<Product>(`/products/${id}`);

	return response.data;
};

export const searchProducts = async (
	query: string,
	params: ProductsRequestParams,
) => {
	const response = await api.get<PaginatedResponse<Product>>(
		'/products/search',
		{
			params: {
				q: query,
				...params,
			},
		},
	);

	return response.data;
};

export const getProductsByCategory = async (
	category: string,
	params: ProductsRequestParams,
) => {
	const response = await api.get<PaginatedResponse<Product>>(
		`/products/category/${category}`,
		{
			params,
		},
	);

	return response.data;
};
