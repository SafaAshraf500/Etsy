// ===== checkout-modal.component.ts =====
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ShippingAddress {
  country: string;
  fullName: string;
  streetAddress: string;
  apartment: string;
  city: string;
  province: string;
  postalCode: string;
  countryCode: string;
  phoneNumber: string;
}

interface PaymentData {
  cardNumber: string;
  expirationDate: string;
  securityCode: string;
  nameOnCard: string;
  billingAddressSame: boolean;
}

@Component({
  selector: 'app-checkout-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout-modal.component.html',
  styleUrls: ['./checkout-modal.component.css']
})
export class CheckoutModalComponent {
  // ============ Inputs & Outputs ============
  @Input() show: boolean = false;
  @Input() cartTotal: number = 0;
  @Input() cartItems: any[] = [];
  @Output() close = new EventEmitter<void>();
  @Output() orderComplete = new EventEmitter<any>();

  // ============ Step Management ============
  currentStep: number = 1; // 1=Shipping, 2=Payment, 3=Review

  // ============ Shipping Data ============
  shippingAddress: ShippingAddress = {
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

  // ============ Payment Data ============
  paymentData: PaymentData = {
    cardNumber: '',
    expirationDate: '',
    securityCode: '',
    nameOnCard: '',
    billingAddressSame: true
  };

  submittedShipping: boolean = false;
  submittedPayment: boolean = false;

  // ============ Methods ============

  /**
   * Close modal
   */
  closeModal(): void {
    this.close.emit();
  }

  /**
   * Stop propagation for modal content clicks
   */
  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  // ============ Step 1: Shipping Methods ============

  /**
   * Validate shipping form
   */
  isShippingValid(): boolean {
    return !!(
      this.shippingAddress.country &&
      this.shippingAddress.fullName.trim() &&
      this.shippingAddress.streetAddress.trim() &&
      this.shippingAddress.city.trim() &&
      this.shippingAddress.phoneNumber.trim()
    );
  }

  /**
   * Continue to payment step
   */
  continueToPayment(): void {
    if (!this.isShippingValid()) {
      alert('Please fill all required fields');
      return;
    }
    
    // Save shipping address
    localStorage.setItem('shipping_address', JSON.stringify(this.shippingAddress));
    
    // Move to payment step
    this.currentStep = 2;
    console.log('Moving to payment step');
  }

  // ============ Step 2: Payment Methods ============

  /**
   * Validate payment form
   */
  isPaymentValid(): boolean {
    return !!(
      this.paymentData.cardNumber.trim() &&
      this.paymentData.expirationDate.trim() &&
      this.paymentData.securityCode.trim() &&
      this.paymentData.nameOnCard.trim()
    );
  }

  /**
   * Continue to review step
   */
  continueToReview(): void {
    if (!this.isPaymentValid()) {
      alert('Please fill all payment fields');
      return;
    }
    
    // Move to review step
    this.currentStep = 3;
    console.log('Moving to review step');
  }

  /**
   * Go back to shipping
   */
  backToShipping(): void {
    this.currentStep = 1;
  }

  // ============ Step 3: Review Methods ============

  /**
   * Go back to payment
   */
  backToPayment(): void {
    this.currentStep = 2;
  }

  /**
   * Complete order
   */
  completeOrder(): void {
    const orderData = {
      shippingAddress: this.shippingAddress,
      paymentData: {
        ...this.paymentData,
        cardNumber: '****' + this.paymentData.cardNumber.slice(-4) // Mask card number
      },
      cartItems: this.cartItems,
      total: this.cartTotal,
      orderDate: new Date().toISOString()
    };
    
    // Save order
    localStorage.setItem('last_order', JSON.stringify(orderData));
    
    // Emit order complete
    this.orderComplete.emit(orderData);
    
    // Show success message
    alert('Order placed successfully! 🎉');
    
    // Close modal
    this.closeModal();
  }

  // ============ Helper Methods ============

  /**
   * Format card number with spaces
   */
  formatCardNumber(): void {
    let value = this.paymentData.cardNumber.replace(/\s/g, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    this.paymentData.cardNumber = formattedValue;
  }

  /**
   * Format expiration date (MM/YY)
   */
  formatExpirationDate(): void {
    let value = this.paymentData.expirationDate.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    this.paymentData.expirationDate = value;
  }

  /**
   * Get masked card number for review
   */
  getMaskedCardNumber(): string {
    const last4 = this.paymentData.cardNumber.replace(/\s/g, '').slice(-4);
    return `**** **** **** ${last4}`;
  }
}