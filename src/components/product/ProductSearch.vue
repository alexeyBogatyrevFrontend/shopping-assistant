<script setup lang="ts">
defineProps<{
	modelValue: string;
}>();

const emit = defineEmits<{
	'update:modelValue': [value: string];
}>();
</script>

<template>
	<div class="product-search">
		<input
			class="product-search__input"
			type="search"
			:value="modelValue"
			placeholder="Поиск товаров..."
			@input="
				emit('update:modelValue', ($event.target as HTMLInputElement).value)
			"
		/>
	</div>
</template>

<style scoped lang="scss">
.product-search {
	width: 100%;

	&__input {
		width: 100%;
		height: 46px;
		padding: 0 16px;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background: var(--color-surface);
		font: inherit;
		color: var(--color-text);
		outline: none;
		transition:
			border-color var(--transition-fast),
			box-shadow var(--transition-fast);

		&::placeholder {
			color: var(--color-text-muted);
		}

		&:focus {
			border-color: var(--color-primary);
			box-shadow: 0 0 0 3px rgb(37 99 235 / 10%);
		}
	}
}
</style>
