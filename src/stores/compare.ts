import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

import type { Product } from '../types/product';

const COMPARE_STORAGE_KEY = 'shopping-assistant-compare';
const MAX_COMPARE_PRODUCTS = 4;

const isStoredProduct = (value: unknown): value is Product => {
	if (typeof value !== 'object' || value === null) {
		return false;
	}

	const product = value as Record<string, unknown>;

	return (
		typeof product.id === 'number' &&
		typeof product.title === 'string' &&
		typeof product.description === 'string' &&
		typeof product.category === 'string' &&
		typeof product.price === 'number' &&
		typeof product.rating === 'number' &&
		typeof product.stock === 'number' &&
		typeof product.thumbnail === 'string'
	);
};

const getStoredCompareProducts = (): Product[] => {
	const storedValue = localStorage.getItem(COMPARE_STORAGE_KEY);

	if (!storedValue) {
		return [];
	}

	try {
		const parsedValue: unknown = JSON.parse(storedValue);

		if (!Array.isArray(parsedValue)) {
			return [];
		}

		return parsedValue.filter(isStoredProduct).slice(0, MAX_COMPARE_PRODUCTS);
	} catch {
		return [];
	}
};

export const useCompareStore = defineStore('compare', () => {
	const compareProducts = ref<Product[]>(getStoredCompareProducts());

	const compareCount = computed(() => {
		return compareProducts.value.length;
	});

	const compareIsFull = computed(() => {
		return compareCount.value >= MAX_COMPARE_PRODUCTS;
	});

	const isInCompare = (productId: number) => {
		return compareProducts.value.some(product => product.id === productId);
	};

	const saveCompareProducts = () => {
		try {
			localStorage.setItem(
				COMPARE_STORAGE_KEY,
				JSON.stringify(compareProducts.value),
			);
		} catch (error) {
			console.error('Не удалось сохранить товары для сравнения', error);
		}
	};

	const addToCompare = (product: Product) => {
		if (isInCompare(product.id) || compareIsFull.value) {
			return;
		}

		compareProducts.value.push(product);
		saveCompareProducts();
	};

	const removeFromCompare = (productId: number) => {
		compareProducts.value = compareProducts.value.filter(
			product => product.id !== productId,
		);

		saveCompareProducts();
	};

	const toggleCompare = (product: Product) => {
		if (isInCompare(product.id)) {
			removeFromCompare(product.id);
			return;
		}

		addToCompare(product);
	};

	const clearCompare = () => {
		compareProducts.value = [];
		saveCompareProducts();
	};

	return {
		compareProducts,
		compareCount,
		compareIsFull,
		isInCompare,
		addToCompare,
		removeFromCompare,
		toggleCompare,
		clearCompare,
	};
});
