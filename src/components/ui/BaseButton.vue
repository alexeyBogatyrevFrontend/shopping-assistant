<script setup lang="ts">
withDefaults(
	defineProps<{
		variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
		size?: 'sm' | 'md' | 'lg';
		type?: 'button' | 'submit' | 'reset';
		disabled?: boolean;
	}>(),
	{
		variant: 'primary',
		size: 'md',
		type: 'button',
		disabled: false,
	},
);
</script>

<template>
	<button
		class="base-button"
		:class="[`base-button--${variant}`, `base-button--${size}`]"
		:type="type"
		:disabled="disabled"
	>
		<slot />
	</button>
</template>

<style scoped lang="scss">
.base-button {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
	border: 1px solid transparent;
	border-radius: var(--radius-md);
	font-weight: 600;
	white-space: nowrap;
	transition:
		background-color var(--transition-fast),
		border-color var(--transition-fast),
		color var(--transition-fast),
		opacity var(--transition-fast);

	&:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}

	&--sm {
		min-height: 36px;
		padding: 0 12px;
		font-size: 13px;
	}

	&--md {
		min-height: 42px;
		padding: 0 16px;
		font-size: 14px;
	}

	&--lg {
		min-height: 48px;
		padding: 0 20px;
		font-size: 16px;
	}

	&--primary {
		background: var(--color-primary);
		color: #fff;

		&:hover:not(:disabled) {
			background: var(--color-primary-hover);
		}
	}

	&--secondary {
		border-color: var(--color-border);
		background: var(--color-surface);
		color: var(--color-text);

		&:hover:not(:disabled) {
			border-color: var(--color-border-hover);
			background: var(--color-background);
		}
	}

	&--ghost {
		background: transparent;
		color: var(--color-text-secondary);

		&:hover:not(:disabled) {
			background: var(--color-background);
			color: var(--color-text);
		}
	}

	&--danger {
		background: var(--color-error);
		color: #fff;

		&:hover:not(:disabled) {
			opacity: 0.9;
		}
	}
}
</style>
