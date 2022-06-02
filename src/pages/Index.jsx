import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';

export default function Index() {
	const navigate = useNavigate();
	const [token, setToken] = useState(localStorage.getItem('tokenGmedia'));
	const [data, setData] = useState([]);
	const [show, setShow] = useState(false);
	const [passProp, setPassProp] = useState('');

	const getData = async () => {
		await axios({
			method: 'post',
			url: '/DemoCase/main/list_karyawan',
			headers: {
				'User-Id': '1',
				'Client-Service': 'gmedia-recruitment',
				'Auth-Key': 'demo-admin',
				Token: token,
			},
			data: { start: 0, count: 10 },
		})
			.then((res) => {
				// console.log(res.data);
				setData(res.data.response);
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		if (!token) navigate('/login');

		getData();
	}, []);

	const handleDelete = async (item) => {
		await axios({
			method: 'post',
			url: '/DemoCase/main/delete_karyawan',
			headers: {
				'User-Id': '1',
				'Client-Service': 'gmedia-recruitment',
				'Auth-Key': 'demo-admin',
				Token: token,
			},
			data: { nip: item },
		})
			.then((res) => {
				console.log(res.data);
				getData();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<>
			<Navbar />
			<Modal show={show} onHide={() => setShow(false)}>
				<Modal.Body>Yakin akan menghapus data ini ?</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={() => setShow(false)}>
						Tidak
					</Button>
					<Button
						variant='primary'
						onClick={() => {
							handleDelete(passProp);
							setShow(false);
						}}
					>
						Ya
					</Button>
				</Modal.Footer>
			</Modal>
			<div className='container px-5 px-lg-0'>
				<div className='mt-3 d-flex gap-2'>
					<h3>Data karyawan</h3>
					<div
						className='fs-4'
						onClick={() => navigate('/add')}
						style={{ cursor: 'pointer', fontWeight: 1000, color: '#72c472' }}
					>
						+
					</div>
				</div>
				<div className='mt-3'>
					<Table striped bordered hover responsive>
						<thead>
							<tr>
								<th className='text-center'>No</th>
								<th className='text-center'>NIP</th>
								<th className='text-center'>Nama</th>
								<th className='text-center'>Alamat</th>
								<th className='text-center'>Aksi</th>
							</tr>
						</thead>
						<tbody>
							{data.map((item, index) => (
								<tr key={item.nip}>
									<td className='text-center'>{index + 1}</td>
									<td className='text-center'>{item.nip}</td>
									<td className='text-center'>{item.nama}</td>
									<td className='text-center'>{item.alamat}</td>
									<td className='text-center d-flex gap-2 justify-content-center'>
										<span
											onClick={() => navigate('edit', { state: item })}
											style={{ cursor: 'pointer', color: 'green' }}
										>
											Edit
										</span>
										<span
											onClick={() => {
												setShow(true);
												setPassProp(item.nip);
											}}
											style={{ cursor: 'pointer', color: 'red' }}
										>
											delete
										</span>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</div>
			</div>
		</>
	);
}
