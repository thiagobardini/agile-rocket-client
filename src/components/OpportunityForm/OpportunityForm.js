import React from 'react'
const OpportunityForm = ({ opportunity, handleSubmit, handleChange }) => (
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label>Opportunity Name</label>
      <textarea className="form-control"
        placeholder='Enter opportunity name'
        name='opportunityName'
        value={opportunity.opportunityName}
        onChange={handleChange}
      />
    </div>
    <div className="form-group">
      <label>Stage</label>
      <textarea className="form-control"
        placeholder='Enter stage'
        name='stage'
        value={opportunity.stage}
        onChange={handleChange}></textarea>
    </div>
    <div className="form-group">
      <label>Probability</label>
      <textarea className="form-control"
        placeholder='Enter probability'
        name='probability'
        value={opportunity.probability}
        onChange={handleChange}></textarea>
    </div>
    <div className="form-group">
      <label>Amount</label>
      <textarea className="form-control"
        placeholder='Enter amount'
        name='amount'
        value={opportunity.amount}
        onChange={handleChange}></textarea>
    </div>
    <div className="form-group">
      <label>Close Date</label>
      <textarea className="form-control"
        placeholder='Enter close date'
        name='closeDate'
        value={opportunity.closeDate}
        onChange={handleChange}></textarea>
    </div>
    <button>Submit</button>
  </form>
)
export default OpportunityForm
