import React, { useState } from 'react';

const AddPetForm = ({ onAdd, onCancel }) => {
    const [name, setName] = useState('');
    const [type, setType] = useState('Dog');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) return;

        onAdd({ name, type });
        setName('');
        setType('Dog');
    };

    return (
        <div className="glass-panel" style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
            <h2 style={{ marginBottom: '15px', color: 'var(--text-primary)' }}>Add New Pet</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-secondary)' }}>Pet Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '12px',
                            border: 'none',
                            background: 'rgba(255,255,255,0.5)',
                            marginBottom: '10px'
                        }}
                        placeholder="e.g. Fluffy"
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-secondary)' }}>Type</label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '12px',
                            border: 'none',
                            background: 'rgba(255,255,255,0.5)'
                        }}
                    >
                        <option value="Dog">Dog</option>
                        <option value="Cat">Cat</option>
                        <option value="Bird">Bird</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                    <button
                        type="button"
                        onClick={onCancel}
                        style={{
                            padding: '10px 20px',
                            borderRadius: '12px',
                            background: 'transparent',
                            color: 'var(--text-secondary)'
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="primary-btn"
                        style={{
                            padding: '10px 20px',
                            borderRadius: '12px',
                            background: 'var(--accent-color)',
                            color: 'white',
                            boxShadow: '0 4px 14px 0 rgba(255, 118, 117, 0.39)'
                        }}
                    >
                        Add Pet
                    </button>
                </div>
            </form>
            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
};

export default AddPetForm;
