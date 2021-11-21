import React from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { MainMenu } from './menus/MainMenu';

const App: React.FunctionComponent = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<MainMenu />} />
		</Routes>
	</BrowserRouter>
);

export default App;
