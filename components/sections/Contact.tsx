'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Mail, Linkedin, MessageCircle, Send, MapPin, Clock, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import SectionHeader from '@/components/ui/SectionHeader';
import MagneticButton from '@/components/ui/MagneticButton';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  subject: z.enum(
    ['Job Opportunity', 'Project Inquiry', 'SEO Consultation', 'WordPress Support', 'General'],
    { errorMap: () => ({ message: 'Please select a subject' }) }
  ),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactMethods = [
  {
    icon: Mail,
    label: 'Email',
    value: 'mzahidiqbal129@gmail.com',
    href: 'mailto:mzahidiqbal129@gmail.com',
    iconColor: '#7400B8',
    bgColor: 'rgba(116,0,184,0.12)',
    borderColor: 'rgba(116,0,184,0.25)',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/itszahidd7',
    href: 'https://www.linkedin.com/in/itszahidd7/',
    iconColor: '#4EA8DE',
    bgColor: 'rgba(78,168,222,0.12)',
    borderColor: 'rgba(78,168,222,0.25)',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+92 348 6377723',
    href: 'https://wa.me/923486377723',
    iconColor: '#72EFDD',
    bgColor: 'rgba(114,239,221,0.12)',
    borderColor: 'rgba(114,239,221,0.25)',
  },
];

/**
 * Contact — premium dark glass form with animated contact method cards.
 */
