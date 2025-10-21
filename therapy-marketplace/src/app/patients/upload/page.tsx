'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function UploadPatientProfile() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    culturalBackground: [] as string[],
    interests: [] as string[],
    treatmentGoals: [] as string[],
    challenges: [] as string[],
    preferredActivities: [] as string[],
    problemDescription: '',
    additionalNotes: '',
  });

  // Options for form selections
  const culturalBackgroundOptions = [
    'American', 'African', 'Asian', 'European', 'Latin American',
    'Middle Eastern', 'Indigenous', 'Pacific Islander', 'Canadian', 
    'Australian', 'Mexican-American', 'Korean-American', 'Pakistani'
  ];
  
  const interestOptions = [
    'Art', 'Music', 'Sports', 'Reading', 'Writing', 
    'Nature', 'Technology', 'Animals', 'Science', 'Cooking',
    'Dance', 'Video games', 'Social media', 'Traditional crafts', 
    'Gardening', 'Space', 'Superheroes', 'Legos', 'Drawing'
  ];
  
  const treatmentGoalOptions = [
    'Emotional Regulation', 'Self-Expression', 'Cognitive Processing', 'Social Skills',
    'Communication', 'Mindfulness', 'Anxiety Reduction', 'Sensory Integration',
    'Stress Management', 'Body Awareness', 'Trauma Processing', 'Memory Enhancement',
    'Substance Abuse Recovery', 'Grief Processing', 'Social Connection', 'Attention Focus',
    'Identity Development'
  ];
  
  const challengeOptions = [
    'Social anxiety', 'Difficulty expressing emotions', 'History of trauma',
    'Difficulty trusting others', 'Mood regulation', 'Substance abuse',
    'Chronic pain', 'Employment instability', 'Limited mobility', 'Cognitive decline',
    'ADHD', 'Impulsivity', 'Following multi-step instructions', 'Sensory sensitivities'
  ];
  
  const preferredActivityOptions = [
    'Art-based', 'Movement-based', 'Music therapy', 'Individual work',
    'Group discussions', 'Outdoor activities', 'Mindfulness practices',
    'Creative expression', 'Structured activities', 'Skill-building',
    'Seated activities', 'Reminiscence work', 'Active games',
    'Building activities', 'Technology-based learning'
  ];

  // Handle basic form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle checkbox/multi-select changes
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

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // In a real app, this would be an API call
    // For now, we'll just simulate a submission
    setTimeout(() => {
      setIsSubmitting(false);
      // Create fake patient ID for demonstration
      const patientId = 'pat' + Math.floor(Math.random() * 1000);
      router.push(`/patients/match/${patientId}`);
    }, 1500);
  };

  // Create checkbox groups for multi-select fields
  const renderCheckboxGroup = (
    title: string, 
    name: keyof typeof formData, 
    options: string[]
  ) => {
    return (
      <div className="form-group">
        <label className="form-label">{title} (select all that apply)</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {options.map(option => (
            <div key={`${name}-${option}`} className="flex items-center">
              <input
                type="checkbox"
                id={`${name}-${option}`}
                checked={(formData[name] as string[]).includes(option)}
                onChange={() => handleCheckboxChange(name, option)}
                className="mr-2"
              />
              <label htmlFor={`${name}-${option}`} className="text-sm">{option}</label>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary-700 mb-2">Upload Patient Profile</h1>
        <p className="text-gray-600">
          Enter patient information to get personalized activity recommendations
        </p>
      </div>

      <div className="gradient-card p-8">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="form-group">
              <label htmlFor="name" className="form-label">Patient Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="age" className="form-label">Age</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                min="0"
                max="120"
                className="form-input"
                required
              />
            </div>
          </div>

          {renderCheckboxGroup('Cultural Background', 'culturalBackground', culturalBackgroundOptions)}
          
          {renderCheckboxGroup('Interests', 'interests', interestOptions)}
          
          {renderCheckboxGroup('Treatment Goals', 'treatmentGoals', treatmentGoalOptions)}
          
          {renderCheckboxGroup('Challenges', 'challenges', challengeOptions)}
          
          {renderCheckboxGroup('Preferred Activities', 'preferredActivities', preferredActivityOptions)}
          
          <div className="form-group">
            <label htmlFor="problemDescription" className="form-label">Detailed Problem Description</label>
            <textarea
              id="problemDescription"
              name="problemDescription"
              value={formData.problemDescription}
              onChange={handleChange}
              className="form-input h-32"
              placeholder="Provide a detailed description of the patient's challenges, diagnosis, and clinical history"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="additionalNotes" className="form-label">Additional Notes</label>
            <textarea
              id="additionalNotes"
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleChange}
              className="form-input h-24"
              placeholder="Any additional information that might be helpful (e.g., sensory sensitivities, preferred languages, special considerations)"
            />
          </div>

          <div className="flex justify-end space-x-4 mt-8">
            <Link href="/patients" className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
              Cancel
            </Link>
            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Find Matching Activities'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
