import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu,
  Plus,
  Search,
  ArrowRightLeft,
  History,
  Settings,
  X,
  Package,
  Calendar,
  User as UserIcon,
  Sun,
  Moon,
  RotateCw,
  LogOut,
  MapPin,
  Maximize2,
  FileSpreadsheet,
  ChevronsUpDown,
  CornerDownRight,
  Info,
  CheckCircle2,
  Sliders,
  Edit2
} from 'lucide-react';

import { Product, User, Transaction } from './types';
import { UrboxLogoSymbol, UrboxLogoFull } from './components/UrboxLogo';
import { SplashView } from './components/SplashView';
import { LoginView } from './components/LoginView';
import { ProductAvatar, getRandomBgColor } from './components/ProductAvatar';
import { FlutterExporter } from './components/FlutterExporter';

// Initial dataset to pre-populate the warehouse mockup
const INITIAL_PRODUCTS: Product[] = [
  { id: '1', name: 'Standee Urbox', code: 'UB-ST01', dimensions: '60x180 cm', quantity: 45, position: 'Khu A - Kệ 1', notes: 'Standee trưng bày cho các sự kiện truyền thông, hợp tác thương hiệu Urbox.' },
  { id: '2', name: 'Bình giữ nhiệt Urbox', code: 'UB-TM02', dimensions: 'Chiều cao 22cm', quantity: 120, position: 'Khu C - Kệ 2', notes: 'Bình thép cao cấp sơn nhám tím, giữ nhiệt tốt, in khắc logo laser.' },
  { id: '3', name: 'Sổ tay da Urbox', code: 'UB-NB03', dimensions: 'Khổ A5', quantity: 80, position: 'Khu B - Kệ 5', notes: 'Sổ tay gài viết, bìa da PU cao cấp thêu nổi hoạ tiết tối giản.' },
  { id: '4', name: 'Túi vải Tote sinh thái', code: 'UB-TT04', dimensions: '35x40 cm', quantity: 150, position: 'Khu B - Kệ 4', notes: 'Túi xách vải Canvas dệt tay thân thiện môi trường.' },
  { id: '5', name: 'Áo thun đồng phục Urbox', code: 'UB-TS05', dimensions: 'Size L', quantity: 60, position: 'Khu D - Kệ 1', notes: 'Chất liệu thun cá sấu thêu chỉ ngũ sắc ở phía tay áo.' },
  { id: '6', name: 'Ô dù cầm tay Urbox gấp gọn', code: 'UB-UM06', dimensions: 'Bán kính 1m', quantity: 30, position: 'Khu C - Kệ 4', notes: 'Dù mở hai chiều tự động, chống tia UV cực tốt.' },
];

const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'TX-1001',
    productId: '1',
    productName: 'Standee Urbox',
    productCode: 'UB-ST01',
    type: 'import',
    quantityChange: 45,
    prevQuantity: 0,
    newQuantity: 45,
    timestamp: '2026-06-02 08:30:15',
    user: 'tuansaigon',
    notes: 'Khai sinh mã hàng nhập sự kiện POSM',
  },
  {
    id: 'TX-1002',
    productId: '2',
    productName: 'Bình giữ nhiệt Urbox',
    productCode: 'UB-TM02',
    type: 'import',
    quantityChange: 120,
    prevQuantity: 0,
    newQuantity: 120,
    timestamp: '2026-06-02 08:35:44',
    user: 'tuansaigon',
    notes: 'Nhập kho bổ sung quà tặng khách hàng VIP',
  },
  {
    id: 'TX-1003',
    productId: '3',
    productName: 'Sổ tay da Urbox',
    productCode: 'UB-NB03',
    type: 'import',
    quantityChange: 80,
    prevQuantity: 0,
    newQuantity: 80,
    timestamp: '2026-06-02 08:44:11',
    user: 'minh.posm',
    notes: 'Nhập lô sổ mới nhất từ xưởng in Hà Nội',
  }
];

