<script setup lang="ts">
import { computed, ref } from 'vue';

import BaseButton from '../components/ui/BaseButton.vue';
import BaseContainer from '../components/ui/BaseContainer.vue';
import BaseModal from '../components/ui/BaseModal.vue';
import BaseTabs from '../components/ui/BaseTabs.vue';

const guideIsOpen = ref(false);

interface FeatureTab {
	id: string;
	label: string;
	icon: string;
	title: string;
	description: string;
	points: string[];
}

interface FaqItem {
	id: string;
	question: string;
	answer: string;
}

const featureTabs: FeatureTab[] = [
	{
		id: 'search',
		label: 'Поиск',
		icon: '⌕',
		title: 'Быстро находите подходящие товары',
		description:
			'Каталог помогает постепенно сузить список и оставить только подходящие варианты.',
		points: [
			'Поиск по названию товара',
			'Фильтрация по категориям',
			'Сортировка по цене, рейтингу и названию',
			'Сохранение параметров в URL',
		],
	},
	{
		id: 'favorites',
		label: 'Избранное',
		icon: '♡',
		title: 'Сохраняйте интересные варианты',
		description:
			'Не нужно запоминать названия или снова искать понравившийся товар.',
		points: [
			'Добавление из каталога и страницы товара',
			'Отдельная страница избранного',
			'Сохранение после перезагрузки браузера',
			'Мгновенное обновление количества в шапке',
		],
	},
	{
		id: 'compare',
		label: 'Сравнение',
		icon: '⇄',
		title: 'Сравнивайте характеристики рядом',
		description:
			'Добавьте несколько товаров и изучите их основные отличия в общей таблице.',
		points: [
			'Одновременное сравнение до четырёх товаров',
			'Автоматическое выделение различий',
			'Удаление отдельных вариантов',
			'Адаптивная таблица с горизонтальной прокруткой',
		],
	},
];

const activeFeatureId = ref('search');

const faqItems: FaqItem[] = [
	{
		id: 'favorites',
		question: 'Чем избранное отличается от сравнения?',
		answer:
			'Избранное хранит все понравившиеся товары, к которым вы хотите вернуться. Сравнение предназначено для одновременного сопоставления характеристик нескольких товаров.',
	},
	{
		id: 'compare-limit',
		question: 'Сколько товаров можно сравнивать одновременно?',
		answer:
			'Одновременно можно сравнить до четырёх товаров. Ограничение сохраняет таблицу понятной и удобной для просмотра.',
	},
	{
		id: 'storage',
		question: 'Сохранятся ли товары после перезагрузки страницы?',
		answer:
			'Да. Избранное и список сравнения сохраняются в localStorage вашего браузера и восстанавливаются при следующем открытии приложения.',
	},
	{
		id: 'search',
		question: 'Можно ли поделиться результатами поиска?',
		answer:
			'Да. Поисковая строка, выбранная категория, сортировка и текущая страница сохраняются в URL. Эту ссылку можно скопировать и открыть позднее.',
	},
	{
		id: 'purchase',
		question: 'Можно ли купить товар в этом приложении?',
		answer:
			'Нет. Shopping Assistant является учебным проектом для поиска, сохранения и сравнения товаров. Оформление заказа пока не реализовано.',
	},
];

const openFaqId = ref<string | null>(null);

const toggleFaq = (faqId: string) => {
	openFaqId.value = openFaqId.value === faqId ? null : faqId;
};

const activeFeature = computed(() => {
	return (
		featureTabs.find(feature => feature.id === activeFeatureId.value) ??
		featureTabs[0]!
	);
});
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

		<section class="features">
			<BaseContainer>
				<div class="features__heading">
					<span class="features__eyebrow">Возможности</span>

					<h2 class="features__title">Всё необходимое для удобного выбора</h2>

					<p class="features__description">
						Пройдите путь от поиска товара до сравнения лучших вариантов.
					</p>
				</div>

				<BaseTabs
					v-model="activeFeatureId"
					:items="featureTabs"
					aria-label="Возможности сервиса"
				>
					<article class="feature-card">
						<div class="feature-card__icon" aria-hidden="true">
							{{ activeFeature.icon }}
						</div>

						<div class="feature-card__content">
							<h3 class="feature-card__title">
								{{ activeFeature.title }}
							</h3>

							<p class="feature-card__description">
								{{ activeFeature.description }}
							</p>

							<ul class="feature-card__list">
								<li
									v-for="point in activeFeature.points"
									:key="point"
									class="feature-card__item"
								>
									<span aria-hidden="true">✓</span>
									{{ point }}
								</li>
							</ul>
						</div>
					</article>
				</BaseTabs>
			</BaseContainer>
		</section>

		<section class="faq">
			<BaseContainer>
				<div class="faq__inner">
					<div class="faq__heading">
						<span class="faq__eyebrow">FAQ</span>

						<h2 class="faq__title">Частые вопросы</h2>

						<p class="faq__description">
							Основные сведения о возможностях Shopping Assistant.
						</p>
					</div>

					<div class="faq__list">
						<div
							v-for="item in faqItems"
							:key="item.id"
							class="faq__item"
							:class="{
								'faq__item--open': openFaqId === item.id,
							}"
						>
							<h3 class="faq__question-heading">
								<button
									type="button"
									class="faq__question"
									:aria-expanded="openFaqId === item.id"
									:aria-controls="`faq-answer-${item.id}`"
									@click="toggleFaq(item.id)"
								>
									<span>{{ item.question }}</span>

									<span class="faq__icon" aria-hidden="true">
										{{ openFaqId === item.id ? '−' : '+' }}
									</span>
								</button>
							</h3>

							<Transition name="faq-answer">
								<div
									v-if="openFaqId === item.id"
									:id="`faq-answer-${item.id}`"
									class="faq__answer"
								>
									<p>{{ item.answer }}</p>
								</div>
							</Transition>
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

