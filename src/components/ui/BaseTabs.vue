<script setup lang="ts">
import { useId } from 'vue';

interface TabItem {
	id: string;
	label: string;
}

withDefaults(
	defineProps<{
		items: TabItem[];
		modelValue: string;
		ariaLabel?: string;
	}>(),
	{
		ariaLabel: 'Вкладки',
	},
);

const emit = defineEmits<{
	'update:modelValue': [value: string];
}>();

const tabsId = useId();

const selectTab = (tabId: string) => {
	emit('update:modelValue', tabId);
};

const getTabId = (tabId: string) => {
	return `${tabsId}-tab-${tabId}`;
};

const getPanelId = (tabId: string) => {
	return `${tabsId}-panel-${tabId}`;
};
</script>

<template>
	<div class="base-tabs">
		<div class="base-tabs__list" role="tablist" :aria-label="ariaLabel">
			<button
				v-for="item in items"
				:id="getTabId(item.id)"
				:key="item.id"
				type="button"
				class="base-tabs__button"
				:class="{
					'base-tabs__button--active': item.id === modelValue,
				}"
				role="tab"
				:aria-selected="item.id === modelValue"
				:aria-controls="getPanelId(item.id)"
				:tabindex="item.id === modelValue ? 0 : -1"
				@click="selectTab(item.id)"
			>
				{{ item.label }}
			</button>
		</div>

		<div
			:id="getPanelId(modelValue)"
			class="base-tabs__panel"
			role="tabpanel"
			:aria-labelledby="getTabId(modelValue)"
			tabindex="0"
		>
			<slot />
		</div>
	</div>
</template>

<style scoped lang="scss">
.base-tabs {
	&__list {
		display: flex;
		gap: 8px;
		margin-bottom: 24px;
		padding: 6px;
		overflow-x: auto;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background: var(--color-background);
	}

	&__button {
		min-height: 42px;
		flex: 1;
		padding: 8px 16px;
		border: 0;
		border-radius: var(--radius-sm);
		background: transparent;
		color: var(--color-text-secondary);
		font: inherit;
		font-size: 14px;
		font-weight: 600;
		white-space: nowrap;
		transition:
			background-color var(--transition-fast),
			color var(--transition-fast),
			box-shadow var(--transition-fast);

		&:hover {
			color: var(--color-text);
		}

		&:focus-visible {
			outline: 3px solid rgb(37 99 235 / 20%);
			outline-offset: 1px;
		}

		&--active {
			background: var(--color-surface);
			color: var(--color-primary);
			box-shadow: var(--shadow-sm);
		}
	}

	&__panel {
		border-radius: var(--radius-md);

		&:focus-visible {
			outline: 3px solid rgb(37 99 235 / 20%);
			outline-offset: 3px;
		}
	}

	@media (max-width: 600px) {
		&__list {
			justify-content: flex-start;
		}

		&__button {
			flex: 0 0 auto;
		}
	}
}
</style>
