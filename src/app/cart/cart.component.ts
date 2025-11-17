// ===== cart.component.ts =====
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService, CartItem } from '../services/cart.service';
import { CheckoutModalComponent } from "../checkout-modal/checkout-modal.component";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, CheckoutModalComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  // ============ Properties ============
  cartItems: CartItem[] = [];
  selectedPayment: string = 'card';
  markAsGift: boolean = false;
  discount: number = 1.82;
  showCheckoutModal: boolean = false;
  
  // Shipping Address Data
  shippingAddress = {
    country: 'Egypt',
    fullName: '',
    streetAddress: '',
    apartment: '',
    city: '',
    province: '',
    postalCode: '',
    countryCode: '+20',
    phoneNumber: ''
  };
  
  private cartSubscription?: Subscription;

  // ============ Constructor ============
  constructor(
    private cartService: CartService,
    private router: Router
  ) { }

  // ============ Lifecycle Hooks ============
  
  ngOnInit(): void {
    // Subscribe to cart updates - single source of truth
    this.cartSubscription = this.cartService.cart$.subscribe({
      next: (items) => {
        this.cartItems = items;
      },
      error: (error) => {
        console.error('Cart subscription error:', error);
      }
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  // ============ Quantity Methods ============
  
  /**
   * Increase product quantity
   */
  increaseQuantity(itemId: number): void {
    const item = this.cartItems.find(i => i.id === itemId);
    if (item) {
      this.cartService.increaseQuantity(itemId, item.color, item.size);
    }
  }

  /**
   * Decrease product quantity
   */
  decreaseQuantity(itemId: number): void {
    const item = this.cartItems.find(i => i.id === itemId);
    if (item) {
      this.cartService.decreaseQuantity(itemId, item.color, item.size);
    }
  }

  // ============ Cart Calculations ============
  
  /**
   * Calculate subtotal
   */
  getSubtotal(): number {
    return this.cartService.getCartTotal();
  }

  /**
   * Calculate total items count
   */
  getTotalItems(): number {
    return this.cartService.getCartCount();
  }

  /**
   * Calculate final total
   */
  getTotal(): number {
    return Math.max(0, this.getSubtotal() - this.discount);
  }

  // ============ Cart Actions ============
  
  /**
   * Remove item from cart
   */
  removeItem(itemId: number): void {
    const item = this.cartItems.find(i => i.id === itemId);
    if (!item) return;
    
    const confirmDelete = confirm(`Remove "${item.productName}" from cart?`);
    if (confirmDelete) {
      this.cartService.removeFromCart(itemId, item.color, item.size);
    }
  }

  /**
   * Save item for later
   */
  saveForLater(itemId: number): void {
    const item = this.cartItems.find(i => i.id === itemId);
    if (!item) return;
    
    try {
      // Get existing saved items
      const savedItems = JSON.parse(localStorage.getItem('saved_items') || '[]');
      
      // Add current item
      savedItems.push(item);
      localStorage.setItem('saved_items', JSON.stringify(savedItems));
      
      // Remove from cart
      this.cartService.removeFromCart(itemId, item.color, item.size);
      
      console.log('Item saved for later:', item.productName);
    } catch (error) {
      console.error('Error saving item for later:', error);
      alert('Failed to save item. Please try again.');
    }
  }

  // ============ Payment Methods ============
  
  /**
   * Select payment method
   */
  selectPayment(method: string): void {
    this.selectedPayment = method;
  }

  /**
   * Apply coupon code
   */
  applyCoupon(): void {
    const couponCode = prompt('Enter coupon code:');
    if (couponCode && couponCode.trim()) {
      console.log('Applying coupon:', couponCode);
      // TODO: Implement coupon validation logic
      alert('Coupon feature will be implemented soon!');
    }
  }

  // ============ Navigation Methods ============
  
  /**
   * Go back to shopping
   */
  goToShop(): void {
    this.router.navigate(['/products']);
  }

  // ============ Checkout Methods ============
  
  /**
   * Proceed to checkout - open modal
   */
  proceedToCheckout(): void {
    if (this.cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    
    this.showCheckoutModal = true;
  }

  /**
   * Close checkout modal
   */
  closeCheckoutModal(): void {
    this.showCheckoutModal = false;
  }

  /**
   * Submit shipping address form
   */
  submitAddress(): void {
    if (!this.isFormValid()) {
      alert('Please fill all required fields');
      return;
    }
    
    try {
      // Prepare checkout data
      const checkoutData = {
        items: this.cartItems,
        subtotal: this.getSubtotal(),
        discount: this.discount,
        total: this.getTotal(),
        paymentMethod: this.selectedPayment,
        isGift: this.markAsGift,
        shippingAddress: this.shippingAddress,
        timestamp: new Date().toISOString()
      };
      
      // Save to localStorage
      localStorage.setItem('shipping_address', JSON.stringify(this.shippingAddress));
      localStorage.setItem('checkout_data', JSON.stringify(checkoutData));
      
      console.log('Checkout data saved:', checkoutData);
      
      alert('Address saved successfully! Proceeding to payment...');
      this.closeCheckoutModal();
      
      // Navigate to payment page (optional)
      // this.router.navigate(['/payment']);
      
    } catch (error) {
      console.error('Error saving checkout data:', error);
      alert('Failed to save address. Please try again.');
    }
  }

onOrderComplete(orderData: any): void {
  console.log('Order completed:', orderData);
  // Clear cart
  this.cartService.clearCart();
  // Navigate to success page
  this.router.navigate(['/order-success']);
}

  /**
   * Validate shipping address form
   */
  isFormValid(): boolean {
    return !!(
      this.shippingAddress.country &&
      this.shippingAddress.fullName.trim() &&
      this.shippingAddress.streetAddress.trim() &&
      this.shippingAddress.city.trim() &&
      this.shippingAddress.phoneNumber.trim()
    );
  }

  // ============ Utility Methods ============
  
  /**
   * Handle image load error
   */
  handleImageError(event: any): void {
    event.target.src = 'https://via.placeholder.com/120x120/E0E0E0/666666?text=No+Image';
  }
}