<script setup lang="ts">
import type { ProductSortValue } from '../../types/product';

defineProps<{
	modelValue: ProductSortValue;
	disabled?: boolean;
}>();

const emit = defineEmits<{
	'update:modelValue': [value: ProductSortValue];
}>();

const handleChange = (event: Event) => {
	const target = event.target as HTMLSelectElement;

	emit('update:modelValue', target.value as ProductSortValue);
};
</script>

<template>
	<label class="product-sort">
		<span class="product-sort__label"> Сортировка </span>

		<select
			class="product-sort__select"
			:value="modelValue"
			:disabled="disabled"
			@change="handleChange"
		>
			<option value="">По умолчанию</option>

			<option value="price-asc">Сначала дешёвые</option>

			<option value="price-desc">Сначала дорогие</option>

			<option value="rating-desc">По рейтингу</option>

			<option value="title-asc">По названию</option>
		</select>
	</label>
</template>

<style scoped lang="scss">
.product-sort {
	display: flex;
	align-items: center;
	gap: 10px;
	font-size: 14px;
	font-weight: 500;
	color: var(--color-text-secondary);

	&__select {
		min-width: 210px;
		height: 42px;
		padding: 0 38px 0 14px;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background-color: var(--color-surface);
		color: var(--color-text);
		font: inherit;
		cursor: pointer;
		outline: none;
		transition:
			border-color var(--transition-fast),
			box-shadow var(--transition-fast),
			opacity var(--transition-fast);

		&:hover:not(:disabled) {
			border-color: var(--color-border-hover);
		}

		&:focus {
			border-color: var(--color-primary);
			box-shadow: 0 0 0 3px rgb(37 99 235 / 10%);
		}

		&:disabled {
			cursor: not-allowed;
			opacity: 0.6;
		}
	}

	@media (max-width: 600px) {
		width: 100%;
		flex-direction: column;
		align-items: flex-start;
		gap: 6px;

		&__select {
			width: 100%;
			min-width: 0;
		}
	}
}
</style>
