import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import BaseTabs from './BaseTabs.vue';

const items = [
	{
		id: 'search',
		label: 'Поиск',
	},
	{
		id: 'favorites',
		label: 'Избранное',
	},
];

describe('BaseTabs', () => {
	it('renders tab buttons and active content', () => {
		const wrapper = mount(BaseTabs, {
			props: {
				items,
				modelValue: 'search',
			},
			slots: {
				default: '<p>Содержимое вкладки</p>',
			},
		});

		const buttons = wrapper.findAll('[role="tab"]');

		expect(buttons).toHaveLength(2);
		expect(buttons[0].text()).toBe('Поиск');
		expect(buttons[0].attributes('aria-selected')).toBe('true');
		expect(wrapper.text()).toContain('Содержимое вкладки');
	});

	it('emits a new tab id after clicking a tab', async () => {
		const wrapper = mount(BaseTabs, {
			props: {
				items,
				modelValue: 'search',
			},
		});

		await wrapper.findAll('[role="tab"]')[1].trigger('click');

		expect(wrapper.emitted('update:modelValue')).toEqual([['favorites']]);
	});
});
