import { defineStore } from 'pinia';

import type { Category } from '../types/category';
import { getCategories } from '../api/categories.api';
import { ref } from 'vue';

export const useCategoriesStore = defineStore('categories', () => {
	const categories = ref<Category[]>([]);
	const loading = ref(false);
	const error = ref<string | null>(null);

	const fetchCategories = async () => {
		loading.value = true;
		error.value = null;

		try {
			const data = await getCategories();

			categories.value = data;
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

	return { categories, loading, error, fetchCategories };
});
