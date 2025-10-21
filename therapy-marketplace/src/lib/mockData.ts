// Define the types for our data
export interface TherapyActivity {
  id: string;
  title: string;
  description: string;
  tags: {
    goalAreas: string[];
    ageGroup: string[];
    difficultyLevel: string;
    culturalContext: string[];
    sessionLength: string;
  };
  materials: string[];
  steps: string[];
  createdBy: string;
  createdAt: string;
  effectiveness: number; // 1-5 rating
}

export interface PatientProfile {
  id: string;
  name: string;
  age: number;
  culturalBackground: string[];
  interests: string[];
  treatmentGoals: string[];
  challenges: string[];
  preferredActivities: string[];
  additionalNotes: string;
}

// Mock therapy activities data
export const mockActivities: TherapyActivity[] = [
  {
    id: "act1",
    title: "Color Emotion Cards",
    description: "Patients create cards associating colors with emotions to explore emotional awareness and expression.",
    tags: {
      goalAreas: ["Emotional Regulation", "Self-Expression", "Cognitive Processing"],
      ageGroup: ["Children (6-12)", "Adolescents (13-17)"],
      difficultyLevel: "Easy",
      culturalContext: ["Western", "Universal"],
      sessionLength: "30-45 minutes",
    },
    materials: ["Colored paper", "Markers/crayons", "Scissors", "Emotion word list"],
    steps: [
      "Discuss different emotions and their potential color associations",
      "Have patients select colors for each emotion",
      "Create cards with colors and emotion words",
      "Use cards for discussion about emotional experiences",
      "Practice identifying emotions using the cards",
    ],
    createdBy: "Dr. Sarah Johnson",
    createdAt: "2025-05-15",
    effectiveness: 4.5,
  },
  {
    id: "act2",
    title: "Mindful Nature Walk",
    description: "Guided outdoor walking activity focusing on sensory awareness and mindfulness in nature.",
    tags: {
      goalAreas: ["Mindfulness", "Anxiety Reduction", "Sensory Integration"],
      ageGroup: ["Adolescents (13-17)", "Adults (18+)", "Seniors (65+)"],
      difficultyLevel: "Medium",
      culturalContext: ["Universal", "Nature-Based"],
      sessionLength: "45-60 minutes",
    },
    materials: ["Natural outdoor setting", "Optional: journal for reflection"],
    steps: [
      "Begin with breathing exercise to center attention",
      "Walk slowly through natural area, focusing on each sense",
      "Pause periodically to notice specific elements (sounds, textures, etc.)",
      "Guide patients to notice thoughts without judgment",
      "Optional reflection journal entry at conclusion",
    ],
    createdBy: "Dr. Michael Wong",
    createdAt: "2025-03-22",
    effectiveness: 4.8,
  },
  {
    id: "act3",
    title: "Social Story Construction",
    description: "Patients create personalized social stories to develop understanding of social situations and appropriate responses.",
    tags: {
      goalAreas: ["Social Skills", "Communication", "Cognitive Processing"],
      ageGroup: ["Children (6-12)", "Individuals with ASD"],
      difficultyLevel: "Medium",
      culturalContext: ["Adaptable", "Western"],
      sessionLength: "30-45 minutes",
    },
    materials: ["Paper", "Markers/pencils", "Example social stories", "Picture symbols (optional)"],
    steps: [
      "Identify challenging social situation",
      "Break down situation into sequential steps",
      "Create simple descriptive sentences for each step",
      "Add appropriate responses and their outcomes",
      "Practice applying story to real-life scenarios",
    ],
    createdBy: "Dr. Lisa Chen",
    createdAt: "2025-01-10",
    effectiveness: 4.2,
  },
  {
    id: "act4",
    title: "Progressive Muscle Relaxation Journey",
    description: "Guided relaxation technique focusing on systematically tensing and relaxing muscle groups.",
    tags: {
      goalAreas: ["Anxiety Reduction", "Stress Management", "Body Awareness"],
      ageGroup: ["Adolescents (13-17)", "Adults (18+)", "Seniors (65+)"],
      difficultyLevel: "Easy",
      culturalContext: ["Universal"],
      sessionLength: "15-30 minutes",
    },
    materials: ["Comfortable seating or lying space", "Optional: relaxing background music"],
    steps: [
      "Position patient comfortably lying down or seated",
      "Guide through deep breathing exercise",
      "Work through muscle groups from toes to head, tensing and releasing",
      "Incorporate visualization of peaceful scene",
      "Slowly return awareness to room",
    ],
    createdBy: "Dr. Robert Garcia",
    createdAt: "2024-11-05",
    effectiveness: 4.6,
  },
  {
    id: "act5",
    title: "Memory Collage",
    description: "Art therapy activity where patients create collages representing significant memories to process experiences.",
    tags: {
      goalAreas: ["Trauma Processing", "Self-Expression", "Memory Enhancement"],
      ageGroup: ["Adolescents (13-17)", "Adults (18+)", "Seniors (65+)"],
      difficultyLevel: "Medium",
      culturalContext: ["Universal", "Adaptable"],
      sessionLength: "60-90 minutes",
    },
    materials: ["Magazines/printed images", "Scissors", "Glue", "Poster board", "Optional: personal photos"],
    steps: [
      "Discuss theme or memory category to focus on",
      "Select images that resonate with memories",
      "Arrange and glue images to create visual narrative",
      "Share collage meaning if comfortable",
      "Discuss emotions and insights that emerged",
    ],
    createdBy: "Dr. Amara Patel",
    createdAt: "2025-02-18",
    effectiveness: 4.3,
  }
];

