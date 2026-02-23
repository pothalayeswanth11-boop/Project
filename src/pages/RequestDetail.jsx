import { useParams } from 'react-router-dom';
import StatusIndicator from '../components/StatusIndicator';

function RequestDetail({ requests, onStatusUpdate }) {
  const { id } = useParams();
  const request = requests.find(r => r.id === id);

  if (!request) {
    return (
      <div style={{textAlign: 'center', padding: '4rem', color: '#6b7280'}}>
        <h2>❌ Request Not Found</h2>
      </div>
    );
  }

  const handleStatusChange = async (newStatus) => {
    await onStatusUpdate(request.id, newStatus);
  };

  return (
    <div className="detail-page">
      <header style={{marginBottom: '2rem'}}>
        <h2>{request.title}</h2>
        <StatusIndicator status={request.status} />
      </header>
      
      <div className="request-details">
        <div className="detail-grid">
          <div>
            <strong>Category:</strong> {request.category.replace('-', ' ').toUpperCase()}
          </div>
          <div>
            <strong>Priority:</strong> <span className={`priority-badge priority-${request.priority}`}>{request.priority.toUpperCase()}</span>
          </div>
          <div>
            <strong>Created:</strong> {new Date(request.createdAt).toLocaleString()}
          </div>
          <div>
            <strong>Updated:</strong> {new Date(request.updatedAt).toLocaleString()}
          </div>
        </div>
        
        <h4>Description</h4>
        <p>{request.description}</p>
        
        <div className="status-actions">
          <h4>Update Status</h4>
          <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
            <button 
              onClick={() => handleStatusChange('pending')}
              className="status-btn orange"
              disabled={request.status === 'pending'}
            >
              ⏳ Mark Pending
            </button>
            <button 
              onClick={() => handleStatusChange('in-progress')}
              className="status-btn blue"
              disabled={request.status === 'in-progress'}
            >
              🔄 In Progress
            </button>
            <button 
              onClick={() => handleStatusChange('resolved')}
              className="status-btn green"
              disabled={request.status === 'resolved'}
            >
              ✅ Resolved
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestDetail;
