import { defineStore } from 'pinia';

import type { Category } from '../types/category';
import { getCategories } from '../api/categories.api';
import { ref } from 'vue';
import { getRequestError, type RequestError } from '../api/error';

export const useCategoriesStore = defineStore('categories', () => {
	const categories = ref<Category[]>([]);
	const loading = ref(false);
	const error = ref<RequestError | null>(null);

	const fetchCategories = async () => {
		loading.value = true;
		error.value = null;

		try {
			const data = await getCategories();

			categories.value = data;
		} catch (err) {
			error.value = getRequestError(err);
		} finally {
			loading.value = false;
		}
	};

	return { categories, loading, error, fetchCategories };
});
