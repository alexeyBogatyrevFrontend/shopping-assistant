<script setup lang="ts">
import BaseContainer from '../components/ui/BaseContainer.vue';

import ProductList from '../components/product/ProductList.vue';
import ProductPagination from '../components/product/ProductPagination.vue';
import ProductsToolbar from '../components/product/ProductsToolbar.vue';
import { useProductsQuery } from '../composables/useProductsQuery.ts';
import ProductCategoryFilter from '../components/product/ProductCategoryFilter.vue';
import { computed } from 'vue';

const {
	searchQuery,
	selectedCategory,
	currentPage,
	productsStore,
	categoriesStore,
	totalPages,
	changePage,
	loadProducts,
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

				<ProductCategoryFilter
					v-model="selectedCategory"
					:categories="categoriesStore.categories"
					:disabled="categoriesStore.loading || Boolean(categoriesStore.error)"
				/>

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
					<span> Не удалось загрузить категории </span>

					<button
						type="button"
						class="products-page__retry"
						@click="categoriesStore.fetchCategories()"
					>
						Повторить
					</button>
				</div>

				<p v-if="productsStore.loading" class="products-page__status">
					Загрузка товаров...
				</p>

				<div
					v-else-if="productsStore.error"
					class="products-page__status products-page__status--error"
				>
					<p>Не удалось загрузить товары</p>

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
						!productsStore.loading &&
						!productsStore.error &&
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

		&__header {
			margin-bottom: 16px;
		}

		&__title {
			font-size: 24px;
		}
	}
}
</style>
