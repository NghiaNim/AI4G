'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { mockPatients, PatientProfile } from '@/lib/mockData';

export default function PatientProfilePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [patient, setPatient] = useState<PatientProfile | null>(null);

  // Load patient data on component mount
  useEffect(() => {
    // Simulate API call to fetch patient data
    setTimeout(() => {
      const foundPatient = mockPatients.find(p => p.id === id);
      
      if (foundPatient) {
        setPatient(foundPatient);
      }
      
      setIsLoading(false);
    }, 500);
  }, [id]);

  // Handle case when patient is not found
  if (!isLoading && !patient) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary-700 mb-4">Patient Not Found</h2>
          <p className="mb-6">The patient profile you're looking for does not exist.</p>
          <Link href="/patients" className="btn-primary">
            Return to Patients
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
          
          <div className="gradient-card p-6 mb-8">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="gradient-card p-6 h-48"></div>
            <div className="gradient-card p-6 h-48"></div>
            <div className="gradient-card p-6 h-48"></div>
            <div className="gradient-card p-6 h-48"></div>
          </div>
        </div>
      </div>
    );
  }

  // At this point, we know patient is not null because of the condition checks above
  // TypeScript doesn't recognize this, so we'll use a type assertion
  const patientData = patient as PatientProfile;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary-700 mb-2">{patientData.name}</h1>
          <p className="text-gray-600">Patient Profile</p>
        </div>
        <div className="flex space-x-3">
          <Link href={`/patients/edit/${patientData.id}`} className="btn-secondary">
            Edit Profile
          </Link>
          <Link href={`/patients/chat/${patientData.id}`} className="btn-primary">
            Generate AI Plan
          </Link>
        </div>
      </div>

      {/* Personal Information */}
      <div className="gradient-card p-6 mb-8">
        <h2 className="text-xl font-semibold text-primary-700 mb-4">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-600 mb-1">Age</p>
            <p className="font-medium">{patientData.age} years old</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">Cultural Background</p>
            <div className="flex flex-wrap gap-1">
              {patientData.culturalBackground.map(culture => (
                <span key={culture} className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                  {culture}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Treatment Goals */}
        <div className="gradient-card p-6">
          <h2 className="text-xl font-semibold text-primary-700 mb-4">Treatment Goals</h2>
          <ul className="space-y-2">
            {patientData.treatmentGoals.map(goal => (
              <li key={goal} className="flex items-start">
                <svg className="w-5 h-5 text-primary-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                {goal}
              </li>
            ))}
          </ul>
        </div>

        {/* Challenges */}
        <div className="gradient-card p-6">
          <h2 className="text-xl font-semibold text-primary-700 mb-4">Challenges</h2>
          <ul className="space-y-2">
            {patientData.challenges.map(challenge => (
              <li key={challenge} className="flex items-start">
                <svg className="w-5 h-5 text-orange-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
                {challenge}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Interests */}
        <div className="gradient-card p-6">
          <h2 className="text-xl font-semibold text-primary-700 mb-4">Interests</h2>
          <div className="flex flex-wrap gap-2">
            {patientData.interests.map(interest => (
              <span key={interest} className="px-3 py-1 bg-velvet-light text-primary-700 rounded-full text-sm">
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Preferred Activities */}
        <div className="gradient-card p-6">
          <h2 className="text-xl font-semibold text-primary-700 mb-4">Preferred Activities</h2>
          <div className="flex flex-wrap gap-2">
            {patientData.preferredActivities.map(activity => (
              <span key={activity} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                {activity}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Notes */}
      <div className="gradient-card p-6 mb-8">
        <h2 className="text-xl font-semibold text-primary-700 mb-4">Additional Notes</h2>
        <p className="text-gray-700">{patientData.additionalNotes}</p>
      </div>

      <div className="flex justify-between mt-8">
        <Link href="/patients" className="btn-text">
          ← Back to All Patients
        </Link>
        <div className="flex space-x-3">
          <Link href={`/patients/match/${patientData.id}`} className="btn-secondary">
            Find Matching Activities
          </Link>
        </div>
      </div>
    </div>
  );
}
