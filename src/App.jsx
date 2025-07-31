import React, { useState, useEffect, createContext, useContext } from 'react';
import { Search, ShoppingCart, User, Star, ArrowLeft, ArrowRight, Plus, Minus, CreditCard, MapPin, Clock } from 'lucide-react';

// Context for global state management
const AppContext = createContext();

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

// Sample data
const sampleProducts = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299,
    category: "Electronics",
    rating: 4.5,
    reviews: 128,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500",
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=500"
    ],
    description: "Experience crystal-clear audio with our premium wireless headphones featuring noise cancellation and 30-hour battery life.",
    colors: ["Black", "White", "Blue"],
    sizes: ["One Size"]
  },
  {
    id: 2,
    name: "Stylish Running Shoes",
    price: 159,
    category: "Fashion",
    rating: 4.3,
    reviews: 89,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500"
    ],
    description: "Comfortable and stylish running shoes perfect for your daily workout routine.",
    colors: ["Red", "Blue", "Black"],
    sizes: ["7", "8", "9", "10", "11"]
  },
  {
    id: 3,
    name: "Smart Watch Pro",
    price: 399,
    category: "Electronics",
    rating: 4.7,
    reviews: 203,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500",
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500"
    ],
    description: "Advanced smartwatch with health monitoring, GPS, and 7-day battery life.",
    colors: ["Silver", "Gold", "Black"],
    sizes: ["38mm", "42mm"]
  },
  {
    id: 4,
    name: "Designer Backpack",
    price: 89,
    category: "Fashion",
    rating: 4.2,
    reviews: 67,
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
      "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=500",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=500"
    ],
    description: "Durable and stylish backpack perfect for work, travel, or everyday use.",
    colors: ["Brown", "Black", "Gray"],
    sizes: ["Medium", "Large"]
  },
  {
    id: 5,
    name: "Coffee Maker Deluxe",
    price: 199,
    category: "Home",
    rating: 4.6,
    reviews: 156,
    images: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500",
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500"
    ],
    description: "Professional-grade coffee maker with programmable settings and thermal carafe.",
    colors: ["Stainless Steel", "Black"],
    sizes: ["12-cup"]
  },
  {
    id: 6,
    name: "Yoga Mat Premium",
    price: 49,
    category: "Sports",
    rating: 4.4,
    reviews: 92,
    images: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500",
      "https://images.unsplash.com/photo-1506629905061-6d4783eb9f8b?w=500",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500"
    ],
    description: "Non-slip yoga mat with extra cushioning for comfortable practice.",
    colors: ["Purple", "Blue", "Pink", "Green"],
    sizes: ["Standard"]
  }
];

const heroImages = [
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200",
  "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200",
  "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200"
];

const categories = ["All", "Electronics", "Fashion", "Home", "Sports"];

// Components
const Navbar = () => {
  const { searchQuery, setSearchQuery, user, setCurrentPage, cart, setShowLogin } = useAppContext();

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backgroundColor: '#1a1a2e',
      padding: '1rem 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <h1 style={{ 
          color: '#ffffff', 
          fontSize: '1.8rem', 
          fontWeight: 'bold',
          cursor: 'pointer'
        }} onClick={() => setCurrentPage('home')}>
          ShopVibe
        </h1>
        
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Search style={{ 
            position: 'absolute', 
            left: '12px', 
            color: '#666',
            width: '20px',
            height: '20px'
          }} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              paddingLeft: '40px',
              paddingRight: '12px',
              paddingTop: '10px',
              paddingBottom: '10px',
              borderRadius: '25px',
              border: 'none',
              width: '400px',
              fontSize: '14px',
              outline: 'none'
            }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <button
          onClick={() => user ? setCurrentPage('profile') : setShowLogin(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'none',
            border: 'none',
            color: '#ffffff',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          <User size={20} />
          {user ? user.name : 'Login'}
        </button>
        
        <button
          onClick={() => setCurrentPage('cart')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'none',
            border: 'none',
            color: '#ffffff',
            cursor: 'pointer',
            fontSize: '14px',
            position: 'relative'
          }}
        >
          <ShoppingCart size={20} />
          Cart
          {cart.length > 0 && (
            <span style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              backgroundColor: '#ff4757',
              color: 'white',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px'
            }}>
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ position: 'relative', height: '500px', overflow: 'hidden' }}>
      {heroImages.map((image, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: index === currentSlide ? 1 : 0,
            transition: 'opacity 1s ease-in-out'
          }}
        />
      ))}
      
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        color: 'white',
        zIndex: 2
      }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: 'bold' }}>
          Discover Amazing Products
        </h2>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
          Shop the latest trends with unbeatable prices
        </p>
        <button style={{
          backgroundColor: '#ff4757',
          color: 'white',
          border: 'none',
          padding: '12px 30px',
          borderRadius: '25px',
          fontSize: '1.1rem',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}>
          Shop Now
        </button>
      </div>

      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length)}
        style={{
          position: 'absolute',
          left: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(255,255,255,0.8)',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <ArrowLeft size={24} />
      </button>

      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % heroImages.length)}
        style={{
          position: 'absolute',
          right: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(255,255,255,0.8)',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <ArrowRight size={24} />
      </button>
    </div>
  );
};

