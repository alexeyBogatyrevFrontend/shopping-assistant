import { computed, onMounted, onUnmounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useProductsStore } from '../stores/products';
import { useCategoriesStore } from '../stores/categories';
import type { ProductSortValue, ProductsRequestParams } from '../types/product';

export const useProductsQuery = () => {
	const PRODUCTS_PER_PAGE = 12;
	const SEARCH_DELAY = 500;

	const route = useRoute();
	const router = useRouter();

	const productsStore = useProductsStore();
	const categoriesStore = useCategoriesStore();

	let searchTimer: ReturnType<typeof setTimeout> | undefined;

	const getQueryString = (value: unknown) => {
		return typeof value === 'string' ? value : '';
	};

	const normalizePage = (value: unknown) => {
		const page = Number(getQueryString(value));

		if (!Number.isInteger(page) || page < 1) {
			return 1;
		}

		return page;
	};

	const normalizeSort = (value: unknown): ProductSortValue => {
		if (
			value === 'price-asc' ||
			value === 'price-desc' ||
			value === 'rating-desc' ||
			value === 'title-asc'
		) {
			return value;
		}

		return '';
	};

	const searchQuery = computed({
		get: () => getQueryString(route.query.search),

		set: value => {
			const search = value.trim();

			router.replace({
				query: {
					...route.query,
					page: undefined,
					category: undefined,
					search: search || undefined,
				},
			});
		},
	});

	const selectedCategory = computed({
		get: () => getQueryString(route.query.category),

		set: value => {
			router.replace({
				query: {
					...route.query,
					page: undefined,
					search: undefined,
					category: value || undefined,
				},
			});
		},
	});

	const selectedSort = computed<ProductSortValue>({
		get: () => {
			return normalizeSort(route.query.sort);
		},

		set: value => {
			router.replace({
				query: {
					...route.query,
					page: undefined,
					sort: value || undefined,
				},
			});
		},
	});

	const sortParams = computed<Partial<ProductsRequestParams>>(() => {
		switch (selectedSort.value) {
			case 'price-asc':
				return {
					sortBy: 'price',
					order: 'asc',
				};

			case 'price-desc':
				return {
					sortBy: 'price',
					order: 'desc',
				};

			case 'rating-desc':
				return {
					sortBy: 'rating',
					order: 'desc',
				};

			case 'title-asc':
				return {
					sortBy: 'title',
					order: 'asc',
				};

			default:
				return {};
		}
	});

	const currentPage = computed(() => {
		return normalizePage(route.query.page);
	});

	const totalPages = computed(() => {
		return Math.ceil(productsStore.total / PRODUCTS_PER_PAGE);
	});

	const loadProducts = () => {
		const skip = (currentPage.value - 1) * PRODUCTS_PER_PAGE;

		const params: ProductsRequestParams = {
			limit: PRODUCTS_PER_PAGE,
			skip,
			...sortParams.value,
		};

		if (selectedCategory.value) {
			return productsStore.fetchProductsByCategory(
				selectedCategory.value,
				params,
			);
		}

		return productsStore.search(searchQuery.value, params);
	};

	const changePage = (page: number) => {
		if (!Number.isInteger(page) || page < 1 || page === currentPage.value) {
			return;
		}

		router.replace({
			query: {
				...route.query,
				page: page === 1 ? undefined : String(page),
			},
		});
	};

	watch(
		[searchQuery, selectedCategory, selectedSort, currentPage],
		([search, category, sort, page], oldValues) => {
			if (searchTimer) {
				clearTimeout(searchTimer);
			}

			if (!oldValues) {
				loadProducts();
				return;
			}

			const [oldSearch, oldCategory, oldSort, oldPage] = oldValues;

			const searchChanged = search !== oldSearch;

			const categoryChanged = category !== oldCategory;

			const sortChanged = sort !== oldSort;

			const pageChanged = page !== oldPage;

			if (pageChanged) {
				loadProducts();
				return;
			}

			if (sortChanged) {
				loadProducts();
				return;
			}

			if (categoryChanged && category) {
				loadProducts();
				return;
			}

			if (searchChanged) {
				searchTimer = setTimeout(() => {
					loadProducts();
				}, SEARCH_DELAY);

				return;
			}

			if (categoryChanged) {
				loadProducts();
			}
		},
		{
			immediate: true,
		},
	);

	watch(
		[
			() => productsStore.productsLoading,
			() => productsStore.productsError,
			totalPages,
			currentPage,
		],
		([loading, error, pages, page]) => {
			if (loading || error) {
				return;
			}

			const lastPage = Math.max(pages, 1);

			if (page <= lastPage) {
				return;
			}

			router.replace({
				query: {
					...route.query,
					page: lastPage === 1 ? undefined : String(lastPage),
				},
			});
		},
	);

	onMounted(() => {
		categoriesStore.fetchCategories();
	});

	onUnmounted(() => {
		if (searchTimer) {
			clearTimeout(searchTimer);
		}
	});

	return {
		searchQuery,
		selectedCategory,
		selectedSort,
		currentPage,
		productsStore,
		categoriesStore,
		totalPages,
		changePage,
		loadProducts,
	};
};
