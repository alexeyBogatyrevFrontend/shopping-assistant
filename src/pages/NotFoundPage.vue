<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import BaseContainer from '../components/ui/BaseContainer.vue';

const route = useRoute();

const requestedPath = computed(() => {
	return route.fullPath;
});
</script>

<template>
	<div class="not-found-page">
		<BaseContainer>
			<div class="not-found-page__content">
				<div class="not-found-page__code" aria-hidden="true">404</div>

				<span class="not-found-page__eyebrow"> Страница не найдена </span>

				<h1 class="not-found-page__title">Кажется, здесь ничего нет</h1>

				<p class="not-found-page__description">
					Адрес мог быть изменён, страница могла быть удалена или в ссылке
					допущена ошибка.
				</p>

				<code class="not-found-page__path">
					{{ requestedPath }}
				</code>

				<div class="not-found-page__actions">
					<RouterLink
						class="not-found-page__link not-found-page__link--primary"
						:to="{ name: 'home' }"
					>
						Вернуться на главную
					</RouterLink>

					<RouterLink
						class="not-found-page__link not-found-page__link--secondary"
						:to="{ name: 'products' }"
					>
						Открыть каталог
					</RouterLink>
				</div>
			</div>
		</BaseContainer>
	</div>
</template>

<style scoped lang="scss">
.not-found-page {
	display: flex;
	width: 100%;
	min-width: 0;
	flex: 1;
	align-items: center;
	padding: 64px 0;
	background:
		radial-gradient(circle at 50% 40%, rgb(37 99 235 / 12%), transparent 38%),
		var(--color-background);

	&__content {
		max-width: 680px;
		margin: 0 auto;
		text-align: center;
	}

	&__code {
		margin-bottom: 10px;
		color: rgb(37 99 235 / 10%);
		font-size: clamp(120px, 22vw, 220px);
		font-weight: 800;
		line-height: 0.9;
		letter-spacing: -0.08em;
		user-select: none;
	}

	&__eyebrow {
		position: relative;
		display: inline-flex;
		margin-bottom: 12px;
		padding: 6px 12px;
		border-radius: 999px;
		background: rgb(37 99 235 / 10%);
		color: var(--color-primary);
		font-size: 13px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
	}

	&__title {
		margin-bottom: 12px;
		font-size: 42px;
		line-height: 1.2;
		letter-spacing: -0.03em;
	}

	&__description {
		max-width: 560px;
		margin: 0 auto 16px;
		color: var(--color-text-secondary);
		font-size: 17px;
		line-height: 1.7;
	}

	&__path {
		display: inline-block;
		max-width: 100%;
		margin-bottom: 28px;
		padding: 6px 10px;
		overflow: hidden;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		background: var(--color-surface);
		color: var(--color-text-secondary);
		font-size: 13px;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	&__actions {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 12px;
	}

	&__link {
		display: inline-flex;
		min-height: 44px;
		align-items: center;
		justify-content: center;
		padding: 0 18px;
		border: 1px solid transparent;
		border-radius: var(--radius-md);
		font-size: 14px;
		font-weight: 600;
		transition:
			background-color var(--transition-fast),
			border-color var(--transition-fast);

		&:focus-visible {
			outline: 3px solid rgb(37 99 235 / 20%);
			outline-offset: 2px;
		}

		&--primary {
			background: var(--color-primary);
			color: #fff;

			&:hover {
				background: var(--color-primary-hover);
			}
		}

		&--secondary {
			border-color: var(--color-border);
			background: var(--color-surface);
			color: var(--color-text);

			&:hover {
				border-color: var(--color-border-hover);
				background: var(--color-background);
			}
		}
	}

	@media (max-width: 600px) {
		padding: 40px 0;

		&__code {
			margin-bottom: 18px;
			font-size: 120px;
		}

		&__title {
			font-size: 30px;
		}

		&__description {
			font-size: 15px;
		}
	}

	@media (max-width: 420px) {
		&__actions {
			flex-direction: column;
		}

		&__link {
			width: 100%;
		}
	}
}
</style>
