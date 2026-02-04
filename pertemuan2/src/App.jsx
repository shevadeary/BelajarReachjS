import React, { useState, useEffect } from "react";
import "./App.css";

function ItemTugas({ data, onHapus }) {
	return (
		<div className='todo-card'>
			<button className='delete-btn' onClick={() => onHapus(data.id)}>
				×
			</button>
			<div className='card-top'>
				<h3>{data.tugas}</h3>
				<span className='tag'>{data.kategori}</span>
			</div>
			<div className='divider' />
			<div className='card-bottom'>
				<p>
					<strong>Deadline:</strong> {data.deadline}
				</p>
				<p>
					<strong>Level:</strong> {data.prioritas}
				</p>
			</div>
		</div>
	);
}

function ModalInput({ tutup, simpan }) {
	const aksiSimpan = (e) => {
		e.preventDefault();
		const form = new FormData(e.target);

		const dataBaru = {
			id: Date.now(),
			tugas: form.get("tugas"),
			deadline: form.get("deadline"),
			kategori: form.get("kategori"),
			prioritas: form.get("prioritas"),
		};

		simpan(dataBaru);
		tutup();
	};

	return (
		<div className='gelap'>
			<div className='kotak-modal'>
				<h3>Tambah List Baru</h3>
				<form onSubmit={aksiSimpan}>
					<input
						name='tugas'
						placeholder='Lagi mau ngerjain apa?'
						required
					/>
					<input type='date' name='deadline' required />
					<select name='kategori'>
						<option>Coding </option>
						<option>Tugas Sekolah </option>
						<option>Main </option>
						<option>Olahraga </option>
					</select>
					<select name='prioritas'>
						<option>Urgent </option>
						<option>Biasa Aja </option>
						<option>Santai </option>
					</select>
					<div className='tombol-area'>
						<button type='submit' className='btn-ok'>
							Gass Simpan
						</button>
						<button
							type='button'
							onClick={tutup}
							className='btn-no'>
							Batal
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default function App() {
	const [buka, setBuka] = useState(false);

	const [list, setList] = useState(() => {
		const dataKesimpan = localStorage.getItem("LIST_TUGAS_SAYA");
		return dataKesimpan
			? JSON.parse(dataKesimpan)
			: [
					{
						id: 1,
						tugas: "Contoh: Selesaiin Tugas React",
						deadline: "2024-02-10",
						kategori: "Coding 💻",
						prioritas: "Urgent 🔥",
					},
				];
	});

	useEffect(() => {
		localStorage.setItem("LIST_TUGAS_SAYA", JSON.stringify(list));
	}, [list]);

	const tambahData = (baru) => {
		setList([baru, ...list]);
	};

	const hapusData = (id) => {
		if (window.confirm("Yakin mau hapus tugas ini?")) {
			setList(list.filter((it) => it.id !== id));
		}
	};

	return (
		<div className='wadah'>
			<header>
				<div className='logo-area'>
					<h1>GasNgerjain.</h1>
					<p>Kelola tugas lu biar gak keteteran.</p>
				</div>
				<button onClick={() => setBuka(true)} className='btn-tambah'>
					+ List Baru
				</button>
			</header>

			{}
			{buka && (
				<ModalInput tutup={() => setBuka(false)} simpan={tambahData} />
			)}

			<div className='list-area'>
				{list.length > 0 ? (
					list.map((it) => (
						<ItemTugas key={it.id} data={it} onHapus={hapusData} />
					))
				) : (
					<p className='kosong'>
						Belum ada tugas. Santai dulu atau tambah baru!
					</p>
				)}
			</div>
		</div>
	);
}
