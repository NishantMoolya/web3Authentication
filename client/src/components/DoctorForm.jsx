import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DoctorForm() {
  const [doctor, setDoctor] = useState({
    name: '',
    specialty: '',
    phone: '',
    email: '',
    gender: '',
    city: '',
    practiceYears: '',
    licenseNo: '',
    registrationYear: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor({ ...doctor, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Doctor Data Submitted:', doctor);
    // navigate('/doctor-dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-purple-800">
          Doctor Information
        </h2>

        <input
          name="name"
          placeholder="Full Name"
          value={doctor.name}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={doctor.email}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        />
        <input
          name="specialty"
          placeholder="Specialization"
          value={doctor.specialty}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        />
        <select
          name="gender"
          value={doctor.gender}
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
          name="phone"
          placeholder="Phone Number"
          value={doctor.phone}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        />
        <input
          name="city"
          placeholder="Resident City"
          value={doctor.city}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        />
        <input
          name="practiceYears"
          placeholder="Years of Practice"
          type="number"
          value={doctor.practiceYears}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        />
        <input
          name="licenseNo"
          placeholder="License Number"
          type="text"
          value={doctor.licenseNo}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        />
        <input
          name="registrationYear"
          placeholder="Year of Registration"
          type="number"
          value={doctor.registrationYear}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        />

        <button
          type="submit"
          className="w-full py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