export default function App() {
  // Navigation View flow
  const [currentView, setCurrentView] = useState<'splash' | 'login' | 'dashboard'>('splash');
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'inout' | 'history' | 'settings'>('overview');
  
  // Storage states
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  // App settings state
  const [darkTheme, setDarkTheme] = useState<boolean>(false);
  
  // Modal handlers
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  
  // Form values
  const [newProdName, setNewProdName] = useState('');
  const [newProdCode, setNewProdCode] = useState('');
  const [newProdDim, setNewProdDim] = useState('');
  const [newProdQty, setNewProdQty] = useState('0');
  const [newProdPos, setNewProdPos] = useState('');
  const [newProdNotes, setNewProdNotes] = useState('');

  // Edit Form values
  const [editProdName, setEditProdName] = useState('');
  const [editProdCode, setEditProdCode] = useState('');
  const [editProdDim, setEditProdDim] = useState('');
  const [editProdPos, setEditProdPos] = useState('');
  const [editProdNotes, setEditProdNotes] = useState('');

  // Manual Import/Export state
  const [transactionType, setTransactionType] = useState<'import' | 'export'>('import');
  const [txSelectedProductId, setTxSelectedProductId] = useState('');
  const [txQty, setTxQty] = useState('');
  const [txNotes, setTxNotes] = useState('');
  const [txSuccessMessage, setTxSuccessMessage] = useState('');

  // Search filter
  const [searchQuery, setSearchQuery] = useState('');

  // Initialize data on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('urbox_posm_user');
    const storedProducts = localStorage.getItem('urbox_posm_products');
    const storedTransactions = localStorage.getItem('urbox_posm_transactions');
    const storedTheme = localStorage.getItem('urbox_posm_theme');

    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      setCurrentView('dashboard');
    }
    
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      setProducts(INITIAL_PRODUCTS);
      localStorage.setItem('urbox_posm_products', JSON.stringify(INITIAL_PRODUCTS));
    }

    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions));
    } else {
      setTransactions(INITIAL_TRANSACTIONS);
      localStorage.setItem('urbox_posm_transactions', JSON.stringify(INITIAL_TRANSACTIONS));
    }

    if (storedTheme === 'dark') {
      setDarkTheme(true);
    }
  }, []);

  // Update theme class on HTML element
  useEffect(() => {
    if (darkTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('urbox_posm_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('urbox_posm_theme', 'light');
    }
  }, [darkTheme]);

  // Handle Login Action
  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('urbox_posm_user', JSON.stringify(user));
    setCurrentView('dashboard');
    setActiveTab('overview');
  };

  // Handle Logout Action
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('urbox_posm_user');
    setCurrentView('login');
  };

  // Handle System Restart (Resets dataset for testing)
  const handleRestart = () => {
    if (window.confirm('Bạn có muốn thiết lập lại ứng dụng? Toàn bộ sản phẩm và lịch sử sẽ được làm mới về giá trị ban đầu.')) {
      setProducts(INITIAL_PRODUCTS);
      setTransactions(INITIAL_TRANSACTIONS);
      localStorage.setItem('urbox_posm_products', JSON.stringify(INITIAL_PRODUCTS));
      localStorage.setItem('urbox_posm_transactions', JSON.stringify(INITIAL_TRANSACTIONS));
      setCurrentView('splash');
      setActiveTab('overview');
    }
  };

  // Create Product handler
  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newProdCode) {
      alert('Vui lòng điền đủ Tên sản phẩm và Mã số vật tư');
      return;
    }

    const uppercaseCode = newProdCode.trim().toUpperCase();
    const isCodeDuplicate = products.some(p => p.code === uppercaseCode);
    if (isCodeDuplicate) {
      alert(`Mã sản phẩm "${uppercaseCode}" đã tồn tại. Vui lòng nhập mã duy nhất.`);
      return;
    }

    const qtyNumber = Math.max(0, parseInt(newProdQty) || 0);

    const newProduct: Product = {
      id: `UBD-${Date.now()}`,
      name: newProdName.trim(),
      code: uppercaseCode,
      dimensions: newProdDim.trim() || 'Tiêu chuẩn',
      quantity: qtyNumber,
      position: newProdPos.trim() || 'Khu D - Kệ mới',
      notes: newProdNotes.trim() || 'Hàng vật tư POSM thương hiệu.',
    };

    const updatedProducts = [newProduct, ...products];
    setProducts(updatedProducts);
    localStorage.setItem('urbox_posm_products', JSON.stringify(updatedProducts));

    // Also add to transactions log representing instantiation
    const freshTx: Transaction = {
      id: `TX-${Date.now().toString().slice(-4)}`,
      productId: newProduct.id,
      productName: newProduct.name,
      productCode: newProduct.code,
      type: 'import',
      quantityChange: qtyNumber,
      prevQuantity: 0,
      newQuantity: qtyNumber,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      user: currentUser?.username || 'khách',
      notes: 'Khai sinh dòng vật tư mới',
    };

    const updatedTxs = [freshTx, ...transactions];
    setTransactions(updatedTxs);
    localStorage.setItem('urbox_posm_transactions', JSON.stringify(updatedTxs));

    // Reset Form
    setNewProdName('');
    setNewProdCode('');
    setNewProdDim('');
    setNewProdQty('0');
    setNewProdPos('');
    setNewProdNotes('');
    setShowAddProductModal(false);
  };

  // Open Edit Dialog initialized with existing product specifications
  const openEditModal = (p: Product) => {
    setSelectedProduct(p);
    setEditProdName(p.name);
    setEditProdCode(p.code);
    setEditProdDim(p.dimensions);
    setEditProdPos(p.position);
    setEditProdNotes(p.notes);
    setShowEditProductModal(true);
  };

  // Handle Edit product update
  const handleEditProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    const updatedProducts = products.map(p => {
      if (p.id === selectedProduct.id) {
        return {
          ...p,
          name: editProdName.trim(),
          code: editProdCode.trim().toUpperCase(),
          dimensions: editProdDim.trim(),
          position: editProdPos.trim(),
          notes: editProdNotes.trim()
        };
      }
      return p;
    });

    setProducts(updatedProducts);
    localStorage.setItem('urbox_posm_products', JSON.stringify(updatedProducts));

    // Log the update operation
    const updatedTx: Transaction = {
      id: `TX-${Date.now().toString().slice(-4)}`,
      productId: selectedProduct.id,
      productName: editProdName.trim(),
      productCode: editProdCode.trim().toUpperCase(),
      type: 'update',
      quantityChange: 0,
      prevQuantity: selectedProduct.quantity,
      newQuantity: selectedProduct.quantity,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      user: currentUser?.username || 'khách',
      notes: `Điều chỉnh thông số cấu hình vật tư`,
    };

    const updatedTxs = [updatedTx, ...transactions];
    setTransactions(updatedTxs);
    localStorage.setItem('urbox_posm_transactions', JSON.stringify(updatedTxs));

    setShowEditProductModal(false);
    setSelectedProduct(null);
  };

  // Handle Manual Stock Action
  const handleStockAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!txSelectedProductId) {
      alert('Vui lòng chọn 1 dòng vật tư cần điều chỉnh');
      return;
    }

    const targetProduct = products.find(p => p.id === txSelectedProductId);
    if (!targetProduct) return;

    const quantityInput = Math.max(0, parseInt(txQty) || 0);
    if (quantityInput <= 0) {
      alert('Số lượng nhập/xuất phải lớn hơn 0');
      return;
    }

    if (transactionType === 'export' && targetProduct.quantity < quantityInput) {
      alert(`Không đủ lượng hàng trong kho để xuất! Hiện tại chỉ còn x${targetProduct.quantity}`);
      return;
    }

    const previousStock = targetProduct.quantity;
    const stockChange = transactionType === 'import' ? quantityInput : -quantityInput;
    const finalStock = previousStock + stockChange;

    const updatedProducts = products.map(p => {
      if (p.id === txSelectedProductId) {
        return { ...p, quantity: finalStock };
      }
      return p;
    });

    setProducts(updatedProducts);
    localStorage.setItem('urbox_posm_products', JSON.stringify(updatedProducts));

    const newTxRecord: Transaction = {
      id: `TX-${Date.now().toString().slice(-4)}`,
      productId: targetProduct.id,
      productName: targetProduct.name,
      productCode: targetProduct.code,
      type: transactionType,
      quantityChange: stockChange,
      prevQuantity: previousStock,
      newQuantity: finalStock,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      user: currentUser?.username || 'khách',
      notes: txNotes.trim() || (transactionType === 'import' ? 'Nhập kho bổ sung thông thường' : 'Xuất kho phục vụ công tác'),
    };

    const updatedTxs = [newTxRecord, ...transactions];
    setTransactions(updatedTxs);
    localStorage.setItem('urbox_posm_transactions', JSON.stringify(updatedTxs));

    // Reset Fields & Show success banner
    setTxQty('');
    setTxNotes('');
    setTxSuccessMessage(
      `Đã ${transactionType === 'import' ? 'Nhập thêm' : 'Xuất'} thành công x${quantityInput} đối với "${targetProduct.name}" (Tồn mới: x${finalStock})`
    );

    // Fade toast message
    setTimeout(() => {
      setTxSuccessMessage('');
    }, 4500);
  };

  // Render views based on currentView state
  if (currentView === 'splash') {
    return <SplashView onStart={() => setCurrentView(currentUser ? 'dashboard' : 'login')} />;
  }

  if (currentView === 'login') {
    return <LoginView onLogin={handleLogin} />;
  }

  // Filter products by searching name/code
  const filteredProductsByQuery = products.filter(p => {
    const normalizedQuery = searchQuery.toLowerCase().trim();
    if (!normalizedQuery) return true;
    return p.name.toLowerCase().includes(normalizedQuery) || p.code.toLowerCase().includes(normalizedQuery);
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      
      {/* Upper Navigation Header bar */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 px-4 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          {/* Logo can be tapped to immediately return/show standard Splash Screen as requested! */}
          <button
            onClick={() => setCurrentView('splash')}
            id="header-logo-button"
            className="focus:outline-none cursor-pointer group active:scale-95 transition-transform"
            title="Xem Logo và Banner lớn (KHO POSM)"
          >
            <UrboxLogoSymbol size={32} className="group-hover:rotate-12 transition-transform duration-300" />
          </button>
          
          <div className="flex flex-col">
            <span className="font-extrabold text-[#7C3AED] text-sm tracking-tight select-none">
              URBOX POSM
            </span>
            <span className="text-[10px] text-gray-400 font-bold uppercase select-none leading-none">
              Warehouse
            </span>
          </div>
        </div>

        {/* Current status display to avoid word clutter but keep handy info */}
        <div className="flex items-center gap-2.5">
          {currentUser && (
            <div className="text-right flex flex-col justify-center">
              <span className="text-xs font-bold text-gray-700 dark:text-slate-200 leading-none">
                {currentUser.fullName}
              </span>
              <span className="text-[9px] text-purple-600 dark:text-purple-400 font-bold uppercase mt-0.5 tracking-wider leading-none">
                {currentUser.id}
              </span>
            </div>
          )}
          
          {/* Theme toggler shortcut directly in the header */}
          <button
            onClick={() => setDarkTheme(!darkTheme)}
            id="btn-header-theme-toggle"
            className="p-1.5 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-300 active:scale-95 transition-all cursor-pointer"
          >
            {darkTheme ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>
      </header>

      {/* Main Container Area */}
      <main className="flex-1 max-w-lg w-full mx-auto pb-24 px-4 pt-4 overflow-y-auto">
        <AnimatePresence mode="wait">
          
          {/* 1. OVERVIEW TAB PANEL */}
          {activeTab === 'overview' && (
            <motion.div
              key="overview-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-5"
            >
              {/* Highlight Dashboard Banner */}
              <div className="bg-radial from-[#7C3AED] to-[#5B21B6] text-white p-5 rounded-3xl shadow-md relative overflow-hidden">
                <div className="absolute right-0 bottom-0 translate-x-4 translate-y-3 opacity-15 pointer-events-none">
                  <Package size={170} />
                </div>
                <div className="relative z-10 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-white/20 text-white font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Live State
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <h3 className="text-lg text-purple-100 font-semibold leading-tight">
                    Xin chào đồng nghiệp,
                  </h3>
                  <h2 className="text-2xl font-black tracking-tight leading-none">
                    {currentUser?.fullName}
                  </h2>
                  <p className="text-xs text-purple-200/80 leading-relaxed max-w-[270px]">
                    Toàn bộ vật tư và thông số POSM được kiểm soát trực quan. Hãy sử dụng các tiện ích bên dưới.
                  </p>
                </div>
              </div>

              {/* Live Statistics for Top items */}
              <div className="space-y-3 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-4 rounded-3xl shadow-xs">
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-indigo-500" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400">
                      Tồn kho hiện hữu
                    </h4>
                  </div>
                  <button
                    onClick={() => setActiveTab('products')}
                    id="btn-overview-see-all-products"
                    className="text-xs font-bold text-[#7C3AED] hover:underline cursor-pointer"
                  >
                    Xem hết
                  </button>
                </div>

                {/* Vertical table layout with beautiful simple item rows */}
                <div className="space-y-2">
                  {products.slice(0, 4).map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        setSelectedProduct(p);
                        setActiveTab('products');
                      }}
                      className="flex items-center justify-between p-3 bg-gray-50/70 hover:bg-purple-50/50 dark:bg-slate-950/60 dark:hover:bg-slate-900/60 rounded-2xl border border-gray-100/40 dark:border-slate-900 border-solid cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <ProductAvatar name={p.name} code={p.code} color={getRandomBgColor(p.code)} size="sm" />
                        <div>
                          <span className="text-xs font-bold text-gray-800 dark:text-slate-200 block">
                            {p.name}
                          </span>
                          <span className="text-[10px] text-gray-400 font-mono tracking-tight uppercase">
                            {p.code} • Vị trí: {p.position}
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <span className="px-3.5 py-1 text-xs font-bold rounded-full bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-100 block">
                          x{p.quantity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Compact quick menu buttons dashboard */}
              <div className="grid grid-cols-2 gap-3.5">
                <button
                  onClick={() => setActiveTab('products')}
                  id="btn-shortcut-products"
                  className="p-4 bg-purple-500/[0.08] dark:bg-purple-500/[0.05] border border-purple-500/15 text-purple-700 dark:text-purple-300 rounded-3xl text-left hover:bg-purple-500/[0.12] transition-all cursor-pointer active:scale-95 flex flex-col justify-between h-28"
                >
                  <Package size={26} className="text-[#7C3AED]" />
                  <div>
                    <span className="block font-extrabold text-sm leading-tight text-slate-900 dark:text-slate-100">
                      Vật tư POSM
                    </span>
                    <span className="text-[10.5px] text-slate-400 mt-1 block">
                      {products.length} chủng loại sản phẩm
                    </span>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('inout')}
                  id="btn-shortcut-inout"
                  className="p-4 bg-emerald-500/[0.08] dark:bg-emerald-500/[0.05] border border-emerald-500/15 text-emerald-700 dark:text-emerald-300 rounded-3xl text-left hover:bg-emerald-500/[0.12] transition-all cursor-pointer active:scale-95 flex flex-col justify-between h-28"
                >
                  <ArrowRightLeft size={26} className="text-emerald-600 dark:text-emerald-400" />
                  <div>
                    <span className="block font-extrabold text-sm leading-tight text-slate-900 dark:text-slate-100">
                      Nhập / Xuất kho
                    </span>
                    <span className="text-[10.5px] text-slate-400 mt-1 block">
                      Điều phối xuất nhập tay
                    </span>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('history')}
                  id="btn-shortcut-history"
                  className="p-4 bg-pink-500/[0.08] dark:bg-pink-500/[0.05] border border-pink-500/15 text-pink-700 dark:text-pink-300 rounded-3xl text-left hover:bg-pink-500/[0.12] transition-all cursor-pointer active:scale-95 flex flex-col justify-between h-28"
                >
                  <History size={26} className="text-pink-600 dark:text-pink-400" />
                  <div>
                    <span className="block font-extrabold text-sm leading-tight text-slate-900 dark:text-slate-100">
                      Lịch sử thao tác
                    </span>
                    <span className="text-[10.5px] text-slate-400 mt-1 block">
                      Kiểm lịch trình xuất nhập
                    </span>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('settings')}
                  id="btn-shortcut-settings"
                  className="p-4 bg-blue-500/[0.08] dark:bg-blue-500/[0.05] border border-blue-500/15 text-blue-700 dark:text-blue-300 rounded-3xl text-left hover:bg-blue-500/[0.12] transition-all cursor-pointer active:scale-95 flex flex-col justify-between h-28"
                >
                  <Settings size={26} className="text-blue-600 dark:text-blue-400" />
                  <div>
                    <span className="block font-extrabold text-sm leading-tight text-slate-900 dark:text-slate-100">
                      Cài đặt & Flutter
                    </span>
                    <span className="text-[10.5px] text-slate-400 mt-1 block">
                      Theme, Restart & Code
                    </span>
                  </div>
                </button>
              </div>
            </motion.div>
          )}

          {/* 2. PRODUCTS TAB PANEL */}
          {activeTab === 'products' && (
            <motion.div
              key="products-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-4"
            >
              {/* Toolbar Section & Search */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search size={16} className="absolute left-3.5 text-gray-400" />
                  <input
                    id="search-products"
                    type="text"
                    placeholder="Tìm theo tên sản phẩm hoặc mã..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl text-xs font-semibold focus:border-[#7C3AED] focus:outline-none transition-all outline-none"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3.5 p-0.5 hover:bg-slate-100 rounded-full text-gray-400"
                    >
                      <X size={12} />
                    </button>
                  )}
                </div>
                
                {/* Plus floating-looking trigger to create products */}
                <button
                  onClick={() => setShowAddProductModal(true)}
                  id="btn-trigger-add-product"
                  className="p-2.5 bg-[#7C3AED] hover:bg-[#6D28D9] active:scale-95 text-white rounded-2xl shadow-md shadow-purple-100 dark:shadow-none flex items-center justify-center cursor-pointer transition-transform"
                  title="Thêm sản phẩm mới"
                >
                  <Plus size={18} />
                </button>
              </div>

              {/* Horizontal layout counting matching results */}
              <span className="text-[11px] font-bold text-gray-400 dark:text-slate-400 uppercase tracking-widest px-1 block">
                DANH MỤC VẬT TƯ ({filteredProductsByQuery.length} dòng hàng)
              </span>

              {/* Items List */}
              <div className="space-y-2.5">
                {filteredProductsByQuery.length === 0 ? (
                  <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-gray-200 dark:border-slate-800 p-6">
                    <Package size={36} className="mx-auto text-gray-300 dark:text-slate-700 mb-2" />
                    <span className="text-sm font-semibold text-gray-500 dark:text-slate-400 block">
                      Không tìm thấy kết quả phù hợp
                    </span>
                    <p className="text-xs text-gray-400 mt-1">Hệ thống sòng lọc rỗng. Hãy điều chỉnh từ khóa tìm kiếm.</p>
                  </div>
                ) : (
                  filteredProductsByQuery.map((p) => (
                    <motion.div
                      layoutId={`product-card-${p.id}`}
                      key={p.id}
                      onClick={() => setSelectedProduct(p)}
                      className="bg-white dark:bg-slate-900 hover:border-purple-300 dark:hover:border-purple-900/60 p-4 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-xs cursor-pointer hover:shadow-md transition-all flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3.5 overflow-hidden">
                        <ProductAvatar name={p.name} code={p.code} color={getRandomBgColor(p.code)} size="md" />
                        <div className="overflow-hidden">
                          <span className="text-sm font-black text-gray-950 dark:text-white block truncate">
                            {p.name}
                          </span>
                          <span className="text-[10.5px] font-mono tracking-wider bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 font-bold px-2 py-0.5 rounded-md uppercase inline-block my-1">
                            {p.code}
                          </span>
                          <div className="text-[11px] text-gray-400 dark:text-slate-400 flex items-center gap-1.5 truncate">
                            <MapPin size={11} className="text-indigo-400" />
                            <span className="truncate">{p.position}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0 ml-3 flex flex-col items-end gap-1.5">
                        <span className="text-xs font-bold text-gray-400">Tồn kho</span>
                        <span className="text-lg font-black text-[#7C3AED] dark:text-[#A78BFA] leading-none">
                          x{p.quantity}
                        </span>
                        <span className="text-[10px] text-gray-400 font-medium block">
                          {p.dimensions}
                        </span>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          )}

          {/* 3. IMPORT / EXPORT TAB PANEL */}
          {activeTab === 'inout' && (
            <motion.div
              key="inout-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-4"
            >
              {/* Optional dynamic prompt/success toast inside tab page */}
              {txSuccessMessage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 text-emerald-800 dark:text-emerald-400 p-4 rounded-2xl flex items-start gap-3 text-xs"
                >
                  <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                  <p className="font-semibold leading-relaxed">{txSuccessMessage}</p>
                </motion.div>
              )}

              <form onSubmit={handleStockAction} className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-6 rounded-3xl shadow-xs space-y-4">
                
                {/* Select Operation Type */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setTransactionType('import')}
                    className={`py-3 rounded-2xl font-black text-xs tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      transactionType === 'import'
                        ? 'bg-emerald-500 text-white shadow-md shadow-emerald-100 dark:shadow-none'
                        : 'bg-gray-100 dark:bg-slate-800 text-gray-400 hover:text-gray-500'
                    }`}
                  >
                    <Plus size={14} className="stroke-[3]" />
                    NHẬP KHO
                  </button>

                  <button
                    type="button"
                    onClick={() => setTransactionType('export')}
                    className={`py-3 rounded-2xl font-black text-xs tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      transactionType === 'export'
                        ? 'bg-red-500 text-white shadow-md shadow-red-100 dark:shadow-none'
                        : 'bg-gray-100 dark:bg-slate-800 text-gray-400 hover:text-gray-500'
                    }`}
                  >
                    <X size={14} className="stroke-[3]" />
                    XUẤT KHO
                  </button>
                </div>

                {/* Dropdown choice for Products */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-black text-gray-400 dark:text-slate-400 tracking-wider">
                    Sản phẩm liên quan
                  </label>
                  <div className="relative">
                    <select
                      id="tx-select-product"
                      value={txSelectedProductId}
                      onChange={(e) => setTxSelectedProductId(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 text-gray-700 dark:text-slate-200 rounded-xl px-4 py-3 text-xs font-bold focus:border-[#7C3AED] outline-none appearance-none cursor-pointer"
                    >
                      <option value="">Chọn sản phẩm vật tư...</option>
                      {products.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} ({p.code}) — Tồn: x{p.quantity}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <ChevronsUpDown size={14} />
                    </div>
                  </div>
                </div>

                {/* Fields parameters input: quantity */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-black text-gray-400 dark:text-slate-400 tracking-wider">
                      Số lượng thực hiện
                    </label>
                    <input
                      id="tx-input-qty"
                      type="number"
                      min="1"
                      placeholder="Số lượng..."
                      value={txQty}
                      onChange={(e) => setTxQty(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 text-gray-700 dark:text-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold focus:border-[#7C3AED] outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-black text-gray-400 dark:text-slate-400 tracking-wider">
                      Người phụ trách
                    </label>
                    <input
                      type="text"
                      disabled
                      value={currentUser?.fullName || 'Khách'}
                      className="w-full bg-gray-100 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-800 text-gray-400 dark:text-slate-500 rounded-xl px-4 py-2.5 text-xs font-bold"
                    />
                  </div>
                </div>

                {/* Notes input */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-black text-gray-400 dark:text-slate-400 tracking-wider">
                    Ghi chú thao tác
                  </label>
                  <textarea
                    id="tx-input-notes"
                    rows={3}
                    placeholder="Lý do nhập hoặc xuất kho, tên nhà tài trợ, địa điểm chuyển giao..."
                    value={txNotes}
                    onChange={(e) => setTxNotes(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 text-gray-700 dark:text-slate-200 rounded-xl p-3 text-xs font-semibold focus:border-[#7C3AED] outline-none resize-none"
                  />
                </div>

                {/* Real-time math safety indicator */}
                {txSelectedProductId && txQty && (
                  <div className="bg-slate-50 dark:bg-slate-950/40 p-3 rounded-2xl text-[11px] text-gray-500 border border-gray-100 dark:border-slate-900/60 flex items-center justify-between">
                    <span>Dự kiến thay đổi tồn:</span>
                    <span className="font-bold font-mono">
                      {(() => {
                        const prod = products.find(p => p.id === txSelectedProductId);
                        const changeAmt = parseInt(txQty) || 0;
                        if (!prod) return '-';
                        const final = transactionType === 'import' ? prod.quantity + changeAmt : prod.quantity - changeAmt;
                        return `x${prod.quantity} ➔ x${final}`;
                      })()}
                    </span>
                  </div>
                )}

                {/* Confirm Button */}
                <button
                  id="btn-confirm-tx"
                  type="submit"
                  className={`w-full py-3.5 rounded-2xl text-white text-xs font-bold tracking-wider hover:opacity-95 transition-all text-center cursor-pointer active:scale-[0.99] flex items-center justify-center gap-1.5 ${
                    transactionType === 'import' ? 'bg-[#7C3AED]' : 'bg-[#EF4444]'
                  }`}
                >
                  <ArrowRightLeft size={14} className="stroke-[2.5]" />
                  XÁC NHẬN THAO TÁC KHỎ
                </button>
              </form>
            </motion.div>
          )}

          {/* 4. HISTORY TAB PANEL */}
          {activeTab === 'history' && (
            <motion.div
              key="history-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-4"
            >
              <span className="text-[11px] font-bold text-gray-400 dark:text-slate-400 tracking-widest px-1 block">
                NHẬT KÝ THAO TÁC GẦN ĐÂY
              </span>

              {/* Grid Logs timeline flow */}
              <div className="space-y-2.5">
                {transactions.length === 0 ? (
                  <div className="text-center py-10 bg-white dark:bg-slate-900 rounded-3xl p-6">
                    <History size={28} className="mx-auto text-gray-300 dark:text-slate-700 mb-2" />
                    <span className="text-xs text-gray-400 block">Chưa ghi nhận giao dịch lịch sử nào.</span>
                  </div>
                ) : (
                  transactions.map((t) => (
                    <div
                      key={t.id}
                      className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-xs flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-start gap-3 overflow-hidden">
                        {/* Transaction Icon logic based on transaction type */}
                        <div className={`mt-0.5 w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                          t.type === 'import'
                            ? 'bg-emerald-50 dark:bg-emerald-900/10 text-emerald-600 dark:text-emerald-400'
                            : t.type === 'export'
                            ? 'bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400'
                            : 'bg-orange-50 dark:bg-orange-900/10 text-orange-600 dark:text-orange-400'
                        }`}>
                          {t.type === 'import' ? (
                            <Plus size={14} className="stroke-[3]" />
                          ) : t.type === 'export' ? (
                            <X size={14} className="stroke-[3]" />
                          ) : (
                            <Edit2 size={12} className="stroke-[3]" />
                          )}
                        </div>

                        <div className="overflow-hidden">
                          <div className="flex items-baseline gap-1.5">
                            <span className="font-extrabold text-gray-950 dark:text-white block truncate text-[12.5px]">
                              {t.productName}
                            </span>
                            <span className="text-[9px] font-mono text-gray-400 shrink-0">
                              #{t.productCode}
                            </span>
                          </div>
                          
                          <div className="text-[11px] text-gray-400 dark:text-slate-400 mt-1 space-y-1 font-semibold leading-relaxed">
                            <p className="font-normal italic text-slate-500 dark:text-slate-300 break-words">
                              "{t.notes}"
                            </p>
                            <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-slate-400">
                              <span className="bg-slate-100 dark:bg-slate-800 py-0.5 px-1.5 rounded text-[9px] font-black uppercase tracking-wider">
                                {t.user}
                              </span>
                              <span>•</span>
                              <div className="flex items-center gap-1">
                                <Calendar size={10} />
                                <span>{t.timestamp}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Stock changes indicators */}
                      <div className="text-right flex-shrink-0 flex flex-col items-end justify-center min-w-[50px]">
                        {t.type === 'update' ? (
                          <span className="text-[11px] font-black text-orange-500 bg-orange-50 dark:bg-orange-900/10 px-2 py-0.5 rounded-lg leading-none">
                            Hiệu chỉnh
                          </span>
                        ) : (
                          <span className={`text-base font-black leading-none ${
                            t.type === 'import'
                              ? 'text-emerald-500'
                              : 'text-red-500'
                          }`}>
                            {t.quantityChange > 0 ? `+${t.quantityChange}` : t.quantityChange}
                          </span>
                        )}
                        <span className="text-[9px] text-gray-400 mt-1 font-mono">
                          Tồn: x{t.newQuantity}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}

          {/* 5. SETTINGS TAB PANEL */}
          {activeTab === 'settings' && (
            <motion.div
              key="settings-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-5"
            >
              {/* Profile details */}
              <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-5 rounded-3xl shadow-xs flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 flex items-center justify-center font-black text-lg shadow-inner">
                    {currentUser?.fullName ? currentUser.fullName[0].toUpperCase() : 'U'}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-[#7C3AED] dark:text-[#A78BFA] leading-none text-[15px]">
                      {currentUser?.fullName}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className="text-[10px] text-gray-400 font-bold tracking-wider">
                        MÃ NV: {currentUser?.id}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  id="btn-logout-settings"
                  className="p-2 bg-red-50 hover:bg-red-100 active:scale-95 text-red-500 rounded-xl transition-transform cursor-pointer"
                  title="Đăng xuất"
                >
                  <LogOut size={16} />
                </button>
              </div>

              {/* Theme Settings togglers & general utilities */}
              <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-5 rounded-3xl shadow-xs space-y-4">
                <span className="text-[11px] font-bold text-gray-400 dark:text-slate-400 uppercase tracking-widest block">
                  Cấu hình hệ thống
                </span>

                <div className="flex items-center justify-between text-xs py-1">
                  <div>
                    <span className="font-bold text-gray-800 dark:text-white block">
                      Bộ sắc thái ứng dụng
                    </span>
                    <span className="text-[10.5px] text-gray-400 mt-0.5 block">
                      Đổi giữa chế độ Light và Dark Mode
                    </span>
                  </div>
                  
                  <button
                    onClick={() => setDarkTheme(!darkTheme)}
                    id="btn-body-theme-toggle"
                    className="flex items-center gap-1 px-4 py-2 bg-gray-50 hover:bg-gray-100 dark:bg-slate-950 dark:hover:bg-slate-800/80 rounded-xl font-bold transition-all border border-gray-100 dark:border-slate-800 cursor-pointer"
                  >
                    {darkTheme ? (
                      <>
                        <Moon size={13} className="text-purple-400" />
                        Tối
                      </>
                    ) : (
                      <>
                        <Sun size={13} className="text-amber-500" />
                        Sáng
                      </>
                    )}
                  </button>
                </div>

                <div className="border-t border-gray-100 dark:border-slate-800 pt-3 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-gray-800 dark:text-white block">
                      Làm mới ứng dụng
                    </span>
                    <span className="text-[10.5px] text-gray-400 mt-0.5 block">
                      Khôi phục dư liệu nháp gốc và đăng xuất
                    </span>
                  </div>
                  
                  <button
                    onClick={handleRestart}
                    id="btn-settings-restart-app"
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/20 dark:text-blue-400 rounded-xl font-bold transition-all border border-blue-200/20 cursor-pointer"
                  >
                    <RotateCw size={13} />
                    Restart
                  </button>
                </div>
              </div>

              
              
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Persistence and Detail Modals overlay */}
      
      {/* 6. MODAL A: PRODUCT DETAIL DIALOG */}
      <AnimatePresence>
        {selectedProduct && activeTab === 'products' && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4">
            <motion.div
              initial={{ opacity: 0, y: 150 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 150 }}
              className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-[32px] p-6 shadow-2xl border border-gray-100 dark:border-slate-800 space-y-4"
            >
              {/* Header inside modal */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <ProductAvatar name={selectedProduct.name} code={selectedProduct.code} color={getRandomBgColor(selectedProduct.code)} size="md" />
                  <div>
                    <h3 className="font-black text-gray-950 dark:text-white text-base">
                      {selectedProduct.name}
                    </h3>
                    <span className="text-xs text-purple-700 bg-purple-50 px-2 py-0.5 rounded font-mono font-bold tracking-wider">
                      {selectedProduct.code}
                    </span>
                  </div>
                </div>
                
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="p-1 text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Details table elements */}
              <div className="space-y-2.5 text-xs">
                <div className="grid grid-cols-2 gap-2 bg-gray-50/80 dark:bg-slate-950/60 p-3.5 rounded-2xl border border-gray-100/40 dark:border-slate-800/80">
                  <div>
                    <span className="text-gray-400 block font-bold text-[9px] uppercase tracking-wider">Kích thước</span>
                    <span className="font-extrabold text-gray-800 dark:text-slate-200 mt-1 block">
                      {selectedProduct.dimensions}
                    </span>
                  </div>

                  <div>
                    <span className="text-gray-400 block font-bold text-[9px] uppercase tracking-wider">Mã vị trí</span>
                    <span className="font-extrabold text-[#7C3AED] dark:text-[#A78BFA] mt-1 block">
                      {selectedProduct.position}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50/80 dark:bg-slate-950/60 p-3.5 rounded-2xl border border-gray-100/40 dark:border-slate-800/80">
                  <span className="text-gray-400 block font-bold text-[9px] uppercase tracking-wider">Ghi chú lưu kho</span>
                  <p className="font-normal text-gray-600 dark:text-slate-300 mt-1 leading-relaxed">
                    {selectedProduct.notes || 'Không ghi nhận ghi chú nào.'}
                  </p>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-purple-50 dark:bg-purple-950/20 rounded-2xl text-purple-800 dark:text-purple-300">
                  <span className="font-bold text-[11px] uppercase tracking-wider">Tồn kho khả dụng:</span>
                  <span className="text-xl font-mono font-black">
                    x{selectedProduct.quantity}
                  </span>
                </div>
              </div>

              {/* Action handles: Edit / Trigger stock tx */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => {
                    const chosenId = selectedProduct.id;
                    setSelectedProduct(null);
                    setTxSelectedProductId(chosenId);
                    setActiveTab('inout');
                  }}
                  className="py-3 bg-indigo-500 hover:bg-indigo-600 active:scale-95 text-white font-extrabold text-xs tracking-wider rounded-2xl text-center transition-all cursor-pointer shadow-sm"
                >
                  ĐIỀU PHỐI KHO
                </button>

                <button
                  onClick={() => openEditModal(selectedProduct)}
                  className="py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-extrabold text-xs tracking-wider rounded-2xl text-center transition-all cursor-pointer dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200"
                >
                  SỬA THÔNG TIN
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 7. MODAL B: EDIT PRODUCT METADATA DIALOG */}
      <AnimatePresence>
        {showEditProductModal && selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-[32px] p-6 shadow-2xl border border-gray-100 dark:border-slate-800 space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-black text-gray-950 dark:text-white uppercase tracking-wider">
                  SỬA THÔNG TIN VẬT TƯ
                </span>
                <button
                  type="button"
                  onClick={() => setShowEditProductModal(false)}
                  className="p-1 text-gray-400 hover:bg-slate-100 rounded-full"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleEditProductSubmit} className="space-y-3.5 text-xs">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-black text-gray-400 tracking-wider">Tên dòng vật tư</label>
                  <input
                    type="text"
                    required
                    value={editProdName}
                    onChange={(e) => setEditProdName(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 text-gray-800 dark:text-slate-100 rounded-xl p-3 font-semibold focus:border-purple-400 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-black text-gray-400 tracking-wider">Nhãn mã số</label>
                    <input
                      type="text"
                      required
                      value={editProdCode}
                      onChange={(e) => setEditProdCode(e.target.value)}
                      className="w-full bg-slate-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-800 text-gray-500 rounded-xl p-3 font-semibold outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-black text-gray-400 tracking-wider">Kích thước</label>
                    <input
                      type="text"
                      required
                      value={editProdDim}
                      onChange={(e) => setEditProdDim(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 text-gray-800 dark:text-slate-100 rounded-xl p-3 font-semibold focus:border-purple-400 outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-black text-gray-400 tracking-wider">Mã vị trí kho</label>
                  <input
                    type="text"
                    required
                    value={editProdPos}
                    onChange={(e) => setEditProdPos(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 text-gray-800 dark:text-slate-100 rounded-xl p-3 font-semibold focus:border-purple-400 outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-black text-gray-400 tracking-wider">Ghi chú lưu trữ</label>
                  <textarea
                    rows={2}
                    value={editProdNotes}
                    onChange={(e) => setEditProdNotes(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 text-gray-800 dark:text-slate-100 rounded-xl p-3 font-semibold focus:border-purple-400 outline-none resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowEditProductModal(false)}
                    className="py-3 bg-gray-100 text-gray-600 font-bold rounded-xl active:scale-95 transition-all text-center"
                  >
                    HỦY
                  </button>

                  <button
                    type="submit"
                    className="py-3 bg-purple-600 text-white font-bold rounded-xl active:scale-95 transition-all text-center"
                  >
                    CẬP NHẬT
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 8. MODAL C: CREATE NEW PRODUCT SKU FORM DIALOG */}
      <AnimatePresence>
        {showAddProductModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-[32px] p-6 shadow-2xl border border-gray-100 dark:border-slate-800 space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-black text-gray-950 dark:text-white uppercase tracking-wider">
                  THÊM SẢN PHẨM MỚI
                </span>
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="p-1 text-gray-400 hover:bg-slate-100 rounded-full"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleCreateProduct} className="space-y-3.5 text-xs">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-black text-gray-400 dark:text-slate-400 tracking-wider">
                    Tên dòng sản phẩm *
                  </label>
                  <input
                    id="add-prod-name"
                    required
                    type="text"
                    placeholder="Ví dụ: Giấy túi quà lớn Urbox"
                    value={newProdName}
                    onChange={(e) => setNewProdName(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 text-gray-800 dark:text-slate-100 rounded-xl p-3 font-semibold focus:border-[#7C3AED] focus:bg-white outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-black text-gray-400 dark:text-slate-400 tracking-wider">
                      Mã số vật tư (SKU) *
                    </label>
                    <input
                      id="add-prod-code"
                      required
                      type="text"
                      placeholder="Ví dụ: UB-GP08"
                      value={newProdCode}
                      onChange={(e) => setNewProdCode(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 text-gray-800 dark:text-slate-100 rounded-xl p-3 font-semibold focus:border-[#7C3AED] focus:bg-white outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-black text-gray-400 dark:text-slate-400 tracking-wider">
                      Kích thước
                    </label>
                    <input
                      id="add-prod-dim"
                      type="text"
                      placeholder="Ví dụ: 30x40x15 cm"
                      value={newProdDim}
                      onChange={(e) => setNewProdDim(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 text-gray-800 dark:text-slate-100 rounded-xl p-3 font-semibold focus:border-[#7C3AED] focus:bg-white outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-black text-gray-400 dark:text-slate-400 tracking-wider">
                      Số lượng ban đầu
                    </label>
                    <input
                      id="add-prod-qty"
                      type="number"
                      min="0"
                      placeholder="0"
                      value={newProdQty}
                      onChange={(e) => setNewProdQty(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 text-gray-800 dark:text-slate-100 rounded-xl p-3 font-semibold focus:border-[#7C3AED] focus:bg-white outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-black text-gray-400 dark:text-slate-400 tracking-wider">
                      Vị trí kho hàng
                    </label>
                    <input
                      id="add-prod-pos"
                      type="text"
                      placeholder="Ví dụ: Khu B - Kệ 5"
                      value={newProdPos}
                      onChange={(e) => setNewProdPos(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 text-gray-800 dark:text-slate-100 rounded-xl p-3 font-semibold focus:border-[#7C3AED] focus:bg-white outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-black text-gray-400 dark:text-slate-400 tracking-wider">
                    Ghi chú chi tiết
                  </label>
                  <textarea
                    id="add-prod-notes"
                    rows={2}
                    placeholder="Mô tả công dụng, tính chất vật tư..."
                    value={newProdNotes}
                    onChange={(e) => setNewProdNotes(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 text-gray-800 dark:text-slate-100 rounded-xl p-3 font-semibold focus:border-[#7C3AED] focus:bg-white outline-none resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddProductModal(false)}
                    className="py-3 bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-600 dark:text-slate-300 font-bold rounded-xl active:scale-95 transition-all text-center cursor-pointer"
                  >
                    HỦY BỎ
                  </button>

                  <button
                    type="submit"
                    className="py-3 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold rounded-xl active:scale-95 transition-all text-center cursor-pointer"
                  >
                    ĐỒNG Ý THÊM
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Persistent Bottom Tab Bar navigation panel */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-gray-100 dark:border-slate-800/80 px-2 py-2 flex items-center justify-around z-40 shadow-lg">
        
        <button
          onClick={() => setActiveTab('overview')}
          id="tab-btn-overview"
          className={`flex flex-col items-center gap-1 py-1 px-3.5 rounded-xl transition-all cursor-pointer ${
            activeTab === 'overview'
              ? 'text-[#7C3AED] font-bold'
              : 'text-gray-400 hover:text-gray-600 dark:text-slate-500'
          }`}
        >
          <Menu size={18} />
          <span className="text-[9px] uppercase tracking-wider font-bold">Tổng quan</span>
        </button>

        <button
          onClick={() => setActiveTab('products')}
          id="tab-btn-products"
          className={`flex flex-col items-center gap-1 py-1 px-3.5 rounded-xl transition-all cursor-pointer ${
            activeTab === 'products'
              ? 'text-[#7C3AED] font-bold'
              : 'text-gray-400 hover:text-gray-600 dark:text-slate-500'
          }`}
        >
          <Package size={18} />
          <span className="text-[9px] uppercase tracking-wider font-bold">Sản phẩm</span>
        </button>

        <button
          onClick={() => setActiveTab('inout')}
          id="tab-btn-inout"
          className={`flex flex-col items-center gap-1 py-1 px-3.5 rounded-xl transition-all cursor-pointer ${
            activeTab === 'inout'
              ? 'text-[#7C3AED] font-bold'
              : 'text-gray-400 hover:text-gray-600 dark:text-slate-500'
          }`}
        >
          <ArrowRightLeft size={18} />
          <span className="text-[9px] uppercase tracking-wider font-bold">Nhập/Xuất</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          id="tab-btn-history"
          className={`flex flex-col items-center gap-1 py-1 px-3.5 rounded-xl transition-all cursor-pointer ${
            activeTab === 'history'
              ? 'text-[#7C3AED] font-bold'
              : 'text-gray-400 hover:text-gray-600 dark:text-slate-500'
          }`}
        >
          <History size={18} />
          <span className="text-[9px] uppercase tracking-wider font-bold">Lịch sử</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          id="tab-btn-settings"
          className={`flex flex-col items-center gap-1 py-1 px-3.5 rounded-xl transition-all cursor-pointer ${
            activeTab === 'settings'
              ? 'text-[#7C3AED] font-bold'
              : 'text-gray-400 hover:text-gray-600 dark:text-slate-500'
          }`}
        >
          <Settings size={18} />
          <span className="text-[9px] uppercase tracking-wider font-bold">Cài đặt</span>
        </button>

      </nav>
    </div>
  );
}
