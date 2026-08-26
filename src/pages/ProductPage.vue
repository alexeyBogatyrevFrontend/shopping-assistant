<script setup lang="ts">
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';

import BaseButton from '../components/ui/BaseButton.vue';
import { useProductsStore } from '../stores/products';

const route = useRoute();
const productsStore = useProductsStore();

const productId = computed(() => {
	const value = route.params.id;

	if (typeof value !== 'string') {
		return null;
	}

	const id = Number(value);

	if (!Number.isInteger(id) || id < 1) {
		return null;
	}

	return id;
});

const invalidProductId = computed(() => {
	return productId.value === null;
});

const loadProduct = () => {
	if (productId.value === null) {
		productsStore.resetProduct();
		return;
	}

	return productsStore.fetchProduct(productId.value);
};

const productNotFound = computed(() => {
	return productsStore.productError?.status === 404;
});

watch(
	productId,
	() => {
		loadProduct();
	},
	{
		immediate: true,
	},
);
</script>

<template>
	<main class="product-page">
		<div class="product-page__container">
			<div v-if="productsStore.productLoading" class="product-page__status">
				Загрузка товара...
			</div>

			<div
				v-else-if="invalidProductId"
				class="product-page__status product-page__status--error"
			>
				Некорректный идентификатор товара
			</div>

			<div v-else-if="productNotFound" class="product-page__status">
				<p>Товар не найден</p>

				<RouterLink :to="{ name: 'products' }">
					<BaseButton variant="secondary"> Вернуться к товарам </BaseButton>
				</RouterLink>
			</div>

			<div
				v-else-if="productsStore.productError"
				class="product-page__status product-page__status--error"
			>
				<p>
					{{ productsStore.productError.message }}
				</p>

				<BaseButton variant="secondary" @click="loadProduct">
					Повторить
				</BaseButton>
			</div>

			<article v-else-if="productsStore.product" class="product">
				<div class="product__image-wrapper">
					<img
						class="product__image"
						:src="productsStore.product.images[0]"
						:alt="productsStore.product.title"
					/>
				</div>

				<div class="product__content">
					<span class="product__category">
						{{ productsStore.product.category }}
					</span>

					<h1 class="product__title">
						{{ productsStore.product.title }}
					</h1>

					<div class="product__rating">
						★ {{ productsStore.product.rating }}
					</div>

					<p class="product__description">
						{{ productsStore.product.description }}
					</p>

					<div class="product__price">${{ productsStore.product.price }}</div>

					<div class="product__stock">
						{{ productsStore.product.availabilityStatus }}
					</div>
				</div>
			</article>
		</div>
	</main>
</template>

<style scoped lang="scss">
.product-page {
	min-height: 100vh;
	padding: 32px 16px;
	background: var(--color-background);

	&__container {
		width: 100%;
		max-width: var(--container-width);
		margin: 0 auto;
	}

	&__status {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;
		padding: 80px 0;
		text-align: center;
		font-size: 18px;
		color: var(--color-text-secondary);
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		&--error {
			color: var(--color-error);
		}
	}
}

.product {
	display: grid;
	grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
	gap: 48px;
	padding: 32px;
	background: var(--color-surface);
	border: 1px solid var(--color-border);
	border-radius: var(--radius-lg);
	box-shadow: var(--shadow-sm);

	&__image-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 450px;
		padding: 32px;
		background: var(--color-background);
		border-radius: var(--radius-md);
	}

	&__image {
		width: 100%;
		height: 100%;
		max-height: 450px;
		object-fit: contain;
	}

	&__content {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding: 16px 0;
	}

	&__category {
		margin-bottom: 12px;
		font-size: 14px;
		font-weight: 500;
		color: var(--color-primary);
		text-transform: capitalize;
	}

	&__title {
		margin-bottom: 12px;
		font-size: 36px;
		line-height: 1.2;
	}

	&__rating {
		margin-bottom: 24px;
		color: var(--color-warning);
		font-weight: 600;
	}

	&__description {
		margin-bottom: 32px;
		font-size: 16px;
		line-height: 1.7;
		color: var(--color-text-secondary);
	}

	&__price {
		margin-bottom: 12px;
		font-size: 32px;
		font-weight: 700;
	}

	&__stock {
		padding: 6px 10px;
		border-radius: var(--radius-sm);
		background: rgb(22 163 74 / 10%);
		color: var(--color-success);
		font-size: 14px;
		font-weight: 600;
	}

	@media (max-width: 800px) {
		grid-template-columns: 1fr;
		gap: 24px;
		padding: 20px;

		&__image-wrapper {
			min-height: 300px;
		}

		&__title {
			font-size: 28px;
		}
	}

	@media (max-width: 500px) {
		padding: 12px;

		&__image-wrapper {
			min-height: 250px;
			padding: 16px;
		}

		&__title {
			font-size: 24px;
		}

		&__description {
			margin-bottom: 24px;
		}

		&__price {
			font-size: 28px;
		}
	}
}
</style>
