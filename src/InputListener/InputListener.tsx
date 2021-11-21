import React, { useCallback, useContext, useEffect, useState } from 'react';
import { ActionContext } from '../ActionContext/ActionContext';

const LONG_PRESS_DURATION = 500; // TODO: make this configurable

export const InputListener: React.FunctionComponent = () => {
	const { onShortPress, onLongPress } = useContext(ActionContext);

	const [pressed, setPressed] = useState<string | null>(null);
	const [longPressTimeout, setLongPressTimeout] = useState<number | null>(null);

	const triggerLongPress = useCallback(() => {
		if (longPressTimeout) {
			clearTimeout(longPressTimeout);
		}
		setLongPressTimeout(null);
		onLongPress();
	}, [longPressTimeout, setLongPressTimeout, onLongPress]);

	const startPress = useCallback((newPressed: string) => {
		if (pressed) {
			return;
		}
		setPressed(newPressed);
		const timeout = window.setTimeout(triggerLongPress, LONG_PRESS_DURATION);
		setLongPressTimeout(timeout);
	}, [pressed, setPressed, triggerLongPress]);

	const endPress = useCallback((endPressed: string) => {
		if (pressed !== endPressed) {
			return;
		}
		if (longPressTimeout) {
			clearTimeout(longPressTimeout);
			onShortPress();
		}
		setPressed(null);
		setLongPressTimeout(null);
	}, [pressed, setPressed, longPressTimeout, setLongPressTimeout, onShortPress]);

	const startMousePress = useCallback(() => startPress('click'), [startPress]);
	const endMousePress = useCallback(() => endPress('click'), [endPress]);

	const startKeyPress = useCallback(
		(event: KeyboardEvent) => startPress(event.key),
		[startPress]
	);
	const endKeyPress = useCallback(
		(event: KeyboardEvent) => endPress(event.key),
		[endPress]
	);

	useEffect(() => {
		document.body.addEventListener('mousedown', startMousePress);
		return () => document.body.removeEventListener('mousedown', startMousePress);
	}, [startMousePress]);
	useEffect(() => {
		document.body.addEventListener('mouseup', endMousePress);
		return () => document.body.removeEventListener('mouseup', endMousePress);
	}, [endMousePress]);

	useEffect(() => {
		document.body.addEventListener('touchstart', startMousePress);
		return () => document.body.removeEventListener('touchstart', startMousePress);
	}, [startMousePress]);
	useEffect(() => {
		document.body.addEventListener('touchend', endMousePress);
		return () => document.body.removeEventListener('touchend', endMousePress);
	}, [endMousePress]);

	useEffect(() => {
		document.body.addEventListener('keydown', startKeyPress);
		return () => document.body.removeEventListener('keydown', startKeyPress);
	}, [startKeyPress]);
	useEffect(() => {
		document.body.addEventListener('keyup', endKeyPress);
		return () => document.body.removeEventListener('keyup', endKeyPress);
	}, [endKeyPress]);

	return (
		<div className="input-listener">
			<img
				alt={pressed ? 'press' : ''}
				src="/chimes.png"
			/>
		</div>
	);
};
