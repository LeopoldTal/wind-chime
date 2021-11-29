import React from 'react';
import { ActionContextProvider } from './ActionContext/ActionContext';
import { Credits } from './Credits/Credits';
import { Game } from './Game/Game';
import { InputListener } from './InputListener/InputListener';
import { MainMenu } from './menus/MainMenu';
import { NavigationContext, NavigationContextProvider } from './NavigationContext';

const App: React.FunctionComponent = () => (
	<ActionContextProvider>
		<NavigationContextProvider>
			<NavigationContext.Consumer>
				{({ page }) => {
					switch (page) {
						case 'MAIN_MENU':
							return <MainMenu />;
						case 'PLAY':
							return <Game />;
						case 'CREDITS':
							return <Credits />;
						default:
							return <MainMenu />;
					}
				}}
			</NavigationContext.Consumer>
		</NavigationContextProvider>
		<InputListener />
	</ActionContextProvider>
);

export default App;
