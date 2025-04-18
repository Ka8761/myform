import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import './ApplicationForm.css';

function ApplicationForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    appointmentDate: '',
    employed: '',
    employerName: '',
    employmentYears: '',
    income: '',
    gotPets: '',
    felony: '',
    evicted: '',
    bankruptcy: '',
    termsAccepted: false,
    paymentMethod: '',
    creditScore: '600+',
  });
  
  const [submitStatus, setSubmitStatus] = useState({
    isSubmitting: false,
    isSuccess: false,
    isError: false,
    message: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Set submitting state
    setSubmitStatus({
      isSubmitting: true,
      isSuccess: false,
      isError: false,
      message: 'Submitting your application...'
    });
    
    try {
      // Get JWT token from localStorage (assuming you store it there after login)
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('You must be logged in to submit an application');
      }
      
      // Send to backend API
      const response = await fetch('http://localhost:5000/api/apply', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`  // Include authorization token
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit application');
      }
      
      // Success!
      setSubmitStatus({
        isSubmitting: false,
        isSuccess: true,
        isError: false,
        message: 'Application submitted successfully!'
      });
      
      console.log('Form Data Submitted:', formData);
      console.log('Response:', data);
      
    } catch (error) {
      console.error('Error submitting application:', error);
      
      setSubmitStatus({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        message: error.message || 'Failed to submit application. Please try again.'
      });
    }
  };
  const handleLogout = () => {
    localStorage.removeItem('token'); // remove the token
    navigate('/'); // redirect to homepage
  };

  // Show a success or error message
  const renderSubmitStatus = () => {
    if (submitStatus.isSubmitting) {
      return <div className="status-message submitting">Submitting application...</div>;
    }
    
    if (submitStatus.isSuccess) {
      return <div className="status-message success">{submitStatus.message}</div>;
    }
    
    if (submitStatus.isError) {
      return <div className="status-message error">{submitStatus.message}</div>;
    }
    
    return null;
  };

  return (
    <div className="application-container">
      
      <div className="application-header">
        <h2>Rental Application</h2>
        <p className="subtitle">Please complete all required fields marked with *</p>
      </div>


      <form onSubmit={handleSubmit} className="application-form">
        {/* Personal Information Section */}
        <section className="form-section">
          <h3 className="section-title">Personal Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">* First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">* Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">* Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </section>

        {/* Address Section */}
        <section className="form-section">
          <h3 className="section-title">Address Information</h3>
          <div className="form-group full-width">
            <label htmlFor="address">* Current Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="state">* State</label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="zip">ZIP Code</label>
              <input
                type="text"
                id="zip"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="country">* Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </section>

        {/* Employment Information */}
        <section className="form-section">
          <h3 className="section-title">Employment Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="employed">* Currently Employed</label>
              <select
                id="employed"
                name="employed"
                value={formData.employed}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="employerName">Employer's Name</label>
              <input
                type="text"
                id="employerName"
                name="employerName"
                value={formData.employerName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="employmentYears">* Years at Current Job</label>
              <input
                type="number"
                id="employmentYears"
                name="employmentYears"
                value={formData.employmentYears}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="income">Annual Income ($)</label>
              <input
                type="number"
                id="income"
                name="income"
                value={formData.income}
                onChange={handleChange}
              />
            </div>
          </div>
        </section>

        {/* Background Information */}
        <section className="form-section">
          <h3 className="section-title">Background Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="gotPets">Do you have pets?</label>
              <select
                id="gotPets"
                name="gotPets"
                value={formData.gotPets}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="felony">Have you been convicted of a felony?</label>
              <select
                id="felony"
                name="felony"
                value={formData.felony}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="evicted">Have you been evicted?</label>
              <select
                id="evicted"
                name="evicted"
                value={formData.evicted}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="bankruptcy">* Have you filed for bankruptcy?</label>
              <select
                id="bankruptcy"
                name="bankruptcy"
                value={formData.bankruptcy}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="creditScore">Credit Score</label>
              <select
                id="creditScore"
                name="creditScore"
                value={formData.creditScore}
                onChange={handleChange}
              >
                <option value="600+">600+</option>
                <option value="650+">650+</option>
                <option value="700+">700+</option>
                <option value="750+">750+</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="paymentMethod">Preferred Payment Method</label>
              <input
                type="text"
                id="paymentMethod"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
              />
            </div>
          </div>
        </section>

        {/* Appointment Section */}
        <section className="form-section">
          <h3 className="section-title">Viewing Appointment</h3>
          <div className="form-group">
            <label htmlFor="appointmentDate">* Preferred Viewing Date</label>
            <input
              type="date"
              id="appointmentDate"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
              required
            />
          </div>
        </section>

        {/* Terms and Submit */}
        <section className="form-section terms-section">
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="termsAccepted"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              required
            />
            <label htmlFor="termsAccepted">
              I accept the terms and conditions and confirm all information provided is accurate
            </label>
          </div>
          
          <p className="disclaimer-text" style={{fontSize: '10px'}}>
            We advise concentrating on one unit at a time to enhance the viewing process.
            An application fee is required to schedule a viewing, indicating your serious intent to lease, especially given the high demand for Rent Stabilized units.
            <br /><br />
            Should the first apartment not meet your needs, you have the option to explore up to two additional listings. Rest assured, if none of the apartments are suitable,
            the fee is fully refundable, reflecting our commitment to providing a risk-free search experience.
          </p>
          
          <button 
            type="submit" 
            className="submit-button"
            disabled={submitStatus.isSubmitting}
          >
            {submitStatus.isSubmitting ? 'SUBMITTING...' : 'NYC RENTAL STABILIZED APARTMENT'}
          </button>
        </section>
        {renderSubmitStatus()}
        <br></br>
        <button onClick={handleLogout} style={{ marginTop: '20px' }}>
        Logout
      </button>
      </form>
    </div>
  );
}

export default ApplicationForm;