'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { mockPatients, getPatientTherapyChats, matchActivitiesForPatient, TherapyPlanChat, ChatMessage, PatientProfile } from '@/lib/mockData';

export default function PatientChatPage({ params }: { params: { id: string } }) {
  const { id } = params;
  
  const [patient, setPatient] = useState<PatientProfile | null>(null);
  const [existingChats, setExistingChats] = useState<TherapyPlanChat[]>([]);
  const [activeChat, setActiveChat] = useState<TherapyPlanChat | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [showNewChatForm, setShowNewChatForm] = useState(false);
  const [newChatTitle, setNewChatTitle] = useState('');
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportedPlan, setExportedPlan] = useState<string>('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Function to generate activity names based on patient profile
  const getRecommendedActivityName = (patient: PatientProfile, index: number): string => {
    // Try to get actual matched activities first
    const matchedActivities = matchActivitiesForPatient(patient.id);
    if (matchedActivities.length > index) {
      return matchedActivities[index].title;
    }
    
    // Fallback activity names if no matches
    const fallbackActivities = [
      `${patient.treatmentGoals[0]} through ${patient.interests[0] || 'Creative Expression'}`,
      `Structured ${patient.treatmentGoals.length > 1 ? patient.treatmentGoals[1] : patient.treatmentGoals[0]} Exercises`,
      `${patient.interests.length > 1 ? patient.interests[1] : (patient.interests[0] || 'Personalized')}-Based Therapy Sessions`
    ];
    
    return fallbackActivities[index] || `Tailored Therapy Activity ${index + 1}`;
  };

  useEffect(() => {
    // Simulate loading patient data and chats
    setTimeout(() => {
      // Try to find the patient in mock data
      const foundPatient = mockPatients.find(p => p.id === id);
      setPatient(foundPatient || null);
      
      // Get existing chats for this patient
      const chats = getPatientTherapyChats(id);
      setExistingChats(chats);
      
      // If there are chats, set the most recent one as active
      if (chats.length > 0) {
        const sortedChats = [...chats].sort((a, b) => 
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
        setActiveChat(sortedChats[0]);
      }
      
      setLoading(false);
    }, 1000);
  }, [id]);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeChat]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeChat || !patient) return;
    
    // Clone the active chat
    const updatedChat = { ...activeChat };
    
    // Add user message
    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      sender: 'user',
      content: newMessage,
      timestamp: new Date().toISOString(),
    };
    updatedChat.messages = [...updatedChat.messages, userMessage];
    updatedChat.updatedAt = new Date().toISOString();
    
    // Update state
    setActiveChat(updatedChat);
    setNewMessage('');
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      // Create an AI response based on the user message
      let aiResponse = "I'm analyzing the patient profile and your query...";
      
      if (newMessage.toLowerCase().includes('goal') || newMessage.toLowerCase().includes('plan')) {
        aiResponse = `Based on ${patient.name}'s profile, I recommend focusing on these treatment goals: ${patient.treatmentGoals.join(', ')}. Would you like me to elaborate on specific strategies for any of these areas?`;
      } else if (newMessage.toLowerCase().includes('activity') || newMessage.toLowerCase().includes('exercise')) {
        aiResponse = `I can suggest several activities tailored to ${patient.name}'s interests in ${patient.interests.slice(0, 2).join(' and ')}. These would support the goals of ${patient.treatmentGoals[0]} and address the challenges of ${patient.challenges[0]}. Would you like me to provide specific activity recommendations?`;
      } else if (newMessage.toLowerCase().includes('challenge') || newMessage.toLowerCase().includes('difficult')) {
        aiResponse = `I understand ${patient.name} faces challenges with ${patient.challenges.join(' and ')}. I've developed specific strategies to address these based on successful approaches for patients with similar profiles. Would you like me to share these strategies?`;
      } else {
        aiResponse = `Thank you for your input about ${patient.name}. I've analyzed this information alongside their profile data. I can help with developing personalized therapy plans, suggesting specific activities, or addressing particular challenges. What specific aspect would you like me to focus on?`;
      }
      
      const aiMessage: ChatMessage = {
        id: `msg-${Date.now()}-ai`,
        sender: 'ai',
        content: aiResponse,
        timestamp: new Date().toISOString(),
      };
      
      // Update chat with AI response
      const chatWithResponse = { 
        ...updatedChat, 
        messages: [...updatedChat.messages, aiMessage],
        updatedAt: new Date().toISOString()
      };
      
      // Update state
      setActiveChat(chatWithResponse);
      
      // Also update in the list of chats
      setExistingChats(prev => 
        prev.map(chat => chat.id === activeChat.id ? chatWithResponse : chat)
      );
      
    }, 1500);
  };

  const createStandardizedPrompt = (patient: PatientProfile): string => {
    // Create a standardized prompt based on the patient profile
    return `Patient: ${patient.name}, Age: ${patient.age}, ${patient.culturalBackground.join('/')}

Presenting Issues: Patient ${patient.challenges.map(c => c.toLowerCase()).join(' and ')}.

Detailed Description: ${patient.additionalNotes} ${patient.interests.length > 0 ? `The patient's interests include ${patient.interests.join(', ')}.` : ''}

Treatment Goals: ${patient.treatmentGoals.join(', ')}

Please identify the 3 most relevant therapeutic activities for this patient based on their needs and profile. Then provide a comprehensive therapy plan incorporating these activities.`;
  };

  const createNewChat = () => {
    if (!newChatTitle.trim() || !patient) return;
    
    // Create the standardized initial prompt
    const initialUserPrompt = createStandardizedPrompt(patient);
    
    const newChat: TherapyPlanChat = {
      id: `chat-${Date.now()}`,
      patientId: patient.id,
      title: newChatTitle,
      messages: [
        {
          id: `msg-${Date.now()}-user`,
          sender: 'user',
          content: initialUserPrompt,
          timestamp: new Date().toISOString(),
        },
        {
          id: `msg-${Date.now()}-ai`,
          sender: 'ai',
          content: `Based on ${patient.name}'s profile and needs, I recommend these 3 most relevant therapeutic activities:

1. **${getRecommendedActivityName(patient, 0)}**: This activity supports ${patient.treatmentGoals[0]} by engaging the patient in structured exercises that build on their interest in ${patient.interests[0] || "relevant areas"}.

2. **${getRecommendedActivityName(patient, 1)}**: Addresses ${patient.treatmentGoals.length > 1 ? patient.treatmentGoals[1] : patient.treatmentGoals[0]} through guided practice and helps overcome challenges with ${patient.challenges[0]}.

3. **${getRecommendedActivityName(patient, 2)}**: This activity incorporates ${patient.interests.length > 1 ? patient.interests[1] : patient.interests[0] || "personal interests"} to build skills in ${patient.treatmentGoals.length > 2 ? patient.treatmentGoals[2] : patient.treatmentGoals[0]} while addressing ${patient.challenges.length > 1 ? patient.challenges[1] : patient.challenges[0]}.

Would you like me to elaborate on any of these activities or suggest a specific implementation plan?`,
          timestamp: new Date(Date.now() + 2000).toISOString(),
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setExistingChats(prev => [newChat, ...prev]);
    setActiveChat(newChat);
    setNewChatTitle('');
    setShowNewChatForm(false);
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Generate treatment plan export from conversation
  const generateTreatmentPlan = () => {
    if (!activeChat || !patient) return;
    
    // Extract activity recommendations from the conversation
    const activities: string[] = [];
    const goals: string[] = [];
    let aiResponses = activeChat.messages.filter(msg => msg.sender === 'ai').map(msg => msg.content);
    
    // Try to extract activities mentioned in the conversation
    for (const response of aiResponses) {
      // Look for numbered lists like "1. **Activity Name**" or "1. Activity Name"
      const activityMatches = response.match(/\d+\.\s+\*\*([^*]+)\*\*|\d+\.\s+([^*\n]+)/g);
      if (activityMatches && activityMatches.length > 0) {
        for (const match of activityMatches) {
          // Remove both markdown and numbering
          let activityName = match.replace(/\d+\.\s+\*\*/, '').replace(/\*\*/g, '').trim();
          // If it didn't have markdown, just remove the numbering
          if (match.indexOf('**') === -1) {
            activityName = match.replace(/\d+\.\s+/, '').trim();
          }
          if (!activities.includes(activityName) && activities.length < 3) {
            activities.push(activityName);
          }
        }
      }
    }
    
    // If we couldn't extract activities, use fallbacks
    if (activities.length < 3) {
      for (let i = activities.length; i < 3; i++) {
        activities.push(getRecommendedActivityName(patient, i));
      }
    }
    
    // Get treatment goals from patient profile
    patient.treatmentGoals.forEach(goal => {
      if (goals.length < 3) goals.push(goal);
    });
    
    // Format the treatment plan
    const plan = `
# Treatment Plan for ${patient.name}

## Patient Profile
- Name: ${patient.name}
- Age: ${patient.age}
- Cultural Background: ${patient.culturalBackground.join(', ')}
- Interests: ${patient.interests.join(', ')}

## Treatment Goals
${goals.map((goal, index) => `${index + 1}. ${goal}`).join('\n')}

## Recommended Activities
${activities.map((activity, index) => `${index + 1}. ${activity}`).join('\n')}

## Implementation Strategy
- Schedule ${activities[0]} sessions twice weekly
- Incorporate ${activities[1]} as a daily practice element
- Use ${activities[2]} for milestone evaluations monthly

## Progress Tracking
- Weekly assessment of emotional regulation using standardized scales
- Bi-weekly review of goal progress with patient
- Monthly assessment of overall treatment efficacy

Treatment plan generated on ${new Date().toLocaleDateString()} based on AI-assisted therapy planning
`;
    
    setExportedPlan(plan);
    setShowExportModal(true);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="gradient-card p-12 text-center">
          <h2 className="text-2xl font-bold text-primary-700 mb-4">Loading conversation...</h2>
          <div className="w-24 h-24 mx-auto mb-4 border-4 border-t-primary-500 border-r-primary-300 border-b-velvet border-l-velvet-light rounded-full animate-spin"></div>
          <p className="text-gray-600">Retrieving patient data and conversation history</p>
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
            Return to Patients
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
      {/* Export Treatment Plan Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-primary-700">Treatment Plan for {patient.name}</h2>
              <button 
                onClick={() => setShowExportModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-grow">
              <div className="prose max-w-none">
                <pre className="whitespace-pre-wrap">{exportedPlan}</pre>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-end space-x-3">
              <button 
                onClick={() => setShowExportModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  // In a real app, this would download or save the plan
                  alert('Treatment plan would be downloaded in a production environment');
                  setShowExportModal(false);
                }}
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
              >
                Download Plan
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary-700 mb-2">
            AI Therapy Planning for {patient.name}
          </h1>
          <p className="text-gray-600">
            Personalized therapy recommendations based on patient profile
          </p>
        </div>
        <Link href={`/patients/match/${patient.id}`} className="btn-secondary">
          Return to Recommendations
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar with chat history */}
        <div className="lg:col-span-1">
          {/* Chat history */}
          <div className="gradient-card p-4 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-primary-700">Conversation History</h2>
              <button 
                onClick={() => setShowNewChatForm(true)} 
                className="text-sm text-primary-600 hover:text-primary-800 flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                New
              </button>
            </div>

            {showNewChatForm && (
              <div className="mb-4">
                <input 
                  type="text"
                  placeholder="Enter conversation title"
                  className="form-input w-full mb-2"
                  value={newChatTitle}
                  onChange={(e) => setNewChatTitle(e.target.value)}
                />
                <div className="flex space-x-2">
                  <button 
                    onClick={createNewChat}
                    className="px-3 py-1 bg-primary-600 text-white rounded-md text-sm flex-1"
                  >
                    Create
                  </button>
                  <button 
                    onClick={() => setShowNewChatForm(false)}
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-2 max-h-[50vh] overflow-y-auto">
              {existingChats.length === 0 ? (
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-500 text-sm">No conversations yet.</p>
                  <button 
                    onClick={() => setShowNewChatForm(true)}
                    className="text-primary-600 text-sm mt-2"
                  >
                    Start a new conversation
                  </button>
                </div>
              ) : (
                existingChats.map(chat => (
                  <div 
                    key={chat.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      activeChat?.id === chat.id 
                        ? 'bg-primary-100 border-l-4 border-primary-500' 
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveChat(chat)}
                  >
                    <h3 className="font-medium text-gray-900 truncate">{chat.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(chat.updatedAt).toLocaleDateString()} • {chat.messages.length} messages
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Patient summary */}
          <div className="gradient-card p-4">
            <h3 className="font-semibold text-primary-700 mb-3">Patient Summary</h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-medium text-gray-700">Age:</span>{' '}
                {patient.age} years
              </div>
              
              <div>
                <span className="font-medium text-gray-700">Treatment Goals:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {patient.treatmentGoals.map(goal => (
                    <span key={goal} className="px-2 py-0.5 bg-primary-100 text-primary-700 rounded-full text-xs">
                      {goal}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <span className="font-medium text-gray-700">Interests:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {patient.interests.map(interest => (
                    <span key={interest} className="px-2 py-0.5 bg-velvet-light text-primary-700 rounded-full text-xs">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <span className="font-medium text-gray-700">Challenges:</span>
                <p className="text-gray-600 text-xs">{patient.challenges.join(', ')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main chat window */}
        <div className="lg:col-span-3">
          <div className="gradient-card p-0 flex flex-col h-[70vh]">
            {/* Chat header */}
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h2 className="font-semibold text-primary-700">
                  {activeChat ? activeChat.title : 'AI Therapy Assistant'}
                </h2>
                {activeChat && (
                  <p className="text-xs text-gray-500">
                    Created {new Date(activeChat.createdAt).toLocaleDateString()}
                  </p>
                )}
              </div>
              <div className="flex items-center space-x-3">
                {activeChat && activeChat.messages.length >= 3 && (
                  <button 
                    onClick={generateTreatmentPlan} 
                    className="text-sm px-3 py-1 bg-velvet text-white rounded-full hover:bg-velvet-dark flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                    </svg>
                    Export Plan
                  </button>
                )}
                <button className="text-gray-500 hover:text-gray-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              {!activeChat ? (
                <div className="text-center py-8">
                  <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                  </svg>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">No conversation selected</h3>
                  <p className="text-gray-500 mb-4">Select an existing conversation or start a new one</p>
                  <button 
                    onClick={() => setShowNewChatForm(true)}
                    className="btn-primary"
                  >
                    Start New Conversation
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeChat.messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] px-4 py-3 rounded-lg ${
                          message.sender === 'user' 
                            ? 'bg-primary-600 text-white' 
                            : 'bg-white border border-gray-200'
                        }`}
                      >
                        <div className="text-sm whitespace-pre-wrap">
                          {message.content}
                        </div>
                        <div className={`text-xs mt-1 ${message.sender === 'user' ? 'text-primary-100' : 'text-gray-400'}`}>
                          {formatTimestamp(message.timestamp)}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Message input */}
            {activeChat && (
              <div className="p-4 border-t border-gray-100">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="form-input flex-1"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage();
                      }
                    }}
                  />
                  <button 
                    className={`btn-primary ${!newMessage.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                    </svg>
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  AI responses are based on the patient profile and best therapeutic practices
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
