'use client';

import { useState, useEffect, useCallback } from 'react'; // Import useCallback
import Modal from '../Modal';
import Image from 'next/image';
import styles from './DemoFormModal.module.scss';

interface FormState {
  [key: string]: string;
}

interface FormErrors {
  [key: string]: string | undefined;
}

interface FormField {
  id: string; // Ensure id is string
  label: string;
  type: string; // Allow for 'text', 'email', 'textarea', 'select', 'tel'
  required: boolean;
  options?: { label: string; value: string }[]; // For select fields
}

interface DemoFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  section: any; // The section data from all_content.json
}

const DemoFormModal: React.FC<DemoFormModalProps> = ({
  isOpen,
  onClose,
  section,
}) => {
  // Derive flatFields inside the component, but not necessarily in state
  // as it's derived directly from props. Handle potential undefined.
  const flatFields: FormField[] = section?.formFieldsRequest || [];

  // Define a function to create initial form state based on available fields
  const createInitialFormState = useCallback(() => {
    return flatFields.reduce((acc: FormState, field: FormField) => {
      if (field && field.id) acc[field.id] = '';
      return acc;
    }, {});
  }, [flatFields]); // Recreate if flatFields changes

  // Initialize state with an empty object or the result of createInitialFormState
  // This ensures useState always gets a defined value on first render.
  const [formData, setFormData] = useState<FormState>(createInitialFormState());
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<null | {
    success: boolean;
    message: string;
  }>(null);

  // Effect to reset form when modal opens or section data changes
  useEffect(() => {
    if (isOpen && section?.formFieldsRequest) {
      const initialState = section.formFieldsRequest.reduce(
        (acc: FormState, field: FormField) => {
          if (field && field.id) acc[field.id] = '';
          return acc;
        },
        {}
      );
      setFormData(initialState);
      setErrors({});
      setSubmissionResult(null);
    }
  }, [isOpen, section]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    const field = flatFields.find((f: FormField) => f.id === id);
    if (!field) return; // Guard against undefined field

    let errorMessage: string | undefined;

    // Use localized messages for validation if available in section prop
    const requiredMessage = section?.formValidation?.required || 'is required';
    const invalidEmailMessage =
      section?.formValidation?.invalidEmail ||
      'Please enter a valid email address';

    if (field.required && !value.trim()) {
      errorMessage = `${field.label} ${requiredMessage}`;
    } else if (
      field.type === 'email' &&
      value &&
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
    ) {
      errorMessage = invalidEmailMessage;
    }
    // Add phone validation if 'tel' type is used
    else if (
      field.type === 'tel' &&
      value &&
      !/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s0-9]*$/.test(value)
    ) {
      errorMessage =
        section?.formValidation?.invalidPhone || 'Invalid phone number.';
    }

    setErrors((prev) => ({ ...prev, [id]: errorMessage }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Use localized validation messages
    const requiredMessage = section?.formValidation?.required || 'is required';
    const invalidEmailMessage =
      section?.formValidation?.invalidEmail || 'Invalid email format';
    const invalidPhoneMessage =
      section?.formValidation?.invalidPhone || 'Invalid phone number.';

    flatFields.forEach((field: FormField) => {
      const value = formData[field.id];
      if (field.required && !value?.trim()) {
        newErrors[field.id] = `${field.label} ${requiredMessage}`;
        isValid = false;
      } else if (
        field.type === 'email' &&
        value &&
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmissionResult(null);

    // Use localized submission messages
    const successMessage =
      section?.submissionMessages?.success || 'Submission successful!';
    const submissionFailedMessage =
      section?.submissionMessages?.errorDefault || 'Submission failed.';
    const unexpectedErrorMessage =
      section?.submissionMessages?.errorUnexpected ||
      'An unexpected error occurred.';

    try {
      const response = await fetch('/api/request-demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmissionResult({
          success: true,
          message: successMessage,
        });
        setFormData(createInitialFormState()); // Reset using the function
        setErrors({});
      } else {
        setSubmissionResult({
          success: false,
          message: result.error || submissionFailedMessage,
        });
      }
    } catch (err) {
      setSubmissionResult({
        success: false,
        message: unexpectedErrorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Guard against `section` being undefined or not having expected properties
  if (!section || !section.formFieldsRequest || !section.subtitle) {
    // You might render a loading state or nothing if the section data is critical
    return null; // Or <p>Loading demo form...</p>
  }

  return (
    <section className={styles.demoFormModal}>
      <Modal isOpen={isOpen} onClose={onClose} size="auto">
        <div className={styles.requestDemoForm}>
          <div className={styles.modalContent1}>
            <form
              onSubmit={handleSubmit}
              className={styles.demoForm}
              noValidate
            >
              <h3>{section.subtitle}</h3>{' '}
              {/* Subtitle like "Fill out the form..." */}
              {flatFields.map((field: FormField) => {
                // Use FormField type
                // Basic validation for field object
                if (!field || typeof field !== 'object' || !field.id)
                  return null;

                const hasError = !!errors[field.id];
                const inputClass = hasError ? styles.errorInput : '';

                return (
                  <div key={field.id} className={styles.formGroup}>
                    <label htmlFor={field.id} className={styles.formLabel}>
                      {field.label}
                      {field.required && (
                        <span className={styles.required}>*</span>
                      )}
                    </label>

                    {hasError && (
                      <div className={styles.errorWrapper}>
                        <Image
                          src="/assets/images/icons/error-icon.svg"
                          alt="error icon"
                          width={16}
                          height={16}
                          className={styles.errorIcon}
                        />
                        <p className={styles.errorMessage}>
                          {errors[field.id]}
                        </p>
                      </div>
                    )}

                    {field.type === 'select' && Array.isArray(field.options) ? (
                      <select
                        id={field.id}
                        className={`${styles.select} ${inputClass}`}
                        value={formData[field.id]}
                        onChange={handleChange}
                      >
                        {/* Option for default selection, can be localized */}
                        <option value="">
                          {section.formValidation?.selectPlaceholder ||
                            '-- Choose an option --'}
                        </option>
                        {field.options.map((option: any) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : field.type === 'textarea' ? (
                      <textarea
                        id={field.id}
                        className={`${styles.formTextArea} ${inputClass}`}
                        value={formData[field.id]}
                        onChange={handleChange}
                      />
                    ) : (
                      <input
                        id={field.id}
                        type={field.type}
                        className={`${styles.formInput} ${inputClass}`}
                        value={formData[field.id]}
                        onChange={handleChange}
                      />
                    )}
                  </div>
                );
              })}
              <button
                type="submit"
                className={styles.formButton}
                disabled={
                  isSubmitting ||
                  Object.values(errors).some(
                    (err) => err !== undefined && err !== ''
                  ) // Check for non-empty errors
                }
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
      </Modal>
    </section>
  );
};

export default DemoFormModal;
