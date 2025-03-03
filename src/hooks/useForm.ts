import { useState, ChangeEvent, FormEvent } from "react";

type ValidationRules<T> = {
  [K in keyof T]: (value: T[K], formData: T) => string;
};

interface UseFormProps<T> {
  initialState: T;
  validationRules: ValidationRules<T>;
  onSubmit: (data: T) => Promise<void>;
}

export const useForm = <T extends Record<string, string | number | boolean>>({
  initialState,
  validationRules,
  onSubmit,
}: UseFormProps<T>) => {
  const [formData, setFormData] = useState<T>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name: keyof T, value: T[keyof T]) => {
    const validationRule = validationRules[name];
    return validationRule ? validationRule(value, formData) : "";
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const typedValue = e.target.type === "checkbox" ? e.target.checked : value;
    setFormData((prev) => ({ ...prev, [name]: typedValue }));

    const error = validateField(name as keyof T, typedValue as T[keyof T]);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    Object.keys(formData).forEach((key) => {
      const error = validateField(key as keyof T, formData[key as keyof T]);
      if (error) {
        newErrors[key as keyof T] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
    isSubmitting,
  };
};
