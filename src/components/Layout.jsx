import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Plus, Settings } from 'lucide-react';

const Layout = ({ children, activeTab, onTabChange }) => {
  return (
    <div className="app-container">
      {/* Dynamic Header based on scroll/state could go here, but keeping it clean for now */}

      <main style={{
        paddingTop: '20px',
        paddingBottom: '100px', // Space for bottom nav
        minHeight: '100vh',
        overflowY: 'auto',
        paddingLeft: '20px',
        paddingRight: '20px'
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <nav className="glass-panel" style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        right: '20px',
        margin: 0,
        borderRadius: '24px',
        padding: '12px 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100,
        background: 'rgba(255, 255, 255, 0.85)' // Slightly more opaque for nav
      }}>
        <NavButton
          active={activeTab === 'pets'}
          onClick={() => onTabChange('pets')}
          icon={<Home size={24} />}
          label="Pets"
        />

        <div style={{ position: 'relative', width: '56px', height: '56px' }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onTabChange('add')}
            style={{
              position: 'absolute',
              top: '-28px',
              left: '0',
              background: 'var(--accent-color)',
              color: 'white',
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 20px rgba(108, 92, 231, 0.4)',
              border: '4px solid rgba(255,255,255,0.8)'
            }}
          >
            <Plus size={28} strokeWidth={2.5} />
          </motion.button>
        </div>

        <NavButton
          active={activeTab === 'settings'}
          onClick={() => onTabChange('settings')}
          icon={<Settings size={24} />}
          label="Settings"
        />
      </nav>
    </div>
  );
};

const NavButton = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    style={{
      background: 'none',
      color: active ? 'var(--accent-color)' : 'var(--text-secondary)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '4px',
      opacity: active ? 1 : 0.6,
      transition: 'all 0.2s'
    }}
  >
    {icon}
    <span style={{ fontSize: '10px', fontWeight: '500' }}>{label}</span>
  </button>
);

export default Layout;
