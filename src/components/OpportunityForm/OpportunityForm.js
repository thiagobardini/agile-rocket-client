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
        placeholder='Enter stage (ex: Prospecting, Needs Analysis, Proposal, Closed Won/Loss )'
        name='stage'
        value={opportunity.stage}
        onChange={handleChange}></textarea>
    </div>
    <div className="form-group">
      <label>Probability %</label>
      <textarea className="form-control"
        placeholder='Enter probability (from 0 to 100)'
        name='probability'
        value={opportunity.probability}
        onChange={handleChange}></textarea>
    </div>
    <div className="form-group">
      <label>Amount</label>
      <textarea className="form-control"
        placeholder='Enter amount (ex: 10000)'
        name='amount'
        value={opportunity.amount}
        onChange={handleChange}></textarea>
    </div>
    <div className="form-group">
      <label>Close Date</label>
      <textarea className="form-control"
        placeholder='Enter close date (ex: 2021-04-22)'
        name='closeDate'
        value={opportunity.closeDate}
        onChange={handleChange}></textarea>
    </div>
    <button>Submit</button>
  </form>
)
export default OpportunityForm
