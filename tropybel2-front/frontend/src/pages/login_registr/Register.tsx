import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../../services/api.service";
import { UserRole, ValidationErrors } from "../../types/user.types";
import "./LoginRegistration.css";

interface RegisterFormData {
  username: string;
  role: UserRole;
  password: string;
  repeat: string;
  phone: string;
  email: string;
}

export default function Register(): React.JSX.Element {
  const [formData, setFormData] = useState<RegisterFormData>({
    username: "",
    role: "tourist",
    password: "",
    repeat: "",
    phone: "",
    email: ""
  });
  const [error, setError] = useState<string>("");
  const [formErrors, setFormErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};
    
    if (!formData.username.trim()) {
      errors.username = "Имя пользователя обязательно";
    } else if (formData.username.length < 3) {
      errors.username = "Имя пользователя должно быть не менее 3 символов";
    }
    
    if (!formData.password) {
      errors.password = "Пароль обязателен";
    } else if (formData.password.length < 6) {
      errors.password = "Пароль должен быть не менее 6 символов";
    }
    
    if (formData.role === "guide") {
      if (formData.phone && !/^[\+]?[0-9\s\-\(\)]+$/.test(formData.phone)) {
        errors.phone = "Некорректный формат телефона";
      }
      
      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = "Некорректный формат email";
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
  e.preventDefault();
  setError("");
  
  if (!validateForm()) return;
  if (formData.password !== formData.repeat) {
    setError("Пароли не совпадают");
    return;
  }

  setIsLoading(true);

  try {
      const registerData: any = {
        username: formData.username,
        password: formData.password,
        role: formData.role,
        email: formData.email || undefined
      };

      if (formData.role === "guide" && formData.phone) {
        registerData.phone = formData.phone;
      }

    const response = await apiService.register(registerData);

    localStorage.setItem("token", response.token);
    localStorage.setItem("user", JSON.stringify(response.user));
    
    navigate(response.user.role === "guide" ? "/profile/guide" : "/profile/tourist");
  } catch (err: any) {
    setError(err.response?.data?.message || "Ошибка регистрации");
  } finally {
    setIsLoading(false);
  }
};

  const updateField = (field: keyof RegisterFormData, value: string): void => {
    setFormData({...formData, [field]: value});
    if (formErrors[field]) {
      setFormErrors({...formErrors, [field]: ""});
    }
  };

  const handleRoleChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    const newRole = e.target.value as UserRole;
    updateField("role", newRole);
    if (newRole === "tourist") {
      setFormErrors({...formErrors, phone: ""}); 
    }
  };

  return (
    <div className="register-auth-page">
      <h1>Регистрация</h1>

      <form onSubmit={handleRegister} className="register-auth-form" noValidate>
        {error && <div className="auth-error-message">{error}</div>}

        <label htmlFor="username">Имя пользователя</label>
        <input 
          id="username"
          type="text"
          value={formData.username} 
          onChange={(e: ChangeEvent<HTMLInputElement>) => updateField("username", e.target.value)} 
          required 
          minLength={3}
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
          minLength={6}
        />
        {formErrors.password && (
          <div className="auth-validation-message">{formErrors.password}</div>
        )}

        <label htmlFor="repeat">Повторите пароль</label>
        <input 
          id="repeat"
          type="password" 
          value={formData.repeat} 
          onChange={(e: ChangeEvent<HTMLInputElement>) => updateField("repeat", e.target.value)} 
          required 
        />
        {formErrors.repeat && (
          <div className="auth-validation-message">{formErrors.repeat}</div>
        )}

        <label htmlFor="role">Выберите роль</label>
        <select 
          id="role"
          value={formData.role} 
          onChange={handleRoleChange}
        >
          <option value="tourist">Турист</option>
          <option value="guide">Гид</option>
        </select>

        {formData.role === "guide" && (
          <>
            <label htmlFor="phone">Телефон (необязательно)</label>
            <input 
              id="phone"
              type="tel" 
              value={formData.phone} 
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateField("phone", e.target.value)}
              placeholder="+375 (29) 123-45-67"
            />
            {formErrors.phone && (
              <div className="auth-validation-message">{formErrors.phone}</div>
            )}
          </>
        )}

        <label htmlFor="email">Email (необязательно)</label>
        <input 
          id="email"
          type="email" 
          value={formData.email} 
          onChange={(e: ChangeEvent<HTMLInputElement>) => updateField("email", e.target.value)}
          placeholder="example@mail.com"
        />
        {formErrors.email && (
          <div className="auth-validation-message">{formErrors.email}</div>
        )}

        <div className="auth-buttons-container">
          <button type="submit" className="btn-main" disabled={isLoading}>
            {isLoading ? "Загрузка..." : "Создать аккаунт"}
          </button>
          <button 
            type="button" 
            className="auth-cancel-btn" 
            onClick={() => navigate("/login")}
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
}