<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue';

const props = defineProps<{
	modelValue: boolean;
	title: string;
}>();

const emit = defineEmits<{
	'update:modelValue': [value: boolean];
}>();

const titleId = useId();
const closeButton = ref<HTMLButtonElement | null>(null);

let previouslyFocusedElement: HTMLElement | null = null;
let previousBodyOverflow = '';

const closeModal = () => {
	emit('update:modelValue', false);
};

const handleKeydown = (event: KeyboardEvent) => {
	if (event.key === 'Escape' && props.modelValue) {
		closeModal();
	}
};

watch(
	() => props.modelValue,
	async isOpen => {
		if (isOpen) {
			previouslyFocusedElement =
				document.activeElement instanceof HTMLElement
					? document.activeElement
					: null;

			previousBodyOverflow = document.body.style.overflow;
			document.body.style.overflow = 'hidden';

			await nextTick();
			closeButton.value?.focus();

			return;
		}

		document.body.style.overflow = previousBodyOverflow;
		previouslyFocusedElement?.focus();
		previouslyFocusedElement = null;
	},
);

onMounted(() => {
	window.addEventListener('keydown', handleKeydown);
});

onBeforeUnmount(() => {
	window.removeEventListener('keydown', handleKeydown);
	document.body.style.overflow = previousBodyOverflow;
});
</script>

<template>
	<Teleport to="body">
		<Transition name="modal">
			<div
				v-if="modelValue"
				class="base-modal"
				role="dialog"
				aria-modal="true"
				:aria-labelledby="titleId"
				@click.self="closeModal"
			>
				<div class="base-modal__dialog">
					<div class="base-modal__header">
						<h2 :id="titleId" class="base-modal__title">
							{{ title }}
						</h2>

						<button
							ref="closeButton"
							type="button"
							class="base-modal__close"
							aria-label="Закрыть окно"
							@click="closeModal"
						>
							×
						</button>
					</div>

					<div class="base-modal__content">
						<slot />
					</div>

					<div v-if="$slots.footer" class="base-modal__footer">
						<slot name="footer" />
					</div>
				</div>
			</div>
		</Transition>
	</Teleport>
</template>

<style scoped lang="scss">
.base-modal {
	position: fixed;
	inset: 0;
	z-index: 1000;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 16px;
	background: rgb(15 23 42 / 60%);
	backdrop-filter: blur(4px);

	&__dialog {
		width: 100%;
		max-width: 560px;
		max-height: calc(100vh - 32px);
		overflow-y: auto;
		border-radius: var(--radius-lg);
		background: var(--color-surface);
		box-shadow: var(--shadow-lg);
	}

	&__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 24px;
		padding: 20px 24px;
		border-bottom: 1px solid var(--color-border);
	}

	&__title {
		font-size: 22px;
		line-height: 1.3;
	}

	&__close {
		display: inline-flex;
		width: 36px;
		height: 36px;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		padding: 0;
		border: 0;
		border-radius: 50%;
		background: transparent;
		color: var(--color-text-secondary);
		font-size: 28px;
		line-height: 1;
		transition:
			background-color var(--transition-fast),
			color var(--transition-fast);

		&:hover {
			background: var(--color-background);
			color: var(--color-text);
		}

		&:focus-visible {
			outline: 3px solid rgb(37 99 235 / 20%);
			outline-offset: 2px;
		}
	}

	&__content {
		padding: 24px;
		color: var(--color-text-secondary);
		line-height: 1.7;
	}

	&__footer {
		display: flex;
		justify-content: flex-end;
		gap: 12px;
		padding: 16px 24px;
		border-top: 1px solid var(--color-border);
	}

	@media (max-width: 500px) {
		align-items: flex-end;
		padding: 0;

		&__dialog {
			max-height: 90vh;
			border-radius: var(--radius-lg) var(--radius-lg) 0 0;
		}

		&__header,
		&__content {
			padding: 18px;
		}

		&__footer {
			padding: 14px 18px;
		}
	}
}

.modal-enter-active,
.modal-leave-active {
	transition: opacity var(--transition-normal);

	.base-modal__dialog {
		transition: transform var(--transition-normal);
	}
}

.modal-enter-from,
.modal-leave-to {
	opacity: 0;

	.base-modal__dialog {
		transform: translateY(16px) scale(0.98);
	}
}
</style>
