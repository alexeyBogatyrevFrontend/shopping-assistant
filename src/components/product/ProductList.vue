<script setup lang="ts">
import type { Product } from '../../types/product.ts';
import ProductCard from './ProductCard.vue';

defineProps<{
	products: Product[];
}>();
</script>

<template>
	<div class="product-list">
		<ProductCard
			v-for="product in products"
			:key="product.id"
			:product="product"
		/>
	</div>
</template>

<style scoped lang="scss">
.product-list {
	display: grid;
	grid-template-columns: repeat(4, minmax(0, 1fr));
	gap: 20px;

	@media (max-width: 1000px) {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}

	@media (max-width: 800px) {
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 16px;
	}
}
</style>
