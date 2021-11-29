const NB_CHIME_SOUNDS = 18;

const getRandomChimeUrl = () =>
	`./sound-chimes/chimes${1 + Math.floor(NB_CHIME_SOUNDS * Math.random())}.mp3`;

export const playChime = () => {
	const audio = new Audio(getRandomChimeUrl());
	audio.volume = 0.1;
	audio.addEventListener('canplaythrough', () => {
		audio.play();
	});
};
