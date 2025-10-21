'use client';

import { useState } from 'react';
import Link from 'next/link';
import { mockPatients } from '@/lib/mockData';

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter patients based on search term
  const filteredPatients = mockPatients.filter(patient => 
    searchTerm === '' || 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.treatmentGoals.some(goal => goal.toLowerCase().includes(searchTerm.toLowerCase())) ||
    patient.interests.some(interest => interest.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary-700 mb-2">Patient Profiles</h1>
          <p className="text-gray-600">Manage patient profiles and find matching activities</p>
        </div>
        <Link href="/patients/upload" className="btn-primary">
          Add New Patient
        </Link>
      </div>

      <div className="gradient-card p-6 mb-8">
        <div className="max-w-md mx-auto">
          <label htmlFor="search" className="sr-only">Search patients</label>
          <div className="relative">
            <input
              type="text"
              id="search"
              placeholder="Search by name, treatment goals, or interests..."
              className="form-input pl-10 w-full"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {filteredPatients.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">No patients found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search or add a new patient</p>
          <Link href="/patients/upload" className="btn-primary">
            Add New Patient
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatients.map(patient => (
            <div key={patient.id} className="gradient-card p-6">
              <h3 className="text-xl font-semibold text-primary-700 mb-2">{patient.name}</h3>
              <p className="text-gray-600 mb-1">Age: {patient.age}</p>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-1">Treatment Goals</h4>
                <div className="flex flex-wrap gap-1">
                  {patient.treatmentGoals.slice(0, 3).map(goal => (
                    <span key={goal} className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs">
                      {goal}
                    </span>
                  ))}
                  {patient.treatmentGoals.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                      +{patient.treatmentGoals.length - 3} more
                    </span>
                  )}
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-1">Interests</h4>
                <div className="flex flex-wrap gap-1">
                  {patient.interests.slice(0, 3).map(interest => (
                    <span key={interest} className="px-2 py-1 bg-velvet-light text-primary-700 rounded-full text-xs">
                      {interest}
                    </span>
                  ))}
                  {patient.interests.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                      +{patient.interests.length - 3} more
                    </span>
                  )}
                </div>
              </div>
              
              <div className="border-t border-gray-100 pt-4 mt-4 flex justify-between items-center">
                <Link href={`/patients/${patient.id}`} className="text-primary-600 hover:text-primary-800 font-medium text-sm">
                  View Profile
                </Link>
                <div className="flex space-x-2">
                  <Link href={`/patients/chat/${patient.id}`} className="flex items-center px-3 py-1 bg-velvet text-white rounded-full text-xs hover:bg-velvet-dark transition-colors">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                    </svg>
                    AI Plan
                  </Link>
                  <Link href={`/patients/match/${patient.id}`} className="btn-secondary text-xs">
                    Find Activities
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
