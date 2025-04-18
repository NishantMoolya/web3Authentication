import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DoctorForm() {
  const [doctor, setDoctor] = useState({
    name: '',
    specialty: '',
    phone: '',
    email: '',
    address: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor({ ...doctor, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', doctor);

    // Navigate to another route if needed
    // navigate('/doctor-dashboard');
  };

  return (
    <div className="container">
      <h2>Doctor Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" value={doctor.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="specialty" className="form-label">Specialization</label>
          <input type="text" className="form-control" id="specialty" name="specialty" value={doctor.specialty} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input type="text" className="form-control" id="phone" name="phone" value={doctor.phone} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" name="email" value={doctor.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="city" className="form-label">Resident City</label>
          <input type="text" className="form-control" id="city" name="city" value={doctor.city} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="praction-year" className="form-label">No. of Practioning Year</label>
          <input type="number" className="form-control" id="praction-year" name="praction-year" value={doctor.praction-year} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="license-no" className="form-label">License No.</label>
          <input type="number" className="form-control" id="license-no" name="license-no" value={doctor.license-no} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="registration-year" className="form-label">Year of Registration </label>
          <input type="number" className="form-control" id="registration-year" name="registration-year" value={doctor.registration-year} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
