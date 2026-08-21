<script setup lang="ts">
import ProductSearch from './ProductSearch.vue';

defineProps<{
	total: number;
	modelValue: string;
}>();

const emit = defineEmits<{
	'update:modelValue': [value: string];
}>();
</script>

<template>
	<div class="products-page__header">
		<div>
			<h1 class="products-page__title">Products</h1>

			<span class="products-page__count"> {{ total }} товаров </span>
		</div>

		<div class="products-page__toolbar">
			<ProductSearch
				:model-value="modelValue"
				@update:model-value="emit('update:modelValue', $event)"
			/>
		</div>
	</div>
</template>

<style scoped lang="scss">
.products-page {
	&__header {
		display: flex;
		gap: 12px;
		margin-bottom: 24px;
		justify-content: space-between;
		align-items: center;
	}
}
</style>
