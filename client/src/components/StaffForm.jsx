import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function StaffForm() {
  const [staff, setStaff] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    department: '',
    residence: '',
    yearsOfExperience: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaff((prevStaff) => ({
      ...prevStaff,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Staff data submitted:', staff);
    // navigate('/staff-list'); // Uncomment if needed
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-purple-800">
          Staff Information
        </h2>

        <input
          name="name"
          placeholder="Full Name"
          value={staff.name}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={staff.email}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        />
        <input
          name="phone"
          type="tel"
          placeholder="Phone Number"
          value={staff.phone}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        />
        <select
          name="gender"
          value={staff.gender}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <input
          name="department"
          placeholder="Department"
          value={staff.department}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        />
        <input
          name="residence"
          placeholder="Residence"
          value={staff.residence}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        />
        <input
          name="yearsOfExperience"
          type="number"
          placeholder="Years of Experience"
          value={staff.yearsOfExperience}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        />

        <button
          type="submit"
          className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
