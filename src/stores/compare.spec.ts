import { beforeEach, describe, expect, it } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';

import { createProduct } from '../test/fixtures/product';
import { useCompareStore } from './compare';

const COMPARE_STORAGE_KEY = 'shopping-assistant-compare';

describe('compareStore', () => {
	beforeEach(() => {
		setActivePinia(createPinia());
	});

	it('starts with an empty comparison list', () => {
		const store = useCompareStore();

		expect(store.compareProducts).toEqual([]);
		expect(store.compareCount).toBe(0);
		expect(store.compareIsFull).toBe(false);
	});

	it('adds and removes a product', () => {
		const store = useCompareStore();
		const product = createProduct();

		store.addToCompare(product);

		expect(store.isInCompare(product.id)).toBe(true);
		expect(store.compareCount).toBe(1);

		store.removeFromCompare(product.id);

		expect(store.isInCompare(product.id)).toBe(false);
		expect(store.compareCount).toBe(0);
	});

	it('does not add the same product twice', () => {
		const store = useCompareStore();
		const product = createProduct();

		store.addToCompare(product);
		store.addToCompare(product);

		expect(store.compareProducts).toHaveLength(1);
	});

	it('allows no more than four products', () => {
		const store = useCompareStore();

		for (let id = 1; id <= 5; id++) {
			store.addToCompare(
				createProduct({
					id,
					title: `Product ${id}`,
				}),
			);
		}

		expect(store.compareProducts).toHaveLength(4);
		expect(store.compareCount).toBe(4);
		expect(store.compareIsFull).toBe(true);
		expect(store.isInCompare(5)).toBe(false);
	});

	it('restores products from localStorage', () => {
		const product = createProduct();

		localStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify([product]));

		const store = useCompareStore();

		expect(store.compareProducts).toEqual([product]);
		expect(store.compareCount).toBe(1);
	});

	it('clears comparison products', () => {
		const store = useCompareStore();

		store.addToCompare(createProduct());
		store.clearCompare();

		expect(store.compareProducts).toEqual([]);
		expect(localStorage.getItem(COMPARE_STORAGE_KEY)).toBe('[]');
	});
});
