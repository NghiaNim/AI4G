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

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  content: string;
  timestamp: string;
}

export interface TherapyPlanChat {
  id: string;
  patientId: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
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

// Mock therapy plan chats
export const mockTherapyChats: TherapyPlanChat[] = [
  {
    id: "chat1",
    patientId: "pat1",
    title: "Emotional Regulation Plan for Alex",
    messages: [
      {
        id: "msg1-1",
        sender: "user",
        content: "Patient: Alex Thompson, Age: 10, American\n\nPresenting Issues: Patient struggles with emotional regulation and social anxiety, particularly in group settings.\n\nDetailed Description: Alex has significant difficulty expressing emotions and tends to become overwhelmed during transitions between activities or when faced with unexpected changes. He shows sensory sensitivities to loud noises and requires clear expectations and visual schedules. His interests include drawing, video games, space, and animals.\n\nTreatment Goals: Emotional Regulation, Social Skills, Anxiety Reduction\n\nPlease provide a comprehensive therapy plan addressing these concerns.",
        timestamp: "2025-08-15T10:30:00Z"
      },
      {
        id: "msg1-2",
        sender: "ai",
        content: "Based on Alex's profile and needs, I recommend these 3 most relevant therapeutic activities:\n\n1. **Color Emotion Cards**: This activity supports Emotional Regulation by helping Alex identify and express his feelings through visual means, building on his interest in drawing.\n\n2. **Social Skills Scenario Cards**: Addresses Social Skills through structured practice of social situations that might trigger anxiety, using visual supports that respect his sensory sensitivities.\n\n3. **Calm Down Kit**: This activity incorporates his interests in animals and space to create personalized calming tools for Anxiety Reduction, particularly during transitions or unexpected changes.\n\nWhat specific situations trigger his emotional dysregulation? This would help me tailor these activities more effectively.",
        timestamp: "2025-08-15T10:30:05Z"
      },
      {
        id: "msg1-3",
        sender: "user",
        content: "Mostly transitions between activities and unexpected changes in routine. He also struggles when losing at games.",
        timestamp: "2025-08-15T10:31:20Z"
      },
      {
        id: "msg1-4",
        sender: "ai",
        content: "Thank you for that information. For Alex's therapy plan, I recommend incorporating the Color Emotion Cards activity to help him identify and express his feelings. We could create a visual schedule for transitions and develop a 'Calm Down Kit' with sensory tools. Would you like me to develop specific strategies for handling game losses?",
        timestamp: "2025-08-15T10:31:45Z"
      },
      {
        id: "msg1-5",
        sender: "user",
        content: "Yes, that would be very helpful. He gets very upset when losing games with peers.",
        timestamp: "2025-08-15T10:32:30Z"
      },
      {
        id: "msg1-6",
        sender: "ai",
        content: "For managing game losses, I suggest these strategies for Alex:\n\n1. Pre-game emotional check-in using his Color Emotion Cards\n2. Practice 'good sport' phrases before playing (\"Good game\", \"That was fun\")\n3. Teach deep breathing techniques (count to 5 inhale, count to 5 exhale)\n4. Create a social story about losing games with positive coping strategies\n5. Role-play losing scenarios in therapy before facing real situations\n6. Establish a reward system for using coping skills during games\n\nWould you like me to outline a weekly plan incorporating these elements?",
        timestamp: "2025-08-15T10:33:15Z"
      }
    ],
    createdAt: "2025-08-15T10:30:00Z",
    updatedAt: "2025-08-15T10:33:15Z"
  },
  {
    id: "chat2",
    patientId: "pat2",
    title: "Trauma Processing Plan for Maya",
    messages: [
      {
        id: "msg2-1",
        sender: "user",
        content: "Patient: Maya Rodriguez, Age: 15, Mexican-American\n\nPresenting Issues: Patient has experienced trauma and has significant difficulty trusting others, especially in group settings. She struggles with mood regulation.\n\nDetailed Description: Maya has a history of bullying at her previous school and has witnessed domestic violence at home. She's bilingual (English/Spanish) and her family is very involved in her treatment. She prefers female therapists and expresses herself through creative outlets. Her interests include music, dance, social media, and creative writing.\n\nTreatment Goals: Self-Expression, Trauma Processing, Identity Development\n\nPlease provide a trauma-informed therapy plan that incorporates her cultural background and interests.",
        timestamp: "2025-07-22T14:15:00Z"
      },
      {
        id: "msg2-2",
        sender: "ai",
        content: "Based on Maya's profile and needs, I recommend these 3 most relevant therapeutic activities:\n\n1. **Music Expression Therapy**: This activity supports Self-Expression by utilizing Maya's interest in music to process emotions in a non-verbal way that feels safer than direct conversation.\n\n2. **Cultural Narrative Journaling**: Addresses Trauma Processing by combining her interest in creative writing with elements of her Mexican-American heritage, allowing her to explore her identity and experiences.\n\n3. **Gradual Trust Building Workshop**: This structured activity incorporates small group creative exercises where Maya can contribute without constant social pressure, helping with her difficulty trusting others.\n\nCould you share more about the nature of her trauma and current trust issues? This would help me tailor these activities more effectively.",
        timestamp: "2025-07-22T14:15:10Z"
      },
      {
        id: "msg2-3",
        sender: "user",
        content: "She experienced bullying at her previous school and witnessed domestic violence at home. She's very hesitant to open up in group settings.",
        timestamp: "2025-07-22T14:16:25Z"
      },
      {
        id: "msg2-4",
        sender: "ai",
        content: "Thank you for sharing that context. For Maya, I recommend a trauma-informed approach that incorporates her interests in music and creative expression. Here's my initial recommendation:\n\n1. Begin with individual therapy sessions focused on establishing safety and trust\n2. Incorporate the Memory Collage activity to process experiences through art\n3. Use music therapy techniques for emotional regulation\n4. Introduce journaling with trauma-informed prompts in Spanish and English\n\nWould you like me to suggest specific trust-building exercises?",
        timestamp: "2025-07-22T14:17:00Z"
      },
      {
        id: "msg2-5",
        sender: "user",
        content: "Yes please, and how should we approach gradually integrating her into group settings?",
        timestamp: "2025-07-22T14:18:10Z"
      },
      {
        id: "msg2-6",
        sender: "ai",
        content: "For trust-building with Maya, I recommend:\n\n1. Consistent Boundaries: Maintain the same session structure to build predictability\n2. Cultural Connection: Incorporate elements of her Mexican-American heritage when appropriate\n3. Music Sharing: Create a collaborative playlist where both therapist and Maya add songs that express different emotions\n4. Small Victories Journal: Document moments when trust was built or maintained\n\nFor gradual group integration:\n\n1. Start with paired activities with one peer she selects\n2. Progress to small group (3-4 people) creative activities where she can contribute without constant social interaction\n3. Assign her a strength-based role in groups (e.g., music coordinator)\n4. Establish a subtle signal system for when she needs a break\n5. Debrief after group sessions to process her experience\n\nWould you like a timeline recommendation for this progression?",
        timestamp: "2025-07-22T14:19:30Z"
      }
    ],
    createdAt: "2025-07-22T14:15:00Z",
    updatedAt: "2025-07-22T14:19:30Z"
  },
  {
    id: "chat3",
    patientId: "pat3",
    title: "Substance Recovery Plan for James",
    messages: [
      {
        id: "msg3-1",
        sender: "user",
        content: "Patient: James Wilson, Age: 42, Canadian/Indigenous\n\nPresenting Issues: Patient is in recovery from substance abuse (3 months sober). He experiences chronic pain previously managed with opioids and has employment instability.\n\nDetailed Description: James strongly values his Indigenous cultural heritage and wishes to incorporate traditional practices into his recovery. He has expressed interest in reconnecting with traditional healing circles and nature-based practices. His interests include nature, fishing, traditional crafts, and reading. He has strong spiritual beliefs that are important to his identity and healing journey.\n\nTreatment Goals: Substance Abuse Recovery, Mindfulness, Stress Management\n\nPlease provide a culturally responsive therapy plan that addresses his substance recovery needs and incorporates his Indigenous cultural practices.",
        timestamp: "2025-06-10T09:20:00Z"
      },
      {
        id: "msg3-2",
        sender: "ai",
        content: "I'll develop a culturally-responsive recovery plan for James. I see he's 42, has Indigenous Canadian heritage, enjoys nature activities, and has challenges with chronic pain and employment instability. What stage of recovery is he in, and are there specific Indigenous practices he's interested in incorporating?",
        timestamp: "2025-06-10T09:20:15Z"
      },
      {
        id: "msg3-3",
        sender: "user",
        content: "He's been sober for 3 months. He's interested in reconnecting with traditional healing circles and nature-based practices. His pain management is a challenge and was previously managed with opioids.",
        timestamp: "2025-06-10T09:21:40Z"
      },
      {
        id: "msg3-4",
        sender: "ai",
        content: "Thank you for that context. Here's my recommended approach for James:\n\n1. Integrate the Mindful Nature Walk activity, adapting it to include Indigenous perspectives on connection to the land\n2. Collaborate with Indigenous elders or cultural advisors for healing circle integration\n3. Focus on non-pharmacological pain management techniques including mindfulness and Progressive Muscle Relaxation\n4. Develop sustainable routines that support both recovery and employment stability\n\nWould you like specific recommendations for pain management alternatives?",
        timestamp: "2025-06-10T09:22:20Z"
      },
      {
        id: "msg3-5",
        sender: "user",
        content: "Yes, please suggest some alternative pain management techniques that would align with his cultural background.",
        timestamp: "2025-06-10T09:23:45Z"
      },
      {
        id: "msg3-6",
        sender: "ai",
        content: "Here are culturally-aligned pain management alternatives for James:\n\n1. Traditional Plant Medicines: Work with Indigenous health practitioners to identify safe traditional plants for pain relief (e.g., willow bark, devil's club)\n\n2. Ceremonial Practices: Incorporate sweat lodge ceremonies (if appropriate for his specific heritage) which can release endorphins and provide pain relief\n\n3. Connection-Based Healing: Frame pain management within the Indigenous concept of wholeness and balance between physical, emotional, spiritual and mental aspects\n\n4. Nature-Based Grounding: Practice specific grounding techniques outdoors that connect physical sensations to natural elements\n\n5. Traditional Crafting: Engage in cultural practices like basket weaving or carving that provide both distraction from pain and meaningful cultural connection\n\n6. Community Support: Connect with Indigenous recovery groups that understand the intersection of culture, substance recovery, and chronic pain\n\nWould you like me to develop a daily routine incorporating these approaches?",
        timestamp: "2025-06-10T09:25:10Z"
      }
    ],
    createdAt: "2025-06-10T09:20:00Z",
    updatedAt: "2025-06-10T09:25:10Z"
  },
  {
    id: "chat4",
    patientId: "pat4",
    title: "Memory Enhancement Plan for Suri",
    messages: [
      {
        id: "msg4-1",
        sender: "user",
        content: "Patient: Suri Park, Age: 68, Korean-American\n\nPresenting Issues: Patient is experiencing mild cognitive decline, particularly affecting short-term memory and time orientation. She is also processing grief after losing her spouse 4 months ago.\n\nDetailed Description: Suri has limited mobility and requires materials in larger print. Her long-term memory remains strong, especially for events from her childhood in Korea. She occasionally becomes confused about time but can recall detailed memories from her past. Her interests include gardening, cooking, classical music, and spending time with her grandchildren. She sometimes brings her adult daughter to appointments and prefers morning sessions.\n\nTreatment Goals: Memory Enhancement, Grief Processing, Social Connection\n\nPlease provide a comprehensive therapy plan that addresses both her cognitive needs and grief process while incorporating her cultural background and interests.",
        timestamp: "2025-05-05T11:00:00Z"
      },
      {
        id: "msg4-2",
        sender: "ai",
        content: "I'll help create a therapy plan for Suri that addresses both her cognitive needs and grief process. I see she's 68, Korean-American, enjoys gardening and cooking, and has limited mobility. How long ago did she lose her spouse, and what cognitive functions seem most affected?",
        timestamp: "2025-05-05T11:00:20Z"
      },
      {
        id: "msg4-3",
        sender: "user",
        content: "Her husband passed away 4 months ago. She's having trouble with short-term memory and sometimes gets confused about time. Her long-term memory is still quite strong, especially for events from her childhood in Korea.",
        timestamp: "2025-05-05T11:01:45Z"
      },
      {
        id: "msg4-4",
        sender: "ai",
        content: "Thank you for those details. For Suri, I recommend a dual-focus approach:\n\n1. Memory Enhancement: \n   - Structured reminiscence therapy using her strong long-term memories\n   - Culturally relevant memory games incorporating Korean elements\n   - Memory Collage activity focused on positive memories with her spouse\n   - Routine-building with memory aids\n\n2. Grief Processing:\n   - Culturally sensitive bereavement counseling\n   - Gardening-based therapeutic activities (accessible versions)\n   - Connection with Korean-American seniors group if available\n\nWould you like me to develop specific memory exercises for her?",
        timestamp: "2025-05-05T11:02:30Z"
      },
      {
        id: "msg4-5",
        sender: "user",
        content: "Yes, please suggest some memory exercises that would be engaging for her. Also, how can we incorporate her interest in cooking despite her mobility limitations?",
        timestamp: "2025-05-05T11:04:00Z"
      },
      {
        id: "msg4-6",
        sender: "ai",
        content: "Memory exercises for Suri:\n\n1. Korean Food Memory Book: Create a scrapbook of traditional Korean recipes she remembers, with stories about when she first learned them\n\n2. Sensory Memory Box: Compile items with distinctive smells and textures from her past (spices, fabric samples) for sensory stimulation\n\n3. Temporal Orientation Practice: Daily review of a specialized calendar with Korean and American holidays marked, discussing what day it is and upcoming events\n\n4. Photograph Sequencing: Arrange family photos in chronological order, telling stories about each one\n\n5. Music Memory: Listen to Korean songs from her youth, discussing memories they evoke\n\nFor cooking with limited mobility:\n\n1. Seated Cooking Station: Set up an accessible workspace with a lower table and all ingredients within reach\n\n2. Recipe Simplification: Break down complex Korean dishes into manageable steps she can do seated\n\n3. Cooking Partnership: Have her direct another person (therapist, family member) while she handles safer, seated tasks\n\n4. Adaptive Cooking Tools: Provide specialized equipment like rocker knives, jar openers, and lightweight tools\n\n5. Focus on Non-Heat Steps: Emphasize food preparation aspects that don't require standing at a stove\n\n6. Virtual Cooking Club: Connect her with others to share recipes and cooking stories when in-person cooking isn't possible\n\nWould you like me to create a weekly schedule incorporating these activities?",
        timestamp: "2025-05-05T11:06:15Z"
      }
    ],
    createdAt: "2025-05-05T11:00:00Z",
    updatedAt: "2025-05-05T11:06:15Z"
  },
  {
    id: "chat5",
    patientId: "pat5",
    title: "ADHD Management Plan for Zain",
    messages: [
      {
        id: "msg5-1",
        sender: "user",
        content: "Patient: Zain Ahmed, Age: 8, Pakistani\n\nPresenting Issues: Patient has ADHD and struggles with following multi-step instructions, attention focus, and impulse control, particularly during academic tasks and turn-taking in social situations.\n\nDetailed Description: Zain is not currently on medication as his parents prefer behavioral approaches first. He responds well to reward systems and immediate feedback. His Muslim family values cultural considerations in his treatment. His interests include Legos, superheroes, science, and sports, which can be leveraged in his therapy plan.\n\nTreatment Goals: Attention Focus, Social Skills, Emotional Regulation\n\nPlease provide a comprehensive behavioral therapy plan for ADHD management that is culturally sensitive and incorporates his interests.",
        timestamp: "2025-07-30T13:45:00Z"
      },
      {
        id: "msg5-2",
        sender: "ai",
        content: "I'll develop strategies for Zain's ADHD management. I see he's 8, Pakistani, enjoys Legos and superheroes, and his family values their Muslim cultural practices. How is his ADHD currently being managed, and are there specific situations where his challenges are most pronounced?",
        timestamp: "2025-07-30T13:45:15Z"
      },
      {
        id: "msg5-3",
        sender: "user",
        content: "He's not currently on medication. His parents prefer behavioral approaches first. He struggles most during academic tasks that require sustained attention and in social situations where he needs to wait his turn.",
        timestamp: "2025-07-30T13:46:30Z"
      },
      {
        id: "msg5-4",
        sender: "ai",
        content: "Thank you for that context. Here's my recommended behavioral approach for Zain:\n\n1. Visual Instruction Systems: Create superhero-themed visual schedules and instruction cards\n2. Body-Based Focus Techniques: Incorporate movement breaks between tasks\n3. Social Skills Practice: Use Social Story Construction with superhero themes\n4. Reward System: Develop a culturally-appropriate token system for completing multi-step tasks\n\nI also recommend incorporating his interests in Legos for attention-building activities. Would you like specific strategies for helping him wait his turn in social situations?",
        timestamp: "2025-07-30T13:47:45Z"
      },
      {
        id: "msg5-5",
        sender: "user",
        content: "Yes, turn-taking is a significant challenge. Also, could you suggest some ways to help his parents understand ADHD better within their cultural context?",
        timestamp: "2025-07-30T13:49:00Z"
      },
      {
        id: "msg5-6",
        sender: "ai",
        content: "Turn-taking strategies for Zain:\n\n1. Visual Turn Markers: Use a special object (like a superhero figure) that gets passed to indicate whose turn it is\n\n2. Time Visualization: Use visual timers (like sand timers) so he can see how long he needs to wait\n\n3. Waiting Role: Assign him an active \"waiting job\" (scorekeeper, materials manager) during others' turns\n\n4. Social Stories: Create custom stories about turn-taking featuring superheroes learning patience\n\n5. Islamic Patience Teaching: Connect waiting with Islamic concepts of sabr (patience) through age-appropriate stories\n\n6. Reinforcement: Implement a token system specifically rewarding successful turn-waiting\n\nFor parental cultural understanding:\n\n1. Frame ADHD Within Strengths: Highlight how Zain's energy and creativity are positive traits that need channeling\n\n2. Connect With Muslim ADHD Resources: Share materials from organizations like Muslim Mental Health consortium that address ADHD from an Islamic perspective\n\n3. Find Cultural Metaphors: Use concepts from Pakistani/Islamic tradition that illustrate how different minds work differently\n\n4. Parent Coaching: Offer specific guidance on how to modify traditional Pakistani parenting approaches to be effective for ADHD\n\n5. Community Connection: Link parents with other Muslim families successfully managing ADHD\n\n6. Respect Religious Framework: Acknowledge how prayer practices might actually help with focus and routine\n\nWould you like me to develop specific Lego-based activities to help with his executive functioning skills?",
        timestamp: "2025-07-30T13:51:20Z"
      }
    ],
    createdAt: "2025-07-30T13:45:00Z",
    updatedAt: "2025-07-30T13:51:20Z"
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

// Function to get therapy chats for a patient
export function getPatientTherapyChats(patientId: string): TherapyPlanChat[] {
  return mockTherapyChats.filter(chat => chat.patientId === patientId);
}
