<template>
	<div class="container">
		<slot />
	</div>
</template>

<style scoped lang="scss">
.container {
	width: 100%;
	max-width: var(--container-width);
	margin: 0 auto;
	padding: 0 16px;

	@media (max-width: 500px) {
		padding: 0 12px;
	}
}
</style>
