import React from 'react';

const PetList = ({ pets, onDelete, onSelect }) => {
    if (pets.length === 0) return null;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {pets.map(pet => (
                <div
                    key={pet.id}
                    className="glass-panel"
                    onClick={() => onSelect(pet)}
                    style={{
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '0',
                        transition: 'transform 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    <div>
                        <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{pet.name}</h3>
                        <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{pet.type}</span>
                    </div>
                    <button
                        onClick={(e) => { e.stopPropagation(); onDelete(pet.id); }}
                        style={{
                            background: 'rgba(255, 118, 117, 0.1)',
                            color: 'var(--accent-color)',
                            padding: '8px 12px',
                            borderRadius: '8px'
                        }}
                    >
                        Remove
                    </button>
                </div>
            ))}
        </div>
    );
};

export default PetList;
