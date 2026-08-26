import { computed, onMounted, onUnmounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useProductsStore } from '../stores/products';
import { useCategoriesStore } from '../stores/categories';

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

	const currentPage = computed(() => {
		return normalizePage(route.query.page);
	});

	const totalPages = computed(() => {
		return Math.ceil(productsStore.total / PRODUCTS_PER_PAGE);
	});

	const loadProducts = () => {
		const skip = (currentPage.value - 1) * PRODUCTS_PER_PAGE;

		if (selectedCategory.value) {
			return productsStore.fetchProductsByCategory(
				selectedCategory.value,
				PRODUCTS_PER_PAGE,
				skip,
			);
		}

		return productsStore.search(searchQuery.value, PRODUCTS_PER_PAGE, skip);
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
		[searchQuery, selectedCategory, currentPage],
		([search, category, page], oldValues) => {
			if (searchTimer) {
				clearTimeout(searchTimer);
			}

			if (!oldValues) {
				loadProducts();
				return;
			}

			const [oldSearch, oldCategory, oldPage] = oldValues;

			const searchChanged = search !== oldSearch;

			const categoryChanged = category !== oldCategory;

			const pageChanged = page !== oldPage;

			if (pageChanged) {
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
		currentPage,
		productsStore,
		categoriesStore,
		totalPages,
		changePage,
		loadProducts,
	};
};
