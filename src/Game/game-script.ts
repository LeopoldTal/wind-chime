import { GameState, getBlankState } from './game-state';

export type Ending = {
	// TODO: explicit numbering?
	title: string;
	text: string;
	soundFile: string;
};

export type Phrase = {
	text: string;
	soundFile: string;
};

type SceneTransition = ((state: GameState) => string) | {
	proceed: string;
	distract: string;
};

export type Scene = {
	phrases: Phrase[];
	stateChanges?: Partial<GameState>;
	next: SceneTransition;
};

type GameStep = Scene | Ending;

const bigDecision: SceneTransition = ({ happyMemories, sadMemories }: GameState) =>
	happyMemories >= sadMemories ? 'MARRY' : 'BREAKUP';

const GAME_SCRIPT: { [sceneId: string]: GameStep } = {
	START: {
		phrases: [
			{
				text: 'The wind is blowing tonight.',
				soundFile: '1'
			},
			{
				text: 'These wind chimes keep distracting me.',
				soundFile: '2'
			},
			{
				text: 'As I try to go to sleep, they keep my thoughts circling round and round.',
				soundFile: '3'
			},
			{
				text: 'They turn back to my first year at uni.',
				soundFile: '4'
			},
			{
				text: 'That\'s when I met Alex.',
				soundFile: '5'
			},
		],
		next: {
			proceed: 'MEETSAD',
			distract: 'SURPRISE'
		}
	},
	MEETSAD: {
		phrases: [
			{
				text: 'He was late for class so he started sprinting down the hallway.',
				soundFile: '6'
			},
			{
				text: 'He ran full-tilt into me!',
				soundFile: '7'
			},
			{
				text: 'I dropped a whole pile of books.',
				soundFile: '8'
			},
			{
				text: 'He didn\'t even stop, let alone help me pick them up.',
				soundFile: '9'
			},
			{
				text: 'Man, was I cheesed off.',
				soundFile: '10'
			},
		],
		next: {
			proceed: 'FIRSTCONVO',
			distract: 'SURPRISE',
		},
		stateChanges: { sadMemories: 1 },
	},
	FIRSTCONVO: {
		phrases: [
			{
				text: 'I saw him again a week later at lunch.',
				soundFile: '11'
			},
			{
				text: 'He came up to me to apologise.',
				soundFile: '12'
			},
			{
				text: 'He sat by me and we talked up a storm.',
				soundFile: '13'
			},
			{
				text: 'What did we talk about, again…?',
				soundFile: '14'
			},
		],
		next: {
			proceed: 'LONGCHAT',
			distract: 'FIRSTDATE',
		},
		stateChanges: { happyMemories: 1 },
	},
	LONGCHAT: {
		phrases: [
			{
				text: 'Ah yes, of course! We talked about music.',
				soundFile: '15'
			},
			{
				text: 'We\'ve never left each other\'s side ever since.',
				soundFile: '16'
			},
		],
		next: {
			proceed: 'SLEEP',
			distract: 'BANDFIGHT'
		},
		stateChanges: { happyMemories: 1 },
	},
	FIRSTDATE: {
		phrases: [
			{
				text: 'Was that technically our first date? Does it count?',
				soundFile: '17'
			},
			{
				text: 'I\'d say our first real date was when we first kissed…',
				soundFile: '18'
			},
			{
				text: 'Look at me, being such a big sappy romantic.',
				soundFile: '19'
			},
		],
		next: bigDecision
	},
	SURPRISE: {
		phrases: [
			{
				text: 'What was that?',
				soundFile: '20'
			},
			{
				text: 'Oh right, the chimes again.',
				soundFile: '21'
			},
			{
				text: 'I remember when Alex bought me these chimes.',
				soundFile: '22'
			},
			{
				text: 'He\'s always been so sweet, spoiling me with so many presents…',
				soundFile: '23'
			},
			{
				text: 'I\'m really lucky to have him.',
				soundFile: '24'
			},
		],
		next: {
			proceed: 'COLDFIGHT',
			distract: 'MUSIC',
		},
		stateChanges: { happyMemories: 1 },
	},
	COLDFIGHT: {
		phrases: [
			{
				text: 'Even though we do fight sometimes.',
				soundFile: '25'
			},
			{
				text: 'Last time we fought, he gave me the cold shoulder for days!',
				soundFile: '26'
			},
			{
				text: 'Then after we made up, he kept me up all night talking.',
				soundFile: '27'
			},
			{
				text: 'I don\'t even remember what about.',
				soundFile: '28'
			},
		],
		next: {
			proceed: 'LONGCHAT',
			distract: 'BANDFIGHT',
		},
		stateChanges: { sadMemories: 1 },
	},
	MUSIC: {
		phrases: [
			{
				text: 'The chimes are getting kind of noisy.',
				soundFile: '29'
			},
			{
				text: 'Lovely, though.',
				soundFile: '30'
			},
			{
				text: 'Alex always loved music.',
				soundFile: '31'
			},
			{
				text: 'He plays the guitar so beautifully.',
				soundFile: '32'
			},
			{
				text: 'It\'s such a joy to listen to him.',
				soundFile: '33'
			},
		],
		next: {
			proceed: 'BANDFIGHT',
			distract: 'TOOMUCHNOISE',
		},
		stateChanges: { happyMemories: 1 },
	},
	BANDFIGHT: {
		phrases: [
			{
				text: 'He works so hard to be good at guitar.',
				soundFile: '34'
			},
			{
				text: 'That takes up all his time, really.',
				soundFile: '35'
			},
			{
				text: 'I feel sort of neglected…',
				soundFile: '36'
			},
		],
		next: bigDecision,
		stateChanges: { sadMemories: 1 }
	},
	TOOMUCHNOISE: {
		phrases: [
			{
				text: 'Ugh, those chimes again!',
				soundFile: '37'
			},
			{
				text: 'I\'d better take them down, or I\'ll never go to sleep.',
				soundFile: '38'
			}
		],
		next: () => 'SILENCE'
	},
	SLEEP: {
		title: 'Zzzz…',
		text: 'Finally, I\'m falling asleep.',
		soundFile: '39'
	},
	SILENCE: {
		title: 'No more chimes!',
		text: 'Finally, I can get some rest.',
		soundFile: '40'
	},
	MARRY: {
		title: 'We\'ve had our ups and downs…',
		text: 'But so many good times. It\'s time… I\'m going to propose to him.',
		soundFile: '41'
	},
	BREAKUP: {
		title: 'We seem to fight a lot…',
		text: 'Good times too, but does that really matter? It\'s time… I\'m going to leave him.',
		soundFile: '42'
	}
};

