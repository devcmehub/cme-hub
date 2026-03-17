'use client';

import React, { useState, useEffect } from 'react';
import styles from './ContactUs.module.scss';
import Image from 'next/image';
import allContent from '../../utils/all_content.json';
import { useLanguage } from '../../context/LanguageContext'; // Corrected path to 'contexts'

interface FormState {
  fullName: string;
  phone: string;
  email: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  message?: string;
}

interface FormField {
  id: keyof FormState;
  label: string;
  type: 'text' | 'email' | 'textarea' | 'tel';
  required: boolean;
}

const ContactUs: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [hasMounted, setHasMounted] = useState(false); // State for hydration

  // --- Initialize static form state values at the top level ---
  // These initial values do NOT depend on `section` or `currentLanguage`
  const initialFormState: FormState = {
    // MOVED THIS DEFINITION HERE
    fullName: '',
    phone: '',
    email: '',
    message: '',
  };

  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionResult, setSubmissionResult] = useState<null | {
    success: boolean;
    message: string;
  }>(null);
  // --- End of top-level state initializations ---

  // Mount effect to handle hydration
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // --- Hydration Loading State ---
  if (!hasMounted) {
    return (
      <section className={`${styles.contactUs} container-fluid`}>
        <div className="container">
          <h2 className={styles.section_title}>Loading Contact Form...</h2>
          <div className={styles.contactUsContent}>
            <div className={styles.contactInfo}>
              <p>Loading contact details...</p>
            </div>
            <div className={styles.contactForm}>
              <p>Loading form...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // --- Content access and derived values AFTER hydration ---
  const languageContent = (allContent as any)[currentLanguage];
  const section = languageContent?.sections?.find(
    (sec: any) => sec.id === 'contact-us'
  );

  // Validate section and its required properties
  if (!section || !section.formFields || !section.contactInfo) {
    console.error(
      `Error: 'contact-us' section or its required data (formFields, contactInfo) missing for language: ${currentLanguage}`
    );
    return null;
  }

  // formFields is derived here, after `section` is guaranteed to exist
  const formFields: FormField[] = section.formFields.map((field: any) => ({
    ...field,
    type: field.type === 'number' ? 'tel' : field.type,
  }));
  // --- End of content access and derived values ---

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    const field = formFields.find((f) => f.id === id);
    let errorMessage: string | undefined;

    if (field) {
      // Use localized error messages from your JSON if available, e.g., section.formValidation.required
      const requiredMessage =
        section.formValidation?.required || 'is required.';
      const invalidEmailMessage =
        section.formValidation?.invalidEmail || 'Invalid email address.';
      const invalidPhoneMessage =
        section.formValidation?.invalidPhone || 'Invalid phone number.';

      if (field.required && !value.trim()) {
        errorMessage = `${field.label} ${requiredMessage}`;
      } else if (
        field.type === 'email' &&
        value &&
        !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
      ) {
        errorMessage = invalidEmailMessage;
      } else if (
        field.type === 'tel' &&
        value &&
        !/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s0-9]*$/.test(value)
      ) {
        errorMessage = invalidPhoneMessage;
      }
    }

    setErrors((prev) => ({
      ...prev,
      [id]: errorMessage,
    }));
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: FormErrors = {};

    // Use localized error messages from your JSON if available
    const requiredMessage = section.formValidation?.required || 'is required.';
    const invalidEmailMessage =
      section.formValidation?.invalidEmail || 'Invalid email address.';
    const invalidPhoneMessage =
      section.formValidation?.invalidPhone || 'Invalid phone number.';

    formFields.forEach((field) => {
      const value = formData[field.id];
      if (field.required && !value.trim()) {
        newErrors[field.id] = `${field.label} ${requiredMessage}`;
        isValid = false;
      } else if (
        field.type === 'email' &&
        value &&
        !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
      ) {
        newErrors[field.id] = invalidEmailMessage;
        isValid = false;
      } else if (
        field.type === 'tel' &&
        value &&
        !/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s0-9]*$/.test(value)
      ) {
        newErrors[field.id] = invalidPhoneMessage;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmissionResult(null);

    // Use localized messages for submission results
    const successMessage =
      section.submissionMessages?.success || 'Message sent successfully!';
    const errorMessageDefault =
      section.submissionMessages?.errorDefault ||
      'Something went wrong. Please try again.';
    const errorMessageUnexpected =
      section.submissionMessages?.errorUnexpected || 'Unexpected server error.';

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmissionResult({
          success: true,
          message: successMessage,
        });
        setFormData(initialFormState); // Reset to initial empty state
        setErrors({}); // Clear errors
      } else {
        setSubmissionResult({
          success: false,
          message: result.error || errorMessageDefault,
        });
      }
    } catch (error: any) {
      setSubmissionResult({
        success: false,
        message: error.message || errorMessageUnexpected,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-us" className={`${styles.contactUs} container-fluid`}>
      <div className="container">
        <h2 className={styles.section_title}>{section.title}</h2>

        <div className={styles.contactUsContent}>
          <div className={styles.contactInfo}>
            <h4>{section.subtitle}</h4>
            <h4>{section.headquarters}</h4>

            <div>
              <Image
                src="/assets/images/smart-phone-01.svg"
                alt="phone icon"
                width={20}
                height={20}
              />
              {section.contactInfo.phone}
            </div>
            <div>
              <Image
                src="/assets/images/mail-01.svg"
                alt="email icon"
                width={20}
                height={20}
              />
              <a href={`mailto:${section.contactInfo.email}`}>
                {section.contactInfo.email}
              </a>
            </div>
            <div>
              <Image
                src="/assets/images/location-04.svg"
                alt="location icon"
                width={20}
                height={20}
              />
              {section.contactInfo.address}
            </div>
          </div>

          <form onSubmit={handleSubmit} className={styles.contactForm}>
            <h2 className={styles.subtitleform}>{section.subtitleform}</h2>
            <p className={styles.contactUsDescription}>{section.description}</p>

            {formFields.map((field) => (
              <div key={field.id} className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor={field.id}>
                  {field.label}
                  {field.required && <span className={styles.required}>*</span>}
                </label>

                {errors[field.id] && (
                  <div className={styles.errorWrapper}>
                    <Image
                      src="/assets/images/icons/error-icon.svg"
                      alt="error icon"
                      width={16}
                      height={16}
                    />
                    <p className={styles.errorMessage}>{errors[field.id]}</p>
                  </div>
                )}

                {field.type === 'textarea' ? (
                  <textarea
                    id={field.id}
                    value={formData[field.id]}
                    onChange={handleChange}
                    className={`${styles.formTextArea} ${errors[field.id] ? styles.errorInput : ''}`}
                  />
                ) : (
                  <input
                    id={field.id}
                    type={field.type}
                    value={formData[field.id]}
                    onChange={handleChange}
                    className={`${styles.formInput} ${errors[field.id] ? styles.errorInput : ''}`}
                  />
                )}
              </div>
            ))}

            <button
              type="submit"
              className={styles.formButton}
              disabled={isSubmitting}
            >
              {isSubmitting
                ? section.formSubmission?.submittingText || 'Submitting...'
                : section.formSubmission?.submitButtonText || 'Submit'}
            </button>

            {submissionResult && (
              <div
                className={`${styles.submissionMessage} ${
                  submissionResult.success ? styles.success : styles.error
                }`}
              >
                {submissionResult.message}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
