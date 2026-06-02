import React, { useState } from 'react';
import { Copy, Check, FileCode, AppWindow, Sparkles } from 'lucide-react';

export const FlutterExporter: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const flutterCode = `import 'package:flutter/material';
import 'dart:math';

void main() {
  runApp(const UrboxApp());
}

class UrboxApp extends StatefulWidget {
  const UrboxApp({super.key});

  @override
  State<UrboxApp> createState() => _UrboxAppState();
}

class _UrboxAppState extends State<UrboxApp> {
  ThemeMode _themeMode = ThemeMode.light;
  User? _currentUser;
  bool _showSplash = true;

  // Initial products dataset representing POSM
  final List<Product> _products = [
    Product(id: "1", name: "Standee Urbox", code: "UB-ST01", dimensions: "60x180 cm", quantity: 45, position: "Khu A - Kệ 1", notes: "Standee quảng cáo sự kiện."),
    Product(id: "2", name: "Bình giữ nhiệt Urbox", code: "UB-TM02", dimensions: "Chiều cao 22cm", quantity: 120, position: "Khu C - Kệ 2", notes: "Quà tặng kim loại cao cấp."),
    Product(id: "3", name: "Sổ tay da Urbox", code: "UB-NB03", dimensions: "Khổ A5", quantity: 80, position: "Khu B - Kệ 5", notes: "Sổ tay ghi chép thương hiệu."),
    Product(id: "4", name: "Túi vải Tote", code: "UB-TT04", dimensions: "35x40 cm", quantity: 150, position: "Khu B - Kệ 4", notes: "Túi canvas bảo vệ môi trường."),
    Product(id: "5", name: "Áo thun Urbox", code: "UB-TS05", dimensions: "Size L", quantity: 60, position: "Khu D - Kệ 1", notes: "Đồng phục sự kiện màu tím."),
    Product(id: "6", name: "Ô dù cầm tay", code: "UB-UM06", dimensions: "Bán kính 1m", quantity: 30, position: "Khu C - Kệ 4", notes: "Ô dù tự động gấp gọn."),
  ];

  final List<TransactionRecord> _transactions = [
    TransactionRecord(
      id: "T-001",
      productName: "Standee Urbox",
      productCode: "UB-ST01",
      type: "Nhập",
      quantityChange: 45,
      timestamp: "2026-06-02 08:30",
      user: "tuansaigon",
      notes: "Nhập lô hàng mới chuẩn bị sự kiện hè",
    ),
  ];

  void _toggleTheme() {
    setState(() {
      _themeMode = _themeMode == ThemeMode.light ? ThemeMode.dark : ThemeMode.light;
    });
  }

  void _login(User user) {
    setState(() {
      _currentUser = user;
      _showSplash = false;
    });
  }

  void _logout() {
    setState(() {
      _currentUser = null;
      _showSplash = true;
    });
  }

  void _restartApp() {
    setState(() {
      _showSplash = true;
      _currentUser = null;
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Urbox POSM',
      debugShowCheckedModeBanner: false,
      themeMode: _themeMode,
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF7C3AED),
          brightness: Brightness.light,
          primary: const Color(0xFF7C3AED),
          secondary: const Color(0xFFEC4899),
        ),
        fontFamily: 'Roboto',
      ),
      darkTheme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF7C3AED),
          brightness: Brightness.dark,
          primary: const Color(0xFF8B5CF6),
          secondary: const Color(0xFFF472B6),
        ),
      ),
      home: _showSplash
          ? SplashScreen(onFinished: () {
              setState(() {
                _showSplash = false;
              });
            })
          : (_currentUser == null
              ? LoginScreen(onLogin: _login)
              : MainNavigationScreen(
                  currentUser: _currentUser!,
                  products: _products,
                  transactions: _transactions,
                  themeMode: _themeMode,
                  onToggleTheme: _toggleTheme,
                  onLogout: _logout,
                  onRestart: _restartApp,
                )),
    );
  }
}

// Data Classes
class Product {
  final String id;
  String name;
  String code;
  String dimensions;
  int quantity;
  String position;
  String notes;

  Product({
    required this.id,
    required this.name,
    required this.code,
    required this.dimensions,
    required this.quantity,
    required this.position,
    required this.notes,
  });
}

class TransactionRecord {
  final String id;
  final String productName;
  final String productCode;
  final String type; // 'Nhập' or 'Xuất'
  final int quantityChange;
  final String timestamp;
  final String user;
  final String notes;

  TransactionRecord({
    required this.id,
    required this.productName,
    required this.productCode,
    required this.type,
    required this.quantityChange,
    required this.timestamp,
    required this.user,
    required this.notes,
  });
}

class User {
  final String id;
  final String username;
  final String fullName;
  final String role;

  User({
    required this.id,
    required this.username,
    required this.fullName,
    required this.role,
  });
}

// 1. Splash Screen Widget
class SplashScreen extends StatelessWidget {
  final VoidCallback onFinished;
  const SplashScreen({super.key, required this.onFinished});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 20.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              // Tiny Header
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  _buildMiniHexagon(),
                  const SizedBox(width: 8),
                  const Text(
                    'URBOX',
                    style: TextStyle(
                      color: Color(0xFF7C3AED),
                      fontSize: 24,
                      fontWeight: FontWeight.black,
                      letterSpacing: -1,
                    ),
                  ),
                ],
              ),
              
              // Warehouse Vector Representation
              Container(
                height: 220,
                decoration: BoxDecoration(
                  color: const Color(0xFFFAF9FD),
                  borderRadius: BorderRadius.circular(24),
                ),
                child: const Center(
                  child: Icon(
                    Icons.warehouse_rounded,
                    size: 110,
                    color: Color(0xFF7C3AED),
                  ),
                ),
              ),

              // Welcome texts
              Column(
                children: [
                  const Text(
                    'Chào mừng bạn đến với',
                    style: TextStyle(color: Colors.grey, fontSize: 15),
                  ),
                  const SizedBox(height: 4),
                  const Text(
                    'URBOX POSM!',
                    style: TextStyle(
                      color: Color(0xFF7C3AED),
                      fontSize: 32,
                      fontWeight: FontWeight.extrabold,
                    ),
                  ),
                  const SizedBox(height: 12),
                  const Text(
                    'Giải pháp quản lý kho ấn phẩm hiệu quả\\nchính xác – nhanh chóng',
                    textAlign: TextAlign.center,
                    style: TextStyle(color: Colors.grey, fontSize: 13),
                  ),
                ],
              ),

              // Bullet tags
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  _buildVerticalFeature(Icons.bolt, 'Hiệu quả', Colors.purple),
                  _buildVerticalFeature(Icons.track_changes, 'Chính xác', Colors.pink),
                  _buildVerticalFeature(Icons.rocket_launch, 'Nhanh chóng', Colors.emerald),
                ],
              ),

              // CTA Button
              SizedBox(
                width: double.infinity,
                height: 52,
                child: ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF7C3AED),
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(16),
                    ),
                    elevation: 0,
                  ),
                  onPressed: onFinished,
                  child: const Text(
                    'Bắt đầu',
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildMiniHexagon() {
    return Container(
      width: 28,
      height: 28,
      decoration: BoxDecoration(
        color: const Color(0xFF7C3AED).withOpacity(0.1),
        shape: BoxShape.circle,
      ),
      child: const Center(
        child: Icon(Icons.hexagram_outlined, size: 18, color: Color(0xFF7C3AED)),
      ),
    );
  }

  Widget _buildVerticalFeature(IconData icon, String text, Color color) {
    return Column(
      children: [
        Container(
          width: 44,
          height: 44,
          decoration: BoxDecoration(
            color: color.withOpacity(0.1),
            borderRadius: BorderRadius.circular(12),
          ),
          child: Icon(icon, color: color, size: 20),
        ),
        const SizedBox(height: 6),
        Text(
          text,
          style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold),
        ),
      ],
    );
  }
}

// 2. Login Screen
class LoginScreen extends StatefulWidget {
  final Function(User) onLogin;
  const LoginScreen({super.key, required this.onLogin});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final TextEditingController _usernameController = TextEditingController();
  final TextEditingController _idController = TextEditingController();

  final List<User> _presets = [
    User(id: "UR-1002", username: "tuansaigon", fullName: "Tuan Saigon", role: "admin"),
    User(id: "UR-1011", username: "minh.posm", fullName: "Minh Hoàng", role: "staff"),
    User(id: "UR-1025", username: "lan.kho", fullName: "Mai Lan", role: "staff"),
  ];

  void _submit() {
    if (_usernameController.text.trim().isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Vui lòng nhập Tên đăng nhập')),
      );
      return;
    }
    final enteredName = _usernameController.text.trim();
    final customId = _idController.text.trim().isNotEmpty 
        ? _idController.text.trim().toUpperCase() 
        : "UR-\${Random().nextInt(8999) + 1000}";

    widget.onLogin(User(
      id: customId,
      username: enteredName.toLowerCase(),
      fullName: enteredName,
      role: "staff",
    ));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF9FAFB),
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(24.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Icon(Icons.token_outlined, size: 64, color: Color(0xFF7C3AED)),
                const SizedBox(height: 8),
                const Text(
                  'KHO POSM',
                  style: TextStyle(
                    fontSize: 24, 
                    fontWeight: FontWeight.bold,
                    color: Color(0xFF7C3AED),
                  ),
                ),
                const SizedBox(height: 24),
                
                Card(
                  elevation: 0,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(24),
                    side: const BorderSide(color: Color(0xFFE5E7EB)),
                  ),
                  child: Padding(
                    padding: const EdgeInsets.all(20.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Center(
                          child: Text(
                            'ĐĂNG NHẬP',
                            style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
                          ),
                        ),
                        const SizedBox(height: 18),
                        
                        TextField(
                          controller: _usernameController,
                          decoration: InputDecoration(
                            prefixIcon: const Icon(Icons.person_outline),
                            hintText: 'Tên đăng nhập',
                            filled: true,
                            fillColor: const Color(0xFFF3F4F6),
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(14),
                              borderSide: BorderSide.none,
                            ),
                          ),
                        ),
                        const SizedBox(height: 12),
                        
                        TextField(
                          controller: _idController,
                          decoration: InputDecoration(
                            prefixIcon: const Icon(Icons.badge_outlined),
                            hintText: 'Mã số ID (tùy chọn)',
                            filled: true,
                            fillColor: const Color(0xFFF3F4F6),
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(14),
                              borderSide: BorderSide.none,
                            ),
                          ),
                        ),
                        const SizedBox(height: 20),
                        
                        SizedBox(
                          width: double.infinity,
                          height: 50,
                          child: ElevatedButton(
                            style: ElevatedButton.styleFrom(
                              backgroundColor: const Color(0xFF7C3AED),
                              foregroundColor: Colors.white,
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(14),
                              ),
                              elevation: 0,
                            ),
                            onPressed: _submit,
                            child: const Text('Vào hệ thống', style: TextStyle(fontWeight: FontWeight.bold)),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 24),
                
                // Presets quick entry
                const Text(
                  'Đăng nhập thử nhanh:',
                  style: TextStyle(color: Colors.grey, fontSize: 12, fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 8),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: _presets.map((u) {
                    return InkWell(
                      onTap: () => widget.onLogin(u),
                      child: Container(
                        margin: const EdgeInsets.symmetric(horizontal: 4),
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          border: Border.all(color: const Color(0xFFE5E7EB)),
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: Text(
                          u.fullName,
                          style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Color(0xFF7C3AED)),
                        ),
                      ),
                    );
                  }).toList(),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}

// 3. Navigation controller
class MainNavigationScreen extends StatefulWidget {
  final User currentUser;
  final List<Product> products;
  final List<TransactionRecord> transactions;
  final ThemeMode themeMode;
  final VoidCallback onToggleTheme;
  final VoidCallback onLogout;
  final VoidCallback onRestart;

  const MainNavigationScreen({
    super.key,
    required this.currentUser,
    required this.products,
    required this.transactions,
    required this.themeMode,
    required this.onToggleTheme,
    required this.onLogout,
    required this.onRestart,
  });

  @override
  State<MainNavigationScreen> createState() => _MainNavigationScreenState();
}

class _MainNavigationScreenState extends State<MainNavigationScreen> {
  int _currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    final List<Widget> pages = [
      HomeScreen(
        currentUser: widget.currentUser, 
        products: widget.products,
        onChangeTab: (idx) {
          setState(() {
            _currentIndex = idx;
          });
        }
      ),
      ProductsTab(products: widget.products, transactions: widget.transactions, currentUser: widget.currentUser),
      InOutTab(products: widget.products, transactions: widget.transactions, currentUser: widget.currentUser),
      HistoryTab(transactions: widget.transactions),
      SettingsTab(
        currentUser: widget.currentUser, 
        themeMode: widget.themeMode,
        onToggleTheme: widget.onToggleTheme, 
        onLogout: widget.onLogout,
        onRestart: widget.onRestart,
      ),
    ];

    return Scaffold(
      body: pages[_currentIndex],
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (index) {
          setState(() {
            _currentIndex = index;
          });
        },
        type: BottomNavigationBarType.fixed,
        selectedItemColor: const Color(0xFF7C3AED),
        unselectedItemColor: Colors.grey,
        selectedLabelStyle: const TextStyle(fontWeight: FontWeight.bold, fontSize: 11),
        unselectedLabelStyle: const TextStyle(fontSize: 10),
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.space_dashboard_rounded), label: 'Tổng quan'),
          BottomNavigationBarItem(icon: Icon(Icons.inventory_2_outlined), label: 'Sản phẩm'),
          BottomNavigationBarItem(icon: Icon(Icons.swap_horiz_rounded), label: 'Nhập/Xuất'),
          BottomNavigationBarItem(icon: Icon(Icons.history_rounded), label: 'Lịch sử'),
          BottomNavigationBarItem(icon: Icon(Icons.settings_outlined), label: 'Cài đặt'),
        ],
      ),
    );
  }
}

// 4. Tab 1: Dashboard Home
class HomeScreen extends StatelessWidget {
  final User currentUser;
  final List<Product> products;
  final Function(int) onChangeTab;

  const HomeScreen({
    super.key,
    required this.currentUser,
    required this.products,
    required this.onChangeTab,
  });

  @override
  Widget build(BuildContext context) {
    // Sort and get some top products for simple monitoring
    final sortedProducts = List<Product>.from(products)..sort((a, b) => b.quantity.compareTo(a.quantity));
    final previewList = sortedProducts.take(3).toList();

    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            const Icon(Icons.token, color: Color(0xFF7C3AED), size: 28),
            const SizedBox(width: 8),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('KHO POSM', style: TextStyle(fontWeight: FontWeight.black, fontSize: 16)),
                  Text(
                    'Đăng nhập: \${currentUser.fullName} (\${currentUser.id})', 
                    style: const TextStyle(fontSize: 11, color: Colors.grey),
                  ),
                ],
              ),
            )
          ],
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Hello Banner purple card
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [Color(0xFF7C3AED), Color(0xFF6D28D9)],
                ),
                borderRadius: BorderRadius.circular(20),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('Xin chào,', style: TextStyle(color: Colors.white70, fontSize: 14)),
                  Text(
                    currentUser.fullName,
                    style: const TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 12),
                  const Text(
                    'Tổng thể trạng thái tồn kho vật tư được đồng bộ hóa tức thời trên ứng dụng của bạn.',
                    style: TextStyle(color: Colors.white60, fontSize: 12),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // Section Headline for stock preview
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text('Vật tư nhiều nhất', style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold)),
                TextButton(
                  onPressed: () => onChangeTab(1),
                  child: const Text('Xem tất cả', style: TextStyle(color: Color(0xFF7C3AED), fontSize: 12, fontWeight: FontWeight.bold)),
                )
              ],
            ),
            
            // List of preview products
            ListView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: previewList.length,
              itemBuilder: (context, index) {
                final p = previewList[index];
                return Card(
                  margin: const EdgeInsets.only(bottom: 10),
                  elevation: 0,
                  color: Colors.white,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(16),
                    side: const BorderSide(color: Color(0xFFF3F4F6)),
                  ),
                  child: ListTile(
                    leading: CircleAvatar(
                      backgroundColor: Colors.purple.withOpacity(0.1),
                      child: const Icon(Icons.inventory_2, color: Color(0xFF7C3AED), size: 18),
                    ),
                    title: Text(p.name, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                    subtitle: Text('Vị trí: \${p.position}', style: const TextStyle(fontSize: 11)),
                    trailing: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                      decoration: BoxDecoration(
                        color: Colors.purple.shade50,
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: Text(
                        'x\${p.quantity}',
                        style: const TextStyle(fontWeight: FontWeight.bold, color: Color(0xFF7C3AED), fontSize: 13),
                      ),
                    ),
                  ),
                );
              },
            ),
            const SizedBox(height: 20),

            // Tools Section
            const Text('Công cụ tiện ích', style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold)),
            const SizedBox(height: 10),
            
            GridPaper(
              color: Colors.transparent,
              child: GridView.count(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                crossAxisCount: 2,
                crossAxisSpacing: 12,
                mainAxisSpacing: 12,
                childAspectRatio: 1.6,
                children: [
                  _buildQuickTool(context, 'Danh mục', Icons.list_alt, Colors.blue, () => onChangeTab(1)),
                  _buildQuickTool(context, 'Nhập / Xuất', Icons.swap_horiz, Colors.emerald, () => onChangeTab(2)),
                  _buildQuickTool(context, 'Lịch sử', Icons.history, Colors.orange, () => onChangeTab(3)),
                  _buildQuickTool(context, 'Cấu hình', Icons.settings_outlined, Colors.purple, () => onChangeTab(4)),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildQuickTool(BuildContext context, String name, IconData icon, Color color, VoidCallback onTap) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(16),
      child: Container(
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(
          color: color.withOpacity(0.08),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: color.withOpacity(0.15)),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Icon(icon, color: color, size: 26),
            Text(name, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
          ],
        ),
      ),
    );
  }
}

// 5. Tab 2: Products Page
class ProductsTab extends StatefulWidget {
  final List<Product> products;
  final List<TransactionRecord> transactions;
  final User currentUser;

  const ProductsTab({
    super.key, 
    required this.products, 
    required this.transactions,
    required this.currentUser,
  });

  @override
  State<ProductsTab> createState() => _ProductsTabState();
}

class _ProductsTabState extends State<ProductsTab> {
  String _searchQuery = "";

  void _showAddDialog() {
    final nameController = TextEditingController();
    final codeController = TextEditingController();
    final dimController = TextEditingController();
    final qtyController = TextEditingController();
    final posController = TextEditingController();
    final noteController = TextEditingController();

    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
          title: const Text('Thêm sản phẩm mới', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
          content: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                TextField(controller: nameController, decoration: const InputDecoration(labelText: 'Tên dòng sản phẩm *')),
                TextField(controller: codeController, decoration: const InputDecoration(labelText: 'Mã số vật tư *')),
                TextField(controller: dimController, decoration: const InputDecoration(labelText: 'Kích thước')),
                TextField(controller: qtyController, keyboardType: TextInputType.number, decoration: const InputDecoration(labelText: 'Số lượng ban đầu *')),
                TextField(controller: posController, decoration: const InputDecoration(labelText: 'Vị trí ở kho')),
                TextField(controller: noteController, decoration: const InputDecoration(labelText: 'Ghi chú')),
              ],
            ),
          ),
          actions: [
            TextButton(onPressed: () => Navigator.pop(context), child: const Text('Hủy')),
            ElevatedButton(
              style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF7C3AED), foregroundColor: Colors.white),
              onPressed: () {
                if (nameController.text.isEmpty || codeController.text.isEmpty) {
                  return;
                }
                setState(() {
                  final newP = Product(
                    id: DateTime.now().millisecondsSinceEpoch.toString(),
                    name: nameController.text,
                    code: codeController.text.toUpperCase(),
                    dimensions: dimController.text.isNotEmpty ? dimController.text : "Tiêu chuẩn",
                    quantity: int.tryParse(qtyController.text) ?? 0,
                    position: posController.text.isNotEmpty ? posController.text : "Khu D - Hàng mới",
                    notes: noteController.text,
                  );
                  widget.products.add(newP);
                  widget.transactions.insert(0, TransactionRecord(
                    id: "T-\${DateTime.now().millisecondsSinceEpoch.toString().substring(8)}",
                    productName: newP.name,
                    productCode: newP.code,
                    type: "Nhập",
                    quantityChange: newP.quantity,
                    timestamp: "Vừa xong",
                    user: widget.currentUser.username,
                    notes: "Khởi tạo sản phẩm mới",
                  ));
                });
                Navigator.pop(context);
              },
              child: const Text('Đồng ý'),
            )
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final filtered = widget.products.where((p) {
      final q = _searchQuery.toLowerCase();
      return p.name.toLowerCase().contains(q) || p.code.toLowerCase().contains(q);
    }).toList();

    return Scaffold(
      appBar: AppBar(
        title: const Text('Danh mục Sản phẩm', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
        actions: [
          IconButton(onPressed: _showAddDialog, icon: const Icon(Icons.add_circle, color: Color(0xFF7C3AED), size: 28)),
        ],
      ),
      body: Column(
        children: [
          // Search input
          Padding(
            padding: const EdgeInsets.all(12.0),
            child: TextField(
              onChanged: (val) {
                setState(() {
                  _searchQuery = val;
                });
              },
              decoration: InputDecoration(
                hintText: 'Tìm theo tên hoặc mã...',
                prefixIcon: const Icon(Icons.search),
                contentPadding: const EdgeInsets.symmetric(vertical: 0, horizontal: 15),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                  borderSide: const BorderSide(color: Color(0xFFCCCCCC)),
                ),
              ),
            ),
          ),
          
          Expanded(
            child: filtered.isEmpty
                ? const Center(child: Text('Không tìm thấy sản phẩm nào', style: TextStyle(color: Colors.grey)))
                : ListView.builder(
                    padding: const EdgeInsets.symmetric(horizontal: 12),
                    itemCount: filtered.length,
                    itemBuilder: (context, index) {
                      final p = filtered[index];
                      return Card(
                        margin: const EdgeInsets.only(bottom: 8),
                        elevation: 0,
                        color: Colors.white,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(16),
                          side: const BorderSide(color: Color(0xFFE5E7EB)),
                        ),
                        child: ExpansionTile(
                          leading: CircleAvatar(
                            backgroundColor: const Color(0xFFF3E8FF),
                            child: const Icon(Icons.token, color: Color(0xFF7C3AED), size: 16),
                          ),
                          title: Text(p.name, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
                          subtitle: Text('Mã: \${p.code} | SL: \${p.quantity}', style: const TextStyle(fontSize: 11)),
                          children: [
                            Padding(
                              padding: const EdgeInsets.all(14.0),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Row(
                                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                    children: [
                                      Text('Kích thước: \${p.dimensions}', style: const TextStyle(fontSize: 12)),
                                      Text('Vị trí: \${p.position}', style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Color(0xFF7C3AED))),
                                    ],
                                  ),
                                  const SizedBox(height: 8),
                                  if (p.notes.isNotEmpty) ...[
                                    Text('Ghi chú: \${p.notes}', style: const TextStyle(fontSize: 11, color: Colors.grey)),
                                  ],
                                ],
                              ),
                            ),
                          ],
                        ),
                      );
                    },
                  ),
          )
        ],
      ),
    );
  }
}

// 6. Tab 3: Import / Export Action with simple hand-entry
class InOutTab extends StatefulWidget {
  final List<Product> products;
  final List<TransactionRecord> transactions;
  final User currentUser;

  const InOutTab({
    super.key, 
    required this.products, 
    required this.transactions,
    required this.currentUser,
  });

  @override
  State<InOutTab> createState() => _InOutTabState();
}

class _InOutTabState extends State<InOutTab> {
  Product? _selectedProduct;
  bool _isImport = true;
  final TextEditingController _qtyController = TextEditingController();
  final TextEditingController _noteController = TextEditingController();

  void _submit() {
    if (_selectedProduct == null) {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Vui lòng chọn 1 sản phẩm')));
      return;
    }
    final amt = int.tryParse(_qtyController.text) ?? 0;
    if (amt <= 0) {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Vui lòng nhập số lượng hợp lệ')));
      return;
    }

    if (!_isImport && _selectedProduct!.quantity < amt) {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Số lượng tồn không đủ để xuất kho!')));
      return;
    }

    setState(() {
      final change = _isImport ? amt : -amt;
      _selectedProduct!.quantity += change;
      
      widget.transactions.insert(0, TransactionRecord(
        id: "T-\${DateTime.now().millisecondsSinceEpoch.toString().substring(8)}",
        productName: _selectedProduct!.name,
        productCode: _selectedProduct!.code,
        type: _isImport ? "Nhập" : "Xuất",
        quantityChange: change,
        timestamp: "Vừa xong",
        user: widget.currentUser.username,
        notes: _noteController.text.isNotEmpty ? _noteController.text : (_isImport ? "Nhập bổ sung" : "Xuất chuyển phát"),
      ));

      _qtyController.clear();
      _noteController.clear();
    });

    ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Đã cập nhật trạng thái kho thành công!')));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Nhập / Xuất kho', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Chọn một dòng vật tư', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
            const SizedBox(height: 8),
            
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 12),
              decoration: BoxDecoration(
                border: Border.all(color: Colors.grey.shade300),
                borderRadius: BorderRadius.circular(12),
              ),
              child: DropdownButtonHideUnderline(
                child: DropdownButton<Product>(
                  value: _selectedProduct,
                  hint: const Text('Chọn sản phẩm...'),
                  isExpanded: true,
                  onChanged: (val) {
                    setState(() {
                      _selectedProduct = val;
                    });
                  },
                  items: widget.products.map((p) {
                    return DropdownMenuItem<Product>(
                      value: p,
                      child: Text('\${p.name} (\${p.code}) - Tồn: \${p.quantity}'),
                    );
                  }).toList(),
                ),
              ),
            ),
            const SizedBox(height: 20),

            // Select In/Out Mode
            const Text('Thao tác nghiệp vụ', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
            const SizedBox(height: 8),
            Row(
              children: [
                Expanded(
                  child: ElevatedButton.icon(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: _isImport ? const Color(0xFF10B981) : Colors.white,
                      foregroundColor: _isImport ? Colors.white : Colors.grey,
                      side: BorderSide(color: _isImport ? Colors.transparent : Colors.grey.shade300),
                      elevation: 0,
                    ),
                    onPressed: () => setState(() => _isImport = true),
                    icon: const Icon(Icons.arrow_upward),
                    label: const Text('NHẬP KHO'),
                  ),
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: ElevatedButton.icon(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: !_isImport ? const Color(0xFFEF4444) : Colors.white,
                      foregroundColor: !_isImport ? Colors.white : Colors.grey,
                      side: BorderSide(color: !_isImport ? Colors.transparent : Colors.grey.shade300),
                      elevation: 0,
                    ),
                    onPressed: () => setState(() => _isImport = false),
                    icon: const Icon(Icons.arrow_downward),
                    label: const Text('XUẤT KHO'),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 20),

            const Text('Số lượng thực tế', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
            const SizedBox(height: 8),
            TextField(
              controller: _qtyController,
              keyboardType: TextInputType.number,
              decoration: InputDecoration(
                hintText: 'Nhập số lượng bằng tay...',
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
              ),
            ),
            const SizedBox(height: 20),

            const Text('Ghi chú chi tiết', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
            const SizedBox(height: 8),
            TextField(
              controller: _noteController,
              decoration: InputDecoration(
                hintText: 'Nhập lý do hoặc mã phiếu gửi...',
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
              ),
            ),
            const SizedBox(height: 24),

            SizedBox(
              width: double.infinity,
              height: 50,
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF7C3AED),
                  foregroundColor: Colors.white,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  elevation: 0,
                ),
                onPressed: _submit,
                child: const Text('XÁC NHẬN THỰC HIỆN', style: TextStyle(fontWeight: FontWeight.bold)),
              ),
            )
          ],
        ),
      ),
    );
  }
}

// 7. Tab 4: History log list page
class HistoryTab extends StatelessWidget {
  final List<TransactionRecord> transactions;
  const HistoryTab({super.key, required this.transactions});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Lịch sử Nhập / Xuất', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
      ),
      body: transactions.isEmpty
          ? const Center(child: Text('Chưa có lịch sử giao dịch nào', style: TextStyle(color: Colors.grey)))
          : ListView.builder(
              padding: const EdgeInsets.all(12),
              itemCount: transactions.length,
              itemBuilder: (context, index) {
                final tx = transactions[index];
                final isAdd = tx.type == 'Nhập';
                return Card(
                  elevation: 0,
                  margin: const EdgeInsets.only(bottom: 8),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(14),
                    side: BorderSide(color: Colors.grey.shade200),
                  ),
                  child: ListTile(
                    leading: Container(
                      width: 36,
                      height: 36,
                      decoration: BoxDecoration(
                        color: isAdd ? Colors.emerald.withOpacity(0.1) : Colors.red.withOpacity(0.1),
                        shape: BoxShape.circle,
                      ),
                      child: Icon(
                        isAdd ? Icons.add : Icons.remove,
                        color: isAdd ? Colors.emerald : Colors.red,
                        size: 20,
                      ),
                    ),
                    title: Text(tx.productName, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
                    subtitle: Text(
                      'Thao tác: \${tx.user} | \${tx.notes}',
                      style: const TextStyle(fontSize: 11, color: Colors.grey),
                    ),
                    trailing: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.end,
                      children: [
                        Text(
                          isAdd ? '+\${tx.quantityChange}' : '\${tx.quantityChange}',
                          style: TextStyle(
                            fontWeight: FontWeight.black,
                            color: isAdd ? Colors.emerald : Colors.red,
                            fontSize: 14,
                          ),
                        ),
                        const SizedBox(height: 2),
                        Text(tx.timestamp, style: const TextStyle(fontSize: 9, color: Colors.grey)),
                      ],
                    ),
                  ),
                );
              },
            ),
    );
  }
}

// 8. Tab 5: Settings, Profile & App Restart info
class SettingsTab extends StatelessWidget {
  final User currentUser;
  final ThemeMode themeMode;
  final VoidCallback onToggleTheme;
  final VoidCallback onLogout;
  final VoidCallback onRestart;

  const SettingsTab({
    super.key, 
    required this.currentUser, 
    required this.themeMode, 
    required this.onToggleTheme, 
    required this.onLogout,
    required this.onRestart,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Cài đặt cấu hình', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // User Card Profile
          Card(
            elevation: 0,
            color: const Color(0xFFF3E8FF).withOpacity(0.3),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(16),
              side: const BorderSide(color: Color(0xFFE5E7EB)),
            ),
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Row(
                children: [
                  CircleAvatar(
                    radius: 24,
                    backgroundColor: const Color(0xFF7C3AED),
                    child: Text(
                      currentUser.fullName.isNotEmpty ? currentUser.fullName[0].toUpperCase() : 'U',
                      style: const TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          currentUser.fullName,
                          style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15),
                        ),
                        Text(
                          'ID nhân viên: \${currentUser.id}',
                          style: const TextStyle(fontSize: 11, color: Colors.grey),
                        ),
                      ],
                    ),
                  ),
                  Chip(
                    label: Text(
                      currentUser.role == 'admin' ? 'Quản trị' : 'Thủ kho',
                      style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold),
                    ),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 20),

          // Option Section
          const Text('Tùy chỉnh giao diện', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.grey)),
          const SizedBox(height: 8),

          ListTile(
            title: const Text('Chế độ hiển thị', style: TextStyle(fontSize: 14)),
            subtitle: Text('Đang chọn: \${themeMode == ThemeMode.light ? 'Sáng (Light)' : 'Tối (Dark)'}', style: const TextStyle(fontSize: 11)),
            trailing: Switch(
              value: themeMode == ThemeMode.dark,
              onChanged: (val) => onToggleTheme(),
            ),
          ),
          const Divider(),

          const Text('Ứng dụng', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.grey)),
          const SizedBox(height: 8),

          ListTile(
            leading: const Icon(Icons.replay_rounded, color: Colors.blue),
            title: const Text('Làm mới (Restart App)', style: TextStyle(fontSize: 14)),
            subtitle: const Text('Khôi phục trạng thái ban đầu để kiểm thử loại mới', style: const TextStyle(fontSize: 11)),
            onTap: onRestart,
          ),

          ListTile(
            leading: const Icon(Icons.logout_rounded, color: Colors.red),
            title: const Text('Đăng xuất tài khoản', style: TextStyle(fontSize: 14, color: Colors.red)),
            onTap: onLogout,
          ),
          
          const Divider(),
          const SizedBox(height: 10),
          const Center(
            child: Text(
              'Thiết kế và bảo hãnh bởi Đội nhóm Urbox Core POSM System',
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 10, color: Colors.grey),
            ),
          )
        ],
      ),
    );
  }
}
`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(flutterCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-slate-900 text-slate-100 rounded-3xl p-6 shadow-xl border border-slate-800 my-6 font-sans">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
            <FileCode size={18} />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-100 leading-tight flex items-center gap-1.5">
              Mã nguồn Flutter Sẵn Sàng
              <Sparkles size={14} className="text-yellow-400 fill-yellow-400" />
            </h3>
            <p className="text-[10px] text-slate-400">Dùng cho Android Studio (lib/main.dart)</p>
          </div>
        </div>

        <button
          onClick={copyToClipboard}
          id="btn-copy-flutter-code"
          className="px-3.5 py-1.5 bg-[#7C3AED] hover:bg-[#6D28D9] active:scale-[0.98] text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
        >
          {copied ? (
            <>
              <Check size={13} className="text-emerald-400" />
              Đã sao chép!
            </>
          ) : (
            <>
              <Copy size={13} />
              Sao chép mã
            </>
          )}
        </button>
      </div>

      <div className="bg-slate-800/55 rounded-2xl p-4 mb-4 border border-slate-700/50 space-y-2.5 text-xs">
        <div className="flex gap-2 text-slate-300">
          <span className="text-purple-400 font-bold">1.</span>
          <p className="leading-relaxed">
            Mở <strong>Android Studio</strong> hoặc <strong>VS Code</strong>. Tạo một project Flutter bằng lệnh: <code className="px-1.5 py-0.5 bg-slate-950 text-emerald-400 font-mono rounded text-[10px]">flutter create urbox_posm</code>.
          </p>
        </div>
        <div className="flex gap-2 text-slate-300">
          <span className="text-purple-400 font-bold">2.</span>
          <p className="leading-relaxed">
            Mở file <code className="text-amber-400 px-1 font-mono">lib/main.dart</code>, xóa sạch nội dung cũ và dán toàn bộ đoạn mã nguồn đã sao chép ở đây vào.
          </p>
        </div>
        <div className="flex gap-2 text-slate-300">
          <span className="text-purple-400 font-bold">3.</span>
          <p className="leading-relaxed">
            Bấm nút <strong>Run</strong> để khởi chạy ứng dụng trực tiếp trên thiết bị Android Emulator hoặc thiết bị thật của bạn!
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="absolute top-0 right-3 px-2 py-0.5 bg-slate-800 text-slate-400 rounded-b text-[9px] font-mono tracking-wider">
          DART CODE
        </div>
        <pre className="text-[10.5px] font-mono leading-relaxed overflow-x-auto overflow-y-auto max-h-[220px] bg-slate-950 p-4 rounded-xl border border-slate-800 text-purple-300">
          {flutterCode}
        </pre>
      </div>
    </div>
  );
};
