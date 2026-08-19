<script setup lang="ts">
import type { Product } from '../../types/product';

defineProps<{
	product: Product;
}>();
</script>

<template>
	<RouterLink
		class="product-card-link"
		:to="{ name: 'product', params: { id: product.id } }"
	>
		<article class="product-card">
			<div class="product-card__image-wrapper">
				<img
					class="product-card__image"
					:src="product.thumbnail"
					:alt="product.title"
				/>
			</div>

			<div class="product-card__content">
				<h3 class="product-card__title">
					{{ product.title }}
				</h3>

				<div class="product-card__rating">
					<span>★</span>
					{{ product.rating }}
				</div>

				<span class="product-card__price"> ${{ product.price }} </span>
			</div>
		</article>
	</RouterLink>
</template>

<style scoped lang="scss">
.product-card-link {
	display: block;
	color: inherit;
	text-decoration: none;
}
.product-card {
	display: flex;
	flex-direction: column;
	overflow: hidden;
	background: #fff;
	border: 1px solid #e5e7eb;
	border-radius: 12px;
	transition:
		transform 0.2s ease,
		box-shadow 0.2s ease;

	&:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 24px rgb(0 0 0 / 8%);
	}

	&__image-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 220px;
		padding: 20px;
		background: #f8fafc;
	}

	&__image {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	&__content {
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: 16px;
	}

	&__title {
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
		color: #64748b;
	}

	&__price {
		font-size: 20px;
		font-weight: 700;
		color: #111827;
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
