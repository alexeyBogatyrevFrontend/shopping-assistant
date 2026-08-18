import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Product } from '../types/product';
import { getProducts } from '../api/products.api';

export const useProductsStore = defineStore('products', () => {
	const products = ref<Product[]>([]);
	const total = ref(0);
	const loading = ref(false);
	const error = ref<string | null>(null);

	const fetchProducts = async (limit: number, skip: number) => {
		loading.value = true;
		error.value = null;

		try {
			const data = await getProducts(limit, skip);

			products.value = data.products;
			total.value = data.total;
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

	return { products, total, loading, error, fetchProducts };
});
