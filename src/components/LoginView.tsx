import React, { useState } from 'react';
import { motion } from 'motion/react';
import { KeyRound, User as UserIcon, LogIn, AlertCircle } from 'lucide-react';
import { UrboxLogoSymbol } from './UrboxLogo';
import { User } from '../types';

interface LoginViewProps {
  onLogin: (user: User) => void;
}

// Sample team users requested by the user so multiple people can use it.
const PRESET_USERS: User[] = [
  { id: 'UR-1002', username: 'tuansaigon', fullName: 'Tuan Saigon', role: 'admin' },
  { id: 'UR-1011', username: 'minh.posm', fullName: 'Minh Hoàng (Staff)', role: 'staff' },
  { id: 'UR-1025', username: 'lan.kho', fullName: 'Mai Lan (Staff)', role: 'staff' },
  { id: 'UR-1099', username: 'viewer.test', fullName: 'Khách Xem', role: 'viewer' },
];

export const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [usernameInput, setUsernameInput] = useState('');
  const [userIdInput, setUserIdInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Quick preset login handler
  const handlePresetSelect = (user: User) => {
    setIsLoading(true);
    setTimeout(() => {
      onLogin(user);
      setIsLoading(false);
    }, 450);
  };

  // Custom login handler
  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!usernameInput.trim()) {
      setErrorMessage('Vui lòng nhập Tên đăng nhập');
      return;
    }

    const matchedPreset = PRESET_USERS.find(
      (u) => u.username.toLowerCase() === usernameInput.trim().toLowerCase()
    );

    if (matchedPreset) {
      setIsLoading(true);
      setTimeout(() => {
        onLogin(matchedPreset);
        setIsLoading(false);
      }, 400);
    } else {
      // Create a new custom user profile on the fly to support anyone
      const formattedName = usernameInput.trim().split('.').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');

      const newUser: User = {
        id: userIdInput.trim() ? userIdInput.trim().toUpperCase() : `UR-${Math.floor(1000 + Math.random() * 9000)}`,
        username: usernameInput.trim().toLowerCase(),
        fullName: formattedName || usernameInput.trim(),
        role: 'staff',
      };

      setIsLoading(true);
      setTimeout(() => {
        onLogin(newUser);
        setIsLoading(false);
      }, 400);
    }
  };

  return (
    <div className="flex flex-col justify-space justify-between min-h-screen max-w-lg mx-auto bg-gray-50 px-6 py-10 font-sans">
      
      {/* Upper Brand Section */}
      <div className="flex flex-col items-center mt-6 text-center">
        <motion.div
          animate={{ rotate: [0, 3, -3, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <UrboxLogoSymbol size={64} />
        </motion.div>
        <h2 className="text-[#7C3AED] text-2xl font-black mt-3 tracking-tight">KHO POSM</h2>
        <span className="text-gray-400 text-xs font-semibold tracking-widest mt-1 uppercase">Authentication</span>
      </div>

      {/* Main Login Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full bg-white rounded-3xl p-6 shadow-sm border border-gray-100 my-6"
      >
        <span className="text-sm font-bold text-gray-800 block mb-4 text-center">
          ĐĂNG NHẬP HỆ THỐNG
        </span>

        {errorMessage && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl text-xs flex items-center gap-2 font-medium">
            <AlertCircle size={14} className="flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleCustomLogin} className="space-y-4">
          {/* Username Input */}
          <div>
            <div className="relative flex items-center">
              <UserIcon size={16} className="absolute left-3.5 text-gray-400" />
              <input
                id="login-username"
                type="text"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="Tên đăng nhập (ví dụ: tuansaigon)"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 focus:border-purple-400 focus:bg-white rounded-xl text-sm font-medium transition-all outline-none text-gray-700"
              />
            </div>
          </div>

          {/* User ID Input */}
          <div>
            <div className="relative flex items-center">
              <KeyRound size={16} className="absolute left-3.5 text-gray-400" />
              <input
                id="login-userid"
                type="text"
                value={userIdInput}
                onChange={(e) => setUserIdInput(e.target.value)}
                placeholder="Mã số ID (ví dụ: UR-1107)"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 focus:border-purple-400 focus:bg-white rounded-xl text-sm font-medium transition-all outline-none text-gray-700"
              />
            </div>
            <span className="text-[10px] text-gray-400 mt-1.5 block px-1 text-center">
              Nếu nhập tên mới, hệ thống sẽ tự cấp ID mẫu nếu để trống.
            </span>
          </div>

          <button
            id="btn-login-submit"
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[#7C3AED] hover:bg-[#6D28D9] active:scale-[0.99] text-white font-bold rounded-xl shadow-md shadow-purple-100 flex items-center justify-center gap-2 text-sm transition-all cursor-pointer disabled:opacity-55"
          >
            {isLoading ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <LogIn size={15} />
                Vào hệ thống
              </>
            )}
          </button>
        </form>
      </motion.div>

      {/* Preset Profiles Grid */}
      <div className="w-full bg-slate-50 border border-slate-100 p-4 rounded-3xl mt-auto">
        <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase block mb-3 text-center">
          Tài khoản dùng thử nhanh
        </span>
        <div className="grid grid-cols-2 gap-2">
          {PRESET_USERS.map((user) => (
            <button
              onClick={() => handlePresetSelect(user)}
              key={user.id}
              type="button"
              id={`preset-user-${user.username}`}
              className="flex items-center gap-2 p-3 bg-white hover:bg-purple-50 border border-gray-100 active:bg-purple-100 rounded-2xl text-left transition-colors cursor-pointer"
            >
              <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-700 text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                {user.fullName.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="truncate">
                <span className="text-xs font-bold text-gray-800 block truncate leading-none">
                  {user.fullName}
                </span>
                <span className="text-[9px] text-gray-400 uppercase font-bold tracking-tight">
                  {user.id}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Tiny Footer */}
      <span className="text-[10px] text-gray-400 text-center mt-6 block">
        Urbox POSM Warehouse v1.0.0
      </span>
    </div>
  );
};
