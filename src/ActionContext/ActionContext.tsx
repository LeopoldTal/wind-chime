import React, { useState } from 'react';

const noop = () => { };

type Actions = {
	onShortPress: () => void;
	onLongPress: () => void;
};

type ActionContextProps = Actions & {
	setActions: (actions: Actions) => void;
};

const defaultContext: ActionContextProps = {
	onShortPress: noop,
	onLongPress: noop,
	setActions: noop
};
export const ActionContext = React.createContext<ActionContextProps>(defaultContext);

export const ActionContextProvider: React.FunctionComponent = ({ children }) => {
	const [actions, setActions] = useState({
		onShortPress: noop,
		onLongPress: noop
	});

	return (
		<ActionContext.Provider value={{ ...actions, setActions }}>
			{children}
		</ActionContext.Provider>
	);
};
