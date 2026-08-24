<script setup lang="ts">
import type { Category } from '../../types/category';

defineProps<{
	categories: Category[];
	modelValue: string;
}>();

const emit = defineEmits<{
	'update:modelValue': [value: string];
}>();
</script>

<template>
	<div class="product-category-filter">
		<label class="product-category-filter__label">
			Category

			<select
				class="product-category-filter__select"
				:value="modelValue"
				@change="
					emit('update:modelValue', ($event.target as HTMLSelectElement).value)
				"
			>
				<option value="">All Categories</option>

				<option
					v-for="category in categories"
					:key="category.slug"
					:value="category.slug"
				>
					{{ category.name }}
				</option>
			</select>
		</label>
	</div>
</template>

<style scoped lang="scss">
.product-category-filter {
	display: flex;
	align-items: center;
	margin-bottom: 24px;

	&__label {
		display: flex;
		align-items: center;
		gap: 10px;
		font-size: 14px;
		font-weight: 500;
		color: var(--color-text-secondary);
	}

	&__select {
		min-width: 220px;
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
			box-shadow var(--transition-fast);

		&:hover {
			border-color: var(--color-border-hover);
		}

		&:focus {
			border-color: var(--color-primary);
			box-shadow: 0 0 0 3px rgb(37 99 235 / 10%);
		}
	}

	@media (max-width: 600px) {
		width: 100%;

		&__label {
			width: 100%;
			flex-direction: column;
			align-items: flex-start;
			gap: 6px;
		}

		&__select {
			width: 100%;
			min-width: 0;
		}
	}
}
</style>
