const statusConfig = {
  pending: { label: '⏳ Pending', color: 'orange' },
  'in-progress': { label: '🔄 In Progress', color: 'blue' },
  resolved: { label: '✅ Resolved', color: 'green' }
};

function StatusIndicator({ status }) {
  const config = statusConfig[status] || statusConfig.pending;
  return (
    <span 
      className={`status-indicator status-${config.color}`}
      role="status"
      aria-label={`Status: ${config.label}`}
    >
      {config.label}
    </span>
  );
}

export default StatusIndicator;
