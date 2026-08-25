import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { PaginatedResponse, Product } from '../types/product';
import {
	getProduct,
	getProducts,
	searchProducts,
	getProductsByCategory,
} from '../api/products.api';

export const useProductsStore = defineStore('products', () => {
	const products = ref<Product[]>([]);
	const product = ref<Product | null>(null);
	const total = ref(0);
	const loading = ref(false);
	const error = ref<string | null>(null);

	let latestProductsRequestId = 0;

	const loadProductsList = async (
		request: () => Promise<PaginatedResponse<Product>>,
	) => {
		const requestId = ++latestProductsRequestId;

		loading.value = true;
		error.value = null;

		try {
			const data = await request();

			if (requestId !== latestProductsRequestId) {
				return;
			}

			products.value = data.products;
			total.value = data.total;
		} catch (err) {
			if (requestId !== latestProductsRequestId) {
				return;
			}

			if (err instanceof Error) {
				error.value = err.message;
			} else {
				error.value = 'Неизвестная ошибка';
			}
		} finally {
			if (requestId === latestProductsRequestId) {
				loading.value = false;
			}
		}
	};

	const search = (query: string, limit: number, skip: number) => {
		const normalizedQuery = query.trim();

		return loadProductsList(() => {
			if (normalizedQuery) {
				return searchProducts(normalizedQuery, limit, skip);
			}

			return getProducts(limit, skip);
		});
	};

	const fetchProductsByCategory = (
		category: string,
		limit: number,
		skip: number,
	) => {
		return loadProductsList(() => getProductsByCategory(category, limit, skip));
	};

	const fetchProduct = async (id: number) => {
		loading.value = true;
		error.value = null;
		product.value = null;

		try {
			const data = await getProduct(id);

			product.value = data;
		} catch (err) {
			if (err instanceof Error) {
				error.value = err.message;
			} else {
				error.value = 'Неизвестная ошибка';
			}
		} finally {
			loading.value = false;
		}
	};

	return {
		products,
		product,
		total,
		loading,
		error,

		fetchProduct,
		search,
		fetchProductsByCategory,
	};
});
