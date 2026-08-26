<script setup lang="ts">
import ArrowLeft from '../../assets/icons/ArrowLeft.vue';
import ArrowRight from '../../assets/icons/ArrowRight.vue';
import BackwardIcon from '../../assets/icons/BackwardIcon.vue';
import NextIcon from '../../assets/icons/NextIcon.vue';

defineProps<{
	currentPage: number;
	totalPages: number;
}>();

const emit = defineEmits<{
	changePage: [page: number];
}>();
</script>

<template>
	<nav
		v-if="totalPages > 1"
		class="product-pagination"
		aria-label="Пагинация товаров"
	>
		<button
			type="button"
			class="product-pagination__button"
			:disabled="currentPage <= 1"
			aria-label="Перейти на первую страницу"
			@click="emit('changePage', 1)"
		>
			<BackwardIcon aria-hidden="true" />
		</button>

		<button
			type="button"
			class="product-pagination__button"
			:disabled="currentPage <= 1"
			aria-label="Перейти на предыдущую страницу"
			@click="emit('changePage', currentPage - 1)"
		>
			<ArrowLeft aria-hidden="true" />
		</button>

		<span class="product-pagination__info" aria-live="polite">
			Страница {{ currentPage }} из
			{{ totalPages }}
		</span>

		<button
			type="button"
			class="product-pagination__button"
			:disabled="currentPage >= totalPages"
			aria-label="Перейти на следующую страницу"
			@click="emit('changePage', currentPage + 1)"
		>
			<ArrowRight aria-hidden="true" />
		</button>

		<button
			type="button"
			class="product-pagination__button"
			:disabled="currentPage >= totalPages"
			aria-label="Перейти на последнюю страницу"
			@click="emit('changePage', totalPages)"
		>
			<NextIcon aria-hidden="true" />
		</button>
	</nav>
</template>

<style scoped lang="scss">
.product-pagination {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 16px;
	margin-top: auto;
	padding-top: 32px;

	&__button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 50px;
		height: 40px;
		padding: 0 16px;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background: var(--color-surface);
		color: var(--color-text);
		font: inherit;
		cursor: pointer;
		transition:
			background var(--transition-fast),
			border-color var(--transition-fast);

		&:hover:not(:disabled) {
			border-color: var(--color-primary);
		}

		&:disabled {
			cursor: not-allowed;
			opacity: 0.5;
		}

		svg {
			width: 100%;
			height: 100%;
			stroke: var(--color-primary);
		}
	}

	&__info {
		font-size: 14px;
		color: var(--color-text-secondary);
	}

	@media (max-width: 600px) {
		flex-wrap: wrap;
		gap: 10px;

		&__button {
			width: 42px;
			height: 38px;
			padding: 0 12px;
		}

		&__info {
			order: -1;
			width: 100%;
			text-align: center;
		}
	}
}
</style>
