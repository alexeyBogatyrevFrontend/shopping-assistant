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
	<div class="products-toolbar">
		<div class="products-toolbar__info">
			<h1 class="products-toolbar__title">Products</h1>

			<span class="products-toolbar__count"> {{ total }} товаров </span>
		</div>

		<div class="products-toolbar__search">
			<ProductSearch
				:model-value="modelValue"
				@update:model-value="emit('update:modelValue', $event)"
			/>
		</div>
	</div>
</template>

<style scoped lang="scss">
.products-toolbar {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 24px;
	margin-bottom: 24px;

	&__info {
		flex-shrink: 0;
	}

	&__title {
		font-size: 32px;
		font-weight: 700;
		line-height: 1.2;
	}

	&__count {
		display: block;
		margin-top: 4px;
		font-size: 14px;
		color: var(--color-text-secondary);
	}

	&__search {
		width: 100%;
		max-width: 420px;
	}

	@media (max-width: 600px) {
		flex-direction: column;
		align-items: stretch;
		gap: 16px;
		margin-bottom: 20px;

		&__title {
			font-size: 24px;
		}

		&__search {
			max-width: none;
		}
	}
}
</style>
