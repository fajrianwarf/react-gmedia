import axios from 'axios';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Login() {
	const navigate = useNavigate();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();

		await axios({
			method: 'post',
			url: '/DemoCase/auth/login',
			headers: {
				'Client-Service': 'gmedia-recruitment',
				'Auth-Key': 'demo-admin',
			},
			data: { username, password },
		})
			.then((res) => {
				// console.log('Data :', res.data);
				if (res.data.metadata.status === 200) {
					localStorage.setItem('tokenGmedia', res.data.response.token);
					navigate('/');
				}
			})
			.catch((err) => console.log('Error :', err));
	};

	return (
		<div className='container d-flex justify-content-center'>
			<div className='d-flex vh-100 flex-column justify-content-center align-items-center'>
				<img
					src={require('../assets/gmedia.png')}
					alt='gmedia'
					style={{ width: 200 }}
				/>
				<Form onSubmit={(e) => handleSubmit(e)}>
					<Form.Control
						type='text'
						className='mb-2 text-center'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder='Username'
					/>
					<Form.Control
						type='password'
						className='mb-2 text-center'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder='Password'
					/>
					<Button variant='primary' type='submit' className='w-100'>
						LOGIN
					</Button>
				</Form>
			</div>
		</div>
	);
}
