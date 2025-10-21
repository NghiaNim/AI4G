'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { mockActivities, TherapyActivity } from '@/lib/mockData';

export default function ActivityDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [activity, setActivity] = useState<TherapyActivity | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading activity data
    setTimeout(() => {
      const foundActivity = mockActivities.find(a => a.id === id);
      setActivity(foundActivity || null);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="gradient-card p-12 text-center">
          <h2 className="text-2xl font-bold text-primary-700 mb-4">Loading Activity Details...</h2>
          <div className="w-24 h-24 mx-auto mb-4 border-4 border-t-primary-500 border-r-primary-300 border-b-velvet border-l-velvet-light rounded-full animate-spin"></div>
          <p className="text-gray-600">Please wait while we retrieve the activity information</p>
        </div>
      </div>
    );
  }

  if (!activity) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="gradient-card p-12 text-center">
          <h2 className="text-2xl font-bold text-primary-700 mb-4">Activity Not Found</h2>
          <p className="text-gray-600 mb-6">We couldn't find this therapy activity in our system.</p>
          <Link href="/activities" className="btn-primary">
            Back to Activities
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary-700 mb-2">{activity.title}</h1>
          <p className="text-gray-500">Created by {activity.createdBy} on {activity.createdAt}</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-4">
          <Link
            href="/activities"
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Back to Activities
          </Link>
          <Link href={`/activities/edit/${activity.id}`} className="btn-secondary">
            Edit Activity
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="gradient-card p-8 mb-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-primary-700 mb-3">Description</h2>
              <p className="text-gray-700">{activity.description}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-primary-700 mb-3">Materials Required</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1 pl-2">
                {activity.materials.map((material, index) => (
                  <li key={index}>{material}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-primary-700 mb-3">Activity Steps</h2>
              <ol className="list-decimal list-inside text-gray-700 space-y-2 pl-2">
                {activity.steps.map((step, index) => (
                  <li key={index} className="pl-1">
                    <span className="ml-2">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-primary-700 mb-4">Therapist Notes</h2>
            <div className="italic text-gray-600 mb-4">
              This activity has received positive feedback from therapists working with patients experiencing anxiety and emotional regulation challenges. Consider adapting the difficulty level based on the patient's cognitive abilities.
            </div>
            
            <div className="flex items-center mt-6">
              <div className="mr-2 text-yellow-500 text-lg">
                {'★'.repeat(Math.round(activity.effectiveness))}
                <span className="text-gray-300">{'★'.repeat(5 - Math.round(activity.effectiveness))}</span>
              </div>
              <span className="text-gray-600">{activity.effectiveness}/5 effectiveness rating</span>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="gradient-card p-6 mb-6 sticky top-4">
            <h2 className="text-xl font-semibold text-primary-700 mb-4">Activity Details</h2>
            
            <div className="space-y-5">
              <div>
                <h3 className="text-sm font-medium text-gray-700">Goal Areas</h3>
                <div className="flex flex-wrap gap-1 mt-1">
                  {activity.tags.goalAreas.map(goal => (
                    <span key={goal} className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs">
                      {goal}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700">Age Group</h3>
                <div className="flex flex-wrap gap-1 mt-1">
                  {activity.tags.ageGroup.map(age => (
                    <span key={age} className="px-2 py-1 bg-velvet-light text-primary-700 rounded-full text-xs">
                      {age}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Difficulty Level</h3>
                  <p className="text-gray-600">{activity.tags.difficultyLevel}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Session Length</h3>
                  <p className="text-gray-600">{activity.tags.sessionLength}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700">Cultural Context</h3>
                <div className="flex flex-wrap gap-1 mt-1">
                  {activity.tags.culturalContext.map(context => (
                    <span key={context} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                      {context}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-100">
                <h3 className="text-sm font-medium text-gray-700">Similar Activities</h3>
                <div className="mt-2 space-y-3">
                  {mockActivities
                    .filter(a => 
                      a.id !== activity.id && 
                      a.tags.goalAreas.some(goal => activity.tags.goalAreas.includes(goal))
                    )
                    .slice(0, 3)
                    .map(similarActivity => (
                      <Link 
                        key={similarActivity.id}
                        href={`/activities/${similarActivity.id}`}
                        className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="font-medium text-primary-600">{similarActivity.title}</div>
                        <div className="text-xs text-gray-500">
                          {similarActivity.tags.goalAreas.join(', ')}
                        </div>
                      </Link>
                    ))
                  }
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <button className="btn-primary w-full">
                Use This Activity
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
