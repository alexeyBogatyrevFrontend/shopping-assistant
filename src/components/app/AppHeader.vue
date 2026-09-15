<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import { useCompareStore } from '../../stores/compare';
import { useFavoritesStore } from '../../stores/favorites';
import BaseContainer from '../ui/BaseContainer.vue';

const route = useRoute();

const favoritesStore = useFavoritesStore();
const compareStore = useCompareStore();

const mobileMenuIsOpen = ref(false);

const toggleMobileMenu = () => {
	mobileMenuIsOpen.value = !mobileMenuIsOpen.value;
};

const closeMobileMenu = () => {
	mobileMenuIsOpen.value = false;
};

watch(
	() => route.fullPath,
	() => {
		closeMobileMenu();
	},
);
</script>

<template>
	<header class="app-header" @keydown.esc="closeMobileMenu">
		<BaseContainer>
			<div class="app-header__inner">
				<RouterLink
					class="app-header__logo"
					:to="{ name: 'home' }"
					@click="closeMobileMenu"
				>
					Shopping
					<span>Assistant</span>
				</RouterLink>

				<button
					type="button"
					class="app-header__burger"
					:class="{
						'app-header__burger--open': mobileMenuIsOpen,
					}"
					:aria-expanded="mobileMenuIsOpen"
					aria-controls="main-navigation"
					:aria-label="mobileMenuIsOpen ? 'Закрыть меню' : 'Открыть меню'"
					@click="toggleMobileMenu"
				>
					<span></span>
					<span></span>
					<span></span>
				</button>

				<nav
					id="main-navigation"
					class="app-header__nav"
					:class="{
						'app-header__nav--open': mobileMenuIsOpen,
					}"
					@click="closeMobileMenu"
				>
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
		position: relative;
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

	&__burger {
		display: none;
		width: 42px;
		height: 42px;
		flex-shrink: 0;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 4px;
		padding: 0;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background: var(--color-surface);

		span {
			display: block;
			width: 20px;
			height: 2px;
			border-radius: 999px;
			background: var(--color-text);
			transition:
				transform var(--transition-normal),
				opacity var(--transition-normal);
		}

		&:focus-visible {
			outline: 3px solid rgb(37 99 235 / 20%);
			outline-offset: 2px;
		}

		&--open {
			span:nth-child(1) {
				transform: translateY(6px) rotate(45deg);
			}

			span:nth-child(2) {
				opacity: 0;
			}

			span:nth-child(3) {
				transform: translateY(-6px) rotate(-45deg);
			}
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
			gap: 16px;
		}

		&__burger {
			display: flex;
		}

		&__nav {
			position: absolute;
			top: calc(100% + 1px);
			right: 0;
			left: 0;
			display: none;
			flex-direction: column;
			align-items: stretch;
			gap: 4px;
			padding: 12px;
			border: 1px solid var(--color-border);
			border-top: 0;
			border-radius: 0 0 var(--radius-md) var(--radius-md);
			background: rgb(255 255 255 / 98%);
			box-shadow: var(--shadow-md);

			&--open {
				display: flex;
			}
		}

		&__link {
			width: 100%;
			justify-content: space-between;
			padding: 12px;
		}
	}
}
</style>
