import React, { useState } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import { Phone, MapPin, Clock, MessageSquare, CheckCircle, Send, Utensils } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: '',
    guests: '',
    date: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9\s-]{10,14}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.eventType) newErrors.eventType = 'Please select an event type';
    if (!formData.guests) {
      newErrors.guests = 'Please estimate the guest count';
    } else if (parseInt(formData.guests) <= 0) {
      newErrors.guests = 'Guests must be at least 1';
    }
    if (!formData.date) newErrors.date = 'Date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Generate WhatsApp text and URL synchronously to prevent popup blocker
    const messageText = `*New Catering Booking Inquiry*
----------------------------------
*Name:* ${formData.name}
*Phone:* ${formData.phone}
*Email:* ${formData.email}
*Event Type:* ${formData.eventType}
*Estimated Guests:* ${formData.guests}
*Event Date:* ${formData.date}
*Message:* ${formData.message || 'None'}`;

    const encodedText = encodeURIComponent(messageText);
    const url = `https://wa.me/919011622225?text=${encodedText}`;
    setWhatsappUrl(url);

    // Open WhatsApp immediately as direct user gesture
    window.open(url, '_blank');

    setIsSubmitting(true);

    // Mock delay for feel and to align transitions
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Trigger celebration confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#C89B3C', '#B8860B', '#F8F3EA'],
    });
  };

  return (
    <div className="py-12 space-y-16 bg-cream">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
        <ScrollReveal className="space-y-4">
          <span className="text-gold font-semibold uppercase tracking-widest text-xs">Plan Your Feast</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-serif text-dark">
            Contact Bhavika Catering
          </h1>
          <div className="h-0.5 w-20 bg-gold mx-auto mt-4" />
          <p className="text-text-muted max-w-2xl mx-auto text-sm md:text-base leading-relaxed pt-2">
            Planning a wedding, family gathering, corporate event, or traditional Sindhi feast? Get in touch with Bhavika Catering and let us make your celebration memorable with authentic flavors and professional service.
          </p>
          <div className="pt-4 flex justify-center">
            <a
              href="tel:+919011622225"
              className="inline-flex items-center gap-2 bg-black hover:bg-black/80 text-[#B08D57] hover:text-[#9A7847] font-bold uppercase tracking-wider py-3.5 px-8 rounded text-xs transition-all hover:scale-105 shadow-lg cursor-pointer"
            >
              <Phone size={14} /> Call Now
            </a>
          </div>
        </ScrollReveal>
      </section>

      {/* Info & Form Body */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
          {/* Info Details Column */}
          <div className="lg:col-span-5 space-y-8">
            <ScrollReveal direction="left" className="space-y-6">
              <h2 className="text-2xl font-serif font-bold text-dark">Contact Information</h2>
              <p className="text-text-muted text-sm leading-relaxed">
                Reach out to us directly or visit our corporate office kitchen to sample items and consult on banquet presentation themes.
              </p>
            </ScrollReveal>

            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              <ScrollReveal delay={0.05} className="bg-white border border-gold/15 p-5 rounded-xl flex items-start gap-4 shadow-xs">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center text-gold flex-shrink-0">
                  <Phone size={18} />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Phone & WhatsApp</span>
                  <a href="tel:+919011622225" className="text-sm font-semibold text-dark hover:text-gold block">
                    +91 90116 22225
                  </a>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1} className="bg-white border border-gold/15 p-5 rounded-xl flex items-start gap-4 shadow-xs">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center text-gold flex-shrink-0">
                  <Utensils size={18} />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Service Modes</span>
                  <p className="text-xs text-dark leading-relaxed font-semibold">
                    Delivery, Takeaway & Onsite Catering Available
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.15} className="bg-white border border-gold/15 p-5 rounded-xl flex items-start gap-4 shadow-xs">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center text-gold flex-shrink-0">
                  <MapPin size={18} />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Office Kitchen</span>
                  <p className="text-xs text-dark leading-relaxed font-semibold">
                    Yogeshwar Krupa Apartment,<br />
                    14, Tapovan Road, Behind Vrudhaashram,<br />
                    Panchavati, Nashik, Maharashtra 422003
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2} className="bg-white border border-gold/15 p-5 rounded-xl flex items-start gap-4 shadow-xs">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center text-gold flex-shrink-0">
                  <Clock size={18} />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Consultation Hours</span>
                  <p className="text-xs text-dark leading-relaxed font-semibold">
                    Monday – Sunday<br />
                    8:00 AM – 10:00 PM
                  </p>
                </div>
              </ScrollReveal>
            </div>

            {/* WhatsApp CTA Link */}
            <ScrollReveal delay={0.25} className="pt-2">
              <a
                href="https://wa.me/919011622225?text=Hi%20Bhavika%20Catering,%20I%20would%20like%20to%20inquire%20about%20catering%20for%20an%20upcoming%20event."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase tracking-wider py-3.5 px-6 rounded-lg text-xs transition-colors flex items-center justify-center gap-2.5 shadow-md shadow-emerald-950/10 cursor-pointer"
              >
                <MessageSquare size={16} /> Instant Chat on WhatsApp
              </a>
            </ScrollReveal>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7 bg-white border border-gold/15 p-6 md:p-8 rounded-2xl shadow-lg relative">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="text-2xl font-serif font-bold text-dark mb-2">Book Your Date</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-text-muted font-bold uppercase tracking-wider block">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter full name"
                      className={`w-full bg-white border ${errors.name ? 'border-red-500' : 'border-gold/20'} rounded-lg py-2.5 px-4 text-xs text-dark focus:outline-none focus:border-gold transition-colors`}
                    />
                    {errors.name && <p className="text-red-500 text-[10px]">{errors.name}</p>}
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-text-muted font-bold uppercase tracking-wider block">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter contact number"
                      className={`w-full bg-white border ${errors.phone ? 'border-red-500' : 'border-gold/20'} rounded-lg py-2.5 px-4 text-xs text-dark focus:outline-none focus:border-gold transition-colors`}
                    />
                    {errors.phone && <p className="text-red-500 text-[10px]">{errors.phone}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-text-muted font-bold uppercase tracking-wider block">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter email address"
                      className={`w-full bg-white border ${errors.email ? 'border-red-500' : 'border-gold/20'} rounded-lg py-2.5 px-4 text-xs text-dark focus:outline-none focus:border-gold transition-colors`}
                    />
                    {errors.email && <p className="text-red-500 text-[10px]">{errors.email}</p>}
                  </div>

                  {/* Event Type */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-text-muted font-bold uppercase tracking-wider block">Event Type *</label>
                    <select
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                      className={`w-full bg-white border ${errors.eventType ? 'border-red-500' : 'border-gold/20'} rounded-lg py-2.5 px-4 text-xs text-dark focus:outline-none focus:border-gold transition-colors`}
                    >
                      <option value="" className="text-gray-400">Select event type</option>
                      <option value="Wedding Catering">Wedding Catering</option>
                      <option value="Birthday Parties">Birthday Parties</option>
                      <option value="Corporate Events">Corporate Events</option>
                      <option value="Festival Catering">Festival Catering</option>
                      <option value="House Functions">House Functions</option>
                      <option value="Live Food Counters">Live Food Counters</option>
                      <option value="Bulk Orders">Bulk Orders</option>
                    </select>
                    {errors.eventType && <p className="text-red-500 text-[10px]">{errors.eventType}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Guest Count */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-text-muted font-bold uppercase tracking-wider block">Estimated Guests *</label>
                    <input
                      type="number"
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      placeholder="Number of guests"
                      className={`w-full bg-white border ${errors.guests ? 'border-red-500' : 'border-gold/20'} rounded-lg py-2.5 px-4 text-xs text-dark focus:outline-none focus:border-gold transition-colors`}
                    />
                    {errors.guests && <p className="text-red-500 text-[10px]">{errors.guests}</p>}
                  </div>

                  {/* Date */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-text-muted font-bold uppercase tracking-wider block">Event Date *</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full bg-white border border-gold/20 rounded-lg py-2.5 px-4 text-xs text-dark focus:outline-none focus:border-gold transition-colors"
                    />
                    {errors.date && <p className="text-red-500 text-[10px]">{errors.date}</p>}
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="text-[10px] text-text-muted font-bold uppercase tracking-wider block">Additional Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Provide details of specific food choices, style of serving, or decorations..."
                    className="w-full bg-white border border-gold/20 rounded-lg py-2.5 px-4 text-xs text-dark focus:outline-none focus:border-gold transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-brass to-gold hover:from-gold hover:to-gold-light text-black font-bold uppercase tracking-widest py-3 px-6 rounded-lg text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-gold/15"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      Saving Inquiry...
                    </>
                  ) : (
                    <>
                      <Send size={14} /> Send Booking Inquiry
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center py-12 flex flex-col items-center">
                <div className="w-16 h-16 bg-gold/10 border border-gold text-gold rounded-full flex items-center justify-center mb-6 animate-pulse">
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-dark mb-2">Inquiry Sent via WhatsApp!</h3>
                <p className="text-text-muted text-xs md:text-sm max-w-sm mx-auto leading-relaxed mb-6">
                  Your booking request details have been prepared and redirected to WhatsApp. If the chat window didn't open, please click the button below to send it manually.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="border border-gold/30 hover:bg-gold/5 px-6 py-2 rounded text-xs uppercase tracking-widest font-semibold transition-colors text-gold cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                  {whatsappUrl && (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded text-xs uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-950/10"
                    >
                      Open WhatsApp Chat
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Interactive Google Map Embed */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <ScrollReveal className="bg-white border border-gold/15 p-2 rounded-2xl shadow-sm overflow-hidden h-96 relative">
          <iframe
            src="https://maps.google.com/maps?q=Bhavika%20Catering,%20Tapovan%20Road,%20Nashik&t=&z=16&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full border-0 rounded-xl"
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Bhavika Catering Google Maps Location"
          ></iframe>
        </ScrollReveal>
      </section>
    </div>
  );
};

export default Contact;
