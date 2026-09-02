<script setup lang="ts">
import BaseContainer from '../components/ui/BaseContainer.vue';

import ProductList from '../components/product/ProductList.vue';
import ProductPagination from '../components/product/ProductPagination.vue';
import ProductsToolbar from '../components/product/ProductsToolbar.vue';
import { useProductsQuery } from '../composables/useProductsQuery.ts';
import ProductCategoryFilter from '../components/product/ProductCategoryFilter.vue';
import { computed } from 'vue';
import ProductSort from '../components/product/ProductSort.vue';

const {
	searchQuery,
	selectedCategory,
	currentPage,
	productsStore,
	categoriesStore,
	totalPages,
	changePage,
	loadProducts,
	selectedSort,
} = useProductsQuery();

const emptyMessage = computed(() => {
	if (searchQuery.value) {
		return `По запросу «${searchQuery.value}» ничего не найдено`;
	}

	if (selectedCategory.value) {
		return 'В этой категории пока нет товаров';
	}

	return 'Товары не найдены';
});
</script>

<template>
	<div class="products-page">
		<BaseContainer>
			<div class="products-page__content">
				<ProductsToolbar v-model="searchQuery" :total="productsStore.total" />

				<div class="products-page__controls">
					<ProductCategoryFilter
						v-model="selectedCategory"
						:categories="categoriesStore.categories"
						:disabled="
							categoriesStore.loading || Boolean(categoriesStore.error)
						"
					/>

					<ProductSort
						v-model="selectedSort"
						:disabled="productsStore.productsLoading"
					/>
				</div>

				<p
					v-if="categoriesStore.loading"
					class="products-page__category-status"
				>
					Загрузка категорий...
				</p>

				<div
					v-else-if="categoriesStore.error"
					class="products-page__category-status products-page__category-status--error"
				>
					<span> {{ categoriesStore.error.message }} </span>

					<button
						type="button"
						class="products-page__retry"
						@click="categoriesStore.fetchCategories()"
					>
						Повторить
					</button>
				</div>

				<p v-if="productsStore.productsLoading" class="products-page__status">
					Загрузка товаров...
				</p>

				<div
					v-else-if="productsStore.productsError"
					class="products-page__status products-page__status--error"
				>
					<p>
						{{ productsStore.productsError.message }}
					</p>

					<button
						type="button"
						class="products-page__retry"
						@click="loadProducts"
					>
						Повторить
					</button>
				</div>

				<p
					v-else-if="productsStore.products.length === 0"
					class="products-page__status"
				>
					{{ emptyMessage }}
				</p>

				<ProductList v-else :products="productsStore.products" />

				<ProductPagination
					v-if="
						!productsStore.productsLoading &&
						!productsStore.productsError &&
						productsStore.products.length > 0
					"
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

	&__controls {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		margin-bottom: 24px;
	}

	@media (max-width: 600px) {
		&__controls {
			flex-direction: column;
			align-items: stretch;
		}
	}

	&__content {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	&__status {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 12px;
		padding: 80px 0;
		text-align: center;
		color: var(--color-text-secondary);

		&--error {
			color: var(--color-error);
		}
	}

	&__category-status {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-top: -12px;
		margin-bottom: 24px;
		font-size: 13px;
		color: var(--color-text-muted);

		&--error {
			color: var(--color-error);
		}
	}

	&__retry {
		padding: 6px 10px;
		border: 1px solid currentColor;
		border-radius: var(--radius-sm);
		background: transparent;
		color: inherit;
		font: inherit;
		font-size: 13px;
		cursor: pointer;
		transition: opacity var(--transition-fast);

		&:hover {
			opacity: 0.7;
		}
	}

	@media (max-width: 500px) {
		padding: 20px 0 32px;
	}
}
</style>
