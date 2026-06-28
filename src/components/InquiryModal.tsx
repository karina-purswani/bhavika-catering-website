import React, { useState, useEffect } from 'react';
import { useBooking } from '../context/BookingContext';
import { X, Calendar, Users, Phone, Mail, User, CheckCircle, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export const InquiryModal: React.FC = () => {
  const { isModalOpen, selectedService, closeModal, quoteItems, clearQuote, removeFromQuote } = useBooking();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: '',
    guests: '',
    date: '',
    selectedItemsText: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');

  // Sync selected service with form when opened
  useEffect(() => {
    if (isModalOpen) {
      setFormData((prev) => ({
        ...prev,
        eventType: selectedService || prev.eventType || '',
        selectedItemsText: quoteItems.map((item, idx) => `${idx + 1}. ${item.name}`).join('\n'),
      }));
      setErrors({});
      setIsSubmitted(false);
    }
  }, [isModalOpen, selectedService, quoteItems]);

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
      newErrors.guests = 'Please estimate the number of guests';
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
    const selectedItemsValText = formData.selectedItemsText.trim()
      ? `\n*Selected Menu Items:* ${formData.selectedItemsText}`
      : '';

    const messageText = `*New Catering Quote Request*
----------------------------------
*Name:* ${formData.name}
*Phone:* ${formData.phone}
*Email:* ${formData.email}
*Event Type:* ${formData.eventType}
*Estimated Guests:* ${formData.guests}
*Event Date:* ${formData.date}${selectedItemsValText}
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
    clearQuote();

    // Trigger luxury celebrate confetti
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#C89B3C', '#B8860B', '#F8F3EA'],
    });
  };

  if (!isModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
          className="absolute inset-0 bg-black/60 backdrop-blur-xs"
        />

        {/* Dialog Window - Elegant Stationery Style */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-2xl overflow-hidden rounded-xl bg-cream border border-gold/30 text-dark z-10 max-h-[90vh] flex flex-col shadow-2xl"
        >
          {/* Close button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-gray-500 hover:text-black hover:bg-gold/10 p-2 rounded-full transition-colors z-20 cursor-pointer"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          <div className="overflow-y-auto p-6 md:p-8">
            {!isSubmitted ? (
              <>
                <div className="mb-6 text-left">
                  <h3 className="text-2xl md:text-3xl font-bold text-gold font-serif">
                    Request a Custom Quote
                  </h3>
                  <p className="text-text-muted text-xs mt-1">
                    Authentic Sindhi catering and royal dining curation for your memorable celebrations.
                  </p>
                </div>

                {quoteItems.length > 0 && (
                  <div className="mb-6 p-4 rounded-lg bg-tan/20 border border-gold/25 text-left">
                    <h4 className="text-gold font-bold text-xs mb-2 flex items-center gap-2 font-serif">
                      <Gift size={16} /> Selected Specials ({quoteItems.length}):
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {quoteItems.map((item) => (
                        <span
                          key={item.id}
                          className="text-xs bg-white border border-gold/15 pl-2.5 pr-1.5 py-1 rounded-full text-dark font-medium inline-flex items-center gap-1.5"
                        >
                          <span>{item.name}</span>
                          <button
                            type="button"
                            onClick={() => removeFromQuote(item.id)}
                            className="text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 p-0.5 transition-colors cursor-pointer inline-flex items-center justify-center"
                            aria-label={`Remove ${item.name}`}
                          >
                            <X size={10} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label htmlFor="modal-name" className="block text-[10px] uppercase tracking-wider text-text-muted font-bold mb-1">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gold/60" size={16} />
                        <input
                          id="modal-name"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full bg-white border ${errors.name ? 'border-red-500' : 'border-gold/20'} rounded-lg py-2.5 pl-10 pr-4 text-xs text-dark focus:outline-none focus:border-gold transition-colors shadow-xs`}
                          placeholder="Your name"
                        />
                      </div>
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="modal-phone" className="block text-[10px] uppercase tracking-wider text-text-muted font-bold mb-1">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gold/60" size={16} />
                        <input
                          id="modal-phone"
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full bg-white border ${errors.phone ? 'border-red-500' : 'border-gold/20'} rounded-lg py-2.5 pl-10 pr-4 text-xs text-dark focus:outline-none focus:border-gold transition-colors shadow-xs`}
                          placeholder="Contact number"
                        />
                      </div>
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Email */}
                    <div>
                      <label htmlFor="modal-email" className="block text-[10px] uppercase tracking-wider text-text-muted font-bold mb-1">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gold/60" size={16} />
                        <input
                          id="modal-email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full bg-white border ${errors.email ? 'border-red-500' : 'border-gold/20'} rounded-lg py-2.5 pl-10 pr-4 text-xs text-dark focus:outline-none focus:border-gold transition-colors shadow-xs`}
                          placeholder="Your email address"
                        />
                      </div>
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    {/* Event Type */}
                    <div>
                      <label htmlFor="modal-eventType" className="block text-[10px] uppercase tracking-wider text-text-muted font-bold mb-1">
                        Event Type *
                      </label>
                      <select
                        id="modal-eventType"
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleChange}
                        className={`w-full bg-white border ${errors.eventType ? 'border-red-500' : 'border-gold/20'} rounded-lg py-2.5 px-4 text-xs text-dark focus:outline-none focus:border-gold transition-colors shadow-xs`}
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
                      {errors.eventType && <p className="text-red-500 text-xs mt-1">{errors.eventType}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Guest Count */}
                    <div>
                      <label htmlFor="modal-guests" className="block text-[10px] uppercase tracking-wider text-text-muted font-bold mb-1">
                        Estimated Guests *
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gold/60" size={16} />
                        <input
                          id="modal-guests"
                          type="number"
                          name="guests"
                          value={formData.guests}
                          onChange={handleChange}
                          className={`w-full bg-white border ${errors.guests ? 'border-red-500' : 'border-gold/20'} rounded-lg py-2.5 pl-10 pr-4 text-xs text-dark focus:outline-none focus:border-gold transition-colors shadow-xs`}
                          placeholder="No. of guests"
                        />
                      </div>
                      {errors.guests && <p className="text-red-500 text-xs mt-1">{errors.guests}</p>}
                    </div>

                    {/* Date */}
                    <div>
                      <label htmlFor="modal-date" className="block text-[10px] uppercase tracking-wider text-text-muted font-bold mb-1">
                        Event Date *
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gold/60" size={16} />
                        <input
                          id="modal-date"
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          className="w-full bg-white border border-gold/20 rounded-lg py-2.5 pl-10 pr-4 text-xs text-dark focus:outline-none focus:border-gold transition-colors shadow-xs"
                        />
                      </div>
                      {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                    </div>
                  </div>

                  {/* Selected Menu Items */}
                  <div>
                    <label htmlFor="modal-selectedItems" className="block text-[10px] uppercase tracking-wider text-text-muted font-bold mb-1">
                      Selected Menu Items
                    </label>
                    <textarea
                      id="modal-selectedItems"
                      name="selectedItemsText"
                      value={formData.selectedItemsText}
                      onChange={handleChange}
                      rows={4}
                      className="w-full bg-white border border-gold/20 rounded-lg py-2.5 px-4 text-xs text-dark focus:outline-none focus:border-gold transition-colors resize-y shadow-xs mb-4"
                      placeholder="Select items from the menu to populate here, or type manually..."
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="modal-message" className="block text-[10px] uppercase tracking-wider text-text-muted font-bold mb-1">
                      Additional Requirements / Message
                    </label>
                    <textarea
                      id="modal-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                      className="w-full bg-white border border-gold/20 rounded-lg py-2.5 px-4 text-xs text-dark focus:outline-none focus:border-gold transition-colors resize-none shadow-xs"
                      placeholder="Share menu preferences, dietary needs, or specific setups..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-brass to-gold hover:from-gold hover:to-gold-light text-black font-bold uppercase tracking-wider py-3 px-6 rounded-lg text-xs transition-all hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-gold/10"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Submit Quote Request'
                    )}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-12 px-4 flex flex-col items-center">
                <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center border border-gold text-gold mb-6 animate-pulse-slow">
                  <CheckCircle size={44} />
                </div>
                <h3 className="text-3xl font-bold font-serif text-dark mb-3">Request Sent via WhatsApp</h3>
                <p className="text-text-muted max-w-md mx-auto mb-8 text-sm leading-relaxed">
                  Thank you for contacting Bhavika Catering. Your custom quote request details have been prepared and redirected to WhatsApp. If the chat window didn't open, please click the button below to send it manually.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                  <button
                    onClick={closeModal}
                    className="bg-white border border-gold/20 hover:bg-gold/5 px-6 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer text-gold"
                  >
                    Close Window
                  </button>
                  {whatsappUrl && (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-lg text-sm font-semibold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-md"
                    >
                      Open WhatsApp Chat
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default InquiryModal;
