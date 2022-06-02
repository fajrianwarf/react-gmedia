import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar as NavbarBT } from 'react-bootstrap';

export default function Navbar() {
	const navigate = useNavigate();
	const [token, setToken] = useState(localStorage.getItem('tokenGmedia'));

	const logout = () => {
		if (token) localStorage.removeItem('tokenGmedia');
		navigate('/login');
	};

	return (
		<div>
			<NavbarBT style={{ backgroundColor: '#f7c325' }}>
				<div className='container px-5 px-lg-0'>
					<div className='d-flex align-items-center justify-content-between w-100'>
						<Link to={'/'}>
							<img
								src={require('../assets/gmedia.png')}
								alt='gmedia'
								style={{ width: 100 }}
							/>
						</Link>
						<div
							className='text-white fw-bold'
							style={{ cursor: 'pointer' }}
							onClick={() => logout()}
						>
							Logout
						</div>
					</div>
				</div>
			</NavbarBT>
		</div>
	);
}
