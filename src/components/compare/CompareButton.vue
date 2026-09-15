<script setup lang="ts">
withDefaults(
	defineProps<{
		isInCompare: boolean;
		disabled?: boolean;
		compact?: boolean;
	}>(),
	{
		disabled: false,
		compact: false,
	},
);

const emit = defineEmits<{
	toggle: [];
}>();
</script>

<template>
	<button
		type="button"
		class="compare-button"
		:class="{
			'compare-button--active': isInCompare,
			'compare-button--compact': compact,
		}"
		:disabled="disabled"
		:aria-pressed="isInCompare"
		:aria-label="isInCompare ? 'Удалить из сравнения' : 'Добавить к сравнению'"
		:title="disabled ? 'Можно сравнить не больше четырёх товаров' : undefined"
		@click="emit('toggle')"
	>
		<span class="compare-button__icon" aria-hidden="true">⇄</span>

		<span v-if="!compact" class="compare-button__text">
			{{ isInCompare ? 'В сравнении' : 'Добавить к сравнению' }}
		</span>
	</button>
</template>

<style scoped lang="scss">
.compare-button {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
	min-height: 42px;
	padding: 0 16px;
	border: 1px solid var(--color-border);
	border-radius: var(--radius-md);
	background: var(--color-surface);
	color: var(--color-text-secondary);
	font: inherit;
	font-size: 14px;
	font-weight: 600;
	cursor: pointer;
	transition:
		border-color var(--transition-fast),
		background-color var(--transition-fast),
		color var(--transition-fast),
		opacity var(--transition-fast);

	&:hover:not(:disabled) {
		border-color: var(--color-primary);
		color: var(--color-primary);
	}

	&:focus-visible {
		outline: 3px solid rgb(37 99 235 / 20%);
		outline-offset: 2px;
	}

	&:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}

	&--compact {
		width: 40px;
		height: 40px;
		min-height: 40px;
		padding: 0;
		border-radius: 50%;
		background: rgb(255 255 255 / 92%);
		box-shadow: var(--shadow-sm);
		backdrop-filter: blur(6px);
	}

	&--active {
		border-color: var(--color-primary);
		background: rgb(37 99 235 / 10%);
		color: var(--color-primary);
	}

	&__icon {
		font-size: 20px;
		line-height: 1;
	}
}
</style>
