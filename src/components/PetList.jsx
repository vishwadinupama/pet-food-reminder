import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, ChevronRight } from 'lucide-react';

const PetList = ({ pets, onDelete, onSelect }) => {
    if (pets.length === 0) return null;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {pets.map((pet, index) => (
                <motion.div
                    key={pet.id}
                    className="glass-panel"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, type: "spring", stiffness: 300, damping: 24 }}
                    onClick={() => onSelect(pet)}
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.8)' }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '0',
                        padding: '24px',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    {/* Decorative background circle */}
                    <div style={{
                        position: 'absolute',
                        right: '-20px',
                        top: '-20px',
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: 'var(--accent-color)',
                        opacity: 0.1,
                        pointerEvents: 'none'
                    }} />

                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '15px',
                            background: 'linear-gradient(135deg, var(--accent-color), var(--accent-hover))',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '24px'
                        }}>
                            {pet.type === 'Dog' ? '🐶' : pet.type === 'Cat' ? '🐱' : pet.type === 'Bird' ? '🐦' : '🐾'}
                        </div>
                        <div>
                            <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--text-primary)' }}>{pet.name}</h3>
                            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                {pet.schedule?.length || 0} feedings scheduled
                            </span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <button
                            onClick={(e) => { e.stopPropagation(); onDelete(pet.id); }}
                            style={{
                                background: 'rgba(255, 118, 117, 0.1)',
                                color: 'var(--danger-color)',
                                padding: '10px',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Trash2 size={18} />
                        </button>
                        <ChevronRight size={20} color="var(--text-secondary)" />
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default PetList;
