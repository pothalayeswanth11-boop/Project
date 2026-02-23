import { useState, useMemo } from 'react';
import RequestCard from '../components/RequestCard';
import RequestForm from '../components/RequestForm';
import { sortRequestsByPriority } from '../data/requestsData';

function RequestsOverview({ requests, onCreateRequest }) {
  const [showForm, setShowForm] = useState(false);
  const [filteredStatus, setFilteredStatus] = useState('all');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredAndSortedRequests = useMemo(() => {
    let list = requests;

    if (filteredStatus !== 'all') {
      list = list.filter(req => req.status === filteredStatus);
    }

    return sortRequestsByPriority(list);
  }, [requests, filteredStatus]);

  const handleCreateRequest = async (formData) => {
    setIsSubmitting(true);
    await onCreateRequest(formData);
    setIsSubmitting(false);
    setShowForm(false);
  };

  return (
    <div className="overview-page">
      <header className="page-header">
        <h2>📋 Service Requests ({filteredAndSortedRequests.length})</h2>
        <div className="controls">
          <button 
            onClick={() => setShowForm(!showForm)}
            aria-expanded={showForm}
            className="new-request-btn"
          >
            {showForm ? '❌ Cancel' : '➕ New Request'}
          </button>
          
          <div className="status-filter" role="radiogroup" aria-label="Filter by status">
            <label>
              <input
                type="radio"
                name="status"
                value="all"
                checked={filteredStatus === 'all'}
                onChange={(e) => setFilteredStatus(e.target.value)}
              />
              All
            </label>
            <label>
              <input
                type="radio"
                name="status"
                value="pending"
                checked={filteredStatus === 'pending'}
                onChange={(e) => setFilteredStatus(e.target.value)}
              />
              Pending
            </label>
            <label>
              <input
                type="radio"
                name="status"
                value="in-progress"
                checked={filteredStatus === 'in-progress'}
                onChange={(e) => setFilteredStatus(e.target.value)}
              />
              In Progress
            </label>
            <label>
              <input
                type="radio"
                name="status"
                value="resolved"
                checked={filteredStatus === 'resolved'}
                onChange={(e) => setFilteredStatus(e.target.value)}
              />
              Resolved
            </label>
          </div>
        </div>
      </header>

      {showForm && (
        <section aria-labelledby="new-request-heading">
          <h3 id="new-request-heading">➕ Create New Request</h3>
          <RequestForm onSubmit={handleCreateRequest} />
          {isSubmitting && (
            <p style={{ marginTop: '0.75rem', fontSize: '0.9rem' }}>
              Saving request…
            </p>
          )}
        </section>
      )}

      <section className="requests-list" aria-label="Service requests list">
        {filteredAndSortedRequests.length ? (
          filteredAndSortedRequests.map(request => (
            <RequestCard key={request.id} request={request} />
          ))
        ) : (
          <div style={{textAlign: 'center', padding: '4rem', color: '#6b7280'}}>
            <h3>📭 No requests</h3>
            <p>No requests match the selected filter. Create one above!</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default RequestsOverview;
onabort