const MISSING_SCENE: Ending = {
	title: 'Oops!',
	text: 'You found a missing scene. Please report this bug!',
	soundFile: '43'
};

const getStepByName = (name: string): GameStep => {
	if (GAME_SCRIPT.hasOwnProperty(name)) {
		return GAME_SCRIPT[name];
	}
	return MISSING_SCENE;
};

type GameTransition = {
	step: GameStep,
	gameState: GameState,
};

const getNextState = (
	scene: Scene,
	gameState: GameState,
	wasDistracted: boolean
): GameState => {
	if (wasDistracted) {
		return gameState;
	}
	const stateChanges: GameState = {
		happyMemories: 0,
		sadMemories: 0,
		...scene.stateChanges
	};
	const newState: GameState = {
		happyMemories: gameState.happyMemories + stateChanges.happyMemories,
		sadMemories: gameState.sadMemories + stateChanges.sadMemories,
	};
	return newState;
};

export const getFirstStep = (): GameTransition => ({
	step: GAME_SCRIPT.START,
	gameState: getBlankState()
});

export const getNextStep = (
	scene: Scene,
	gameState: GameState,
	wasDistracted: boolean
): GameTransition => {
	const newState = getNextState(scene, gameState, wasDistracted);
	const newId = typeof scene.next == 'function'
		? scene.next(newState)
		: scene.next[wasDistracted ? 'distract' : 'proceed'];
	const newStep = getStepByName(newId);

	return {
		step: newStep,
		gameState: newState
	};
};

export const isEnding = (step: GameStep): step is Ending => !step.hasOwnProperty('next');
