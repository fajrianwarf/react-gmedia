import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Add from './pages/Add';
import Edit from './pages/Edit';
import Index from './pages/Index';
import Login from './pages/Login';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Index />} />
				<Route path='/login' element={<Login />} />
				<Route path='/add' element={<Add />} />
				<Route path='/edit' element={<Edit />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
