import React, { useState } from 'react';
import { motion } from 'framer-motion';

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
        <motion.div
            className="glass-panel"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.5 }}
        >
            <h2 style={{ marginBottom: '20px', color: 'var(--text-primary)' }}>Add New Pet</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '600' }}>Pet Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="glass-input"
                        style={{ width: '100%', padding: '16px' }}
                        placeholder="e.g. Fluffy"
                        autoFocus
                    />
                </div>

                <div style={{ marginBottom: '30px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '600' }}>Type</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        {['Dog', 'Cat', 'Bird', 'Other'].map((t) => (
                            <button
                                key={t}
                                type="button"
                                onClick={() => setType(t)}
                                style={{
                                    padding: '12px',
                                    borderRadius: '12px',
                                    border: type === t ? '2px solid var(--accent-color)' : '1px solid transparent',
                                    background: type === t ? 'rgba(108, 92, 231, 0.1)' : 'rgba(255,255,255,0.4)',
                                    color: type === t ? 'var(--accent-color)' : 'var(--text-secondary)',
                                    fontWeight: type === t ? '700' : '400',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '15px' }}>
                    <button
                        type="button"
                        onClick={onCancel}
                        style={{
                            flex: 1,
                            padding: '16px',
                            borderRadius: '16px',
                            background: 'transparent',
                            color: 'var(--text-secondary)',
                            fontWeight: '600'
                        }}
                    >
                        Cancel
                    </button>
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                            flex: 2,
                            padding: '16px',
                            borderRadius: '16px',
                            background: 'var(--accent-color)',
                            color: 'white',
                            fontWeight: '700',
                            boxShadow: '0 8px 20px rgba(108, 92, 231, 0.3)'
                        }}
                    >
                        Add Pet
                    </motion.button>
                </div>
            </form>
        </motion.div>
    );
};

export default AddPetForm;
