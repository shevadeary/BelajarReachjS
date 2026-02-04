import React, { useState } from 'react';
import './App.css';

/**
 * 1. Komponen Modal Form (Props: onClose, onSimpan)
 */
function FormTambahTodo({ onClose, onSimpan }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const todoBaru = {
      id: Date.now(),
      tugas: formData.get('tugas'),
      kategori: formData.get('kategori'),
      deadline: formData.get('deadline'),
      prioritas: formData.get('prioritas'),
      status: "Pending"
    };

    onSimpan(todoBaru);
    onClose();
  };

  return (
    <div className='overlay'>
      <div className='modal'>
        <h3>Buat Tugas Baru</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" name="tugas" placeholder="Apa yang ingin dikerjakan?" required />
          <input type="date" name="deadline" required />
          <select name="kategori">
            <option value="💻 Pemrograman">💻 Pemrograman</option>
            <option value="📚 Belajar">📚 Belajar</option>
            <option value="🏠 Rumah">🏠 Rumah</option>
            <option value="🎯 Proyek">🎯 Proyek</option>
          </select>
          <select name="prioritas">
            <option value="Tinggi 🔥">Tinggi 🔥</option>
            <option value="Sedang ⚡">Sedang ⚡</option>
            <option value="Rendah 🟢">Rendah 🟢</option>
          </select>
          <div className="button-group">
            <button type="submit" className="btn-save">Tambahkan</button>
            <button type="button" className="btn-cancel" onClick={onClose}>Batal</button>
          </div>
        </form>
      </div>
    </div>
  );
}

/**
 * 2. Komponen Detail Tugas (Props: data)
 */
function TodoDetail({ data }) {
  return (
    <div className="todo-info-grid">
      <div className="info-item">
        <label>Deadline</label>
        <span>{data.deadline}</span>
      </div>
      <div className="info-item">
        <label>Prioritas</label>
        <span>{data.prioritas}</span>
      </div>
      <div className="info-item">
        <label>Status</label>
        <span className="status-badge">{data.status}</span>
      </div>
    </div>
  );
}

/**
 * 3. Komponen Kartu Todo (Props: item, onHapus)
 */
function TodoCard({ item, onHapus }) {
  return (
    <div className="profile-card todo-card">
      <button className="btn-delete" onClick={() => onHapus(item.id)}>
        &times;
      </button>
      
      <div className="header-section">
        <h1>{item.tugas}</h1>
        <p>{item.kategori}</p>
      </div>
      <div className="divider" />
      
      <TodoDetail data={item} />
    </div>
  );
}

/**
 * 4. Komponen Utama (App)
 */
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listTodo, setListTodo] = useState([
    { 
      id: 1, 
      tugas: "Selesaikan Project React", 
      kategori: "💻 Pemrograman", 
      deadline: "2024-05-20", 
      prioritas: "Tinggi 🔥", 
      status: "In Progress" 
    },
    { 
      id: 2, 
      tugas: "Belajar UI/UX Design", 
      kategori: "🎯 Proyek", 
      deadline: "2024-05-22", 
      prioritas: "Sedang ⚡", 
      status: "Pending" 
    }
  ]);

  const tambahTodo = (todoBaru) => {
    setListTodo([todoBaru, ...listTodo]);
  };

  const hapusTodo = (id) => {
    if (window.confirm("Hapus tugas ini dari daftar?")) {
      setListTodo(listTodo.filter(t => t.id !== id));
    }
  };

  return (
    <div className="app-wrapper">
      {isModalOpen && (
        <FormTambahTodo 
          onClose={() => setIsModalOpen(false)} 
          onSimpan={tambahTodo} 
        />
      )}

      <header className="main-header">
        <h2 className="title-app">My Todo List</h2>
        <button className="btn-main-add" onClick={() => setIsModalOpen(true)}>
          + Buat Tugas Baru
        </button>
      </header>

      <div className="cards-container">
        {listTodo.map((item) => (
          <TodoCard 
            key={item.id} 
            item={item} 
            onHapus={hapusTodo} 
          />
        ))}
      </div>
    </div>
  );
}

export default App;