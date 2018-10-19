import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Demo from '../src/demo.js';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

Enzyme.configure({
	adapter: new Adapter()
});

describe('UI test #demo', () => {
	it('shoud have title', () => {
		const wrapper = mount(<Demo />);
		const title = wrapper.find('h1');
		expect(title).toHaveLength(1);
		expect(title.text()).toBe('This is a demo');
	});

	it('shoud add 1 when click button', () => {
		const wrapper = mount(<Demo />);
		const counter = wrapper.find('.counter');
		const v1 = parseInt(counter.text());
		wrapper.find('button').simulate('click');
		const v2 = parseInt(counter.text());
		expect(v2).toBe(v1 + 1);
	});

	it('shoud change when input number', () => {
		const wrapper = mount(<Demo />);
		const counter = wrapper.find('.counter');
		wrapper.find('input').simulate('change', {
			target: {
				value: '5'
			}
		});
		expect(counter.text()).toBe('5');
	});

	it('shoud change when props change', () => {
		const wrapper = mount(<Demo value="5" title="Demo" />);
		sinon.spy(Demo.prototype, 'componentWillReceiveProps');
		const title = wrapper.find('h1');
		wrapper.setProps({
			title: 'Demo2'
		});
		expect(title.text()).toBe('Demo2');
		const callCount = Demo.prototype.componentWillReceiveProps.callCount;
		expect(callCount).toBe(1);
	});
});
