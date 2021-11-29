import React from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { ActionContextProvider } from './ActionContext/ActionContext';
import { Credits } from './Credits/Credits';
import { Game } from './Game/Game';
import { InputListener } from './InputListener/InputListener';
import { MainMenu } from './menus/MainMenu';

const App: React.FunctionComponent = () => (
	<ActionContextProvider>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<MainMenu />} />
				<Route path="/play" element={<Game />} />
				<Route path="/credits" element={<Credits />} />
			</Routes>
		</BrowserRouter>
		<InputListener />
	</ActionContextProvider>
);

export default App;
