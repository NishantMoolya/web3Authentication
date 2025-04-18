import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PatientForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    bloodGroup: '',
    gender: '',
    phone: '',
    city: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Optionl: send formData to backend here
    console.log('Patient Data Submitted:', formData);

    // Navigate to a success or next page
    // navigate(''); // Replace with your desired route
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-50 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center text-purple-800">Patient Information</h2>

        <input name="name" placeholder="Full Name" onChange={handleChange} className="w-full p-3 border rounded-lg" required />
        <input name="email" placeholder="Email" type="email" onChange={handleChange} className="w-full p-3 border rounded-lg" required />
        <input name="age" placeholder="Age" type="number" onChange={handleChange} className="w-full p-3 border rounded-lg" required />
        <input name="bloodGroup" placeholder="Blood Group" onChange={handleChange} className="w-full p-3 border rounded-lg" required />

        <select name="gender" onChange={handleChange} className="w-full p-3 border rounded-lg" required>
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <input name="phone" placeholder="Phone Number" onChange={handleChange} className="w-full p-3 border rounded-lg" required />
        <input name="city" placeholder="City" onChange={handleChange} className="w-full p-3 border rounded-lg" required />

        <button type="submit" className="w-full py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition">
          Submit
        </button>
      </form>
    </div>
  );
}
