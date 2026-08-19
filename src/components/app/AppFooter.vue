<script setup lang="ts">
import BaseContainer from '../ui/BaseContainer.vue';
</script>

<template>
	<footer class="app-footer">
		<BaseContainer>
			<div class="app-footer__inner">
				<div>
					<strong class="app-footer__logo"> Shopping Assistant </strong>

					<p class="app-footer__description">
						Умный каталог для поиска и сравнения товаров.
					</p>
				</div>

				<span class="app-footer__copyright">
					© {{ new Date().getFullYear() }} Shopping Assistant
				</span>
			</div>
		</BaseContainer>
	</footer>
</template>

<style scoped lang="scss">
.app-footer {
	margin-top: auto;
	border-top: 1px solid var(--color-border);
	background: var(--color-surface);

	&__inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 24px;
		min-height: 120px;
	}

	&__logo {
		display: block;
		margin-bottom: 6px;
		font-size: 16px;
	}

	&__description {
		font-size: 13px;
		color: var(--color-text-secondary);
	}

	&__copyright {
		font-size: 13px;
		color: var(--color-text-muted);
	}

	@media (max-width: 600px) {
		&__inner {
			flex-direction: column;
			align-items: flex-start;
			justify-content: center;
			min-height: 140px;
		}
	}
}
</style>
