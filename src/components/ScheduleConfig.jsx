import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Trash2, Clock, CheckCircle } from 'lucide-react';

const ScheduleConfig = ({ pet, onUpdate, onBack }) => {
    const [time, setTime] = useState('');
    const [startTime, setStartTime] = useState('08:00');

    const addTime = (e) => {
        e.preventDefault();
        if (!time) return;

        if (pet.schedule && pet.schedule.includes(time)) {
            setTime('');
            return;
        }

        const newSchedule = [...(pet.schedule || []), time].sort();
        onUpdate({ ...pet, schedule: newSchedule });
        setTime('');
    };

    const removeTime = (timeToRemove) => {
        const newSchedule = pet.schedule.filter(t => t !== timeToRemove);
        onUpdate({ ...pet, schedule: newSchedule });
    };

    const logFeeding = () => {
        const now = new Date().toISOString();
        const newFeedings = [now, ...(pet.feedings || [])].slice(0, 50);
        onUpdate({ ...pet, feedings: newFeedings });
    };

    const apply6HourCycle = () => {
        if (!startTime) return;

        const [startHour, startMinute] = startTime.split(':').map(Number);
        const newTimes = [];

        for (let i = 0; i < 4; i++) {
            let hour = (startHour + (i * 6)) % 24;
            const timeString = `${hour.toString().padStart(2, '0')}:${startMinute.toString().padStart(2, '0')}`;
            if (!pet.schedule?.includes(timeString)) {
                newTimes.push(timeString);
            }
        }

        const newSchedule = [...(pet.schedule || []), ...newTimes].sort();
        const uniqueSchedule = [...new Set(newSchedule)];

        onUpdate({ ...pet, schedule: uniqueSchedule });
    };

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
        >
            <button
                onClick={onBack}
                style={{
                    background: 'none',
                    color: 'var(--text-secondary)',
                    marginBottom: '10px',
                    padding: '0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontSize: '1rem'
                }}
            >
                <ArrowLeft size={18} /> Back
            </button>

            <div className="glass-panel" style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h2 style={{ marginBottom: '0px' }}>{pet.name}</h2>
                        <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.5)', padding: '2px 8px', borderRadius: '8px' }}>
                            {pet.type}
                        </span>
                    </div>
                    <motion.button
                        onClick={logFeeding}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            background: 'var(--success-color)',
                            color: 'white',
                            padding: '10px 20px',
                            borderRadius: '16px',
                            fontWeight: '600',
                            boxShadow: '0 4px 15px rgba(0, 184, 148, 0.4)',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        Fed Now! 🍖
                    </motion.button>
                </div>
            </div>

            <div className="glass-panel" style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1rem', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Clock size={16} color="var(--accent-color)" /> Quick Scheduler
                </h3>
                <div style={{
                    background: 'rgba(255,255,255,0.4)',
                    padding: '16px',
                    borderRadius: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                }}>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Generate 4 feedings every 6 hours:</p>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input
                            type="time"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            className="glass-input"
                            style={{ padding: '10px', flex: 1, textAlign: 'center' }}
                        />
                        <button
                            onClick={apply6HourCycle}
                            style={{
                                background: 'var(--accent-color)',
                                color: 'white',
                                padding: '10px 15px',
                                borderRadius: '12px',
                                fontSize: '0.9rem',
                                fontWeight: '600'
                            }}
                        >
                            Apply Cycle
                        </button>
                    </div>
                </div>
            </div>

            <div className="glass-panel" style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1rem', marginBottom: '15px' }}>Scheduled Times</h3>
                <form onSubmit={addTime} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="glass-input"
                        style={{ flex: 1, padding: '12px' }}
                    />
                    <button
                        type="submit"
                        style={{
                            background: 'var(--text-primary)',
                            color: 'white',
                            borderRadius: '12px',
                            padding: '0 20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Plus size={20} />
                    </button>
                </form>

                {!pet.schedule || pet.schedule.length === 0 ? (
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textAlign: 'center', padding: '10px' }}>No times set yet.</p>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '10px' }}>
                        {pet.schedule.map((t, index) => (
                            <motion.div
                                key={index}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                style={{
                                    background: 'white',
                                    padding: '10px',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    boxShadow: '0 2px 5px rgba(0,0,0,0.03)'
                                }}
                            >
                                <span style={{ fontWeight: '500' }}>{t}</span>
                                <button
                                    onClick={() => removeTime(t)}
                                    style={{
                                        color: 'var(--danger-color)',
                                        background: 'rgba(255, 118, 117, 0.1)',
                                        borderRadius: '8px',
                                        width: '24px',
                                        height: '24px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Trash2 size={14} />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            <div className="glass-panel">
                <h3 style={{ fontSize: '1rem', marginBottom: '15px' }}>History</h3>
                {!pet.feedings || pet.feedings.length === 0 ? (
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textAlign: 'center' }}>No feeding history yet.</p>
                ) : (
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {pet.feedings.slice(0, 5).map((timestamp, index) => (
                            <li
                                key={index}
                                style={{
                                    padding: '12px',
                                    borderBottom: index !== pet.feedings.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none',
                                    fontSize: '0.9rem',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <span style={{ color: 'var(--text-primary)' }}>{formatDate(timestamp)}</span>
                                <CheckCircle size={16} color="var(--success-color)" />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </motion.div>
    );
};

export default ScheduleConfig;
