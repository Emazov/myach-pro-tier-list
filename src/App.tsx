import { Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Guide from './pages/Guide';
import './App.css';

const App = () => {
	return (
		<div className='app'>
			<Routes>
				<Route path='/' element={<Welcome />} />
				<Route path='/guide' element={<Guide />} />
			</Routes>
		</div>
	);
};

export default App;
