import { defineStore } from 'pinia';
import { ref } from 'vue';

import type { Category } from '../types/category';
import { getRequestError, type RequestError } from '../api/error';
import { getCategories } from '../api/categories.api';

export const useCategoriesStore = defineStore('categories', () => {
	const categories = ref<Category[]>([]);
	const loading = ref(false);
	const error = ref<RequestError | null>(null);
	const loaded = ref(false);

	const fetchCategories = async (force = false) => {
		if (loading.value) {
			return;
		}

		if (loaded.value && !force) {
			return;
		}

		loading.value = true;
		error.value = null;

		try {
			const data = await getCategories();

			categories.value = data;
			loaded.value = true;
		} catch (err) {
			error.value = getRequestError(err);
		} finally {
			loading.value = false;
		}
	};

	return {
		categories,
		loading,
		error,
		loaded,
		fetchCategories,
	};
});
