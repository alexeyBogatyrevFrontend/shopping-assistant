<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import BaseContainer from '../components/ui/BaseContainer.vue';
import { useProductsStore } from '../stores/products';
import ProductSearch from '../components/product/ProductSearch.vue';

import { useRoute, useRouter } from 'vue-router';
import { useDebounceFn } from '@vueuse/core';
import ProductList from '../components/product/ProductList.vue';

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

	router.replace({
		query: {
			...route.query,
			search: query || undefined,
		},
	});

	debouncedSearch(query);
});
</script>

<template>
	<main class="products-page">
		<BaseContainer>
			<div class="products-page__header">
				<div>
					<h1 class="products-page__title">Products</h1>

					<span class="products-page__count">
						{{ productsStore.total }} товаров
					</span>
				</div>

				<div class="products-page__toolbar">
					<ProductSearch v-model="searchQuery" />
				</div>
			</div>

			<p v-if="productsStore.loading" class="products-page__status">
				Loading...
			</p>

			<p
				v-else-if="productsStore.error"
				class="products-page__status products-page__status--error"
			>
				Error: {{ productsStore.error }}
			</p>

			<ProductList v-else :products="productsStore.products" />

			<div class="products-page__pagination-test">
				<button
					:disabled="currentPage === 1"
					@click="changePage(currentPage - 1)"
				>
					Previous
				</button>

				<span> Page {{ currentPage }} / {{ totalPages }} </span>

				<button
					:disabled="currentPage === totalPages"
					@click="changePage(currentPage + 1)"
				>
					Next
				</button>
			</div>
		</BaseContainer>
	</main>
</template>

<style scoped lang="scss">
.products-page {
	min-height: 100%;
	padding: 32px 0 48px;

	&__header {
		display: flex;
		gap: 12px;
		margin-bottom: 24px;
		justify-content: space-between;
		align-items: center;
	}

	&__title {
		font-size: 32px;
		font-weight: 700;
		line-height: 1.2;
	}

	&__count {
		font-size: 14px;
		color: var(--color-text-secondary);
	}

	&__status {
		padding: 80px 0;
		text-align: center;
		color: var(--color-text-secondary);

		&--error {
			color: var(--color-error);
		}
	}

	@media (max-width: 500px) {
		padding: 20px 0 32px;

		&__header {
			margin-bottom: 16px;
		}

		&__title {
			font-size: 24px;
		}
	}
}
</style>