export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const to = 'mzahidiqbal129@gmail.com';
      const subject = `${data.subject} — from ${data.name}`;
      const body = `Name: ${data.name}%0AEmail: ${data.email}%0A%0A${encodeURIComponent(data.message)}`;
      window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${body}`;
      setSubmitted(true);
      toast.success('Opening your email client...');
      reset();
      setTimeout(() => setSubmitted(false), 4000);
    } catch {
      toast.error('Something went wrong. Please email me directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBase = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#FFFFFF',
  };

  const inputClass =
    'w-full px-4 py-3 text-sm rounded-xl placeholder-[#8A94A7] focus:outline-none transition-all duration-200';

  const labelClass = 'block text-sm font-semibold text-[#B8C0D4] mb-1.5';
  const errorClass = 'text-xs text-red-400 mt-1';

  return (
    <section
      id="contact"
      className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8"
      aria-label="Contact section"
      style={{ background: '#0B1021' }}
    >
      {/* Background accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full blur-3xl opacity-10"
        style={{ background: 'radial-gradient(ellipse, rgba(72,191,227,0.5) 0%, transparent 70%)' }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeader
          badge="Contact"
          title="Let's Work Together"
          subtitle="Have a project in mind, want to discuss SEO, or just want to say hello? I'd love to hear from you."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">

          {/* Left — contact info */}
          <div className="lg:col-span-2 space-y-5">
            {/* Location & timezone */}
            <div
              className="rounded-2xl p-5 space-y-3"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <div className="flex items-center gap-2.5 text-sm" style={{ color: '#B8C0D4' }}>
                <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: '#7400B8' }} />
                Drosh, Lower Chitral, KPK, Pakistan
              </div>
              <div className="flex items-center gap-2.5 text-sm" style={{ color: '#B8C0D4' }}>
                <Clock className="w-4 h-4 flex-shrink-0" style={{ color: '#5E60CE' }} />
                PKT (UTC+5) — Mon–Sat, 9am–6pm
              </div>
            </div>

            {/* Contact method cards */}
            <div className="space-y-3">
              {contactMethods.map((method, idx) => {
                const Icon = method.icon;
                return (
                  <motion.a
                    key={method.label}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    viewport={{ once: true }}
                    href={method.href}
                    target={method.href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 hover:-translate-y-1"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = method.borderColor;
                      el.style.background = method.bgColor;
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = 'rgba(255,255,255,0.08)';
                      el.style.background = 'rgba(255,255,255,0.04)';
                    }}
                  >
                    <div
                      className="p-2.5 rounded-xl flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: method.bgColor,
                        border: `1px solid ${method.borderColor}`,
                      }}
                    >
                      <Icon className="w-5 h-5" style={{ color: method.iconColor }} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-white">{method.label}</p>
                      <p className="text-xs truncate" style={{ color: '#8A94A7' }}>
                        {method.value}
                      </p>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            {/* Quick response note */}
            <div
              className="p-4 rounded-2xl"
              style={{
                background: 'rgba(128,255,219,0.05)',
                border: '1px solid rgba(128,255,219,0.15)',
              }}
            >
              <p className="text-xs font-bold mb-1" style={{ color: '#80FFDB' }}>
                ⚡ Quick Responder
              </p>
              <p className="text-xs" style={{ color: '#8A94A7' }}>
                I typically respond within 24 hours on business days.
              </p>
            </div>
          </div>

          {/* Right — form */}
          <motion.form
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
            viewport={{ once: true }}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="lg:col-span-3 rounded-3xl p-6 sm:p-8"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <h3 className="text-lg font-bold text-white mb-6 tracking-tight">
              Send a Message
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {/* Name */}
              <div>
                <label htmlFor="contact-name" className={labelClass}>
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Your name"
                  autoComplete="name"
                  {...register('name')}
                  className={inputClass}
                  style={{
                    ...inputBase,
                    ...(errors.name ? { borderColor: 'rgba(248,113,113,0.5)' } : {}),
                  }}
                  onFocus={(e) => {
                    (e.target as HTMLElement).style.borderColor = 'rgba(116,0,184,0.6)';
                    (e.target as HTMLElement).style.boxShadow = '0 0 0 3px rgba(116,0,184,0.12)';
                  }}
                  onBlur={(e) => {
                    (e.target as HTMLElement).style.borderColor = errors.name
                      ? 'rgba(248,113,113,0.5)'
                      : 'rgba(255,255,255,0.1)';
                    (e.target as HTMLElement).style.boxShadow = 'none';
                  }}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <p id="name-error" className={errorClass} role="alert">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="contact-email" className={labelClass}>
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  {...register('email')}
                  className={inputClass}
                  style={{
                    ...inputBase,
                    ...(errors.email ? { borderColor: 'rgba(248,113,113,0.5)' } : {}),
                  }}
                  onFocus={(e) => {
                    (e.target as HTMLElement).style.borderColor = 'rgba(116,0,184,0.6)';
                    (e.target as HTMLElement).style.boxShadow = '0 0 0 3px rgba(116,0,184,0.12)';
                  }}
                  onBlur={(e) => {
                    (e.target as HTMLElement).style.borderColor = errors.email
                      ? 'rgba(248,113,113,0.5)'
                      : 'rgba(255,255,255,0.1)';
                    (e.target as HTMLElement).style.boxShadow = 'none';
                  }}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p id="email-error" className={errorClass} role="alert">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* Subject */}
            <div className="mb-4">
              <label htmlFor="contact-subject" className={labelClass}>
                Subject <span className="text-red-400">*</span>
              </label>
              <select
                id="contact-subject"
                {...register('subject')}
                className={`${inputClass} cursor-pointer`}
                style={{
                  ...inputBase,
                  ...(errors.subject ? { borderColor: 'rgba(248,113,113,0.5)' } : {}),
                }}
                onFocus={(e) => {
                  (e.target as HTMLElement).style.borderColor = 'rgba(116,0,184,0.6)';
                  (e.target as HTMLElement).style.boxShadow = '0 0 0 3px rgba(116,0,184,0.12)';
                }}
                onBlur={(e) => {
                  (e.target as HTMLElement).style.borderColor = errors.subject
                    ? 'rgba(248,113,113,0.5)'
                    : 'rgba(255,255,255,0.1)';
                  (e.target as HTMLElement).style.boxShadow = 'none';
                }}
                aria-invalid={!!errors.subject}
                aria-describedby={errors.subject ? 'subject-error' : undefined}
              >
                <option value="" style={{ background: '#0B1021' }}>Select a subject...</option>
                <option value="Job Opportunity" style={{ background: '#0B1021' }}>Job Opportunity</option>
                <option value="Project Inquiry" style={{ background: '#0B1021' }}>Project Inquiry</option>
                <option value="SEO Consultation" style={{ background: '#0B1021' }}>SEO Consultation</option>
                <option value="WordPress Support" style={{ background: '#0B1021' }}>WordPress Support</option>
                <option value="General" style={{ background: '#0B1021' }}>General Inquiry</option>
              </select>
              {errors.subject && (
                <p id="subject-error" className={errorClass} role="alert">
                  {errors.subject.message}
                </p>
              )}
            </div>

            {/* Message */}
            <div className="mb-6">
              <label htmlFor="contact-message" className={labelClass}>
                Message <span className="text-red-400">*</span>
              </label>
              <textarea
                id="contact-message"
                rows={5}
                placeholder="Tell me about your project, question, or opportunity..."
                {...register('message')}
                className={`${inputClass} resize-none`}
                style={{
                  ...inputBase,
                  ...(errors.message ? { borderColor: 'rgba(248,113,113,0.5)' } : {}),
                }}
                onFocus={(e) => {
                  (e.target as HTMLElement).style.borderColor = 'rgba(116,0,184,0.6)';
                  (e.target as HTMLElement).style.boxShadow = '0 0 0 3px rgba(116,0,184,0.12)';
                }}
                onBlur={(e) => {
                  (e.target as HTMLElement).style.borderColor = errors.message
                    ? 'rgba(248,113,113,0.5)'
                    : 'rgba(255,255,255,0.1)';
                  (e.target as HTMLElement).style.boxShadow = 'none';
                }}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message && (
                <p id="message-error" className={errorClass} role="alert">
                  {errors.message.message}
                </p>
              )}
            </div>

            <MagneticButton strength={0.2} style={{ width: '100%' }}>
              <button
                type="submit"
                id="contact-submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 font-semibold rounded-xl text-white text-sm transition-all duration-300 hover:-translate-y-1 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                style={{
                  background: submitted
                    ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                    : 'linear-gradient(135deg, #7400B8, #5E60CE)',
                  boxShadow: submitted
                    ? '0 4px 24px rgba(34,197,94,0.3)'
                    : '0 4px 24px rgba(116, 0, 184, 0.4)',
                }}
                aria-label={isSubmitting ? 'Sending message' : 'Send message'}
              >
                {submitted ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Email Client Opening...
                  </>
                ) : isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </MagneticButton>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
