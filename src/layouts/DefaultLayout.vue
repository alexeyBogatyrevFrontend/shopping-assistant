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
	flex-direction: column;
	min-height: 100vh;

	&__main {
		display: flex;
		flex: 1;
	}
}
</style>
