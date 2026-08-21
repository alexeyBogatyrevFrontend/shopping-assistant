import { useRoute, useRouter } from 'vue-router';
import { useProductsStore } from '../stores/products';
import { computed, onMounted, ref, watch } from 'vue';
import { useDebounceFn } from '@vueuse/core';

export const useProductsQuery = () => {
	const PRODUCTS_PER_PAGE = 12;

	const route = useRoute();
	const router = useRouter();

	const productsStore = useProductsStore();

	const searchQuery = ref(
		typeof route.query.search === 'string' ? route.query.search : '',
	);
	const currentPage = ref(
		typeof route.query.page === 'string' ? Number(route.query.page) : 1,
	);

	const loadProducts = (query = searchQuery.value) => {
		productsStore.search(
			query,
			PRODUCTS_PER_PAGE,
			(currentPage.value - 1) * PRODUCTS_PER_PAGE,
		);
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

	return {
		searchQuery,
		currentPage,
		productsStore,
		changePage,
		totalPages,
	};
};
