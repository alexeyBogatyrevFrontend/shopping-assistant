<script setup lang="ts">
import { useCompareStore } from '../../stores/compare.ts';
import { useFavoritesStore } from '../../stores/favorites.ts';
import BaseContainer from '../ui/BaseContainer.vue';

const favoritesStore = useFavoritesStore();
const compareStore = useCompareStore();
</script>

<template>
	<header class="app-header">
		<BaseContainer>
			<div class="app-header__inner">
				<RouterLink class="app-header__logo" :to="{ name: 'home' }">
					Shopping
					<span>Assistant</span>
				</RouterLink>

				<nav class="app-header__nav">
					<RouterLink class="app-header__link" :to="{ name: 'home' }">
						Главная
					</RouterLink>

					<RouterLink class="app-header__link" :to="{ name: 'products' }">
						Товары
					</RouterLink>

					<RouterLink
						class="app-header__link"
						:to="{ name: 'favorites' }"
						:aria-label="
							favoritesStore.favoritesCount > 0
								? `Избранное: ${favoritesStore.favoritesCount}`
								: 'Избранное'
						"
					>
						<span>Избранное</span>

						<span
							v-if="favoritesStore.favoritesCount > 0"
							class="app-header__badge"
							aria-hidden="true"
						>
							{{ favoritesStore.favoritesCount }}
						</span>
					</RouterLink>

					<RouterLink
						class="app-header__link"
						:to="{ name: 'compare' }"
						:aria-label="
							compareStore.compareCount > 0
								? `Сравнение: ${compareStore.compareCount}`
								: 'Сравнение'
						"
					>
						<span>Сравнить</span>

						<span
							v-if="compareStore.compareCount > 0"
							class="app-header__badge app-header__badge--compare"
							aria-hidden="true"
						>
							{{ compareStore.compareCount }}
						</span>
					</RouterLink>
				</nav>
			</div>
		</BaseContainer>
	</header>
</template>

<style scoped lang="scss">
.app-header {
	position: sticky;
	top: 0;
	z-index: 100;
	border-bottom: 1px solid var(--color-border);
	background: rgb(255 255 255 / 92%);
	backdrop-filter: blur(12px);

	&__inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		min-height: 68px;
		gap: 32px;
	}

	&__logo {
		flex-shrink: 0;
		font-size: 20px;
		font-weight: 700;
		letter-spacing: -0.03em;
		color: var(--color-text);

		span {
			color: var(--color-primary);
		}
	}

	&__nav {
		display: flex;
		align-items: center;
		gap: 4px;
	}

	&__link {
		padding: 8px 12px;
		border-radius: var(--radius-sm);
		font-size: 14px;
		font-weight: 500;
		color: var(--color-text-secondary);
		transition:
			background-color var(--transition-fast),
			color var(--transition-fast);
		display: inline-flex;
		align-items: center;
		gap: 6px;

		&:hover {
			background: var(--color-background);
			color: var(--color-text);
		}

		&.router-link-active {
			background: rgb(37 99 235 / 10%);
			color: var(--color-primary);
		}
	}

	&__badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 20px;
		height: 20px;
		padding: 0 6px;
		border-radius: 999px;
		background: var(--color-error);
		color: #fff;
		font-size: 11px;
		font-weight: 700;
		line-height: 1;
		&--compare {
			background: var(--color-primary);
		}
	}

	@media (max-width: 700px) {
		&__inner {
			min-height: 60px;
		}

		&__nav {
			gap: 0;
		}

		&__link {
			padding: 8px;
			font-size: 13px;
		}
	}

	@media (max-width: 550px) {
		&__inner {
			flex-direction: column;
			align-items: stretch;
			gap: 8px;
			padding: 10px 0;
		}

		&__logo {
			text-align: center;
		}

		&__nav {
			justify-content: center;
		}
	}
}
</style>
