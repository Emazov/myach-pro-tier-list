import { Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome.page';
import Guide from './pages/Guide.page';
import Game from './pages/Game.page';
import { useEffect } from 'react';
import { UserProvider } from './contexts/UserContext';
import { GameProvider } from './contexts/GameContext';

const App = () => {
	useEffect(() => {
		const webapp = window.Telegram.WebApp;
		webapp.ready();
		webapp.expand();
	}, []);

	return (
		<UserProvider>
			<GameProvider>
				<div className='app h-screen'>
					<Routes>
						<Route path='/' element={<Welcome />} />
						<Route path='/guide' element={<Guide />} />
						<Route path='/game' element={<Game />} />
					</Routes>
				</div>
			</GameProvider>
		</UserProvider>
	);
};

export default App;
