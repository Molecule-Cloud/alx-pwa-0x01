import { useState } from 'react';
import Button from '@/components/commons/Button';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mock form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSubmitMessage('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
    
    // Clear success message after 5 seconds
    setTimeout(() => setSubmitMessage(''), 5000);
  };

  return (
    <div className="min-h-screen bg-[#110F17] text-white">
      {/* Hero Section */}
      <section className="py-20 px-4 md:px-10 lg:px-44 bg-gradient-to-b from-[#171D22] to-[#110F17]">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Get in <span className="text-[#E2D609]">Touch</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto animate-fade-in-delay">
            Have questions, suggestions, or feedback about CineSeek? We'd love to hear from you!
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 px-4 md:px-10 lg:px-44">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="animate-slide-in-left">
              <h2 className="text-3xl font-semibold mb-8 text-[#E2D609]">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-[#E2D609] p-3 rounded-full">
                    <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-gray-300">contact@cineseek.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-[#E2D609] p-3 rounded-full">
                    <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Location</h3>
                    <p className="text-gray-300">New York, NY 10001</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-[#E2D609] p-3 rounded-full">
                    <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-gray-300">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="bg-[#E2D609] p-2 rounded-full hover:bg-yellow-500 transition-colors duration-300">
                    <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a href="#" className="bg-[#E2D609] p-2 rounded-full hover:bg-yellow-500 transition-colors duration-300">
                    <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="animate-slide-in-right">
              <h2 className="text-3xl font-semibold mb-8 text-[#E2D609]">Send us a Message</h2>
              
              {submitMessage && (
                <div className="bg-green-600 text-white p-4 rounded-lg mb-6 animate-fade-in">
                  {submitMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-[#1E1E2E] border border-[#E2D609] rounded-lg focus:outline-none focus:border-yellow-400 transition-colors duration-300"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-[#1E1E2E] border border-[#E2D609] rounded-lg focus:outline-none focus:border-yellow-400 transition-colors duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-[#1E1E2E] border border-[#E2D609] rounded-lg focus:outline-none focus:border-yellow-400 transition-colors duration-300"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-[#1E1E2E] border border-[#E2D609] rounded-lg focus:outline-none focus:border-yellow-400 transition-colors duration-300 resize-vertical"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <div className="flex justify-center">
                  <Button
                    title={isSubmitting ? "Sending..." : "Send Message"}
                    action={() => {}}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
