import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Home, Calendar, Heart, Phone, Send, User, CheckCircle, Clock, AlertCircle, Star, Play, Pause, Image as ImageIcon } from 'lucide-react';

const SheConnectApp = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isListening, setIsListening] = useState(false);
  const [speechText, setSpeechText] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [complaints, setComplaints] = useState([
    { id: 1, issue: 'AC not working in Room 205', priority: 'P1', status: 'In Progress', assignedTo: 'Maintenance Team', timestamp: '2025-01-15 10:30', hasImage: false },
    { id: 2, issue: 'WiFi connectivity issues in common area', priority: 'P2', status: 'Resolved', assignedTo: 'IT Support', timestamp: '2025-01-14 14:20', hasImage: false }
  ]);
  const [events, setEvents] = useState([
    { id: 1, title: 'Morning Yoga Session', time: '7:00 AM', date: '2025-01-26', type: 'wellness', participants: 12 },
    { id: 2, title: 'Movie Night: Feel-Good Films', time: '8:00 PM', date: '2025-01-27', type: 'entertainment', participants: 25 },
    { id: 3, title: 'Self-Defense Workshop', time: '5:00 PM', date: '2025-01-28', type: 'safety', participants: 18 }
  ]);
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', message: 'Hello dear! I\'m here to listen and support you. How are you feeling today? 💕' }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [residents, setResidents] = useState([
    { id: 1, name: 'Priya Sharma', room: '201', profession: 'Software Engineer', interests: ['Yoga', 'Reading'], isOnline: true, avatar: '👩‍💻' },
    { id: 2, name: 'Ananya Singh', room: '105', profession: 'Graphic Designer', interests: ['Art', 'Movies'], isOnline: true, avatar: '👩‍🎨' },
    { id: 3, name: 'Riya Patel', room: '303', profession: 'Medical Student', interests: ['Fitness', 'Cooking'], isOnline: false, avatar: '👩‍⚕️' },
    { id: 4, name: 'Kavya Reddy', room: '208', profession: 'Marketing Executive', interests: ['Dancing', 'Travel'], isOnline: true, avatar: '👩‍💼' },
    { id: 5, name: 'Shreya Gupta', room: '152', profession: 'Teacher', interests: ['Books', 'Music'], isOnline: false, avatar: '👩‍🏫' },
    { id: 6, name: 'Meera Joshi', room: '401', profession: 'Data Analyst', interests: ['Tech', 'Photography'], isOnline: true, avatar: '👩‍🔬' }
  ]);

  // Mock Speech Recognition
  const startListening = () => {
    setIsListening(true);
    // Simulate speech recognition
    setTimeout(() => {
      const mockResponses = [
        "The light is not working in room 102",
        "The WiFi is very slow today",
        "Hot water is not available in bathroom",
        "I'm feeling anxious about my exams",
        "Can you suggest some relaxation techniques?"
      ];
      setSpeechText(mockResponses[Math.floor(Math.random() * mockResponses.length)]);
      setIsListening(false);
    }, 2000);
  };

  const stopListening = () => {
    setIsListening(false);
  };

  // Image Upload Handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Complaint System
  const submitComplaint = () => {
    if (!speechText.trim() && !imageFile) return;
    
    const priority = speechText.toLowerCase().includes('urgent') || speechText.toLowerCase().includes('emergency') ? 'P1' : 
                    speechText.toLowerCase().includes('water') || speechText.toLowerCase().includes('electricity') ? 'P2' : 'P3';
    
    const newComplaint = {
      id: complaints.length + 1,
      issue: speechText,
      priority,
      status: 'Submitted',
      assignedTo: priority === 'P1' ? 'Emergency Team' : 'Maintenance Team',
      timestamp: new Date().toLocaleString(),
      hasImage: !!imageFile
    };
    
    setComplaints([newComplaint, ...complaints]);
    setSpeechText('');
    setImagePreview(null);
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Event Suggestions
  const suggestEvents = () => {
    const suggestions = [
      { title: 'Mindfulness Meditation', time: '6:30 PM', type: 'wellness', description: 'Perfect for stress relief after a long day' },
      { title: 'Cooking Together: Healthy Meals', time: '7:00 PM', type: 'social', description: 'Learn nutritious recipes with your PG sisters' },
      { title: 'Book Club Discussion', time: '8:00 PM', type: 'intellectual', description: 'This month: "Becoming" by Michelle Obama' }
    ];
    
    return suggestions[Math.floor(Math.random() * suggestions.length)];
  };

  // Mental Health Chatbot
  const sendMessage = () => {
    if (!currentMessage.trim()) return;
    
    const newMessages = [...chatMessages, { type: 'user', message: currentMessage }];
    
    // Bot responses based on keywords
    let botResponse = '';
    const message = currentMessage.toLowerCase();
    
    if (message.includes('anxious') || message.includes('worried') || message.includes('stress')) {
      botResponse = 'I hear that you\'re feeling anxious, and that\'s completely valid. Let\'s try a simple breathing exercise together. Would you like me to guide you through it? 🌸';
    } else if (message.includes('sad') || message.includes('down') || message.includes('lonely')) {
      botResponse = 'I\'m so sorry you\'re feeling this way. Remember, you\'re not alone - your PG sisters and I are here for you. Would you like to talk about what\'s making you feel sad, or shall we do something uplifting together? 💕';
    } else if (message.includes('help') || message.includes('support')) {
      botResponse = 'Of course, I\'m here to help! You can talk to me anytime, try breathing exercises, or if you need professional support, I can connect you with our counselor helpline. What would feel most helpful right now? 🤗';
    } else if (message.includes('breathing') || message.includes('exercise')) {
      botResponse = 'Wonderful! Let\'s do a 4-7-8 breathing exercise. Breathe in for 4 counts, hold for 7, exhale for 8. I\'ll count with you. Ready? Breathe in... 1, 2, 3, 4... Hold... 1, 2, 3, 4, 5, 6, 7... Exhale... 1, 2, 3, 4, 5, 6, 7, 8. Great job! 🌺';
    } else {
      botResponse = 'Thank you for sharing with me. I\'m here to listen and support you. Is there anything specific you\'d like to talk about or any way I can help you feel better today? 💖';
    }
    
    setChatMessages([...newMessages, { type: 'bot', message: botResponse }]);
    setCurrentMessage('');
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'P1': return 'text-red-600 bg-red-50';
      case 'P2': return 'text-orange-600 bg-orange-50';
      case 'P3': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-pink-600 bg-pink-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Resolved': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'In Progress': return <Clock className="w-4 h-4 text-blue-500" />;
      default: return <AlertCircle className="w-4 h-4 text-pink-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">SheConnect+</h1>
              <p className="text-pink-100 text-sm">Your safety & wellness companion</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <User className="w-8 h-8 bg-white bg-opacity-20 rounded-full p-1" />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white shadow-sm border-b border-pink-100">
        <div className="flex">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex-1 py-4 px-2 text-center font-medium ${
              activeTab === 'home' 
                ? 'text-pink-600 border-b-2 border-pink-500 bg-pink-50' 
                : 'text-gray-600 hover:text-pink-500'
            }`}
          >
            <Home className="w-5 h-5 mx-auto mb-1" />
            <span className="text-xs">Home</span>
          </button>
          <button
            onClick={() => setActiveTab('complaints')}
            className={`flex-1 py-4 px-2 text-center font-medium ${
              activeTab === 'complaints' 
                ? 'text-pink-600 border-b-2 border-pink-500 bg-pink-50' 
                : 'text-gray-600 hover:text-pink-500'
            }`}
          >
            <AlertCircle className="w-5 h-5 mx-auto mb-1" />
            <span className="text-xs">Complaints</span>
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`flex-1 py-4 px-2 text-center font-medium ${
              activeTab === 'events' 
                ? 'text-pink-600 border-b-2 border-pink-500 bg-pink-50' 
                : 'text-gray-600 hover:text-pink-500'
            }`}
          >
            <Calendar className="w-5 h-5 mx-auto mb-1" />
            <span className="text-xs">Events</span>
          </button>
          <button
            onClick={() => setActiveTab('wellness')}
            className={`flex-1 py-4 px-2 text-center font-medium ${
              activeTab === 'wellness' 
                ? 'text-pink-600 border-b-2 border-pink-500 bg-pink-50' 
                : 'text-gray-600 hover:text-pink-500'
            }`}
          >
            <Heart className="w-5 h-5 mx-auto mb-1" />
            <span className="text-xs">Wellness</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Home Tab */}
        {activeTab === 'home' && (
          <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-2">Welcome to SheConnect+ 💕</h2>
              <p className="text-pink-100 mb-4">Your safe space for connection, support, and empowerment</p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-white bg-opacity-20 rounded-lg p-3">
                  <div className="text-2xl mb-1">🏠</div>
                  <div className="text-sm font-medium">Safe Living</div>
                </div>
                <div className="bg-white bg-opacity-20 rounded-lg p-3">
                  <div className="text-2xl mb-1">👭</div>
                  <div className="text-sm font-medium">Sister Hood</div>
                </div>
                <div className="bg-white bg-opacity-20 rounded-lg p-3">
                  <div className="text-2xl mb-1">💪</div>
                  <div className="text-sm font-medium">Empowerment</div>
                </div>
              </div>
            </div>

            {/* What is SheConnect+ */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-pink-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">About SheConnect+</h3>
              <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  SheConnect+ is designed specifically for women living in PGs and shared accommodations. We understand the unique challenges you face and provide a comprehensive platform for safety, wellness, and community building.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-pink-50 rounded-lg p-4">
                    <div className="text-pink-500 mb-2">
                      <AlertCircle className="w-6 h-6" />
                    </div>
                    <h4 className="font-medium text-gray-800 mb-2">Voice Complaints</h4>
                    <p className="text-sm text-gray-600">Report issues instantly using voice commands. Get quick resolutions with priority-based ticketing.</p>
                  </div>
                  
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="text-purple-500 mb-2">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <h4 className="font-medium text-gray-800 mb-2">Smart Events</h4>
                    <p className="text-sm text-gray-600">Discover personalized activities, workshops, and social events tailored to your interests.</p>
                  </div>
                  
                  <div className="bg-rose-50 rounded-lg p-4">
                    <div className="text-rose-500 mb-2">
                      <Heart className="w-6 h-6" />
                    </div>
                    <h4 className="font-medium text-gray-800 mb-2">Mental Wellness</h4>
                    <p className="text-sm text-gray-600">24/7 emotional support with AI companion, breathing exercises, and counselor connections.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Community Overview */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-pink-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Your PG Community</h3>
                <span className="text-sm text-gray-600">{residents.length} Sisters Connected</span>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-green-600">{residents.filter(r => r.isOnline).length}</div>
                  <div className="text-sm text-green-700">Online Now</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-blue-600">{events.length}</div>
                  <div className="text-sm text-blue-700">Active Events</div>
                </div>
              </div>

              {/* Residents List */}
              <div className="space-y-3">
                <h4 className="font-medium text-gray-800">Meet Your PG Sisters</h4>
                <div className="grid grid-cols-1 gap-3">
                  {residents.map((resident) => (
                    <div key={resident.id} className="bg-pink-25 rounded-lg p-3 flex items-center space-x-3">
                      <div className="text-2xl">{resident.avatar}</div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h5 className="font-medium text-gray-800">{resident.name}</h5>
                          <span className={`w-2 h-2 rounded-full ${resident.isOnline ? 'bg-green-400' : 'bg-gray-300'}`}></span>
                        </div>
                        <p className="text-sm text-gray-600">Room {resident.room} • {resident.profession}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {resident.interests.map((interest, index) => (
                            <span key={index} className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full">
                              {interest}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-pink-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Today's Highlights</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-medium text-gray-700">2 Issues Resolved</span>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-purple-500" />
                    <span className="text-sm font-medium text-gray-700">1 Event Tonight</span>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-100 to-pink-100 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    <span className="text-sm font-medium text-gray-700">Wellness Check</span>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-green-100 to-pink-100 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <User className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-medium text-gray-700">Community Active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-red-500 text-white p-2 rounded-full">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-red-800">Emergency Support</h4>
                  <p className="text-sm text-red-700">24/7 helpline available for immediate assistance</p>
                </div>
                <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Call Now
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Complaints Tab */}
        {activeTab === 'complaints' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-pink-100">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Complaint System</h2>
              <p className="text-gray-600 mb-4">Submit your complaints with text or image</p>
              
              {/* Image Upload */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="p-4 rounded-full bg-pink-500 hover:bg-pink-600 text-white transition-all duration-300"
                  >
                    <ImageIcon className="w-6 h-6" />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <div className="flex-1">
                    <textarea
                      value={speechText}
                      onChange={(e) => setSpeechText(e.target.value)}
                      placeholder="Describe your complaint here..."
                      className="w-full p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                      rows="3"
                    />
                  </div>
                </div>
                
                {/* Image Preview */}
                {imagePreview && (
                  <div className="mt-4">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="max-w-full h-auto rounded-lg border border-pink-200"
                      style={{maxHeight: '200px'}}
                    />
                  </div>
                )}
                
                <button
                  onClick={submitComplaint}
                  disabled={!speechText.trim() && !imageFile}
                  className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-gray-300 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  Submit Complaint
                </button>
              </div>
            </div>

              {/* Complaints List */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-800">Your Complaints</h3>
                {complaints.map((complaint) => (
                  <div key={complaint.id} className="bg-white rounded-lg p-4 shadow-sm border border-pink-100">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(complaint.status)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(complaint.priority)}`}>
                          {complaint.priority}
                        </span>
                        {complaint.hasImage && (
                          <ImageIcon className="w-4 h-4 text-pink-500" />
                        )}
                      </div>
                      <span className="text-xs text-gray-500">{complaint.timestamp}</span>
                    </div>
                    <p className="text-gray-800 mb-2">{complaint.issue}</p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Assigned to: {complaint.assignedTo}</span>
                      <span className={`font-medium ${
                        complaint.status === 'Resolved' ? 'text-green-600' :
                        complaint.status === 'In Progress' ? 'text-blue-600' : 'text-pink-600'
                      }`}>
                        {complaint.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-pink-100">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Event Assistant</h2>
              <p className="text-gray-600 mb-4">Discover activities designed just for you!</p>
              
              <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg p-4 mb-4">
                <h3 className="font-medium text-gray-800 mb-2">✨ Suggested for You</h3>
                <div className="bg-white rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-800">Evening Self-Care Circle</h4>
                    <span className="text-sm text-pink-600">Tonight, 7:30 PM</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Perfect for unwinding after a busy day. Share experiences and practice mindfulness together.</p>
                  <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Join Event
                  </button>
                </div>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-800">Upcoming Events</h3>
              {events.map((event) => (
                <div key={event.id} className="bg-white rounded-lg p-4 shadow-sm border border-pink-100">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-800">{event.title}</h4>
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-gray-600">{event.participants} joined</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{event.date} at {event.time}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      event.type === 'wellness' ? 'bg-green-100 text-green-700' :
                      event.type === 'safety' ? 'bg-blue-100 text-blue-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {event.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Wellness Tab */}
        {activeTab === 'wellness' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-pink-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Mental Health Companion</h2>
                <button className="text-pink-600 hover:text-pink-700">
                  <Phone className="w-5 h-5" />
                </button>
              </div>
              
              {/* Chat Interface */}
              <div className="bg-pink-25 rounded-lg p-4 mb-4" style={{minHeight: '300px', maxHeight: '400px', overflowY: 'auto'}}>
                {chatMessages.map((msg, index) => (
                  <div key={index} className={`mb-4 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
                    <div className={`inline-block max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      msg.type === 'user' 
                        ? 'bg-pink-500 text-white' 
                        : 'bg-white text-gray-800 border border-pink-100'
                    }`}>
                      <p className="text-sm">{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="bg-white rounded-lg p-4 shadow-sm border border-pink-100">
              <div className="flex items-center space-x-3">
                <button
                  onClick={startListening}
                  className={`p-3 rounded-full transition-all duration-300 ${
                    isListening 
                      ? 'bg-red-500 text-white animate-pulse' 
                      : 'bg-pink-500 hover:bg-pink-600 text-white'
                  }`}
                >
                  <Mic className="w-5 h-5" />
                </button>
                <input
                  type="text"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Share how you're feeling..."
                  className="flex-1 p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
                <button
                  onClick={sendMessage}
                  className="bg-pink-500 hover:bg-pink-600 text-white p-3 rounded-lg transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <button className="bg-gradient-to-r from-pink-100 to-rose-100 hover:from-pink-200 hover:to-rose-200 p-4 rounded-lg text-center transition-colors">
                <div className="text-2xl mb-2">🧘‍♀️</div>
                <span className="text-sm font-medium text-gray-700">Breathing Exercise</span>
              </button>
              <button className="bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 p-4 rounded-lg text-center transition-colors">
                <div className="text-2xl mb-2">📝</div>
                <span className="text-sm font-medium text-gray-700">Journal Prompt</span>
              </button>
              <button className="bg-gradient-to-r from-blue-100 to-pink-100 hover:from-blue-200 hover:to-pink-200 p-4 rounded-lg text-center transition-colors">
                <div className="text-2xl mb-2">🎵</div>
                <span className="text-sm font-medium text-gray-700">Calming Music</span>
              </button>
              <button className="bg-gradient-to-r from-green-100 to-pink-100 hover:from-green-200 hover:to-pink-200 p-4 rounded-lg text-center transition-colors">
                <div className="text-2xl mb-2">📞</div>
                <span className="text-sm font-medium text-gray-700">Connect Counselor</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SheConnectApp;