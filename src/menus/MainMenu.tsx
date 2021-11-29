import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ActionContext } from '../ActionContext/ActionContext';
import { playChime } from '../sound/sound-service';
import './MainMenu.css';
import './menus.css';

type MenuRoute = {
	label: string;
	to: string;
};

const MENU_LINKS: MenuRoute[] = [
	{ to: '/play', label: 'Start game' },
	/* TODO: controls for:
	- text speed
	- press duration
	- voice volume
	- sfx volume
	- options voiceover
	*/
	{ to: '/credits', label: 'Credits' },
];

export const MainMenu: React.FunctionComponent = () => {
	const { setActions } = useContext(ActionContext);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const navigate = useNavigate();

	const next = useCallback(() => {
		setSelectedIndex((selectedIndex + 1) % MENU_LINKS.length);
		// TODO: focus link
	}, [selectedIndex, setSelectedIndex]);

	const openLink = useCallback(() => {
		const { to } = MENU_LINKS[selectedIndex];
		navigate(to);
		playChime();
	}, [selectedIndex, navigate]);

	useEffect(() => {
		setActions({ onShortPress: next, onLongPress: openLink });
	}, [next, openLink, setActions]);

	return (
		<div className="main-menu-screen">
			<h1 className="main-title">Wind Chime</h1>
			<h2 className="main-subtitle">A one-button, one-minute game</h2>
			
			{/* TODO: controls hint */}
			
			<menu className="menu-list">
				{MENU_LINKS.map(({ to, label }, index) => (
					<li
						key={index}
						className={`menu-list-item ${
							selectedIndex === index ? 'menu-list-item-selected' : ''}`}
					>
						<Link className="menu-link" to={to}>{label}</Link>
					</li>
				))}
			</menu>
		</div>
	);
};
