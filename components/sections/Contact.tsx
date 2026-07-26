'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Mail, Linkedin, MessageCircle, Send, MapPin, Clock } from 'lucide-react';
import { toast } from 'sonner';
import SectionHeader from '@/components/ui/SectionHeader';

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
    color: 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light',
    hoverColor: 'hover:bg-primary hover:text-white',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/itszahidd7',
    href: 'https://www.linkedin.com/in/itszahidd7/',
    color: 'bg-sky-50 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400',
    hoverColor: 'hover:bg-sky-600 hover:text-white',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+92 348 6377723',
    href: 'https://wa.me/923486377723',
    color: 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400',
    hoverColor: 'hover:bg-green-600 hover:text-white',
  },
];

const inputClass =
  'w-full px-4 py-3 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary/30 dark:focus:ring-primary/40 focus:border-primary/60 dark:focus:border-primary/60 focus:outline-none transition-all duration-200';

const labelClass = 'block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1.5';

const errorClass = 'text-xs text-red-500 dark:text-red-400 mt-1';

/**
 * Contact section — contact methods + validated form with Resend API.
 */
export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      // Static hosting fallback: open user's email client via mailto
      const to = 'mzahidiqbal129@gmail.com';
      const subject = `${data.subject} — from ${data.name}`;
      const body = `Name: ${data.name}%0AEmail: ${data.email}%0A%0A${encodeURIComponent(
        data.message
      )}`;

      // Use mailto to let the user send via their email client (works on static hosting)
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
    <section
      id="contact"
      className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-[#0a0a09]/80"
      aria-label="Contact section"
    >
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          badge="Contact"
          title="Let's Work Together"
          subtitle="Have a project in mind, want to discuss SEO, or just want to say hello? I'd love to hear from you."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
          {/* Left — contact info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                Drosh, Lower Chitral, KPK, Pakistan
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                PKT (UTC+5) — Mon–Sat
              </div>
            </div>

            <div className="space-y-3 pt-2">
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
                    className="group flex items-start gap-4 p-4 bg-white dark:bg-gray-900/70 border border-gray-200 dark:border-gray-800 rounded-2xl hover:border-primary/40 dark:hover:border-primary/40 hover:shadow-md transition-all duration-200"
                  >
                    <div
                      className={`p-2.5 rounded-xl ${method.color} ${method.hoverColor} transition-colors group-hover:scale-105 flex-shrink-0`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
                        {method.label}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 break-all">
                        {method.value}
                      </p>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            {/* Response time note */}
            <div className="p-4 bg-primary/5 dark:bg-primary/10 border border-primary/15 dark:border-primary/25 rounded-2xl">
              <p className="text-xs text-primary dark:text-primary-light font-semibold mb-1">
                ⚡ Quick Responder
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                I typically respond to messages within 24 hours on business days.
              </p>
            </div>
          </div>

          {/* Right — form */}
          <motion.form
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="lg:col-span-3 bg-white dark:bg-gray-900/70 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 sm:p-8 shadow-sm"
          >
            <h3 className="text-lg font-display font-bold text-gray-900 dark:text-gray-100 mb-6">
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
                className={inputClass}
                aria-invalid={!!errors.subject}
                aria-describedby={errors.subject ? 'subject-error' : undefined}
              >
                <option value="">Select a subject...</option>
                <option value="Job Opportunity">Job Opportunity</option>
                <option value="Project Inquiry">Project Inquiry</option>
                <option value="SEO Consultation">SEO Consultation</option>
                <option value="WordPress Support">WordPress Support</option>
                <option value="General">General Inquiry</option>
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
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message && (
                <p id="message-error" className={errorClass} role="alert">
                  {errors.message.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-light disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary/40"
              aria-label={isSubmitting ? 'Sending message' : 'Send message'}
            >
              {isSubmitting ? (
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
          </motion.form>
        </div>
      </div>
    </section>
  );
}
