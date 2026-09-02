import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

import type { Product } from '../types/product';

const FAVORITES_STORAGE_KEY = 'shopping-assistant-favorites';

const isStoredProduct = (value: unknown): value is Product => {
	if (typeof value !== 'object' || value === null) {
		return false;
	}

	const product = value as Record<string, unknown>;

	return (
		typeof product.id === 'number' &&
		typeof product.title === 'string' &&
		typeof product.price === 'number' &&
		typeof product.rating === 'number' &&
		typeof product.thumbnail === 'string'
	);
};

const getStoredFavorites = (): Product[] => {
	const storedValue = localStorage.getItem(FAVORITES_STORAGE_KEY);

	if (!storedValue) {
		return [];
	}

	try {
		const parsedValue: unknown = JSON.parse(storedValue);

		if (!Array.isArray(parsedValue)) {
			return [];
		}

		return parsedValue.filter(isStoredProduct);
	} catch {
		return [];
	}
};

export const useFavoritesStore = defineStore('favorites', () => {
	const favorites = ref<Product[]>(getStoredFavorites());

	const favoritesCount = computed(() => {
		return favorites.value.length;
	});

	const isFavorite = (productId: number) => {
		return favorites.value.some(product => product.id === productId);
	};

	const saveFavorites = () => {
		try {
			localStorage.setItem(
				FAVORITES_STORAGE_KEY,
				JSON.stringify(favorites.value),
			);
		} catch (error) {
			console.error('Не удалось сохранить избранное', error);
		}
	};

	const addFavorite = (product: Product) => {
		if (isFavorite(product.id)) {
			return;
		}

		favorites.value.push(product);
		saveFavorites();
	};

	const removeFavorite = (productId: number) => {
		favorites.value = favorites.value.filter(
			product => product.id !== productId,
		);

		saveFavorites();
	};

	const toggleFavorite = (product: Product) => {
		if (isFavorite(product.id)) {
			removeFavorite(product.id);
			return;
		}

		addFavorite(product);
	};

	const clearFavorites = () => {
		favorites.value = [];
		saveFavorites();
	};

	return {
		favorites,
		favoritesCount,
		isFavorite,
		addFavorite,
		removeFavorite,
		toggleFavorite,
		clearFavorites,
	};
});
