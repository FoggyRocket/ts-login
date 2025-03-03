import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { registerUser } from "../../services/auth";
import styles from "./Signup.module.css";
import { Bounce, toast } from "react-toastify";

interface SignupFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initialFormState: SignupFormData = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const validationRules = {
  username: (value: string) =>
    value.length >= 3 ? "" : "Username must be at least 3 characters",
  email: (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Invalid email format",
  password: (value: string) =>
    value.length >= 8 ? "" : "Password must be at least 8 characters",
  confirmPassword: (value: string, formData: SignupFormData) =>
    value === formData.password ? "" : "Passwords do not match",
};

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { formData, errors, handleChange, handleSubmit, isSubmitting } =
    useForm<SignupFormData>({
      initialState: initialFormState,
      validationRules,
      onSubmit: async (data) => {
        try {
          await registerUser(data);
          toast.success("Registration successful! 🚀", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
          navigate("/dashboard");
        } catch (error) {
          toast.error(`Registration failed: ${error instanceof Error ? error.message : 'Unknown error'}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        }
      },
    });

  return (
    <div className={styles.signupContainer}>
      <h1>Create Account</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={errors.username ? styles.errorInput : ""}
          />
          {errors.username && (
            <span className={styles.error}>{errors.username}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? styles.errorInput : ""}
          />
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? styles.errorInput : ""}
          />
          {errors.password && (
            <span className={styles.error}>{errors.password}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={errors.confirmPassword ? styles.errorInput : ""}
          />
          {errors.confirmPassword && (
            <span className={styles.error}>{errors.confirmPassword}</span>
          )}
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating Account..." : "Sign Up"}
        </button>

        <p className={styles.loginLink}>
          Already have an account? <a href="/">Log in</a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
