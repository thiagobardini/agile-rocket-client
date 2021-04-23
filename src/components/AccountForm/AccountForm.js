import React from 'react'
const AccountForm = ({ account, handleSubmit, handleChange }) => (
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label>Account Name</label>
      <textarea className="form-control"
        placeholder='Enter account name'
        name='accountName'
        value={account.accountName}
        onChange={handleChange}
      />
    </div>
    <div className="form-group">
      <label>Industry Type</label>
      <textarea className="form-control"
        placeholder='Enter industry type'
        name='industry'
        value={account.industry}
        onChange={handleChange}></textarea>
    </div>
    <div className="form-group">
      <label>Contact Name</label>
      <textarea className="form-control"
        placeholder='Enter contact name'
        name='contact'
        value={account.contact}
        onChange={handleChange}></textarea>
    </div>
    <div className="form-group">
      <label>Email</label>
      <textarea className="form-control"
        placeholder='Enter email'
        name='email'
        value={account.email}
        onChange={handleChange}></textarea>
    </div>
    <div className="form-group">
      <label>Address</label>
      <textarea className="form-control"
        placeholder='Enter address'
        name='address'
        value={account.address}
        onChange={handleChange}></textarea>
    </div>
    <div className="form-group">
      <label>Phone</label>
      <textarea className="form-control"
        placeholder='Enter phone (ex: XXX-XXX-XXXX)'
        name='phone'
        value={account.phone}
        onChange={handleChange}></textarea>
    </div>
    <button>Submit</button>
  </form>
)
export default AccountForm
