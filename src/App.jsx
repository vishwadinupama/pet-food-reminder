import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import PetList from './components/PetList';
import AddPetForm from './components/AddPetForm';
import ScheduleConfig from './components/ScheduleConfig';

function App() {
  const [pets, setPets] = useState(() => {
    const saved = localStorage.getItem('pets');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeTab, setActiveTab] = useState('pets');
  const [selectedPet, setSelectedPet] = useState(null);

  useEffect(() => {
    localStorage.setItem('pets', JSON.stringify(pets));
  }, [pets]);

  // Reminder Logic
  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }

    const checkReminders = () => {
      const now = new Date();
      const currentTime = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

      pets.forEach(pet => {
        if (pet.schedule && pet.schedule.includes(currentTime)) {
          const lastFedKey = `${pet.id}-${currentTime}-${now.toDateString()}`;
          if (!localStorage.getItem(lastFedKey)) {
            new Notification(`Time to feed ${pet.name}!`, {
              body: `It's ${currentTime}. Grab the ${pet.type === 'Dog' ? 'kibble' : 'food'}!`,
              icon: '/vite.svg'
            });
            localStorage.setItem(lastFedKey, 'true');
          }
        }
      });
    };

    const interval = setInterval(checkReminders, 1000 * 60);
    checkReminders();
    return () => clearInterval(interval);
  }, [pets]);

  const addPet = (petData) => {
    const newPet = { ...petData, id: Date.now(), feedings: [], schedule: [] };
    setPets([...pets, newPet]);
    setActiveTab('pets');
  };

  const updatePet = (updatedPet) => {
    setPets(pets.map(p => p.id === updatedPet.id ? updatedPet : p));
    setSelectedPet(updatedPet);
  };

  const deletePet = (id) => {
    setPets(pets.filter(p => p.id !== id));
    if (selectedPet && selectedPet.id === id) setSelectedPet(null);
  };

  const handleTabChange = (tab) => {
    if (tab === 'add') {
      setSelectedPet(null);
    }
    setActiveTab(tab);
    // If switching away from settings/add, ensure we clear selected pet if desired, 
    // but here we just want to ensure 'add' opens the form.
  };

  // View Routing
  let content;
  if (activeTab === 'add') {
    content = <AddPetForm onAdd={addPet} onCancel={() => setActiveTab('pets')} />;
  } else if (selectedPet) {
    content = (
      <ScheduleConfig
        pet={selectedPet}
        onUpdate={updatePet}
        onBack={() => setSelectedPet(null)}
      />
    );
  } else if (activeTab === 'pets') {
    content = pets.length === 0 ? (
      <div className="glass-panel" style={{ textAlign: 'center', padding: '40px 20px', marginTop: '50px' }}>
        <p style={{ fontSize: '3rem', marginBottom: '10px', filter: 'grayscale(0.5)' }}>🐾</p>
        <h3 style={{ marginBottom: '5px' }}>No pets yet</h3>
        <p style={{ color: 'var(--text-secondary)' }}>Tap the <span style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>+</span> button below to start!</p>
      </div>
    ) : (
      <PetList pets={pets} onDelete={deletePet} onSelect={setSelectedPet} />
    );
  } else {
    content = (
      <div className="glass-panel" style={{ textAlign: 'center', padding: '20px' }}>
        <h2>Settings</h2>
        <p style={{ color: 'var(--text-secondary)' }}>More features coming soon!</p>
      </div>
    );
  }

  return (
    <Layout activeTab={activeTab} onTabChange={handleTabChange}>
      {content}
    </Layout>
  );
}

export default App;
