<script setup lang="ts">
import { computed } from 'vue';

import BaseButton from '../components/ui/BaseButton.vue';
import BaseContainer from '../components/ui/BaseContainer.vue';
import { useCompareStore } from '../stores/compare';
import type { Product } from '../types/product.ts';

interface ComparisonFeature {
	key: string;
	label: string;
	getValue: (product: Product) => string;
}

const compareStore = useCompareStore();

const compareSummary = computed(() => {
	const count = compareStore.compareCount;

	const lastDigit = count % 10;
	const lastTwoDigits = count % 100;

	if (lastDigit === 1 && lastTwoDigits !== 11) {
		return `${count} товар`;
	}

	if (
		lastDigit >= 2 &&
		lastDigit <= 4 &&
		(lastTwoDigits < 12 || lastTwoDigits > 14)
	) {
		return `${count} товара`;
	}

	return `${count} товаров`;
});

const priceFormatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
});

const formatPrice = (price: number) => {
	return priceFormatter.format(price);
};

const comparisonFeatures: ComparisonFeature[] = [
	{
		key: 'price',
		label: 'Цена',
		getValue: product => formatPrice(product.price),
	},
	{
		key: 'discount',
		label: 'Скидка',
		getValue: product => `${product.discountPercentage}%`,
	},
	{
		key: 'rating',
		label: 'Рейтинг',
		getValue: product => `${product.rating} из 5`,
	},
	{
		key: 'category',
		label: 'Категория',
		getValue: product => product.category,
	},
	{
		key: 'brand',
		label: 'Бренд',
		getValue: product => product.brand || '—',
	},
	{
		key: 'stock',
		label: 'В наличии',
		getValue: product => `${product.stock} шт.`,
	},
	{
		key: 'availability',
		label: 'Статус',
		getValue: product => product.availabilityStatus || '—',
	},
	{
		key: 'weight',
		label: 'Вес',
		getValue: product => `${product.weight} г`,
	},
	{
		key: 'dimensions',
		label: 'Размеры',
		getValue: product => {
			if (!product.dimensions) {
				return '—';
			}

			const { width, height, depth } = product.dimensions;

			return `${width} × ${height} × ${depth}`;
		},
	},
	{
		key: 'warranty',
		label: 'Гарантия',
		getValue: product => product.warrantyInformation || '—',
	},
	{
		key: 'shipping',
		label: 'Доставка',
		getValue: product => product.shippingInformation || '—',
	},
	{
		key: 'minimum-order',
		label: 'Минимальный заказ',
		getValue: product => `${product.minimumOrderQuantity} шт.`,
	},
	{
		key: 'return-policy',
		label: 'Возврат',
		getValue: product => product.returnPolicy || '—',
	},
];

const featureHasDifferences = (feature: ComparisonFeature) => {
	if (compareStore.compareCount < 2) {
		return false;
	}

	const values = compareStore.compareProducts.map(product => {
		return feature.getValue(product);
	});

	return new Set(values).size > 1;
};
</script>

<template>
	<div class="compare-page">
		<BaseContainer>
			<div class="compare-page__header">
				<div>
					<h1 class="compare-page__title">Сравнение товаров</h1>

					<p class="compare-page__count">
						{{ compareSummary }}
					</p>
				</div>

				<BaseButton
					v-if="compareStore.compareCount > 0"
					variant="danger"
					@click="compareStore.clearCompare()"
				>
					Очистить сравнение
				</BaseButton>
			</div>

			<div v-if="compareStore.compareCount === 0" class="compare-page__empty">
				<div class="compare-page__empty-icon" aria-hidden="true">⇄</div>

				<h2 class="compare-page__empty-title">Список сравнения пока пуст</h2>

				<p class="compare-page__empty-description">
					Добавьте от двух до четырёх товаров, чтобы сравнить их характеристики.
				</p>

				<RouterLink
					class="compare-page__catalog-link"
					:to="{ name: 'products' }"
				>
					Перейти к товарам
				</RouterLink>
			</div>

			<div v-else class="compare-page__content">
				<p v-if="compareStore.compareCount === 1" class="compare-page__hint">
					Добавьте ещё хотя бы один товар, чтобы увидеть различия.
				</p>

				<div class="compare-page__table-wrapper">
					<table
						class="compare-table"
						:style="{
							minWidth: `${180 + compareStore.compareCount * 240}px`,
						}"
					>
						<thead>
							<tr>
								<th class="compare-table__feature-heading" scope="col">
									Характеристика
								</th>

								<th
									v-for="product in compareStore.compareProducts"
									:key="product.id"
									class="compare-table__product-heading"
									scope="col"
								>
									<div class="compare-product">
										<RouterLink
											class="compare-product__link"
											:to="{
												name: 'product',
												params: {
													id: product.id,
												},
											}"
										>
											<div class="compare-product__image-wrapper">
												<img
													class="compare-product__image"
													:src="product.thumbnail"
													:alt="product.title"
												/>
											</div>

											<h2 class="compare-product__title">
												{{ product.title }}
											</h2>
										</RouterLink>

										<BaseButton
											class="compare-product__remove"
											variant="danger"
											size="sm"
											@click="compareStore.removeFromCompare(product.id)"
										>
											Удалить
										</BaseButton>
									</div>
								</th>
							</tr>
						</thead>

						<tbody>
							<tr
								v-for="feature in comparisonFeatures"
								:key="feature.key"
								:class="{
									'compare-table__row--different':
										featureHasDifferences(feature),
								}"
							>
								<th class="compare-table__feature" scope="row">
									{{ feature.label }}
								</th>

								<td
									v-for="product in compareStore.compareProducts"
									:key="`${feature.key}-${product.id}`"
									class="compare-table__value"
								>
									{{ feature.getValue(product) }}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</BaseContainer>
	</div>
