<script setup lang="ts">
import { computed } from 'vue';

import BaseButton from '../components/ui/BaseButton.vue';
import BaseContainer from '../components/ui/BaseContainer.vue';
import ProductList from '../components/product/ProductList.vue';
import { useFavoritesStore } from '../stores/favorites';

const favoritesStore = useFavoritesStore();

const favoritesSummary = computed(() => {
	const count = favoritesStore.favoritesCount;

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
</script>

<template>
	<div class="favorites-page">
		<BaseContainer>
			<div class="favorites-page__header">
				<div>
					<h1 class="favorites-page__title">Избранное</h1>

					<p class="favorites-page__count">
						{{ favoritesSummary }}
					</p>
				</div>

				<BaseButton
					v-if="favoritesStore.favoritesCount > 0"
					variant="danger"
					@click="favoritesStore.clearFavorites()"
				>
					Очистить избранное
				</BaseButton>
			</div>

			<div
				v-if="favoritesStore.favoritesCount === 0"
				class="favorites-page__empty"
			>
				<div class="favorites-page__empty-icon" aria-hidden="true">♡</div>

				<h2 class="favorites-page__empty-title">В избранном пока ничего нет</h2>

				<p class="favorites-page__empty-description">
					Добавляйте понравившиеся товары, чтобы быстро вернуться к ним позже.
				</p>

				<RouterLink
					class="favorites-page__catalog-link"
					:to="{ name: 'products' }"
				>
					Перейти к товарам
				</RouterLink>
			</div>

			<ProductList v-else :products="favoritesStore.favorites" />
		</BaseContainer>
	</div>
</template>

<style scoped lang="scss">
.favorites-page {
	flex: 1;
	padding: 32px 0 48px;

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
		text-align: center;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		background: var(--color-surface);
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
		max-width: 440px;
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
</style>
