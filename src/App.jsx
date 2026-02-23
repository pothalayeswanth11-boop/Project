import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Layout from './components/Layout';
import RequestsOverview from './pages/RequestsOverview';
import RequestDetail from './pages/RequestDetail';
import { requestsData, updateRequestStatus, generateId } from './data/requestsData';

function App() {
  const [requests, setRequests] = useState(requestsData);

  // THEME
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const interval = setInterval(() => {
      setRequests(prev => prev.map(req => ({
        ...req,
        updatedAt: new Date().toISOString()
      })));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    setRequests(prev => updateRequestStatus(prev, id, newStatus));
  };

  const handleCreateRequest = async (formData) => {
    // simulate async submit
    await new Promise(resolve => setTimeout(resolve, 700));

    const now = new Date().toISOString();
    const newRequest = {
      id: generateId(),
      title: formData.title,
      description: formData.description,
      category: formData.category,
      priority: formData.priority,
      status: 'pending',     // new requests always start as pending
      createdAt: now,
      updatedAt: now,
    };

    setRequests(prev => [newRequest, ...prev]);
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  return (
    <div data-theme={theme}>
      <Layout>
        {/* Theme Selector */}
        <div 
          style={{
            position: 'fixed',
            top: '1rem',
            right: '1rem',
            zIndex: 1000,
            background: 'rgba(0,0,0,0.05)',
            padding: '0.5rem 0.75rem',
            borderRadius: '999px',
            backdropFilter: 'blur(8px)'
          }}
        >
          <label style={{ fontSize: '0.85rem', marginRight: '0.5rem' }}>
            Theme:
          </label>
          <select
            value={theme}
            onChange={handleThemeChange}
            style={{
              padding: '0.25rem 0.5rem',
              borderRadius: '999px',
              border: '1px solid #e5e7eb',
              fontSize: '0.85rem'
            }}
          >
            <option value="light">☀️ Light</option>
            <option value="dark">🌙 Dark</option>
            <option value="blue">🔵 Blue</option>
          </select>
        </div>

        <Routes>
          <Route 
            path="/" 
            element={
              <RequestsOverview 
                requests={requests} 
                onCreateRequest={handleCreateRequest}
              />
            } 
          />
          <Route 
            path="/request/:id" 
            element={
              <RequestDetail 
                requests={requests} 
                onStatusUpdate={handleStatusUpdate}
              />
            } 
          />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
