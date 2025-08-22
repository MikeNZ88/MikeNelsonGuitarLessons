'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    experience: '',
    age: '',
    lessonType: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form will be submitted to Formspree
    const form = e.target as HTMLFormElement;
    form.submit();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-800 via-amber-700 to-amber-600 text-white section-padding">
        <div className="container-max text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-playfair mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-amber-100 max-w-2xl mx-auto">
            Ready to start your guitar journey? Fill out the form below and I'll get back to you with available times.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form (placed first for prominence) */}
            <div className="card order-1 lg:order-1">
              <h2 className="text-2xl font-bold font-playfair text-amber-800 mb-2 text-center">
                Book Your Lesson Time
              </h2>
              <p className="text-sm text-amber-700 text-center">
                Call or text <a href="tel:0221272154" className="underline hover:text-amber-900">022 127 2154</a>, or use the form below.
              </p>
              <p className="text-xs text-amber-700 mb-4 text-center">Available Monday – Friday, 1:00 PM – 8:30 PM</p>
              <p className="text-xs text-amber-700 mb-4 text-center">Lessons are weekly.</p>
              
              <form onSubmit={handleSubmit} action="https://formspree.io/f/xzzeerqo" method="POST" className="space-y-4">
                <input type="hidden" name="_next" value="https://mikenelsonguitarlessons.co.nz/thank-you.html" />
                <input type="hidden" name="_subject" value={`New enquiry from: ${formData.name}`} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-amber-800 mb-1">Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      autoComplete="name"
                      className="w-full px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Your Name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-amber-800 mb-1">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                      className="w-full px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="lessonType" className="block text-sm font-medium text-amber-800 mb-1">Lesson Type *</label>
                  <select
                    id="lessonType"
                    name="lessonType"
                    required
                    value={formData.lessonType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    <option value="">Please select</option>
                    <option value="in-person-my-place">In-person at Mike's place (Pukerua Bay) - $30/30min</option>
                    <option value="in-person-your-place">In-person at your place (Plimmerton/Cambourne/Mana/Paremata/Papakowhai/Whitby) - $45/30min</option>
                    <option value="online">Online (Zoom/Skype) - $30/30min</option>
                  </select>
                </div>

                {/* Required additional details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="experience" className="block text-sm font-medium text-amber-800 mb-1">Experience Level *</label>
                    <select
                      id="experience"
                      name="experience"
                      required
                      value={formData.experience}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      <option value="">Please select</option>
                      <option value="absolute-beginner">Absolute Beginner</option>
                      <option value="some-uncertain">Some experience (unsure what level)</option>
                      <option value="beginner">Beginner with some experience</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="age" className="block text-sm font-medium text-amber-800 mb-1">Age Group *</label>
                    <select
                      id="age"
                      name="age"
                      required
                      value={formData.age}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      <option value="">Please select</option>
                      <option value="adult">Adult</option>
                      <option value="primary-student">Primary Student</option>
                      <option value="college-student">College Student</option>
                    </select>
                  </div>
                </div>
 
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-amber-800 mb-1">Message (optional)</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    autoComplete="off"
                    className="w-full px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Any additional information or questions..."
                  />
                </div>

                <button type="submit" className="w-full btn-primary">Request time</button>

                <div className="mt-3 text-xs text-amber-700 text-center">No obligation. I usually reply within a day.</div>
                <div className="mt-2 text-xs text-amber-600 text-center">
                  <a 
                    href="/policy.html" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-amber-800"
                  >
                    View Payment & Cancellation Policy
                  </a>
                </div>
              </form>
            </div>

            {/* Contact Information (second) */}
            <div className="card space-y-8 order-2 lg:order-2">
              <div>
                <h2 className="text-3xl font-bold font-playfair text-amber-800 mb-6">
                  Contact Information
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-6 w-6 text-amber-600" />
                    <div>
                      <p className="font-semibold text-amber-800">Phone</p>
                      <a href="tel:022-127-2154" className="text-slate-800 hover:text-amber-800">
                        022 127 2154
                      </a>
                      <div className="mt-2 flex items-center gap-2">
                        <a href="tel:0221272154" className="px-3 py-1.5 rounded-md bg-amber-700 text-white text-sm hover:bg-amber-800">Call</a>
                        <a href="sms:0221272154" className="px-3 py-1.5 rounded-md bg-amber-500 text-white text-sm hover:bg-amber-600">Text</a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-6 w-6 text-amber-600" />
                    <div>
                      <p className="font-semibold text-amber-800">Location</p>
                      <p className="text-slate-700">Pukerua Bay, Wellington</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Mail className="h-6 w-6 text-amber-600" />
                    <div>
                      <p className="font-semibold text-amber-800">Lessons Available</p>
                      <p className="text-slate-700">In-person & Online</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lesson Hours */}
              <div>
                <h3 className="text-xl font-bold text-amber-800 mb-4 flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Available Hours
                </h3>
                
                <div className="space-y-2 text-slate-700">
                  <p>Monday – Friday: 1:00 PM – 8:30 PM</p>
                </div>
              </div>

              {/* Pricing */}
              <div>
                <h3 className="text-xl font-bold text-amber-800 mb-4">Pricing</h3>
                <div className="space-y-2 text-slate-700">
                  <p><strong>Pukerua Bay & Online:</strong> $30 for 30 minutes</p>
                  <p><strong>Your Place:</strong> $45 for 30 minutes</p>
                  <p className="text-sm text-slate-600 mt-2">
                    (Plimmerton, Cambourne, Mana, Paremata, Papakowhai, Whitby areas)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 