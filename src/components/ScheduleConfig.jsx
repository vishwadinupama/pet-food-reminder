import React, { useState } from 'react';

const ScheduleConfig = ({ pet, onUpdate, onBack }) => {
    const [time, setTime] = useState('');
    const [startTime, setStartTime] = useState('08:00'); // Default start time for 6h cycle

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
        // Dedup just in case
        const uniqueSchedule = [...new Set(newSchedule)];

        onUpdate({ ...pet, schedule: uniqueSchedule });
    };

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
    };

    return (
        <div className="glass-panel" style={{ animation: 'fadeIn 0.3s ease-in-out', marginBottom: '80px' }}>
            <button
                onClick={onBack}
                style={{
                    background: 'none',
                    color: 'var(--text-secondary)',
                    marginBottom: '10px',
                    padding: '0',
                    cursor: 'pointer',
                    border: 'none',
                    fontSize: '1rem'
                }}
            >
                ← Back
            </button>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                    <h2 style={{ marginBottom: '5px' }}>{pet.name}</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>Manage feeding schedule</p>
                </div>
                <button
                    onClick={logFeeding}
                    style={{
                        background: 'var(--success-color)',
                        color: '#2d3436',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        fontWeight: '600',
                        boxShadow: '0 4px 10px rgba(85, 239, 196, 0.4)',
                        cursor: 'pointer'
                    }}
                >
                    Fed Now! 🍖
                </button>
            </div>

            <div style={{ marginBottom: '30px' }}>
                <h3 style={{ fontSize: '1rem', marginBottom: '10px' }}>Quick Scheduler</h3>
                <div style={{
                    background: 'rgba(255,255,255,0.4)',
                    padding: '15px',
                    borderRadius: '16px',
                    marginBottom: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                }}>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Generate 4 feedings every 6 hours:</p>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input
                            type="time"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            style={{
                                padding: '10px',
                                borderRadius: '10px',
                                border: 'none',
                                background: 'white'
                            }}
                        />
                        <button
                            onClick={apply6HourCycle}
                            style={{
                                background: 'var(--accent-color)',
                                color: 'white',
                                padding: '10px 15px',
                                borderRadius: '10px',
                                fontSize: '0.9rem',
                                flex: 1
                            }}
                        >
                            Apply 6h Cycle
                        </button>
                    </div>
                </div>

                <h3 style={{ fontSize: '1rem', marginBottom: '10px' }}>Scheduled Times</h3>
                <form onSubmit={addTime} style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        style={{
                            flex: 1,
                            padding: '12px',
                            borderRadius: '12px',
                            background: 'rgba(255,255,255,0.5)'
                        }}
                    />
                    <button
                        type="submit"
                        style={{
                            background: 'var(--text-primary)',
                            color: 'white',
                            borderRadius: '12px',
                            padding: '0 20px'
                        }}
                    >
                        Add
                    </button>
                </form>

                {!pet.schedule || pet.schedule.length === 0 ? (
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>No times set yet.</p>
                ) : (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        {pet.schedule.map((t, index) => (
                            <div
                                key={index}
                                style={{
                                    background: 'white',
                                    padding: '8px 12px',
                                    borderRadius: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                                }}
                            >
                                <span>{t}</span>
                                <button
                                    onClick={() => removeTime(t)}
                                    style={{
                                        background: '#ff7675',
                                        color: 'white',
                                        borderRadius: '50%',
                                        width: '20px',
                                        height: '20px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '12px',
                                        border: 'none',
                                        cursor: 'pointer',
                                        marginLeft: '5px'
                                    }}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div>
                <h3 style={{ fontSize: '1rem', marginBottom: '10px' }}>Recent Feedings</h3>
                {!pet.feedings || pet.feedings.length === 0 ? (
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>No feeding history yet.</p>
                ) : (
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {pet.feedings.map((timestamp, index) => (
                            <li
                                key={index}
                                style={{
                                    padding: '10px',
                                    borderBottom: '1px solid rgba(0,0,0,0.05)',
                                    fontSize: '0.9rem',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <span>{formatDate(timestamp)}</span>
                                <span style={{ color: 'var(--success-color)', fontWeight: 'bold' }}>✓</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ScheduleConfig;
