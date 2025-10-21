'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { mockPatients, mockActivities, matchActivitiesForPatient, TherapyActivity, PatientProfile } from '@/lib/mockData';

export default function PatientMatchPage({ params }: { params: { id: string } }) {
  const { id } = params;
  
  // For demo purposes, either find the patient in our mock data or use a default one
  const [patient, setPatient] = useState<PatientProfile | null>(null);
  const [matchedActivities, setMatchedActivities] = useState<TherapyActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [showTreatmentPlan, setShowTreatmentPlan] = useState(false);
  
  useEffect(() => {
    // Simulate loading patient data and matching activities
    setTimeout(() => {
      // Try to find the patient in mock data, otherwise use the first one as default
      const foundPatient = mockPatients.find(p => p.id === id) || mockPatients[0];
      setPatient(foundPatient);
      
      // Get matching activities for this patient
      const matches = matchActivitiesForPatient(foundPatient.id);
      setMatchedActivities(matches);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleToggleActivity = (activityId: string) => {
    setSelectedActivities(prev => {
      if (prev.includes(activityId)) {
        return prev.filter(id => id !== activityId);
      } else {
        return [...prev, activityId];
      }
    });
  };

  const handleCreateTreatmentPlan = () => {
    setShowTreatmentPlan(true);
  };

  // Get the selected activities data
  const getSelectedActivitiesData = () => {
    return matchedActivities
      .filter(activity => selectedActivities.includes(activity.id))
      .slice(0, 2); // Only use top 2 activities
  };

  // Treatment plan screen
  if (showTreatmentPlan && patient) {
    const selectedActivitiesData = getSelectedActivitiesData();
    const activitiesTitles = selectedActivitiesData.map(a => a.title).join(' & ');
    
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-primary-700 mb-2">
              Treatment Plan for {patient.name}
            </h1>
            <p className="text-gray-600">
              Based on {activitiesTitles}
            </p>
          </div>
          <button 
            onClick={() => setShowTreatmentPlan(false)} 
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Back to Recommendations
          </button>
        </div>

        <div className="gradient-card p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-primary-700">Combined Therapy Plan</h2>
            <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
              Ready to Use
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-primary-700 mb-3">Activity Overview</h3>
            <p className="text-gray-700">
              This treatment plan combines elements from {selectedActivitiesData.length} activities to create a personalized approach for {patient.name}'s needs, focusing on {patient.treatmentGoals.slice(0, 2).join(' and ')}.              
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-medium text-primary-700 mb-3">Treatment Goals</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {Array.from(new Set(selectedActivitiesData.flatMap(activity => activity.tags.goalAreas))).map(goal => {
                const isPatientGoal = patient.treatmentGoals.includes(goal);
                return (
                  <span 
                    key={goal} 
                    className={`px-2 py-1 rounded-full text-sm ${isPatientGoal ? 'bg-primary-100 text-primary-700 font-medium' : 'bg-gray-100 text-gray-700'}`}
                  >
                    {goal} {isPatientGoal && '✓'}
                  </span>
                );
              })}
            </div>
          </div>

          {selectedActivitiesData.map((activity, index) => (
            <div key={activity.id} className="border-t border-gray-200 pt-6 mb-6">
              <h3 className="text-lg font-medium text-primary-700 mb-2">Activity {index + 1}: {activity.title}</h3>
              <p className="text-gray-700 mb-4">{activity.description}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Age Group:</span>{' '}
                  {activity.tags.ageGroup.join(', ')}
                </div>
                <div>
                  <span className="font-medium text-gray-700">Difficulty:</span>{' '}
                  {activity.tags.difficultyLevel}
                </div>
                <div>
                  <span className="font-medium text-gray-700">Session Length:</span>{' '}
                  {activity.tags.sessionLength}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-700 mb-1">Materials Needed:</h4>
                <ul className="list-disc list-inside text-gray-600 pl-2">
                  {activity.materials.map((material, idx) => (
                    <li key={idx}>{material}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mt-8">
            <h3 className="text-md font-medium text-blue-700 mb-2">Therapist Notes</h3>
            <p className="text-sm text-blue-600">
              This combined plan addresses {patient.name}'s specific needs by incorporating elements from multiple activities. 
              Adjust the difficulty or steps as needed based on patient response. Consider the patient's stated interests in {patient.interests.slice(0, 2).join(' and ')} to increase engagement.
            </p>
          </div>

          <div className="mt-8 flex justify-end space-x-4">
            <button className="btn-secondary">
              Print Treatment Plan
            </button>
            <button className="btn-primary">
              Save to Patient Record
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="gradient-card p-12 text-center">
          <h2 className="text-2xl font-bold text-primary-700 mb-4">Finding the best matches...</h2>
          <div className="w-24 h-24 mx-auto mb-4 border-4 border-t-primary-500 border-r-primary-300 border-b-velvet border-l-velvet-light rounded-full animate-spin"></div>
          <p className="text-gray-600">Our AI is analyzing the patient profile and finding the most suitable activities</p>
        </div>
      </div>
    );
  }
  
  if (!patient) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="gradient-card p-12 text-center">
          <h2 className="text-2xl font-bold text-primary-700 mb-4">Patient Not Found</h2>
          <p className="text-gray-600 mb-6">We couldn't find this patient profile in our system.</p>
          <Link href="/patients/upload" className="btn-primary">
            Create New Patient Profile
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary-700 mb-2">
          Activity Recommendations for {patient.name}
        </h1>
        <p className="text-gray-600">
          Based on the patient's profile, treatment goals, and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Patient Profile Summary */}
        <div className="lg:col-span-1">
          <div className="gradient-card p-6 mb-6 sticky top-4">
            <h2 className="text-xl font-semibold text-primary-700 mb-4">Patient Profile</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700">Name</h3>
                <p className="text-lg">{patient.name}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700">Age</h3>
                <p>{patient.age} years</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700">Treatment Goals</h3>
                <div className="flex flex-wrap gap-1 mt-1">
                  {patient.treatmentGoals.map(goal => (
                    <span key={goal} className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs">
                      {goal}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700">Interests</h3>
                <div className="flex flex-wrap gap-1 mt-1">
                  {patient.interests.map(interest => (
                    <span key={interest} className="px-2 py-1 bg-velvet-light text-primary-700 rounded-full text-xs">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700">Challenges</h3>
                <p className="text-sm text-gray-600">{patient.challenges.join(', ')}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700">Additional Notes</h3>
                <p className="text-sm text-gray-600">{patient.additionalNotes || "No additional notes"}</p>
              </div>
            </div>
            
            <div className="mt-6">
              <Link href={`/patients/edit/${patient.id}`} className="text-primary-600 hover:text-primary-800 text-sm font-medium">
                Edit Patient Profile
              </Link>
            </div>
          </div>
        </div>

        {/* Matched Activities */}
        <div className="lg:col-span-2">
          <div className="gradient-card p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-primary-700">Recommended Activities</h2>
              <div className="flex space-x-3 items-center">
                <Link href={`/patients/chat/${id}`} className="flex items-center px-3 py-1 bg-velvet text-white rounded-full text-sm hover:bg-velvet-dark transition-colors">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                  </svg>
                  Generate AI Plan
                </Link>
                <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                  {matchedActivities.length} Matches
                </span>
              </div>
            </div>
            
            <p className="text-gray-600 mb-6">
              These activities were matched based on the patient's age, treatment goals, and interests using our AI recommendation engine.
            </p>
            
            {matchedActivities.length === 0 ? (
              <div className="text-center py-8">
                <h3 className="text-lg font-medium mb-2">No matching activities found</h3>
                <p className="text-gray-600 mb-4">Try adjusting the patient profile or browse all activities</p>
                <Link href="/activities" className="btn-primary">
                  Browse All Activities
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {matchedActivities.map(activity => (
                  <div key={activity.id} className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-primary-700 mb-2">{activity.title}</h3>
                        <p className="text-gray-700 mb-4">{activity.description}</p>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          id={`select-${activity.id}`}
                          checked={selectedActivities.includes(activity.id)}
                          onChange={() => handleToggleActivity(activity.id)}
                          className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                        />
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {activity.tags.goalAreas.map(goal => {
                        const isPatientGoal = patient.treatmentGoals.includes(goal);
                        return (
                          <span 
                            key={goal} 
                            className={`px-2 py-1 rounded-full text-xs ${
                              isPatientGoal 
                                ? 'bg-primary-100 text-primary-700' 
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {goal} {isPatientGoal && '✓'}
                          </span>
                        );
                      })}
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Age Group:</span>{' '}
                        <span className={patient.age >= 6 && patient.age <= 12 && activity.tags.ageGroup.includes("Children (6-12)") ? "text-primary-700 font-medium" : ""}>
                          {activity.tags.ageGroup.join(', ')}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Difficulty:</span>{' '}
                        {activity.tags.difficultyLevel}
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Session Length:</span>{' '}
                        {activity.tags.sessionLength}
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-100 pt-4 mt-4 flex justify-between items-center">
                      <Link href={`/activities/${activity.id}`} className="text-primary-600 hover:text-primary-800 font-medium text-sm">
                        View Full Details
                      </Link>
                      <div className="text-yellow-500">
                        {'★'.repeat(Math.round(activity.effectiveness))}
                        <span className="text-gray-300">{'★'.repeat(5 - Math.round(activity.effectiveness))}</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="flex justify-between mt-8">
                  <span className="text-gray-600">{selectedActivities.length} of {matchedActivities.length} activities selected</span>
                  <button 
                    className={`btn-primary ${selectedActivities.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={selectedActivities.length === 0}
                    onClick={handleCreateTreatmentPlan}
                  >
                    Create Treatment Plan
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <div className="text-center mb-6">
            <Link href="/activities" className="text-primary-600 hover:text-primary-800 font-medium">
              Browse All Activities →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
