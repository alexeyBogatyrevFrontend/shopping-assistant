<script setup lang="ts">
import { computed } from 'vue';

import CompareButton from '../compare/CompareButton.vue';
import FavoriteButton from '../favorite/FavoriteButton.vue';
import { useCompareStore } from '../../stores/compare';
import { useFavoritesStore } from '../../stores/favorites';
import type { Product } from '../../types/product';

const props = defineProps<{
	product: Product;
}>();

const favoritesStore = useFavoritesStore();
const compareStore = useCompareStore();

const productIsFavorite = computed(() => {
	return favoritesStore.isFavorite(props.product.id);
});

const productIsInCompare = computed(() => {
	return compareStore.isInCompare(props.product.id);
});

const compareButtonIsDisabled = computed(() => {
	return compareStore.compareIsFull && !productIsInCompare.value;
});

const toggleFavorite = () => {
	favoritesStore.toggleFavorite(props.product);
};

const toggleCompare = () => {
	compareStore.toggleCompare(props.product);
};
</script>

<template>
	<article class="product-card">
		<RouterLink
			class="product-card__link"
			:to="{
				name: 'product',
				params: {
					id: product.id,
				},
			}"
			:aria-label="`Открыть товар ${product.title}`"
		>
			<div class="product-card__image-wrapper">
				<img
					class="product-card__image"
					:src="product.thumbnail"
					:alt="product.title"
					loading="lazy"
				/>
			</div>

			<div class="product-card__content">
				<h3 class="product-card__title">
					{{ product.title }}
				</h3>

				<div class="product-card__rating">
					<span aria-hidden="true"> ★ </span>

					{{ product.rating }}
				</div>

				<span class="product-card__price"> ${{ product.price }} </span>
			</div>
		</RouterLink>

		<FavoriteButton
			class="product-card__favorite"
			:is-favorite="productIsFavorite"
			compact
			@toggle="toggleFavorite"
		/>

		<CompareButton
			class="product-card__compare"
			:is-in-compare="productIsInCompare"
			:disabled="compareButtonIsDisabled"
			compact
			@toggle="toggleCompare"
		/>
	</article>
</template>

<style scoped lang="scss">
.product-card {
	position: relative;

	display: flex;
	flex-direction: column;
	height: 100%;
	overflow: hidden;
	border: 1px solid var(--color-border);
	border-radius: var(--radius-lg);
	background: var(--color-surface);
	transition:
		transform var(--transition-normal),
		box-shadow var(--transition-normal);

	&:hover {
		transform: translateY(-2px);
		box-shadow: var(--shadow-md);
	}

	&__link {
		display: flex;
		flex: 1;
		flex-direction: column;
		height: 100%;
		color: inherit;
		text-decoration: none;

		&:focus-visible {
			outline: 3px solid rgb(37 99 235 / 20%);
			outline-offset: -3px;
		}
	}

	&__favorite {
		position: absolute;
		top: 12px;
		right: 12px;
		z-index: 1;
	}

	&__compare {
		position: absolute;
		top: 60px;
		right: 12px;
		z-index: 1;
	}

	&__image-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 220px;
		padding: 20px;
		background: var(--color-background);
	}

	&__image {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	&__content {
		display: flex;
		flex: 1;
		flex-direction: column;
		gap: 8px;
		padding: 16px;
	}

	&__title {
		display: -webkit-box;
		overflow: hidden;
		margin: 0;
		font-size: 16px;
		font-weight: 600;
		line-height: 1.4;
	}

	&__rating {
		display: flex;
		align-items: center;
		gap: 4px;
		font-size: 14px;
		color: var(--color-text-secondary);
	}

	&__price {
		margin-top: auto;
		font-size: 20px;
		font-weight: 700;
		color: var(--color-text);
	}

	@media (max-width: 600px) {
		&__image-wrapper {
			height: 180px;
			padding: 16px;
		}

		&__content {
			padding: 12px;
		}

		&__title {
			font-size: 14px;
		}

		&__price {
			font-size: 18px;
		}
	}
}
</style>
