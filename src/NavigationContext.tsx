// A quick and dirty wheel reinvention because location routers don't work well on itch.io

import React, { useState } from 'react';

const noop = () => { };

export type NavigationPageId = 'MAIN_MENU' | 'PLAY' | 'CREDITS';


type NavigationContextProps = {
	page: NavigationPageId;
	navigate: (page: NavigationPageId) => void;
};

const defaultContext: NavigationContextProps = {
	page: 'MAIN_MENU',
	navigate: noop
};
export const NavigationContext = React.createContext<NavigationContextProps>(defaultContext);

export const NavigationContextProvider: React.FunctionComponent = ({ children }) => {
	const [page, setPage] = useState(defaultContext.page);

	return (
		<NavigationContext.Provider value={{ page, navigate: setPage }}>
			{children}
		</NavigationContext.Provider>
	);
};