// Mock patient profile data
export const mockPatients: PatientProfile[] = [
  {
    id: "pat1",
    name: "Alex Thompson",
    age: 10,
    culturalBackground: ["American"],
    interests: ["Drawing", "Video games", "Space", "Animals"],
    treatmentGoals: ["Emotional Regulation", "Social Skills", "Anxiety Reduction"],
    challenges: ["Difficulty expressing emotions", "Social anxiety in group settings"],
    preferredActivities: ["Art-based", "Individual work", "Structured activities"],
    additionalNotes: "Responds well to visual schedules and clear expectations. Sensory sensitivities to loud noises.",
  },
  {
    id: "pat2",
    name: "Maya Rodriguez",
    age: 15,
    culturalBackground: ["Mexican-American"],
    interests: ["Music", "Dance", "Social media", "Creative writing"],
    treatmentGoals: ["Self-Expression", "Trauma Processing", "Identity Development"],
    challenges: ["History of trauma", "Difficulty trusting others", "Mood regulation"],
    preferredActivities: ["Creative expression", "Movement-based", "Music therapy"],
    additionalNotes: "Bilingual (English/Spanish). Family is very involved in treatment. Prefers female therapists.",
  },
  {
    id: "pat3",
    name: "James Wilson",
    age: 42,
    culturalBackground: ["Canadian", "Indigenous"],
    interests: ["Nature", "Fishing", "Traditional crafts", "Reading"],
    treatmentGoals: ["Substance Abuse Recovery", "Mindfulness", "Stress Management"],
    challenges: ["History of substance abuse", "Chronic pain", "Employment instability"],
    preferredActivities: ["Outdoor activities", "Mindfulness practices", "Group discussions"],
    additionalNotes: "Values cultural connection in treatment. Has strong spiritual beliefs that are important to incorporate.",
  },
  {
    id: "pat4",
    name: "Suri Park",
    age: 68,
    culturalBackground: ["Korean-American"],
    interests: ["Gardening", "Cooking", "Classical music", "Spending time with grandchildren"],
    treatmentGoals: ["Memory Enhancement", "Grief Processing", "Social Connection"],
    challenges: ["Recent loss of spouse", "Mild cognitive decline", "Limited mobility"],
    preferredActivities: ["Seated activities", "Reminiscence work", "Skill-building"],
    additionalNotes: "Prefers morning sessions. Sometimes brings adult daughter to appointments. Needs materials in larger print.",
  },
  {
    id: "pat5",
    name: "Zain Ahmed",
    age: 8,
    culturalBackground: ["Pakistani"],
    interests: ["Legos", "Superheroes", "Science", "Sports"],
    treatmentGoals: ["Attention Focus", "Social Skills", "Emotional Regulation"],
    challenges: ["ADHD", "Difficulty following multi-step instructions", "Impulsivity"],
    preferredActivities: ["Active games", "Building activities", "Technology-based learning"],
    additionalNotes: "Muslim family - cultural considerations important. Responds well to reward systems and immediate feedback.",
  }
];

// Function to match patients with activities based on goals and interests
export function matchActivitiesForPatient(patientId: string): TherapyActivity[] {
  const patient = mockPatients.find(p => p.id === patientId);
  if (!patient) return [];
  
  // Simple matching algorithm based on treatment goals and interests
  return mockActivities
    .filter(activity => {
      // Check if any treatment goals match with activity goal areas
      const goalMatch = patient.treatmentGoals.some(goal => 
        activity.tags.goalAreas.some(area => area.toLowerCase().includes(goal.toLowerCase()))
      );
      
      // Check age appropriateness
      const ageMatch = activity.tags.ageGroup.some(age => {
        if (patient.age < 13 && age.includes("Children")) return true;
        if (patient.age >= 13 && patient.age < 18 && age.includes("Adolescent")) return true;
        if (patient.age >= 18 && patient.age < 65 && age.includes("Adult")) return true;
        if (patient.age >= 65 && age.includes("Senior")) return true;
        return false;
      });
      
      return goalMatch && ageMatch;
    })
    .sort((a, b) => b.effectiveness - a.effectiveness)
    .slice(0, 3); // Return top 3 matches
}
