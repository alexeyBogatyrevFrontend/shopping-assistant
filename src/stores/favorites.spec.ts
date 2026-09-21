import { beforeEach, describe, expect, it } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';

import { createProduct } from '../test/fixtures/product';
import { useFavoritesStore } from './favorites';

const FAVORITES_STORAGE_KEY = 'shopping-assistant-favorites';

describe('favoritesStore', () => {
	beforeEach(() => {
		setActivePinia(createPinia());
	});

	it('starts with an empty favorites list', () => {
		const store = useFavoritesStore();

		expect(store.favorites).toEqual([]);
		expect(store.favoritesCount).toBe(0);
	});

	it('restores favorites from localStorage', () => {
		const product = createProduct();

		localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify([product]));

		const store = useFavoritesStore();

		expect(store.favorites).toEqual([product]);
		expect(store.favoritesCount).toBe(1);
	});

	it('adds a product and saves it to localStorage', () => {
		const store = useFavoritesStore();
		const product = createProduct();

		store.addFavorite(product);

		expect(store.favorites).toEqual([product]);
		expect(store.isFavorite(product.id)).toBe(true);
		expect(store.favoritesCount).toBe(1);

		const storedValue = localStorage.getItem(FAVORITES_STORAGE_KEY);

		expect(storedValue).not.toBeNull();
		expect(JSON.parse(storedValue ?? '[]')).toEqual([product]);
	});

	it('does not add the same product twice', () => {
		const store = useFavoritesStore();
		const product = createProduct();

		store.addFavorite(product);
		store.addFavorite(product);

		expect(store.favorites).toHaveLength(1);
		expect(store.favoritesCount).toBe(1);
	});

	it('removes a product from favorites', () => {
		const store = useFavoritesStore();
		const firstProduct = createProduct();
		const secondProduct = createProduct({
			id: 2,
			title: 'Second Product',
		});

		store.addFavorite(firstProduct);
		store.addFavorite(secondProduct);
		store.removeFavorite(firstProduct.id);

		expect(store.favorites).toEqual([secondProduct]);
		expect(store.isFavorite(firstProduct.id)).toBe(false);
		expect(store.isFavorite(secondProduct.id)).toBe(true);
	});

	it('toggles a product in favorites', () => {
		const store = useFavoritesStore();
		const product = createProduct();

		store.toggleFavorite(product);

		expect(store.isFavorite(product.id)).toBe(true);

		store.toggleFavorite(product);

		expect(store.isFavorite(product.id)).toBe(false);
		expect(store.favoritesCount).toBe(0);
	});

	it('clears all favorites', () => {
		const store = useFavoritesStore();

		store.addFavorite(createProduct());
		store.addFavorite(
			createProduct({
				id: 2,
				title: 'Second Product',
			}),
		);

		store.clearFavorites();

		expect(store.favorites).toEqual([]);
		expect(store.favoritesCount).toBe(0);
		expect(localStorage.getItem(FAVORITES_STORAGE_KEY)).toBe('[]');
	});

	it('ignores invalid localStorage data', () => {
		localStorage.setItem(FAVORITES_STORAGE_KEY, 'invalid-json');

		const store = useFavoritesStore();

		expect(store.favorites).toEqual([]);
		expect(store.favoritesCount).toBe(0);
	});
});
