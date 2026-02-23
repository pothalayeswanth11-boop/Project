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

import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;