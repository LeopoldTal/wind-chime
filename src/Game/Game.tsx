import React, { useCallback, useContext, useEffect, useState } from 'react';
import { ActionContext } from '../ActionContext/ActionContext';
import { NavigationContext } from '../NavigationContext';
import { playChime } from '../sound/sound-service';
import { SoundPlayer } from '../sound/SoundPlayer';
import { Ending, getFirstStep, getNextStep, isEnding, Phrase } from './game-script';
import './game.css';

export const Game: React.FunctionComponent = () => {
	const { setActions } = useContext(ActionContext);
	const { navigate } = useContext(NavigationContext);
	// keep all state together so we can batch async updates. TODO: is there a nicer way?
	const [{ step, gameState, currentPhraseIndex }, setState] = useState({
		...getFirstStep(),
		currentPhraseIndex: 0
	});

	console.debug('render Game', { ...step }, { ...gameState }, currentPhraseIndex);

	const onPhraseEnd = () => {
		if (isEnding(step)) {
			return;
		}
		if (currentPhraseIndex < step.phrases.length - 1) {
			setState({ step, gameState, currentPhraseIndex: currentPhraseIndex + 1 });
		} else {
			goToNextStep(false);
		}
	};

	const goToNextStep = useCallback((wasDistracted: boolean) => {
		if (isEnding(step)) {
			return;
		}
		const nextStep = getNextStep(step, gameState, wasDistracted);
		setState({ ...nextStep, currentPhraseIndex: 0 });
	}, [step, gameState]);

	const ringChime = useCallback(() => {
		playChime();
		goToNextStep(true);
	}, [goToNextStep]);

	const pause = useCallback(() => {
		if (isEnding(step)) {
			navigate('MAIN_MENU');
		} else {
			console.log('TODO: pause');
		}
	}, [step, navigate]);

	useEffect(() => {
		setActions({ onShortPress: ringChime, onLongPress: pause });
	}, [ringChime, pause, setActions]);

	return (
		<div className="game-screen">
			{isEnding(step) ? (
				<EndingScreen {...step} />
			) : (
				<ScenePhraseScreen
					{...step.phrases[currentPhraseIndex]}
					onPhraseEnd={onPhraseEnd}
				/>
			)}
		</div>
	);
};

type ScenePhraseScreenProps = Phrase & {
	onPhraseEnd: () => void;
};
const ScenePhraseScreen: React.FunctionComponent<ScenePhraseScreenProps> = ({
	text,
	soundFile,
	onPhraseEnd
}) => (
	(
		<div className="scene-screen">
			<p>{text}</p>
			<SoundPlayer soundFileName={soundFile} onEnd={onPhraseEnd} />
			<footer>
				Tap to ring the chimes.
			</footer>
		</div>
	)
);

const EndingScreen: React.FunctionComponent<Ending> = ({
	title,
	text,
	soundFile
}) => (
	<div className="ending-screen">
		<h1>{title}</h1>
		<p>{text}</p>
		<SoundPlayer soundFileName={soundFile} />
		<footer>
			Hold to go back to the menu.
		</footer>
	</div>
);
