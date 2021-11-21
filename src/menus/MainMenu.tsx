import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { InputListener } from '../InputListener/InputListener';
import './MainMenu.css';
import './menus.css';

type MenuRoute = {
	label: string;
	to: string;
};

const MENU_LINKS: MenuRoute[] = [
	{ to: '/play', label: 'Start game' },
	{ to: '/credits', label: 'Credits' },
];

export const MainMenu: React.FunctionComponent = () => {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const navigate = useNavigate();

	const selectLink = (linkIndex: number) => {
		setSelectedIndex(linkIndex);
		// TODO: focus link
	};

	const next = () => {
		selectLink((selectedIndex + 1) % MENU_LINKS.length);
	};

	const openLink = () => {
		const { to } = MENU_LINKS[selectedIndex];
		navigate(to);
	};

	return (
		<div className="main-menu-screen">
			<h1 className="main-title">Wind Chime</h1>
			<h2 className="main-subtitle">A one-button game</h2>
			
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
			
			<InputListener onShortPress={next} onLongPress={openLink} />
		</div>
	);
};
