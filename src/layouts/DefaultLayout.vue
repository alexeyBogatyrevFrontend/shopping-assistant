<script setup lang="ts">
import AppFooter from '../components/app/AppFooter.vue';
import AppHeader from '../components/app/AppHeader.vue';
</script>

<template>
	<div class="default-layout">
		<AppHeader />

		<main class="default-layout__main">
			<RouterView />
		</main>

		<AppFooter />
	</div>
</template>

<style scoped lang="scss">
.default-layout {
	display: flex;
	width: 100%;
	min-width: 0;
	min-height: 100vh;
	flex-direction: column;

	&__main {
		display: flex;
		width: 100%;
		min-width: 0;
		flex: 1;
	}
}
</style>
