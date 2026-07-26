'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Mail, Linkedin, MessageCircle, Send, MapPin, Clock, Phone } from 'lucide-react';
import { toast } from 'sonner';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
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
    description: 'Drop me a line anytime',
    color: 'text-primary dark:text-primary-light',
    bg: 'bg-primary/10 dark:bg-primary/20',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+92 348 6377723',
    href: 'https://wa.me/923486377723',
    description: 'Quick questions & chats',
    color: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-50 dark:bg-green-900/30',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/itszahidd7',
    href: 'https://www.linkedin.com/in/itszahidd7/',
    description: 'Professional networking',
    color: 'text-sky-600 dark:text-sky-400',
    bg: 'bg-sky-50 dark:bg-sky-900/30',
  },
];

const faqs = [
  {
    q: 'What types of projects do you work on?',
    a: 'I specialize in WordPress websites, WooCommerce e-commerce stores, technical SEO optimization, and website performance improvements. I work with businesses, nonprofits, and startups.',
  },
  {
    q: 'How quickly do you respond?',
    a: 'I typically respond within 24 hours on business days (Mon–Sat, PKT). For urgent matters, WhatsApp is the fastest way to reach me.',
  },
  {
    q: 'Are you available for remote work?',
    a: 'Yes, I work with clients remotely from Chitral, Pakistan. I\'ve successfully collaborated with clients across Pakistan and internationally.',
  },
  {
    q: 'Do you offer SEO-only services?',
    a: 'Absolutely! I provide technical SEO audits, on-page SEO optimization, Google Analytics setup, Search Console configuration, and ongoing SEO consulting.',
  },
];

const inputClass =
  'w-full px-4 py-3 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary/30 dark:focus:ring-primary/40 focus:border-primary/60 focus:outline-none transition-all duration-200';

const labelClass = 'block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1.5';

export default function ContactPageContent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

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
      // Static fallback: open mail client via mailto (works without a server)
      const to = 'mzahidiqbal129@gmail.com';
      const subject = `${data.subject} — from ${data.name}`;
      const body = `Name: ${data.name}%0AEmail: ${data.email}%0A%0A${encodeURIComponent(
        data.message
      )}`;
      window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${body}`;
      toast.success("Opening your email client to send the message...");
      reset();
    } catch {
      toast.error('Something went wrong. Please email me directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Page header */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/6 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/6 rounded-full blur-3xl" />
        </div>
        <div className="max-w-3xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary dark:text-primary-light px-4 py-2 bg-primary/8 dark:bg-primary/15 border border-primary/20 rounded-full mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-primary-light" />
            Contact
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-gray-900 dark:text-gray-50 mb-4"
          >
            Let&apos;s Work Together
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-gray-600 dark:text-gray-400"
          >
            Have a WordPress project, SEO challenge, or WooCommerce store in mind? I&apos;d love to hear about it.
          </motion.p>
        </div>
      </section>

      {/* Info bar */}
      <section className="py-5 px-4 sm:px-6 lg:px-8 bg-gray-50/70 dark:bg-[#0a0a09]/70 border-y border-gray-200/60 dark:border-gray-800/60">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            Drosh, Lower Chitral, KPK, Pakistan
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            PKT (UTC+5) · Mon–Sat
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Currently accepting new projects
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

          {/* Left — contact methods */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-display font-bold text-gray-900 dark:text-gray-100">
              Contact Methods
            </h2>

            <div className="space-y-4">
              {contactMethods.map((method, idx) => {
                const Icon = method.icon;
                return (
                  <motion.a
                    key={method.label}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    href={method.href}
                    target={method.href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="group flex items-start gap-4 p-4 bg-white dark:bg-gray-900/70 border border-gray-200 dark:border-gray-800 rounded-2xl hover:border-primary/40 dark:hover:border-primary/40 hover:shadow-md transition-all duration-200"
                  >
                    <div className={`p-3 rounded-xl ${method.bg} ${method.color} flex-shrink-0 group-hover:scale-105 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-gray-900 dark:text-gray-100">
                        {method.label}
                      </p>
                      <p className="text-xs text-primary dark:text-primary-light font-medium break-all">
                        {method.value}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {method.description}
                      </p>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            {/* Response promise */}
            <div className="p-4 bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/15 dark:border-primary/25 rounded-2xl">
              <p className="text-xs font-bold text-primary dark:text-primary-light mb-1 flex items-center gap-1.5">
                ⚡ Response Guarantee
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                I respond to all messages within 24 hours on business days. For urgent projects, please use WhatsApp.
              </p>
            </div>
          </div>

          {/* Right — form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="lg:col-span-3 bg-white dark:bg-gray-900/70 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 sm:p-8 shadow-sm"
          >
            <h2 className="text-lg font-display font-bold text-gray-900 dark:text-gray-100 mb-6">
              Send a Message
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="name" className={labelClass}>
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Muhammad Zahid"
                  autoComplete="name"
                  {...register('name')}
                  className={inputClass}
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1" role="alert">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className={labelClass}>
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  {...register('email')}
                  className={inputClass}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1" role="alert">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="subject" className={labelClass}>
                Subject <span className="text-red-400">*</span>
              </label>
              <select
                id="subject"
                {...register('subject')}
                className={inputClass}
                aria-invalid={!!errors.subject}
              >
                <option value="">Select a subject...</option>
                <option value="Job Opportunity">Job Opportunity</option>
                <option value="Project Inquiry">Project Inquiry</option>
                <option value="SEO Consultation">SEO Consultation</option>
                <option value="WordPress Support">WordPress Support</option>
                <option value="General">General Inquiry</option>
              </select>
              {errors.subject && (
                <p className="text-xs text-red-500 mt-1" role="alert">{errors.subject.message}</p>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="message" className={labelClass}>
                Message <span className="text-red-400">*</span>
              </label>
              <textarea
                id="message"
                rows={6}
                placeholder="Tell me about your project, goals, timeline, and budget..."
                {...register('message')}
                className={`${inputClass} resize-none`}
                aria-invalid={!!errors.message}
              />
              {errors.message && (
                <p className="text-xs text-red-500 mt-1" role="alert">{errors.message.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-light disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </motion.form>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-[#0a0a09]/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 dark:text-gray-100 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                  aria-expanded={expandedFaq === idx}
                >
                  <span className="font-semibold text-sm text-gray-900 dark:text-gray-100 pr-4">
                    {faq.q}
                  </span>
                  <span className={`text-primary dark:text-primary-light text-lg font-bold flex-shrink-0 transition-transform ${expandedFaq === idx ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </button>
                {expandedFaq === idx && (
                  <div className="px-5 pb-5">
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
