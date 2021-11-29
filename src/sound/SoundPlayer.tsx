import React, { useEffect } from 'react';

const getSoundUrl = (soundFileName: string) => `/sound-voice/${soundFileName}.mp3`;

type SoundPlayerProps = {
	soundFileName: string;
	onEnd?: () => void;
};

export const SoundPlayer: React.FunctionComponent<SoundPlayerProps> = ({
	soundFileName,
	onEnd
}) => {
	useEffect(() => {
		const audio = new Audio(getSoundUrl(soundFileName));
		const play = audio.play.bind(audio);
		const pause = audio.pause.bind(audio);
		audio.addEventListener('canplaythrough', play);
		if (onEnd) {
			audio.addEventListener('ended', onEnd);
		}
		return () => {
			audio.removeEventListener('canplaythrough', play);
			if (onEnd) {
				audio.addEventListener('ended', onEnd);
			}
			pause();
		};
	});

	return null;
};
