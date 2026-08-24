import { useRoute, useRouter } from 'vue-router';
import { useProductsStore } from '../stores/products';
import { computed, onMounted, ref, watch } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import { useCategoriesStore } from '../stores/categories';

export const useProductsQuery = () => {
	const PRODUCTS_PER_PAGE = 12;

	const route = useRoute();
	const router = useRouter();

	const productsStore = useProductsStore();
	const categoriesStore = useCategoriesStore();

	const searchQuery = ref(
		typeof route.query.search === 'string' ? route.query.search : '',
	);
	const currentPage = ref(
		typeof route.query.page === 'string' ? Number(route.query.page) : 1,
	);
	const selectedCategory = ref(
		typeof route.query.category === 'string' ? route.query.category : '',
	);

	const loadProducts = (query = searchQuery.value) => {
		const skip = (currentPage.value - 1) * PRODUCTS_PER_PAGE;

		if (selectedCategory.value) {
			productsStore.fetchProductsByCategory(
				selectedCategory.value,
				PRODUCTS_PER_PAGE,
				skip,
			);

			return;
		}

		productsStore.search(query, PRODUCTS_PER_PAGE, skip);
	};

	const changePage = (page: number) => {
		currentPage.value = page;

		router.replace({
			query: {
				...route.query,
				page: page === 1 ? undefined : String(page),
			},
		});

		loadProducts();
	};

	const debouncedSearch = useDebounceFn((query: string) => {
		loadProducts(query);
	}, 500);

	const totalPages = computed(() => {
		return Math.ceil(productsStore.total / PRODUCTS_PER_PAGE);
	});

	onMounted(() => {
		loadProducts();
		categoriesStore.fetchCategories();
	});

	watch(searchQuery, value => {
		const query = value.trim();
		currentPage.value = 1;

		router.replace({
			query: {
				...route.query,
				page: undefined,
				search: query || undefined,
			},
		});

		debouncedSearch(query);
	});

	watch(selectedCategory, value => {
		currentPage.value = 1;

		router.replace({
			query: {
				...route.query,
				page: undefined,
				category: value || undefined,
			},
		});

		loadProducts();
	});

	return {
		searchQuery,
		selectedCategory,
		currentPage,
		productsStore,
		categoriesStore,
		totalPages,
		changePage,
	};
};
