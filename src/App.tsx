import React from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Credits } from './Credits/Credits';
import { MainMenu } from './menus/MainMenu';

const App: React.FunctionComponent = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<MainMenu />} />
			<Route path="/credits" element={<Credits />} />
		</Routes>
	</BrowserRouter>
);

export default App;
