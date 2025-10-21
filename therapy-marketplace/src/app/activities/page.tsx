'use client';

import { useState } from 'react';
import Link from 'next/link';
import { mockActivities } from '@/lib/mockData';

export default function ActivitiesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    goalAreas: [] as string[],
    ageGroup: [] as string[],
    difficultyLevel: [] as string[],
  });

  // Extract unique filter options from mock data
  const goalAreaOptions = Array.from(
    new Set(mockActivities.flatMap(act => act.tags.goalAreas))
  ).sort();
  
  const ageGroupOptions = Array.from(
    new Set(mockActivities.flatMap(act => act.tags.ageGroup))
  ).sort();
  
  const difficultyOptions = Array.from(
    new Set(mockActivities.map(act => act.tags.difficultyLevel))
  ).sort();

  // Filter activities based on search term and filters
  const filteredActivities = mockActivities.filter(activity => {
    // Search term filter
    const matchesSearch = searchTerm === '' || 
      activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Goal areas filter
    const matchesGoalAreas = filters.goalAreas.length === 0 || 
      filters.goalAreas.some(goal => activity.tags.goalAreas.includes(goal));
    
    // Age group filter
    const matchesAgeGroup = filters.ageGroup.length === 0 || 
      filters.ageGroup.some(age => activity.tags.ageGroup.includes(age));
    
    // Difficulty level filter
    const matchesDifficulty = filters.difficultyLevel.length === 0 || 
      filters.difficultyLevel.includes(activity.tags.difficultyLevel);
    
    return matchesSearch && matchesGoalAreas && matchesAgeGroup && matchesDifficulty;
  });

  const handleFilterChange = (type: keyof typeof filters, value: string) => {
    setFilters(prev => {
      const currentValues = prev[type];
      
      if (currentValues.includes(value)) {
        return {
          ...prev,
          [type]: currentValues.filter(item => item !== value)
        };
      } else {
        return {
          ...prev,
          [type]: [...currentValues, value]
        };
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary-700 mb-2">Therapy Activities</h1>
          <p className="text-gray-600">Browse and search our collection of therapy activities</p>
        </div>
        <Link href="/activities/upload" className="btn-primary">
          Upload New Activity
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <div className="gradient-card p-6 mb-6">
            <h2 className="text-lg font-medium text-primary-700 mb-4">Search Activities</h2>
            <input
              type="text"
              placeholder="Search by keyword..."
              className="form-input mb-4"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            
            <h3 className="text-md font-medium text-primary-700 mt-6 mb-2">Goal Areas</h3>
            <div className="space-y-1">
              {goalAreaOptions.map(goal => (
                <div key={goal} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`goal-${goal}`}
                    checked={filters.goalAreas.includes(goal)}
                    onChange={() => handleFilterChange('goalAreas', goal)}
                    className="mr-2"
                  />
                  <label htmlFor={`goal-${goal}`} className="text-sm">{goal}</label>
                </div>
              ))}
            </div>
            
            <h3 className="text-md font-medium text-primary-700 mt-6 mb-2">Age Group</h3>
            <div className="space-y-1">
              {ageGroupOptions.map(age => (
                <div key={age} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`age-${age}`}
                    checked={filters.ageGroup.includes(age)}
                    onChange={() => handleFilterChange('ageGroup', age)}
                    className="mr-2"
                  />
                  <label htmlFor={`age-${age}`} className="text-sm">{age}</label>
                </div>
              ))}
            </div>
            
            <h3 className="text-md font-medium text-primary-700 mt-6 mb-2">Difficulty Level</h3>
            <div className="space-y-1">
              {difficultyOptions.map(difficulty => (
                <div key={difficulty} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`difficulty-${difficulty}`}
                    checked={filters.difficultyLevel.includes(difficulty)}
                    onChange={() => handleFilterChange('difficultyLevel', difficulty)}
                    className="mr-2"
                  />
                  <label htmlFor={`difficulty-${difficulty}`} className="text-sm">{difficulty}</label>
                </div>
              ))}
            </div>
            
            <button 
              className="btn-secondary w-full mt-6"
              onClick={() => {
                setFilters({ goalAreas: [], ageGroup: [], difficultyLevel: [] });
                setSearchTerm('');
              }}
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Activities List */}
        <div className="lg:col-span-3">
          <div className="mb-4">
            <p className="text-gray-600">Showing {filteredActivities.length} activities</p>
          </div>

          {filteredActivities.length === 0 ? (
            <div className="gradient-card p-8 text-center">
              <h3 className="text-lg font-medium mb-2">No activities found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your filters or search term</p>
              <Link href="/activities/upload" className="btn-primary">
                Upload New Activity
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredActivities.map(activity => (
                <div key={activity.id} className="gradient-card p-6">
                  <h3 className="text-xl font-semibold text-primary-700 mb-2">{activity.title}</h3>
                  <p className="text-gray-700 mb-4">{activity.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {activity.tags.goalAreas.map(goal => (
                      <span key={goal} className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs">
                        {goal}
                      </span>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 text-sm">
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
                    <div>
                      <span className="font-medium text-gray-700">Effectiveness:</span>{' '}
                      <span className="text-yellow-500">{'★'.repeat(Math.round(activity.effectiveness))}</span>
                      <span className="text-gray-300">{'★'.repeat(5 - Math.round(activity.effectiveness))}</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <Link href={`/activities/${activity.id}`} className="text-primary-600 hover:text-primary-800 font-medium text-sm">
                      View Details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
