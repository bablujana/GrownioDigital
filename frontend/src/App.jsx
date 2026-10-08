import React, { useState } from 'react';
import { Mail, Instagram, Twitter, Linkedin, ArrowRight, Loader2, CheckCircle } from 'lucide-react';

function App() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    
    try {
      // Calling our local backend
      const response = await fetch('http://localhost:5001/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Thanks for subscribing! We will keep you updated.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      setStatus('error');
      setMessage('Failed to connect to the server. Is the backend running?');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col relative overflow-hidden font-sans text-slate-800">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-orange-400/10 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-slate-900/10 blur-[100px]" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.2]" />
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center text-center space-y-10">
          
          {/* Logo Container */}
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 transform hover:scale-105 transition-transform duration-500">
            <img 
              src="/logo.png" 
              alt="Grownio Digital" 
              className="w-48 md:w-64 h-auto"
            />
          </div>

          {/* Text Content */}
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide uppercase mb-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-600"></span>
              </span>
              <span>We're building something awesome</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">
              Coming Soon
            </h1>
            
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
              We're building our new website. We are a social media marketing agency that helps 
              your business grow online. We'll be live very soon!
            </p>
          </div>

          {/* Email Form */}
          <div className="w-full max-w-md mt-8">
            <form className="flex flex-col sm:flex-row gap-3" onSubmit={handleSubmit}>
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === 'loading' || status === 'success'}
                  className="block w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm transition-shadow disabled:bg-slate-50 disabled:text-slate-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="inline-flex items-center justify-center px-6 py-3.5 border border-transparent text-base font-semibold rounded-xl text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 shadow-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : status === 'success' ? (
                  <CheckCircle className="h-5 w-5 text-green-400" />
                ) : (
                  <>
                    Notify Me
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </button>
            </form>
            
            {/* Status Messages */}
            {status === 'success' && (
              <p className="mt-3 text-sm font-medium text-green-600 bg-green-50 p-2 rounded-lg">
                {message}
              </p>
            )}
            {status === 'error' && (
              <p className="mt-3 text-sm font-medium text-red-600 bg-red-50 p-2 rounded-lg">
                {message}
              </p>
            )}
            {status === 'idle' && (
              <p className="mt-3 text-sm text-slate-400">
                We'll notify you as soon as we launch. No spam, promise!
              </p>
            )}
          </div>

        </div>
      </main>

      {/* Footer & Socials */}
      <footer className="w-full py-8 text-center relative z-10 border-t border-slate-200/60 bg-white/50 backdrop-blur-sm">
        <div className="flex justify-center space-x-6 mb-4">
          <a href="#" className="text-slate-400 hover:text-orange-500 transition-colors">
            <span className="sr-only">Instagram</span>
            <Instagram className="h-6 w-6" />
          </a>
          <a href="#" className="text-slate-400 hover:text-orange-500 transition-colors">
            <span className="sr-only">Twitter</span>
            <Twitter className="h-6 w-6" />
          </a>
          <a href="#" className="text-slate-400 hover:text-orange-500 transition-colors">
            <span className="sr-only">LinkedIn</span>
            <Linkedin className="h-6 w-6" />
          </a>
        </div>
        <p className="text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} Grownio Digital. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
