import { defineStore } from 'pinia';
import { ref } from 'vue';
import type {
	PaginatedResponse,
	Product,
	ProductsRequestParams,
} from '../types/product';
import {
	getProduct,
	getProducts,
	searchProducts,
	getProductsByCategory,
} from '../api/products.api';
import { getRequestError, type RequestError } from '../api/error';

export const useProductsStore = defineStore('products', () => {
	const products = ref<Product[]>([]);
	const total = ref(0);
	const productsLoading = ref(false);
	const productsError = ref<RequestError | null>(null);

	const product = ref<Product | null>(null);
	const productLoading = ref(false);
	const productError = ref<RequestError | null>(null);

	let latestProductsRequestId = 0;
	let latestProductRequestId = 0;

	const loadProductsList = async (
		request: () => Promise<PaginatedResponse<Product>>,
	) => {
		const requestId = ++latestProductsRequestId;

		productsLoading.value = true;
		productsError.value = null;

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

			productsError.value = getRequestError(err);
		} finally {
			if (requestId === latestProductsRequestId) {
				productsLoading.value = false;
			}
		}
	};

	const search = (query: string, params: ProductsRequestParams) => {
		const normalizedQuery = query.trim();

		return loadProductsList(() => {
			if (normalizedQuery) {
				return searchProducts(normalizedQuery, params);
			}

			return getProducts(params);
		});
	};

	const fetchProductsByCategory = (
		category: string,
		params: ProductsRequestParams,
	) => {
		return loadProductsList(() => getProductsByCategory(category, params));
	};

	const fetchProduct = async (id: number) => {
		const requestId = ++latestProductRequestId;

		productLoading.value = true;
		productError.value = null;
		product.value = null;

		try {
			const data = await getProduct(id);

			if (requestId !== latestProductRequestId) {
				return;
			}

			product.value = data;
		} catch (err) {
			if (requestId !== latestProductRequestId) {
				return;
			}

			productError.value = getRequestError(err);
		} finally {
			if (requestId === latestProductRequestId) {
				productLoading.value = false;
			}
		}
	};

	const resetProduct = () => {
		latestProductRequestId++;

		product.value = null;
		productLoading.value = false;
		productError.value = null;
	};

	return {
		products,
		total,
		productsLoading,
		productsError,

		product,
		productLoading,
		productError,

		fetchProduct,
		resetProduct,
		search,
		fetchProductsByCategory,
	};
});
