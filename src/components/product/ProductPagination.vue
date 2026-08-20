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
	<nav v-if="totalPages > 1" class="product-pagination">
		<button
			class="product-pagination__button"
			:disabled="currentPage === 1"
			@click="emit('changePage', 1)"
		>
			<BackwardIcon />
		</button>
		<button
			class="product-pagination__button"
			:disabled="currentPage === 1"
			@click="emit('changePage', currentPage - 1)"
		>
			<ArrowLeft />
		</button>
		<span>Page {{ currentPage }} / {{ totalPages }}</span>
		<button
			class="product-pagination__button"
			:disabled="currentPage === totalPages"
			@click="emit('changePage', currentPage + 1)"
		>
			<ArrowRight />
		</button>
		<button
			class="product-pagination__button"
			:disabled="currentPage === totalPages"
			@click="emit('changePage', totalPages)"
		>
			<NextIcon />
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
}
</style>