</template>

<style scoped lang="scss">
.compare-page {
	width: 100%;
	min-width: 0;
	flex: 1;
	padding: 32px 0 48px;

	&__content {
		width: 100%;
		min-width: 0;
	}

	&__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 24px;
		margin-bottom: 24px;
	}

	&__title {
		font-size: 32px;
		font-weight: 700;
		line-height: 1.2;
	}

	&__count {
		margin-top: 4px;
		font-size: 14px;
		color: var(--color-text-secondary);
	}

	&__empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 420px;
		padding: 48px 24px;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		background: var(--color-surface);
		text-align: center;
	}

	&__empty-icon {
		margin-bottom: 16px;
		font-size: 64px;
		line-height: 1;
		color: var(--color-text-muted);
	}

	&__empty-title {
		margin-bottom: 8px;
		font-size: 22px;
	}

	&__empty-description {
		max-width: 480px;
		margin-bottom: 24px;
		color: var(--color-text-secondary);
	}

	&__catalog-link {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 42px;
		padding: 0 16px;
		border-radius: var(--radius-md);
		background: var(--color-primary);
		color: #fff;
		font-size: 14px;
		font-weight: 600;
		transition: background-color var(--transition-fast);

		&:hover {
			background: var(--color-primary-hover);
		}

		&:focus-visible {
			outline: 3px solid rgb(37 99 235 / 20%);
			outline-offset: 2px;
		}
	}

	&__hint {
		margin-bottom: 16px;
		padding: 12px 16px;
		border: 1px solid rgb(37 99 235 / 15%);
		border-radius: var(--radius-md);
		background: rgb(37 99 235 / 8%);
		color: var(--color-primary);
		font-size: 14px;
	}

	&__table-wrapper {
		display: block;
		width: 100%;
		min-width: 0;
		max-width: 100%;
		overflow-x: auto;
		overflow-y: hidden;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		background: var(--color-surface);
		box-shadow: var(--shadow-sm);
		overscroll-behavior-inline: contain;
		-webkit-overflow-scrolling: touch;
	}

	@media (max-width: 600px) {
		padding: 20px 0 32px;

		&__header {
			align-items: flex-start;
		}

		&__title {
			font-size: 24px;
		}

		&__empty {
			min-height: 360px;
			padding: 40px 20px;
		}
	}

	@media (max-width: 450px) {
		&__header {
			flex-direction: column;
			align-items: stretch;
		}
	}
}

.compare-table {
	width: 100%;
	border-spacing: 0;
	border-collapse: separate;
	table-layout: fixed;
	th,
	td {
		padding: 16px;
		border-right: 1px solid var(--color-border);
		border-bottom: 1px solid var(--color-border);
		text-align: left;
		vertical-align: top;

		&:last-child {
			border-right: 0;
		}
	}

	thead {
		background: var(--color-surface);
	}

	tbody {
		tr:nth-child(even) {
			background: var(--color-background);
		}

		tr:last-child {
			th,
			td {
				border-bottom: 0;
			}
		}
	}

	&__feature-heading {
		width: 180px;
		background: var(--color-surface);
		color: var(--color-text-secondary);
		font-size: 14px;
	}

	&__product-heading {
		width: 240px;
		background: var(--color-surface);
	}

	&__feature {
		width: 180px;
		background: inherit;
		color: var(--color-text-secondary);
		font-size: 14px;
		font-weight: 600;
	}

	&__value {
		width: 240px;
		color: var(--color-text);
		font-size: 14px;
	}

	&__row--different {
		th,
		td {
			background: rgb(245 158 11 / 8%);
		}

		.compare-table__feature {
			color: #b45309;
		}
	}
}

.compare-product {
	display: flex;
	height: 100%;
	flex-direction: column;
	align-items: flex-start;
	gap: 16px;

	&__link {
		display: flex;
		width: 100%;
		flex: 1;
		flex-direction: column;
		gap: 12px;
		color: inherit;

		&:hover .compare-product__title {
			color: var(--color-primary);
		}

		&:focus-visible {
			border-radius: var(--radius-sm);
			outline: 3px solid rgb(37 99 235 / 20%);
			outline-offset: 3px;
		}
	}

	&__image-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 160px;
		padding: 12px;
		border-radius: var(--radius-md);
		background: var(--color-background);
	}

	&__image {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	&__title {
		font-size: 16px;
		line-height: 1.4;
		transition: color var(--transition-fast);
	}

	&__remove {
		width: 100%;
	}
}
</style>
