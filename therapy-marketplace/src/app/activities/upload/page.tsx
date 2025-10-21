'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function UploadActivity() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    goalAreas: [] as string[],
    ageGroups: [] as string[],
    difficultyLevel: '',
    culturalContext: [] as string[],
    sessionLength: '',
    materials: '',
    steps: '',
  });

  // Options for form selections
  const goalAreaOptions = [
    'Emotional Regulation', 'Self-Expression', 'Cognitive Processing', 'Social Skills',
    'Communication', 'Mindfulness', 'Anxiety Reduction', 'Sensory Integration',
    'Stress Management', 'Body Awareness', 'Trauma Processing', 'Memory Enhancement'
  ];
  
  const ageGroupOptions = [
    'Early Childhood (0-5)', 'Children (6-12)', 'Adolescents (13-17)', 
    'Adults (18+)', 'Seniors (65+)', 'Individuals with ASD'
  ];
  
  const difficultyOptions = ['Easy', 'Medium', 'Challenging'];
  
  const culturalContextOptions = [
    'Western', 'Eastern', 'African', 'Indigenous', 'Latin American', 
    'Middle Eastern', 'Universal', 'Adaptable', 'Nature-Based'
  ];
  
  const sessionLengthOptions = [
    '15-30 minutes', '30-45 minutes', '45-60 minutes', '60-90 minutes', '90+ minutes'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, value: string) => {
    setFormData(prev => {
      const currentValues = prev[name as keyof typeof prev] as string[];
      
      if (Array.isArray(currentValues)) {
        if (currentValues.includes(value)) {
          return {
            ...prev,
            [name]: currentValues.filter(item => item !== value)
          };
        } else {
          return {
            ...prev,
            [name]: [...currentValues, value]
          };
        }
      }
      
      return prev;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // In a real app, this would be an API call
    // For now, we'll just simulate a submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Redirect after showing success screen for 2 seconds
      setTimeout(() => {
        router.push('/activities');
      }, 2000);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="gradient-card p-12 text-center">
          <h2 className="text-2xl font-bold text-primary-700 mb-4">Activity Submitted Successfully!</h2>
          <div className="w-24 h-24 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <p className="text-gray-600">Your therapy activity has been successfully added to our database</p>
          <p className="text-sm text-gray-500 mt-2">Redirecting to activities page...</p>
        </div>
      </div>
    );
  }

  if (isSubmitting) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="gradient-card p-12 text-center">
          <h2 className="text-2xl font-bold text-primary-700 mb-4">Submitting Activity...</h2>
          <div className="w-24 h-24 mx-auto mb-4 border-4 border-t-primary-500 border-r-primary-300 border-b-velvet border-l-velvet-light rounded-full animate-spin"></div>
          <p className="text-gray-600">Please wait while we process your activity submission</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary-700 mb-2">Upload Therapy Activity</h1>
        <p className="text-gray-600">
          Share your therapy activities with the community. Be specific with tags to help others find your activity.
        </p>
      </div>

      <div className="gradient-card p-8">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title" className="form-label">Activity Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-input h-24"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Goal Areas (select all that apply)</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {goalAreaOptions.map(goal => (
                <div key={goal} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`goal-${goal}`}
                    checked={formData.goalAreas.includes(goal)}
                    onChange={() => handleCheckboxChange('goalAreas', goal)}
                    className="mr-2"
                  />
                  <label htmlFor={`goal-${goal}`} className="text-sm">{goal}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Age Groups (select all that apply)</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {ageGroupOptions.map(age => (
                <div key={age} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`age-${age}`}
                    checked={formData.ageGroups.includes(age)}
                    onChange={() => handleCheckboxChange('ageGroups', age)}
                    className="mr-2"
                  />
                  <label htmlFor={`age-${age}`} className="text-sm">{age}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="form-group">
              <label htmlFor="difficultyLevel" className="form-label">Difficulty Level</label>
              <select
                id="difficultyLevel"
                name="difficultyLevel"
                value={formData.difficultyLevel}
                onChange={handleChange}
                className="form-input"
                required
              >
                <option value="">Select difficulty</option>
                {difficultyOptions.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="sessionLength" className="form-label">Session Length</label>
              <select
                id="sessionLength"
                name="sessionLength"
                value={formData.sessionLength}
                onChange={handleChange}
                className="form-input"
                required
              >
                <option value="">Select session length</option>
                {sessionLengthOptions.map(length => (
                  <option key={length} value={length}>{length}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Cultural Context (select all that apply)</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {culturalContextOptions.map(context => (
                <div key={context} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`context-${context}`}
                    checked={formData.culturalContext.includes(context)}
                    onChange={() => handleCheckboxChange('culturalContext', context)}
                    className="mr-2"
                  />
                  <label htmlFor={`context-${context}`} className="text-sm">{context}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="materials" className="form-label">Materials Required (one per line)</label>
            <textarea
              id="materials"
              name="materials"
              value={formData.materials}
              onChange={handleChange}
              className="form-input h-20"
              placeholder="List materials, one per line"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="steps" className="form-label">Activity Steps (one per line)</label>
            <textarea
              id="steps"
              name="steps"
              value={formData.steps}
              onChange={handleChange}
              className="form-input h-32"
              placeholder="List steps, one per line"
              required
            />
          </div>

          <div className="flex justify-end space-x-4 mt-8">
            <Link href="/activities" className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
              Cancel
            </Link>
            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Upload Activity'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
