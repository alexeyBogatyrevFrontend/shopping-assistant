<script setup lang="ts">
import BaseContainer from '../components/ui/BaseContainer.vue';

import ProductList from '../components/product/ProductList.vue';
import ProductPagination from '../components/product/ProductPagination.vue';
import ProductsToolbar from '../components/product/ProductsToolbar.vue';
import { useProductsQuery } from '../composables/useProductsQuery.ts';

const { searchQuery, currentPage, productsStore, totalPages, changePage } =
	useProductsQuery();
</script>

<template>
	<div class="products-page">
		<BaseContainer>
			<div class="products-page__content">
				<ProductsToolbar v-model="searchQuery" :total="productsStore.total" />

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
