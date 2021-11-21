import { act, fireEvent, render } from '@testing-library/react';
import { ActionContext } from '../ActionContext/ActionContext';
import { InputListener } from './InputListener';

describe('InputListener', () => {
	beforeEach(() => {
		jest.useFakeTimers();
		jest.spyOn(global, 'setTimeout');
	});
	afterEach(() => {
		jest.runOnlyPendingTimers();
		jest.useRealTimers();
	});

	it('listens to a short click', () => {
		const onShortPress = jest.fn();
		const onLongPress = jest.fn();
		const setActions = jest.fn();
		const { container } = render(
			<ActionContext.Provider value={{ onLongPress, onShortPress, setActions }}>
				<InputListener />
			</ActionContext.Provider>
		);
		fireEvent.mouseDown(container);
		act(() => { jest.advanceTimersByTime(1); });
		fireEvent.mouseUp(container);
		expect(onShortPress).toHaveBeenCalled();
		expect(onLongPress).not.toHaveBeenCalled();
	});

	it('listens to a long click', () => {
		const onShortPress = jest.fn();
		const onLongPress = jest.fn();
		const setActions = jest.fn();
		const { container } = render(
			<ActionContext.Provider value={{ onLongPress, onShortPress, setActions }}>
				<InputListener />
			</ActionContext.Provider>
		);
		fireEvent.mouseDown(container);
		act(() => { jest.advanceTimersByTime(3000); });
		fireEvent.mouseUp(container);
		expect(onShortPress).not.toHaveBeenCalled();
		expect(onLongPress).toHaveBeenCalled();
	});

	it('fires long-press handler even if press is ongoing', () => {
		const onShortPress = jest.fn();
		const onLongPress = jest.fn();
		const setActions = jest.fn();
		const { container } = render(
			<ActionContext.Provider value={{ onLongPress, onShortPress, setActions }}>
				<InputListener />
			</ActionContext.Provider>
		);
		fireEvent.mouseDown(container);
		act(() => { jest.advanceTimersByTime(3000); });
		expect(onShortPress).not.toHaveBeenCalled();
		expect(onLongPress).toHaveBeenCalled();
	});

	it('listens to a short key press', () => {
		const onShortPress = jest.fn();
		const onLongPress = jest.fn();
		const setActions = jest.fn();
		const { container } = render(
			<ActionContext.Provider value={{ onLongPress, onShortPress, setActions }}>
				<InputListener />
			</ActionContext.Provider>
		);
		fireEvent.keyDown(container, { key: 'a' });
		act(() => { jest.advanceTimersByTime(1); });
		fireEvent.keyUp(container, { key: 'a' });
		expect(onShortPress).toHaveBeenCalled();
		expect(onLongPress).not.toHaveBeenCalled();
	});

	it('listens to a long key press', () => {
		const onShortPress = jest.fn();
		const onLongPress = jest.fn();
		const setActions = jest.fn();
		const { container } = render(
			<ActionContext.Provider value={{ onLongPress, onShortPress, setActions }}>
				<InputListener />
			</ActionContext.Provider>
		);
		fireEvent.keyDown(container, { key: 'a' });
		act(() => { jest.advanceTimersByTime(3000); });
		fireEvent.keyUp(container, { key: 'a' });
		expect(onShortPress).not.toHaveBeenCalled();
		expect(onLongPress).toHaveBeenCalled();
	});

	it('ignores other keys during press', () => {
		const onShortPress = jest.fn();
		const onLongPress = jest.fn();
		const setActions = jest.fn();
		const { container } = render(
			<ActionContext.Provider value={{ onLongPress, onShortPress, setActions }}>
				<InputListener />
			</ActionContext.Provider>
		);
		fireEvent.keyDown(container, { key: 'a' });
		act(() => { jest.advanceTimersByTime(100); });
		fireEvent.keyDown(container, { key: 'b' });
		act(() => { jest.advanceTimersByTime(100); });
		fireEvent.keyUp(container, { key: 'b' });
		act(() => { jest.advanceTimersByTime(3000); });
		fireEvent.keyUp(container, { key: 'a' });
		expect(onShortPress).not.toHaveBeenCalled();
		expect(onLongPress).toHaveBeenCalled();
	});

	it('ignores clicks during press', () => {
		const onShortPress = jest.fn();
		const onLongPress = jest.fn();
		const setActions = jest.fn();
		const { container } = render(
			<ActionContext.Provider value={{ onLongPress, onShortPress, setActions }}>
				<InputListener />
			</ActionContext.Provider>
		);
		fireEvent.keyDown(container, { key: 'a' });
		act(() => { jest.advanceTimersByTime(100); });
		fireEvent.mouseDown(container);
		act(() => { jest.advanceTimersByTime(100); });
		fireEvent.mouseUp(container);
		act(() => { jest.advanceTimersByTime(3000); });
		fireEvent.keyUp(container, { key: 'a' });
		expect(onShortPress).not.toHaveBeenCalled();
		expect(onLongPress).toHaveBeenCalled();
	});
});
