'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { mockPatients, PatientProfile } from '@/lib/mockData';

export default function EditPatientProfile({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [patient, setPatient] = useState<PatientProfile | null>(null);
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

  // Load patient data on component mount
  useEffect(() => {
    // Simulate API call to fetch patient data
    setTimeout(() => {
      const foundPatient = mockPatients.find(p => p.id === id);
      
      if (foundPatient) {
        setPatient(foundPatient);
        setFormData({
          name: foundPatient.name,
          age: foundPatient.age.toString(),
          culturalBackground: foundPatient.culturalBackground,
          interests: foundPatient.interests,
          treatmentGoals: foundPatient.treatmentGoals,
          challenges: foundPatient.challenges,
          preferredActivities: foundPatient.preferredActivities,
          problemDescription: foundPatient.additionalNotes.split('.')[0] || '', // Using first sentence of notes as mock problem description
          additionalNotes: foundPatient.additionalNotes,
        });
      }
      
      setIsLoading(false);
    }, 500);
  }, [id]);

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
    
    // In a real app, this would be an API call to update the patient
    // For now, we'll just simulate a submission
    setTimeout(() => {
      setIsSubmitting(false);
      // In a real app, we would update the patient data here
      router.push(`/patients/match/${id}`);
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

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="gradient-card p-12 text-center">
          <h2 className="text-2xl font-bold text-primary-700 mb-4">Loading Patient Profile...</h2>
          <div className="w-24 h-24 mx-auto mb-4 border-4 border-t-primary-500 border-r-primary-300 border-b-velvet border-l-velvet-light rounded-full animate-spin"></div>
          <p className="text-gray-600">Please wait while we retrieve the patient information</p>
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
          <Link href="/patients" className="btn-primary">
            Back to Patients
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary-700 mb-2">Edit Patient Profile</h1>
        <p className="text-gray-600">
          Update {patient.name}'s information to improve activity matching
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
            <Link 
              href={`/patients/match/${id}`} 
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving Changes...' : 'Update Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
