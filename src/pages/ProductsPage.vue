<script setup lang="ts">
import { onMounted } from 'vue';
import BaseContainer from '../components/ui/BaseContainer.vue';
import ProductCard from '../components/product/ProductCard.vue';
import { useProductsStore } from '../stores/products';

const productsStore = useProductsStore();

onMounted(() => {
	productsStore.fetchProducts(12, 0);
});
</script>

<template>
	<main class="products-page">
		<BaseContainer>
			<div class="products-page__header">
				<h1 class="products-page__title">Products</h1>

				<span class="products-page__count">
					{{ productsStore.total }} товаров
				</span>
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

			<div v-else class="products-page__grid">
				<ProductCard
					v-for="product in productsStore.products"
					:key="product.id"
					:product="product"
				/>
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
		align-items: baseline;
		gap: 12px;
		margin-bottom: 24px;
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

	&__grid {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 20px;
	}

	&__status {
		padding: 80px 0;
		text-align: center;
		color: var(--color-text-secondary);

		&--error {
			color: var(--color-error);
		}
	}

	@media (max-width: 1000px) {
		&__grid {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}

	@media (max-width: 800px) {
		&__grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 16px;
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

		&__grid {
			grid-template-columns: 1fr;
		}
	}
}
</style>
