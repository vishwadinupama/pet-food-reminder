import React from 'react';

const Layout = ({ children, activeTab, onTabChange }) => {
  return (
    <div className="app-container">
      <header className="glass-panel" style={{
        textAlign: 'center',
        padding: '15px',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        borderRadius: '0 0 24px 24px',
        margin: 0,
        backdropFilter: 'blur(20px)'
      }}>
        <h1 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-primary)' }}>
          🐾 Pet Feeder
        </h1>
      </header>

      <main style={{
        paddingTop: '80px',
        paddingBottom: '90px',
        minHeight: '100vh',
        overflowY: 'auto'
      }}>
        {children}
      </main>

      <nav className="glass-panel" style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        margin: 0,
        borderRadius: '24px 24px 0 0',
        padding: '15px 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100
      }}>
        <button
          onClick={() => onTabChange('pets')}
          style={{
            background: 'none',
            color: activeTab === 'pets' ? 'var(--accent-color)' : 'var(--text-secondary)',
            fontWeight: activeTab === 'pets' ? '600' : '400',
            fontSize: '1.5rem'
          }}
        >
          🐶
        </button>

        <button
          onClick={() => onTabChange('add')}
          style={{
            background: 'var(--accent-color)',
            color: 'white',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.8rem',
            boxShadow: '0 4px 15px rgba(255, 118, 117, 0.4)',
            marginTop: '-40px'
          }}
        >
          +
        </button>

        <button
          onClick={() => onTabChange('settings')}
          style={{
            background: 'none',
            color: activeTab === 'settings' ? 'var(--accent-color)' : 'var(--text-secondary)',
            fontWeight: activeTab === 'settings' ? '600' : '400',
            fontSize: '1.5rem'
          }}
        >
          ⚙️
        </button>
      </nav>
    </div>
  );
};

export default Layout;
