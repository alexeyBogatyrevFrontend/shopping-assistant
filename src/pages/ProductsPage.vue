<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import BaseContainer from '../components/ui/BaseContainer.vue';
import { useProductsStore } from '../stores/products';
import ProductSearch from '../components/product/ProductSearch.vue';

import { useRoute, useRouter } from 'vue-router';
import { useDebounceFn } from '@vueuse/core';
import ProductList from '../components/product/ProductList.vue';
import ProductPagination from '../components/product/ProductPagination.vue';

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
			page: 1,
			search: query || undefined,
		},
	});

	debouncedSearch(query);
});
</script>

<template>
	<div class="products-page">
		<BaseContainer>
			<div class="products-page__content">
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

				<ProductPagination
					:current-page="currentPage"
					:total-pages="totalPages"
					@change-page="changePage"
				/>
			</div>
		</BaseContainer>
	</div>
</template>

<style scoped lang="scss">
.products-page {
	display: flex;
	flex: 1;
	padding: 32px 0 48px;
	&__content {
		display: flex;
		flex-direction: column;
		height: 100%;
	}
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
