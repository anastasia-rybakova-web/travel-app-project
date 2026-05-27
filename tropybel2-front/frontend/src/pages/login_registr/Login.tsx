import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiService } from "../../services/api.service";
import { LoginData, ValidationErrors } from "../../types/user.types";
import "./LoginRegistration.css";

export default function Login(): React.JSX.Element {
  const [formData, setFormData] = useState<LoginData>({
    username: "",
    password: ""
  });
  const [error, setError] = useState<string>("");
  const [formErrors, setFormErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};
    
    if (!formData.username.trim()) {
      errors.username = "Имя пользователя обязательно";
    }
    
    if (!formData.password) {
      errors.password = "Пароль обязателен";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError("");
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await apiService.login(formData);

      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      
      navigate(response.user.role === "guide" ? "/profile/guide" : "/profile/tourist");
    } catch (err: any) {
      setError(err.response?.data?.message || "Ошибка входа");
    } finally {
      setIsLoading(false);
    }
  };

  const updateField = (field: keyof LoginData, value: string): void => {
    setFormData({...formData, [field]: value});
    if (formErrors[field]) {
      setFormErrors({...formErrors, [field]: ""});
    }
  };

  return (
    <div className="login-auth-page">
      <h1>Вход</h1>

      <form onSubmit={handleLogin} className="login-auth-form" noValidate>
        {error && <div className="auth-error-message">{error}</div>}

        <label htmlFor="username">Имя пользователя</label>
        <input 
          id="username"
          type="text"
          value={formData.username} 
          onChange={(e: ChangeEvent<HTMLInputElement>) => updateField("username", e.target.value)} 
          required 
        />
        {formErrors.username && (
          <div className="auth-validation-message">{formErrors.username}</div>
        )}

        <label htmlFor="password">Пароль</label>
        <input 
          id="password"
          type="password" 
          value={formData.password} 
          onChange={(e: ChangeEvent<HTMLInputElement>) => updateField("password", e.target.value)} 
          required 
        />
        {formErrors.password && (
          <div className="auth-validation-message">{formErrors.password}</div>
        )}

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Вход..." : "Войти"}
        </button>
      </form>

      <p>
        Ещё не зарегистрированы? <Link to="/register">Регистрация</Link>
      </p>
    </div>
  );
}