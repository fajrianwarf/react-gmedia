import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';

export default function Add() {
	const navigate = useNavigate();
	const [nama, setNama] = useState('');
	const [alamat, setAlamat] = useState('');
	const [tgl_lahir, setTgl_lahir] = useState('');
	const [gender, setGender] = useState('');
	const [token, setToken] = useState(localStorage.getItem('tokenGmedia'));

	const handleGender = (e) => {
		setGender(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		await axios({
			method: 'post',
			url: '/DemoCase/main/add_karyawan',
			headers: {
				'User-Id': '1',
				'Client-Service': 'gmedia-recruitment',
				'Auth-Key': 'demo-admin',
				Token: token,
			},
			data: {
				nama,
				alamat,
				gender,
				tgl_lahir,
			},
		})
			.then((res) => {
				if (res.data.metadata.status === 200) navigate('/');
			})
			.catch((err) => console.log(err));
	};

	return (
		<>
			<Navbar />
			<div className='container px-5 px-lg-0'>
				<h3 className='mt-5 mb-2'>Tambah Data Karyawan</h3>
				<form onSubmit={(e) => handleSubmit(e)}>
					<div className='mt-2'>
						<label htmlFor='name' style={{ width: 100 }}>
							Name
						</label>
						<input
							type='text'
							id='name'
							style={{ width: 300 }}
							value={nama}
							onChange={(e) => setNama(e.target.value)}
						/>
					</div>

					<div className='mt-2'>
						<label
							htmlFor='alamat'
							style={{ width: 100 }}
							className='align-top'
						>
							Alamat
						</label>
						<textarea
							id='alamat'
							style={{ width: 300 }}
							value={alamat}
							onChange={(e) => setAlamat(e.target.value)}
						/>
					</div>

					<div className='mt-2 d-flex align-items-center'>
						<div style={{ width: 100 }}>Jenis Kelamin</div>
						<div className='d-flex gap-2 align-items-center'>
							<input
								type='radio'
								name='gender'
								value='L'
								style={{
									height: 30,
									width: 30,
									accentColor: '#6558f5',
								}}
								onChange={(e) => handleGender(e)}
							/>
							Laki
							<input
								type='radio'
								name='gender'
								value='P'
								style={{
									height: 30,
									width: 30,
									accentColor: '#6558f5',
								}}
								onChange={(e) => handleGender(e)}
							/>
							Perempuan
						</div>
					</div>

					<div className='mt-2'>
						<label htmlFor='date' style={{ width: 100 }} className='align-top'>
							Alamat
						</label>
						<input
							id='date'
							type='date'
							style={{ width: 300 }}
							value={tgl_lahir}
							onChange={(e) => setTgl_lahir(e.target.value)}
						/>
					</div>

					<div>
						<button type='submit' className='btn btn-primary mt-2'>
							SIMPAN
						</button>
					</div>
				</form>
			</div>
		</>
	);
}
