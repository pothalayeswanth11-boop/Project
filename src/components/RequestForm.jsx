import { useState } from 'react';

function RequestForm({ onSubmit, isEditing = false, initialData = {} }) {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    category: initialData.category || 'it-support',
    priority: initialData.priority || 'medium'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="request-form" noValidate>
      <div className="form-group">
        <label htmlFor="title">Request Title *</label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          required
          aria-required="true"
          maxLength={100}
          placeholder="Enter request title"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="description">Description *</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          required
          aria-required="true"
          placeholder="Describe the issue or request"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" name="category" value={formData.category} onChange={handleChange}>
            <option value="it-support">💻 IT Support</option>
            <option value="facility">🏢 Facility</option>
            <option value="maintenance">🔧 Maintenance</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select id="priority" name="priority" value={formData.priority} onChange={handleChange}>
            <option value="low">🟢 Low</option>
            <option value="medium">🟡 Medium</option>
            <option value="high">🔴 High</option>
          </select>
        </div>
      </div>

      <button type="submit" className="submit-btn">
        {isEditing ? '🔄 Update Request' : '✅ Create Request'}
      </button>
    </form>
  );
}

export default RequestForm;
