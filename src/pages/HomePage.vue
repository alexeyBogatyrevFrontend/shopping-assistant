<script setup lang="ts">
import { ref } from 'vue';

import BaseButton from '../components/ui/BaseButton.vue';
import BaseContainer from '../components/ui/BaseContainer.vue';
import BaseModal from '../components/ui/BaseModal.vue';

const guideIsOpen = ref(false);
</script>

<template>
	<div class="home-page">
		<section class="hero">
			<BaseContainer>
				<div class="hero__inner">
					<div class="hero__content">
						<span class="hero__eyebrow"> Удобный выбор товаров </span>

						<h1 class="hero__title">
							Находите и сравнивайте товары без лишних сложностей
						</h1>

						<p class="hero__description">
							Используйте поиск, категории и сортировку. Сохраняйте
							понравившиеся товары и сравнивайте их характеристики.
						</p>

						<div class="hero__actions">
							<RouterLink class="hero__catalog-link" :to="{ name: 'products' }">
								Перейти к товарам
							</RouterLink>

							<BaseButton
								variant="secondary"
								size="lg"
								@click="guideIsOpen = true"
							>
								Как это работает?
							</BaseButton>
						</div>
					</div>

					<div class="hero__visual" aria-hidden="true">
						<div class="hero__visual-icon">🛍️</div>

						<div class="hero__visual-card hero__visual-card--search">
							<span>⌕</span>
							Поиск
						</div>

						<div class="hero__visual-card hero__visual-card--favorite">
							<span>♡</span>
							Избранное
						</div>

						<div class="hero__visual-card hero__visual-card--compare">
							<span>⇄</span>
							Сравнение
						</div>
					</div>
				</div>
			</BaseContainer>
		</section>

		<BaseModal v-model="guideIsOpen" title="Как выбрать подходящий товар">
			<ol class="guide">
				<li class="guide__item">
					<span class="guide__number">1</span>

					<div>
						<strong class="guide__title">Найдите товары</strong>

						<p>
							Используйте поиск, категории, сортировку и переходы между
							страницами каталога.
						</p>
					</div>
				</li>

				<li class="guide__item">
					<span class="guide__number">2</span>

					<div>
						<strong class="guide__title">Сохраните интересное</strong>

						<p>
							Добавьте понравившиеся варианты в избранное, чтобы не потерять их.
						</p>
					</div>
				</li>

				<li class="guide__item">
					<span class="guide__number">3</span>

					<div>
						<strong class="guide__title">Сравните характеристики</strong>

						<p>
							Добавьте до четырёх товаров и посмотрите их различия в общей
							таблице.
						</p>
					</div>
				</li>
			</ol>

			<template #footer>
				<BaseButton variant="secondary" @click="guideIsOpen = false">
					Закрыть
				</BaseButton>

				<RouterLink
					class="guide__catalog-link"
					:to="{ name: 'products' }"
					@click="guideIsOpen = false"
				>
					Открыть каталог
				</RouterLink>
			</template>
		</BaseModal>
	</div>
</template>

<style scoped lang="scss">
.home-page {
	width: 100%;
	min-width: 0;
}

.hero {
	padding: 72px 0;
	overflow: hidden;
	background:
		radial-gradient(circle at 80% 20%, rgb(37 99 235 / 14%), transparent 32%),
		var(--color-background);

	&__inner {
		display: grid;
		grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.9fr);
		align-items: center;
		gap: 64px;
		min-height: 480px;
	}

	&__content {
		max-width: 650px;
	}

	&__eyebrow {
		display: inline-flex;
		margin-bottom: 16px;
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
		margin-bottom: 20px;
		font-size: clamp(36px, 5vw, 58px);
		line-height: 1.08;
		letter-spacing: -0.04em;
	}

	&__description {
		max-width: 590px;
		margin-bottom: 32px;
		color: var(--color-text-secondary);
		font-size: 18px;
		line-height: 1.7;
	}

	&__actions {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
	}

	&__catalog-link {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 48px;
		padding: 0 20px;
		border-radius: var(--radius-md);
		background: var(--color-primary);
		color: #fff;
		font-size: 16px;
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

	&__visual {
		position: relative;
		display: flex;
		min-height: 380px;
		align-items: center;
		justify-content: center;
		border: 1px solid rgb(37 99 235 / 15%);
		border-radius: var(--radius-xl);
		background: rgb(255 255 255 / 75%);
		box-shadow: var(--shadow-lg);
	}

	&__visual-icon {
		font-size: 112px;
		filter: drop-shadow(0 16px 20px rgb(15 23 42 / 15%));
	}

	&__visual-card {
		position: absolute;
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 10px 14px;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background: var(--color-surface);
		box-shadow: var(--shadow-md);
		font-size: 14px;
		font-weight: 600;

		span {
			color: var(--color-primary);
			font-size: 20px;
		}

		&--search {
			top: 42px;
			left: 32px;
		}

		&--favorite {
			top: 110px;
			right: 24px;
		}

		&--compare {
			right: 54px;
			bottom: 42px;
		}
	}

	@media (max-width: 850px) {
		padding: 48px 0;

		&__inner {
			grid-template-columns: 1fr;
			gap: 40px;
		}

		&__visual {
			min-height: 320px;
		}
	}

	@media (max-width: 500px) {
		padding: 36px 0;

		&__inner {
			min-height: auto;
		}

		&__title {
			font-size: 36px;
		}

		&__description {
			font-size: 16px;
		}

		&__actions {
			flex-direction: column;
		}

		&__catalog-link {
			width: 100%;
		}

		&__visual {
			min-height: 280px;
		}

		&__visual-icon {
			font-size: 82px;
		}

		&__visual-card {
			padding: 8px 10px;
			font-size: 12px;

			&--search {
				top: 24px;
				left: 14px;
			}

			&--favorite {
				top: 82px;
				right: 12px;
			}

			&--compare {
				right: 24px;
				bottom: 24px;
			}
		}
	}
}

.guide {
	display: flex;
	flex-direction: column;
	gap: 20px;

	&__item {
		display: flex;
		align-items: flex-start;
		gap: 14px;
	}

	&__number {
		display: inline-flex;
		width: 32px;
		height: 32px;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background: rgb(37 99 235 / 10%);
		color: var(--color-primary);
		font-weight: 700;
	}

	&__title {
		display: block;
		margin-bottom: 4px;
		color: var(--color-text);
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

		&:hover {
			background: var(--color-primary-hover);
		}
	}
}
</style>
