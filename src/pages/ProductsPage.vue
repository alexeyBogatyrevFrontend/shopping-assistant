<script setup lang="ts">
import { onMounted } from 'vue';
import { useProductsStore } from '../stores/products';

const productsStore = useProductsStore();

onMounted(() => {
	productsStore.fetchProducts(12, 0);
});
</script>

<template>
	<p v-if="productsStore.loading">Loading...</p>

	<p v-else-if="productsStore.error">Error: {{ productsStore.error }}</p>

	<div v-else style="display: flex; gap: 10px; flex-wrap: wrap">
		<div
			v-for="product in productsStore.products"
			:key="product.id"
			style="margin: 0 0 15px 0; border: 1px solid black"
		>
			<img :src="product.thumbnail" alt="picture" />
			<h3>{{ product.title }}</h3>
			<span>{{ product.price }}$</span>
			<p>rating - {{ product.rating }}</p>
		</div>
	</div>
</template>

<style scoped></style>
