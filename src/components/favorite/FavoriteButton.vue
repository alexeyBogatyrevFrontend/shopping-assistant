<script setup lang="ts">
defineProps<{
	isFavorite: boolean;
}>();

const emit = defineEmits<{
	toggle: [];
}>();
</script>

<template>
	<button
		type="button"
		class="favorite-button"
		:class="{
			'favorite-button--active': isFavorite,
		}"
		:aria-pressed="isFavorite"
		:aria-label="isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'"
		@click="emit('toggle')"
	>
		<span class="favorite-button__icon" aria-hidden="true">
			{{ isFavorite ? '♥' : '♡' }}
		</span>

		<span class="favorite-button__text">
			{{ isFavorite ? 'В избранном' : 'Добавить в избранное' }}
		</span>
	</button>
</template>

<style scoped lang="scss">
.favorite-button {
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
		color var(--transition-fast);

	&:hover {
		border-color: var(--color-primary);
		color: var(--color-primary);
	}

	&:focus-visible {
		outline: 3px solid rgb(37 99 235 / 20%);
		outline-offset: 2px;
	}

	&--active {
		border-color: var(--color-error);
		background: rgb(220 38 38 / 8%);
		color: var(--color-error);

		&:hover {
			border-color: var(--color-error);
			color: var(--color-error);
		}
	}

	&__icon {
		font-size: 22px;
		line-height: 1;
	}
}
</style>
