import React, { useState } from 'react';
import { useFormik } from 'formik';
import { signupValidationSchema } from './Validation.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../cotext/DarkandLight.jsx';
import axios from 'axios';
import {
  FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiCheck, FiAlertCircle,
  FiArrowRight
} from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub, FaApple } from 'react-icons/fa';
import signupBg from '../../assets/signup_bg.png';

//const API_URL = 'http://localhost:5000';

export default function Signup() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  const formik = useFormik({
    initialValues: { name: '', email: '', password: '', confirmPassword: '', gender: '' },
    validationSchema: signupValidationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setServerError('');
      try {
        const { confirmPassword, ...payload } = values;
        const res = await axios.post(`${API_URL}/user/register`, payload);
        if (res.data.status) {
          setSignupSuccess(true);
          setTimeout(() => navigate('/verify-otp'), 2000);
        }
      } catch (err) {
        setServerError(err.response?.data?.msg || err.response?.data?.message || 'Something went wrong.');
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const getStatus = (f) => !formik.touched[f] ? 'idle' : formik.errors[f] ? 'error' : 'success';

  const borderColor = { 
    idle: isDark ? 'rgba(255,214,98,0.15)' : 'rgba(66,32,87,0.2)', 
    error: '#f43f5e', 
    success: '#10b981' 
  };

  // Theme-aware classes
  const pageBg = isDark ? 'bg-[#1a0a2e]' : 'bg-gradient-to-br from-[#f8f5ff] to-[#ede5f7]';
  const cardBg = isDark ? 'bg-[#2a1a3e]/60 border-[#FFD662]/10' : 'bg-white/70 border-[#422057]/10';
  const inputBg = isDark ? 'bg-[#1a0a2e]/80 text-white placeholder:text-gray-500' : 'bg-white text-[#422057] placeholder:text-gray-400';
  const labelClr = isDark ? 'text-[#FFD662]/80' : 'text-[#422057]/70';
  const headingClr = isDark ? 'text-white' : 'text-[#422057]';
  const subClr = isDark ? 'text-gray-400' : 'text-[#422057]/60';
  const iconClr = isDark ? 'text-[#FFD662]/50' : 'text-[#422057]/40';
  const socialBtnCls = isDark
    ? 'border-[#FFD662]/15 bg-[#2a1a3e]/60 hover:bg-[#3a2a4e] hover:border-[#FFD662]/30 text-gray-300'
    : 'border-[#422057]/15 bg-white hover:bg-[#f5f0fa] hover:border-[#422057]/30 text-[#422057]';

  return (
    <div className={`min-h-[calc(100vh-300px)] flex ${pageBg} overflow-hidden`}>
      {/* LEFT: Illustration */}
      <div className="hidden lg:flex lg:w-[46%] relative items-center justify-center">
        <img src={signupBg} alt="Cityscape" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a0a2e]/20 to-[#422057]/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a2e]/60 via-transparent to-transparent" />

        <div className="relative z-10 mx-10 p-8 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl max-w-md">
          <h2 className="text-3xl font-bold text-white mb-3 leading-tight">
            Start Your <br />
            <span className="text-[#FFD662]">Journey Today</span>
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Join thousands of users building something extraordinary. Create your account and unlock the full experience.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <div className="flex -space-x-2">
              {['bg-[#FFD662]', 'bg-[#422057]', 'bg-[#5a2d7a]', 'bg-[#f5cc4a]'].map((c, i) => (
                <div key={i} className={`w-8 h-8 rounded-full ${c} border-2 border-[#1a0a2e] flex items-center justify-center text-[10px] font-bold text-white`}>
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <span className="text-gray-400 text-xs">2k+ members already joined</span>
          </div>
        </div>
      </div>

      {/* RIGHT: Form */}
      <div className="w-full lg:w-[54%] flex items-center justify-center px-6 py-8">
        <div className={`w-full max-w-lg p-8 rounded-3xl backdrop-blur-md border shadow-xl ${cardBg}`}>
          {/* Header */}
          <h1 className={`text-3xl font-extrabold ${headingClr} mb-1`}>Create Account</h1>
          <p className={`${subClr} mb-6 text-sm`}>
            Already have an account?{' '}
            <Link to="/login" className="text-[#FFD662] hover:text-[#f5cc4a] font-semibold transition-colors">Sign in</Link>
          </p>

          {/* Social Buttons */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { icon: <FcGoogle size={20} />, label: 'Google' },
              { icon: <FaGithub size={20} className={isDark ? 'text-white' : 'text-[#422057]'} />, label: 'GitHub' },
              { icon: <FaApple size={20} className={isDark ? 'text-white' : 'text-[#422057]'} />, label: 'Apple' },
            ].map(({ icon, label }) => (
              <button key={label} type="button"
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border transition-all duration-300 cursor-pointer ${socialBtnCls}`}>
                {icon}
                <span className="text-xs font-medium hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-5">
            <div className={`flex-1 h-px ${isDark ? 'bg-[#FFD662]/15' : 'bg-[#422057]/15'}`} />
            <span className={`${subClr} text-[10px] tracking-widest uppercase`}>or continue with email</span>
            <div className={`flex-1 h-px ${isDark ? 'bg-[#FFD662]/15' : 'bg-[#422057]/15'}`} />
          </div>

          {/* Errors */}
          {serverError && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2 text-rose-400 text-sm">
              <FiAlertCircle className="shrink-0" />{serverError}
            </div>
          )}
          {signupSuccess && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2 text-emerald-400 text-sm">
              <FiCheck className="shrink-0" size={18} />Account created! Redirecting to OTP verification...
            </div>
          )}

          {/* Form */}
          <form onSubmit={formik.handleSubmit} className="space-y-4" autoComplete="off">
            {/* Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field id="signup-name" label="Full Name" icon={<FiUser size={15} />} placeholder="John Doe"
                fieldProps={formik.getFieldProps('name')} status={getStatus('name')} borderColor={borderColor}
                inputBg={inputBg} labelClr={labelClr} iconClr={iconClr}
                touched={formik.touched.name} error={formik.errors.name} />
              <Field id="signup-email" label="Email" icon={<FiMail size={15} />} placeholder="you@email.com" type="email"
                fieldProps={formik.getFieldProps('email')} status={getStatus('email')} borderColor={borderColor}
                inputBg={inputBg} labelClr={labelClr} iconClr={iconClr}
                touched={formik.touched.email} error={formik.errors.email} />
            </div>

            {/* Password & Confirm */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field id="signup-password" label="Password" icon={<FiLock size={15} />} placeholder="••••••••"
                type={showPassword ? 'text' : 'password'}
                fieldProps={formik.getFieldProps('password')} status={getStatus('password')} borderColor={borderColor}
                inputBg={inputBg} labelClr={labelClr} iconClr={iconClr}
                touched={formik.touched.password} error={formik.errors.password}
                toggle={() => setShowPassword(!showPassword)} showToggle={showPassword} />
              <Field id="signup-confirm" label="Confirm Password" icon={<FiLock size={15} />} placeholder="••••••••"
                type={showConfirm ? 'text' : 'password'}
                fieldProps={formik.getFieldProps('confirmPassword')} status={getStatus('confirmPassword')} borderColor={borderColor}
                inputBg={inputBg} labelClr={labelClr} iconClr={iconClr}
                touched={formik.touched.confirmPassword} error={formik.errors.confirmPassword}
                toggle={() => setShowConfirm(!showConfirm)} showToggle={showConfirm} />
            </div>

            {/* Gender */}
            <div>
              <label className={`text-[10px] font-semibold ${labelClr} uppercase tracking-wider mb-2 block`}>Gender</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'male', emoji: '👨', label: 'Male' },
                  { value: 'female', emoji: '👩', label: 'Female' },
                  { value: 'other', emoji: '🧑', label: 'Other' },
                ].map(({ value, emoji, label }) => (
                  <button key={value} type="button"
                    onClick={() => { formik.setFieldValue('gender', value); formik.setFieldTouched('gender', true); }}
                    className={`relative py-2.5 rounded-xl border-2 text-sm font-medium transition-all duration-300 cursor-pointer flex items-center justify-center gap-2
                      ${formik.values.gender === value
                        ? 'border-[#FFD662] bg-[#FFD662]/15 text-[#FFD662] shadow-lg shadow-[#FFD662]/10'
                        : isDark
                          ? 'border-[#FFD662]/15 bg-[#1a0a2e]/60 text-gray-400 hover:border-[#FFD662]/30'
                          : 'border-[#422057]/15 bg-white text-[#422057]/60 hover:border-[#422057]/30'
                      }`}>
                      <span className="text-base">{emoji}</span>{label}
                      {formik.values.gender === value && (
                        <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#FFD662] flex items-center justify-center">
                          <FiCheck size={11} className="text-[#422057]" />
                        </div>
                      )}
                    </button>
                  ))}
                
              </div>
              <FieldError touched={formik.touched.gender} error={formik.errors.gender} />
            </div>

            {/* Password hints */}
            {formik.values.password && (
              <div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 py-1">
                  <Hint label="8+ characters" met={formik.values.password.length >= 8} isDark={isDark} />
                  <Hint label="Contains letter" met={/[A-Za-z]/.test(formik.values.password)} isDark={isDark} />
                  <Hint label="Contains number" met={/\d/.test(formik.values.password)} isDark={isDark} />
                  <Hint label="Passwords match" met={formik.values.confirmPassword && formik.values.password === formik.values.confirmPassword} isDark={isDark} />
                </div>
              </div>
            )}

            {/* Submit */}
            <button type="submit" disabled={isSubmitting || signupSuccess}
              className={`w-full py-3 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer
                ${isSubmitting || signupSuccess
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#422057] to-[#5a2d7a] hover:from-[#5a2d7a] hover:to-[#422057] text-[#FFD662] shadow-lg shadow-[#422057]/30 hover:shadow-[#422057]/50'
                }`}>
              {isSubmitting ? (
                <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Creating Account...</>
              ) : signupSuccess ? (
                <><FiCheck size={18} />Account Created!</>
              ) : (
                
                <>Create Account<FiArrowRight size={16} /></>
              )}
            </button>

            <p className={`text-center text-[10px] ${subClr} mt-3`}>
              By creating an account, you agree to our{' '}
              <a href="#" className="text-[#FFD662] hover:underline">Terms</a> and{' '}
              <a href="#" className="text-[#FFD662] hover:underline">Privacy Policy</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ── Reusable Sub-components ── */
function Field({ id, label, icon, placeholder, type = 'text', fieldProps, status, borderColor, inputBg, labelClr, iconClr, touched, error, toggle, showToggle }) {
  const currentBorderColor = borderColor[status];
  
  return (
    <div>
      <label htmlFor={id} className={`text-[10px] font-semibold ${labelClr} uppercase tracking-wider mb-1 block`}>{label}</label>
      <div style={{ borderColor: currentBorderColor }}
        className={`relative rounded-xl border-2 transition-all`}>
        <span className={`absolute left-3 top-1/2 -translate-y-1/2 ${iconClr}`}>{icon}</span>
        <input id={id} type={type} placeholder={placeholder} {...fieldProps}
          className={`w-full ${inputBg} pl-9 ${toggle ? 'pr-14' : 'pr-8'} py-2.5 text-sm outline-none rounded-xl bg-transparent`} />
        {toggle && (
          <button type="button" onClick={toggle}
            className={`absolute right-7 top-1/2 -translate-y-1/2 ${iconClr} hover:opacity-80 transition-colors cursor-pointer`}>
            {showToggle ? <FiEyeOff size={14} /> : <FiEye size={14} />}
          </button>
        )}
        {status !== 'idle' && (
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
            {status === 'success' ? <FiCheck size={13} className="text-emerald-400" /> : <FiAlertCircle size={13} className="text-rose-400" />}
          </div>
        )}
      </div>
      <FieldError touched={touched} error={error} />
    </div>
  );
}

function FieldError({ touched, error }) {
  if (!touched || !error) return null;
  
  return (
    <p className="mt-1 text-[10px] text-rose-400 flex items-center gap-1">
      <FiAlertCircle size={10} />{error}
    </p>
  );
}

function Hint({ label, met, isDark }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className={`w-3 h-3 rounded-full flex items-center justify-center ${met ? 'bg-emerald-500/20' : isDark ? 'bg-[#2a1a3e]' : 'bg-gray-200'}`}>
        <FiCheck size={8} className={met ? 'text-emerald-400' : isDark ? 'text-gray-600' : 'text-gray-400'} />
      </div>
      <span className={`text-[10px] ${met ? 'text-emerald-400' : isDark ? 'text-gray-500' : 'text-gray-400'}`}>{label}</span>
    </div>
  );
}