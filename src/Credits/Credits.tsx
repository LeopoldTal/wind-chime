import React, { useCallback, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ActionContext } from '../ActionContext/ActionContext';
import './Credits.css';

export const Credits: React.FunctionComponent = () => {
	const { setActions } = useContext(ActionContext);
	const navigate = useNavigate();
	const back = useCallback(() => navigate('/'), [navigate]);

	useEffect(() => {
		setActions({ onShortPress: back, onLongPress: back });
	}, [back, setActions]);

	return (
		<div className="credits">
			<h1>Wind Chime</h1>

			<dl>
				<dt>A game by</dt>
				<dd>Leo "hawkbyte"</dd>

				<dt>Made for</dt>
				<dd>
					<a href="https://itch.io/jam/1-button-jam-2021">1-button jam</a>
				</dd>

				<dt>Wind chime sounds</dt>
				<dd>
					<a href="https://freesound.org/people/giddster/sounds/437337/">giddster</a>,
					Creative Commons 0
				</dd>

				<dt>Source code</dt>
				<dd>TODO: repo link here</dd>
			</dl>
		</div>
	);
};
