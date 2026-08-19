<script setup lang="ts">
import { onMounted } from 'vue';
import ProductCard from '../components/product/ProductCard.vue';
import { useProductsStore } from '../stores/products';

const productsStore = useProductsStore();

onMounted(() => {
	productsStore.fetchProducts(12, 0);
});
</script>

<template>
	<main class="products-page">
		<div class="products-page__container">
			<h1 class="products-page__title">Products</h1>

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
		</div>
	</main>
</template>

<style scoped lang="scss">
.products-page {
	min-height: 100vh;
	padding: 32px 16px;
	background: var(--color-background);

	&__container {
		width: 100%;
		max-width: var(--container-width);
		margin: 0 auto;
	}

	&__title {
		margin-bottom: 24px;
		font-size: 32px;
		font-weight: 700;
		line-height: 1.2;
		color: var(--color-text);
	}

	&__grid {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 20px;
	}

	&__status {
		margin: 40px 0;
		text-align: center;
		font-size: 18px;
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
		padding: 20px 12px;

		&__title {
			margin-bottom: 16px;
			font-size: 24px;
		}

		&__grid {
			grid-template-columns: 1fr;
		}
	}
}
</style>
