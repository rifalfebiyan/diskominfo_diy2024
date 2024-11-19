import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterForm = () => {
    const navigate = useNavigate();
    const [agencies, setAgencies] = useState([]);
    const [user, setUser ] = useState({
        name: '',
        nip: '',
        email: '',
        password: '',
        phone: '',
        agency_id: 1,
        role: 'spectator' // Nilai default untuk role
    });

    useEffect(() => {
        fetchAgencies();
        // Mengubah latar belakang halaman menjadi merah
        document.body.style.backgroundColor = 'red';
        
        // Mengembalikan latar belakang ke default saat komponen dibongkar
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, []);

    const fetchAgencies = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/agencies', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setAgencies(response.data); // Menyimpan data instansi ke state
        } catch (error) {
            console.error('Error fetching agencies:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser (prev => ({
            ...prev,
            [name]: name === 'agency_id' ? parseInt(value, 10) : value
        }));
    
        // Jika nama adalah "Tamu", otomatis set agency_id
        if (name === 'name' && value === 'Tamu') {
            const tamuAgency = agencies.find(agency => agency.name === 'Tamu');
            if (tamuAgency) {
                setUser (prev => ({
                    ...prev,
                    agency_id: tamuAgency.id // Set ID instansi Tamu
                }));
            } else {
                setUser (prev => ({
                    ...prev,
                    agency_id:1 // Reset jika tidak ditemukan
                }));
            }
        }
    
        // Jika agency_id tidak diisi, set ke nilai default
        if (name === 'agency_id' && value === "") {
            setUser (prev => ({
                ...prev,
                agency_id: 1 // Set ke ID instansi default, misalnya 1
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Pastikan semua field diisi
        if (!user.name || !user.nip || !user.email || !user.password || !user.phone) {
            alert('Semua field harus diisi!');
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:8080/api/register', {
                ...user,
                n_ip: user.nip, // Pastikan n_ip diisi dengan nilai yang sesuai
                role: 'spectator' // Pastikan role tetap 'spectator'
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.status === 201) {
                alert('User  berhasil terdaftar');
                // Reset form setelah pendaftaran berhasil
                setUser ({
                    name: '',
                    nip : '',
                    email: '',
                    phone: '',
                    password: ''
                });
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('Terjadi kesalahan saat mendaftar. Silakan coba lagi.');
        }
    };

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "linear-gradient(to bottom right, #FF6B6B, #FF4D4D)", // Lebih merah
            }}
        >
            <div
                style={{
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "15px",
                    width: "350px",
                    maxWidth: "85%",
                    boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
                    textAlign: "center",
                }}
            >
                <img
                    src="/diskominfo_logo.png"
                    alt="Logo"
                    style={{
                        marginBottom: "15px",
                        width: "70px",
                        height: "70px",
                        objectFit: "contain",
                    }}
                />
                <h2
                    style={{
                        color: "#B91C1C",
                        fontWeight: "bold",
                        fontSize: "18px",
                        marginBottom: "20px",
                    }}
                >
                    REGISTRASI BUKU TAMU
                </h2>
                
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Nama *"
                        style={{
                            width: "100%",
                            padding: "8px",
                            margin: "6px 0",
                            borderRadius: "8px",
                            border: "1px solid #D1D5DB",
                            fontSize: "14px",
                            fontFamily: " Arial, sans-serif",
                        }}
                        name="name"
                        value={user.name}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        placeholder="NIP *"
                        style={{
                            width: "100%",
                            padding: "8px",
                            margin: "6px 0",
                            borderRadius: "8px",
                            border: "1px solid #D1D5DB",
                            fontSize: "14px",
                            fontFamily: "Arial, sans-serif",
                        }}
                        name="nip"
                        value={user.nip}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email *"
                        style={{
                            width: "100%",
                            padding: "8px",
                            margin: "6px 0",
                            borderRadius: "8px",
                            border: "1px solid #D1D5DB",
                            fontSize: "14px",
                            fontFamily: "Arial, sans-serif",
                        }}
                        name="email"
                        value={user.email}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password *"
                        style={{
                            width: "100%",
                            padding: "8px",
                            margin: "6px 0",
                            borderRadius: "8px",
                            border: "1px solid #D1D5DB",
                            fontSize: "14px",
                            fontFamily: "Arial, sans-serif",
                        }}
                        name="password"
                        value={user.password}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="tel"
                        placeholder="No HP *"
                        style={{
                            width: "100%",
                            padding: "8px",
                            margin: "6px 0",
                            borderRadius: "8px",
                            border: "1px solid #D1D5DB",
                            fontSize: "14px",
                            fontFamily: "Arial, sans-serif",
                        }}
                        name="phone"
                        value={user.phone}
                        onChange={handleInputChange}
                        required
                    />
                    
                    <button
                        type="submit"
                        style={{
                            width: "100%",
                            padding: "10px",
                            backgroundColor: "#B91C1C",
                            color: "white",
                            borderRadius: "6px",
                            border: "none",
                            fontSize: "14px",
                            fontWeight: "bold",
                            cursor: "pointer",
                            marginTop: "10px",
                            fontFamily: "Arial, sans-serif",
                        }}
                    >
                        Daftar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;