const CategoryFilter = () => {
  const { selectedCategory, setSelectedCategory } = useAppContext();

  return (
    <div style={{
      padding: '2rem',
      backgroundColor: '#f8f9fa'
    }}>
      <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem', color: '#333' }}>Shop by Category</h3>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              padding: '10px 20px',
              borderRadius: '25px',
              border: selectedCategory === category ? '2px solid #1a1a2e' : '2px solid #ddd',
              backgroundColor: selectedCategory === category ? '#1a1a2e' : 'white',
              color: selectedCategory === category ? 'white' : '#333',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: selectedCategory === category ? 'bold' : 'normal',
              transition: 'all 0.3s ease'
            }}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

const ProductCard = ({ product }) => {
  const { setCurrentPage, setSelectedProduct } = useAppContext();

  const handleViewProduct = () => {
    setSelectedProduct(product);
    setCurrentPage('product');
  };

  return (
    <div style={{
      border: '1px solid #eee',
      borderRadius: '12px',
      padding: '1rem',
      backgroundColor: 'white',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-5px)';
      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
    }}>
      <img
        src={product.images[0]}
        alt={product.name}
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover',
          borderRadius: '8px',
          marginBottom: '1rem'
        }}
      />
      <h4 style={{ marginBottom: '0.5rem', fontSize: '1.1rem', color: '#333' }}>
        {product.name}
      </h4>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              fill={i < Math.floor(product.rating) ? '#ffd700' : 'none'}
              color={i < Math.floor(product.rating) ? '#ffd700' : '#ddd'}
            />
          ))}
        </div>
        <span style={{ fontSize: '14px', color: '#666' }}>({product.reviews})</span>
      </div>
      <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#1a1a2e', marginBottom: '1rem' }}>
        ${product.price}
      </p>
      <button
        onClick={handleViewProduct}
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#1a1a2e',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: 'bold'
        }}
      >
        View Product
      </button>
    </div>
  );
};

const ProductGrid = () => {
  const { searchQuery, selectedCategory } = useAppContext();

  const filteredProducts = sampleProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ padding: '2rem' }}>
      <h3 style={{ marginBottom: '2rem', fontSize: '1.8rem', color: '#333', textAlign: 'center' }}>
        Featured Products
      </h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '2rem'
      }}>
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {filteredProducts.length === 0 && (
        <p style={{ textAlign: 'center', color: '#666', fontSize: '1.1rem', marginTop: '2rem' }}>
          No products found matching your criteria.
        </p>
      )}
    </div>
  );
};

