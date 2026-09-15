<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { A11y, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { getRequestError, type RequestError } from '../../api/error';
import { getProducts } from '../../api/products.api';
import type { Product } from '../../types/product';
import ProductCard from '../product/ProductCard.vue';
import BaseButton from '../ui/BaseButton.vue';
import BaseContainer from '../ui/BaseContainer.vue';

const products = ref<Product[]>([]);
const loading = ref(false);
const error = ref<RequestError | null>(null);

const swiperModules = [Navigation, Pagination, A11y];

const loadFeaturedProducts = async () => {
	loading.value = true;
	error.value = null;

	try {
		const data = await getProducts({
			limit: 8,
			skip: 0,
			sortBy: 'rating',
			order: 'desc',
		});

		products.value = data.products;
	} catch (err) {
		error.value = getRequestError(err);
	} finally {
		loading.value = false;
	}
};

onMounted(() => {
	loadFeaturedProducts();
});
</script>

<template>
	<section class="featured-products">
		<BaseContainer>
			<div class="featured-products__heading">
				<div>
					<span class="featured-products__eyebrow">Подборка</span>

					<h2 class="featured-products__title">Товары с высоким рейтингом</h2>
				</div>

				<RouterLink
					class="featured-products__catalog-link"
					:to="{ name: 'products' }"
				>
					Смотреть все
				</RouterLink>
			</div>

			<p v-if="loading" class="featured-products__status">
				Загрузка подборки...
			</p>

			<div
				v-else-if="error"
				class="featured-products__status featured-products__status--error"
			>
				<p>{{ error.message }}</p>

				<BaseButton variant="secondary" @click="loadFeaturedProducts">
					Повторить
				</BaseButton>
			</div>

			<p v-else-if="products.length === 0" class="featured-products__status">
				В подборке пока нет товаров
			</p>

			<Swiper
				v-else
				class="featured-products__swiper"
				:modules="swiperModules"
				:slides-per-view="1"
				:space-between="16"
				:navigation="true"
				:pagination="{
					clickable: true,
				}"
				:breakpoints="{
					600: {
						slidesPerView: 2,
					},
					900: {
						slidesPerView: 3,
					},
					1150: {
						slidesPerView: 4,
					},
				}"
			>
				<SwiperSlide v-for="product in products" :key="product.id">
					<ProductCard :product="product" />
				</SwiperSlide>
			</Swiper>
		</BaseContainer>
	</section>
</template>

<style scoped lang="scss">
.featured-products {
	padding: 72px 0;
	background: var(--color-background);

	&__heading {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 24px;
		margin-bottom: 32px;
	}

	&__eyebrow {
		display: block;
		margin-bottom: 10px;
		color: var(--color-primary);
		font-size: 13px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	&__title {
		font-size: 36px;
		line-height: 1.2;
		letter-spacing: -0.03em;
	}

	&__catalog-link {
		flex-shrink: 0;
		color: var(--color-primary);
		font-size: 14px;
		font-weight: 600;

		&:hover {
			text-decoration: underline;
		}
	}

	&__status {
		display: flex;
		min-height: 320px;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 16px;
		color: var(--color-text-secondary);
		text-align: center;

		&--error {
			color: var(--color-error);
		}
	}

	&__swiper {
		padding: 4px 4px 48px;
	}

	:deep(.swiper-slide) {
		height: auto;
	}

	:deep(.swiper-button-prev),
	:deep(.swiper-button-next) {
		width: 42px;
		height: 42px;
		border: 1px solid var(--color-border);
		border-radius: 50%;
		background: rgb(255 255 255 / 94%);
		box-shadow: var(--shadow-sm);
		color: var(--color-primary);

		&::after {
			font-size: 16px;
			font-weight: 700;
		}

		svg {
			width: 50%;
			height: 50%;
		}
	}

	:deep(.swiper-pagination-bullet-active) {
		background: var(--color-primary);
	}

	@media (max-width: 600px) {
		padding: 48px 0;

		&__heading {
			align-items: flex-start;
		}

		&__title {
			font-size: 28px;
		}

		:deep(.swiper-button-prev),
		:deep(.swiper-button-next) {
			display: none;
		}
	}

	@media (max-width: 450px) {
		&__heading {
			flex-direction: column;
			gap: 12px;
		}
	}
}
</style>