.features {
	padding: 72px 0;
	background: var(--color-surface);

	&__heading {
		max-width: 680px;
		margin: 0 auto 40px;
		text-align: center;
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
		margin-bottom: 12px;
		font-size: 36px;
		line-height: 1.2;
		letter-spacing: -0.03em;
	}

	&__description {
		color: var(--color-text-secondary);
		font-size: 17px;
	}

	@media (max-width: 600px) {
		padding: 48px 0;

		&__heading {
			margin-bottom: 28px;
			text-align: left;
		}

		&__title {
			font-size: 28px;
		}
	}
}

.feature-card {
	display: grid;
	grid-template-columns: 180px minmax(0, 1fr);
	align-items: center;
	gap: 40px;
	min-height: 300px;
	padding: 40px;
	border: 1px solid var(--color-border);
	border-radius: var(--radius-lg);
	background: var(--color-background);

	&__icon {
		display: flex;
		width: 160px;
		height: 160px;
		align-items: center;
		justify-content: center;
		border-radius: var(--radius-lg);
		background: rgb(37 99 235 / 10%);
		color: var(--color-primary);
		font-size: 76px;
		line-height: 1;
	}

	&__title {
		margin-bottom: 12px;
		font-size: 26px;
		line-height: 1.3;
	}

	&__description {
		max-width: 650px;
		margin-bottom: 20px;
		color: var(--color-text-secondary);
		line-height: 1.7;
	}

	&__list {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 12px 24px;
	}

	&__item {
		display: flex;
		align-items: flex-start;
		gap: 8px;
		font-size: 14px;

		span {
			color: var(--color-success);
			font-weight: 700;
		}
	}

	@media (max-width: 700px) {
		grid-template-columns: 1fr;
		gap: 24px;
		padding: 24px;

		&__icon {
			width: 100px;
			height: 100px;
			font-size: 48px;
		}
	}

	@media (max-width: 500px) {
		&__list {
			grid-template-columns: 1fr;
		}
	}
}

.faq {
	padding: 72px 0;
	background: var(--color-background);

	&__inner {
		display: grid;
		grid-template-columns: minmax(240px, 0.7fr) minmax(0, 1.3fr);
		align-items: start;
		gap: 64px;
	}

	&__heading {
		position: sticky;
		top: 100px;
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
		margin-bottom: 12px;
		font-size: 36px;
		line-height: 1.2;
		letter-spacing: -0.03em;
	}

	&__description {
		color: var(--color-text-secondary);
		line-height: 1.7;
	}

	&__list {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	&__item {
		overflow: hidden;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background: var(--color-surface);
		transition: border-color var(--transition-fast);

		&--open {
			border-color: rgb(37 99 235 / 35%);
		}
	}

	&__question-heading {
		font-size: inherit;
	}

	&__question {
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: space-between;
		gap: 24px;
		padding: 20px;
		border: 0;
		background: transparent;
		color: var(--color-text);
		text-align: left;
		font: inherit;
		font-weight: 600;

		&:hover {
			color: var(--color-primary);
		}

		&:focus-visible {
			outline: 3px solid rgb(37 99 235 / 20%);
			outline-offset: -3px;
		}
	}

	&__icon {
		display: inline-flex;
		width: 28px;
		height: 28px;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background: rgb(37 99 235 / 10%);
		color: var(--color-primary);
		font-size: 20px;
		font-weight: 400;
	}

	&__answer {
		padding: 0 20px 20px;
		color: var(--color-text-secondary);
		line-height: 1.7;
	}

	@media (max-width: 750px) {
		padding: 48px 0;

		&__inner {
			grid-template-columns: 1fr;
			gap: 28px;
		}

		&__heading {
			position: static;
		}

		&__title {
			font-size: 28px;
		}
	}
}

.faq-answer-enter-active,
.faq-answer-leave-active {
	transition:
		opacity var(--transition-normal),
		transform var(--transition-normal);
}

.faq-answer-enter-from,
.faq-answer-leave-to {
	opacity: 0;
	transform: translateY(-6px);
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