const ProductDetail = () => {
  const { selectedProduct, setCurrentPage, cart, setCart, user, setShowLogin } = useAppContext();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(selectedProduct?.colors[0] || '');
  const [selectedSize, setSelectedSize] = useState(selectedProduct?.sizes[0] || '');

  if (!selectedProduct) return null;

  const addToCart = () => {
    if (!user) {
      setShowLogin(true);
      return;
    }

    const existingItem = cart.find(item => 
      item.id === selectedProduct.id && 
      item.color === selectedColor && 
      item.size === selectedSize
    );

    if (existingItem) {
      setCart(cart.map(item =>
        item.id === selectedProduct.id && item.color === selectedColor && item.size === selectedSize
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, {
        ...selectedProduct,
        color: selectedColor,
        size: selectedSize,
        quantity: 1
      }]);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <button
        onClick={() => setCurrentPage('home')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'none',
          border: 'none',
          color: '#1a1a2e',
          cursor: 'pointer',
          fontSize: '14px',
          marginBottom: '2rem'
        }}
      >
        <ArrowLeft size={20} />
        Back to Products
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
        <div>
          <img
            src={selectedProduct.images[currentImageIndex]}
            alt={selectedProduct.name}
            style={{
              width: '100%',
              height: '400px',
              objectFit: 'cover',
              borderRadius: '12px',
              marginBottom: '1rem'
            }}
          />
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {selectedProduct.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${selectedProduct.name} ${index + 1}`}
                onClick={() => setCurrentImageIndex(index)}
                style={{
                  width: '80px',
                  height: '80px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  border: index === currentImageIndex ? '3px solid #1a1a2e' : '1px solid #ddd'
                }}
              />
            ))}
          </div>
        </div>

        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#333' }}>
            {selectedProduct.name}
          </h1>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  fill={i < Math.floor(selectedProduct.rating) ? '#ffd700' : 'none'}
                  color={i < Math.floor(selectedProduct.rating) ? '#ffd700' : '#ddd'}
                />
              ))}
            </div>
            <span style={{ color: '#666' }}>({selectedProduct.reviews} reviews)</span>
          </div>

          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1a1a2e', marginBottom: '1rem' }}>
            ${selectedProduct.price}
          </p>

          <p style={{ color: '#666', marginBottom: '2rem', lineHeight: '1.6' }}>
            {selectedProduct.description}
          </p>

          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ marginBottom: '0.5rem', color: '#333' }}>Color:</h4>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {selectedProduct.colors.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '6px',
                    border: selectedColor === color ? '2px solid #1a1a2e' : '1px solid #ddd',
                    backgroundColor: selectedColor === color ? '#1a1a2e' : 'white',
                    color: selectedColor === color ? 'white' : '#333',
                    cursor: 'pointer'
                  }}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ marginBottom: '0.5rem', color: '#333' }}>Size:</h4>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {selectedProduct.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '6px',
                    border: selectedSize === size ? '2px solid #1a1a2e' : '1px solid #ddd',
                    backgroundColor: selectedSize === size ? '#1a1a2e' : 'white',
                    color: selectedSize === size ? 'white' : '#333',
                    cursor: 'pointer'
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={addToCart}
            style={{
              width: '100%',
              padding: '15px',
              backgroundColor: '#ff4757',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            <ShoppingCart size={20} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const Cart = () => {
  const { cart, setCart, setCurrentPage, user } = useAppContext();

  const updateQuantity = (id, color, size, newQuantity) => {
    if (newQuantity === 0) {
      setCart(cart.filter(item => !(item.id === id && item.color === color && item.size === size)));
    } else {
      setCart(cart.map(item =>
        item.id === id && item.color === color && item.size === size
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const proceedToCheckout = () => {
    if (cart.length > 0) {
      setCurrentPage('checkout');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '2rem', fontSize: '2rem', color: '#333' }}>Shopping Cart</h2>
      
      {cart.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <ShoppingCart size={64} color="#ddd" style={{ marginBottom: '1rem' }} />
          <p style={{ color: '#666', fontSize: '1.1rem' }}>Your cart is empty</p>
          <button
            onClick={() => setCurrentPage('home')}
            style={{
              marginTop: '1rem',
              padding: '10px 20px',
              backgroundColor: '#1a1a2e',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          {cart.map((item, index) => (
            <div key={`${item.id}-${item.color}-${item.size}`} style={{
              display: 'flex',
              gap: '1rem',
              padding: '1rem',
              border: '1px solid #eee',
              borderRadius: '8px',
              marginBottom: '1rem'
            }}>
              <img
                src={item.images[0]}
                alt={item.name}
                style={{
                  width: '100px',
                  height: '100px',
                  objectFit: 'cover',
                  borderRadius: '8px'
                }}
              />
              <div style={{ flex: 1 }}>
                <h4 style={{ marginBottom: '0.5rem' }}>{item.name}</h4>
                <p style={{ color: '#666', fontSize: '14px', marginBottom: '0.5rem' }}>
                  Color: {item.color} | Size: {item.size}
                </p>
                <p style={{ fontWeight: 'bold', color: '#1a1a2e' }}>${item.price}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity - 1)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    border: '1px solid #ddd',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Minus size={16} />
                </button>
                <span style={{ minWidth: '30px', textAlign: 'center' }}>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity + 1)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    border: '1px solid #ddd',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          ))}
          
          <div style={{
            borderTop: '2px solid #eee',
            paddingTop: '1rem',
            marginTop: '2rem'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem'
            }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Total: ${total.toFixed(2)}</span>
            </div>
            <button
              onClick={proceedToCheckout}
              style={{
                width: '100%',
                padding: '15px',
                backgroundColor: '#ff4757',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const Checkout = () => {
  const { cart, setCurrentPage, setOrders, orders } = useAppContext();
  const [step, setStep] = useState(1);
  const [deliveryAddress, setDeliveryAddress] = useState({
    name: '',
    address: '',
    city: '',
    zipCode: '',
    phone: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('card');

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handlePlaceOrder = () => {
    const newOrder = {
      id: Date.now(),
      items: cart,
      total: total,
      deliveryAddress: deliveryAddress,
      paymentMethod: paymentMethod,
      date: new Date().toLocaleDateString(),
      status: 'Processing'
    };
    
    setOrders([...orders, newOrder]);
    setCurrentPage('orderConfirmation');
  };

  const handleInputChange = (field, value) => {
    setDeliveryAddress(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '2rem', fontSize: '2rem', color: '#333' }}>Checkout</h2>
      
      {step === 1 && (
        <div>
          <h3 style={{ marginBottom: '1.5rem', color: '#333' }}>Delivery Address</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
              type="text"
              placeholder="Full Name"
              value={deliveryAddress.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              style={{
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '16px'
              }}
            />
            <input
              type="text"
              placeholder="Address"
              value={deliveryAddress.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              style={{
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '16px'
              }}
            />
            <input
              type="text"
              placeholder="City"
              value={deliveryAddress.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              style={{
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '16px'
              }}
            />
            <input
              type="text"
              placeholder="ZIP Code"
              value={deliveryAddress.zipCode}
              onChange={(e) => handleInputChange('zipCode', e.target.value)}
              style={{
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '16px'
              }}
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={deliveryAddress.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              style={{
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '16px'
              }}
            />
            <button
              onClick={() => setStep(2)}
              disabled={!deliveryAddress.name || !deliveryAddress.address || !deliveryAddress.city}
              style={{
                padding: '15px',
                backgroundColor: deliveryAddress.name && deliveryAddress.address && deliveryAddress.city ? '#1a1a2e' : '#ccc',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1.1rem',
                cursor: deliveryAddress.name && deliveryAddress.address && deliveryAddress.city ? 'pointer' : 'not-allowed',
                marginTop: '1rem'
              }}
            >
              Continue to Payment
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3 style={{ marginBottom: '1.5rem', color: '#333' }}>Payment Method</h3>
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="radio"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <CreditCard size={20} />
                Credit/Debit Card
              </label>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="radio"
                  value="paypal"
                  checked={paymentMethod === 'paypal'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                PayPal
              </label>
            </div>
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="radio"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Cash on Delivery
              </label>
            </div>
          </div>

          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1rem'
          }}>
            <h4 style={{ marginBottom: '1rem' }}>Order Summary</h4>
            {cart.map((item, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div style={{ borderTop: '1px solid #ddd', paddingTop: '0.5rem', marginTop: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={() => setStep(1)}
              style={{
                flex: 1,
                padding: '15px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1.1rem',
                cursor: 'pointer'
              }}
            >
              Back
            </button>
            <button
              onClick={handlePlaceOrder}
              style={{
                flex: 2,
                padding: '15px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1.1rem',
                cursor: 'pointer'
              }}
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const OrderConfirmation = () => {
  const { setCurrentPage, setCart } = useAppContext();

  React.useEffect(() => {
    setCart([]);
  }, []);

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ 
        backgroundColor: '#d4edda', 
        border: '1px solid #c3e6cb', 
        color: '#155724',
        padding: '2rem',
        borderRadius: '8px',
        marginBottom: '2rem'
      }}>
        <h2 style={{ marginBottom: '1rem' }}>Order Placed Successfully!</h2>
        <p>Thank you for your purchase. Your order has been confirmed and will be processed shortly.</p>
      </div>
      
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <button
          onClick={() => setCurrentPage('orders')}
          style={{
            padding: '12px 24px',
            backgroundColor: '#1a1a2e',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          View Orders
        </button>
        <button
          onClick={() => setCurrentPage('home')}
          style={{
            padding: '12px 24px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

const Orders = () => {
  const { orders, setCurrentPage } = useAppContext();

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '2rem', fontSize: '2rem', color: '#333' }}>Order History</h2>
      
      {orders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <Clock size={64} color="#ddd" style={{ marginBottom: '1rem' }} />
          <p style={{ color: '#666', fontSize: '1.1rem' }}>No orders yet</p>
          <button
            onClick={() => setCurrentPage('home')}
            style={{
              marginTop: '1rem',
              padding: '10px 20px',
              backgroundColor: '#1a1a2e',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Start Shopping
          </button>
        </div>
      ) : (
        orders.map((order) => (
          <div key={order.id} style={{
            border: '1px solid #eee',
            borderRadius: '8px',
            padding: '1.5rem',
            marginBottom: '1rem',
            backgroundColor: 'white'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3>Order #{order.id}</h3>
              <span style={{
                padding: '4px 12px',
                backgroundColor: '#28a745',
                color: 'white',
                borderRadius: '4px',
                fontSize: '12px'
              }}>
                {order.status}
              </span>
            </div>
            <p style={{ color: '#666', marginBottom: '1rem' }}>Date: {order.date}</p>
            
            <div style={{ marginBottom: '1rem' }}>
              <h4 style={{ marginBottom: '0.5rem' }}>Items:</h4>
              {order.items.map((item, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  marginBottom: '0.5rem',
                  fontSize: '14px'
                }}>
                  <span>{item.name} ({item.color}, {item.size}) x {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div style={{ 
              borderTop: '1px solid #eee', 
              paddingTop: '1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <strong>Total: ${order.total.toFixed(2)}</strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#666' }}>
                <MapPin size={16} />
                <span style={{ fontSize: '14px' }}>
                  {order.deliveryAddress.address}, {order.deliveryAddress.city}
                </span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const Login = () => {
  const { setUser, setShowLogin, showLogin } = useAppContext();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  if (!showLogin) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      // Simulate login
      setUser({ name: formData.email.split('@')[0], email: formData.email });
    } else {
      // Simulate registration
      setUser({ name: formData.name, email: formData.email });
    }
    setShowLogin(false);
    setFormData({ name: '', email: '', password: '' });
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '12px',
        width: '400px',
        maxWidth: '90vw'
      }}>
        <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '1rem',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '1rem',
              border: '1px solid #ddd',
              borderRadius: '8px',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '1.5rem',
              border: '1px solid #ddd',
              borderRadius: '8px',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
          />
          
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#1a1a2e',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: 'pointer',
              marginBottom: '1rem'
            }}
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => setIsLogin(!isLogin)}
            style={{
              background: 'none',
              border: 'none',
              color: '#1a1a2e',
              cursor: 'pointer',
              textDecoration: 'underline',
              marginRight: '1rem'
            }}
          >
            {isLogin ? 'Need an account? Sign up' : 'Have an account? Login'}
          </button>
          <button
            onClick={() => setShowLogin(false)}
            style={{
              background: 'none',
              border: 'none',
              color: '#666',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const Profile = () => {
  const { user, setUser, setCurrentPage } = useAppContext();

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '2rem', fontSize: '2rem', color: '#333' }}>Profile</h2>
      
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '12px',
        border: '1px solid #eee'
      }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333', fontWeight: 'bold' }}>
            Name:
          </label>
          <p style={{ fontSize: '1.1rem', color: '#666' }}>{user?.name}</p>
        </div>
        
        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333', fontWeight: 'bold' }}>
            Email:
          </label>
          <p style={{ fontSize: '1.1rem', color: '#666' }}>{user?.email}</p>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={() => setCurrentPage('orders')}
            style={{
              padding: '12px 24px',
              backgroundColor: '#1a1a2e',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            View Orders
          </button>
          <button
            onClick={handleLogout}
            style={{
              padding: '12px 24px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [orders, setOrders] = useState([]);

  const contextValue = {
    currentPage,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedProduct,
    setSelectedProduct,
    cart,
    setCart,
    user,
    setUser,
    showLogin,
    setShowLogin,
    orders,
    setOrders
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <HeroSlider />
            <CategoryFilter />
            <ProductGrid />
          </>
        );
      case 'product':
        return <ProductDetail />;
      case 'cart':
        return <Cart />;
      case 'checkout':
        return <Checkout />;
      case 'orderConfirmation':
        return <OrderConfirmation />;
      case 'orders':
        return <Orders />;
      case 'profile':
        return <Profile />;
      default:
        return (
          <>
            <HeroSlider />
            <CategoryFilter />
            <ProductGrid />
          </>
        );
    }
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
        <Navbar />
        {renderPage()}
        <Login />
      </div>
    </AppContext.Provider>
  );
};

export default App;