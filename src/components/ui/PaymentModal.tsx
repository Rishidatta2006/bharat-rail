
import { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { CreditCard, Landmark, Smartphone } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  onSuccess: () => void;
}

const PaymentModal = ({ isOpen, onClose, amount, onSuccess }: PaymentModalProps) => {
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  
  // Form data state
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [upiId, setUpiId] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  
  const handlePayment = () => {
    // Validate based on payment method
    if (paymentMethod === 'credit_card' || paymentMethod === 'debit_card') {
      if (!cardNumber || !expiryDate || !cvv || !nameOnCard) {
        toast({
          title: "Missing Information",
          description: "Please fill in all card details",
          variant: "destructive"
        });
        return;
      }
      if (cardNumber.length < 16) {
        toast({
          title: "Invalid Card Number",
          description: "Please enter a valid card number",
          variant: "destructive"
        });
        return;
      }
    } else if (paymentMethod === 'upi') {
      if (!upiId || !upiId.includes('@')) {
        toast({
          title: "Invalid UPI ID",
          description: "Please enter a valid UPI ID",
          variant: "destructive"
        });
        return;
      }
    } else if (paymentMethod === 'net_banking') {
      if (!bankName || !accountNumber) {
        toast({
          title: "Missing Information",
          description: "Please fill in all banking details",
          variant: "destructive"
        });
        return;
      }
    }
    
    // Process payment
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Payment Successful",
        description: `Your payment of ₹${amount.toFixed(2)} was successful`,
      });
      onSuccess();
    }, 1500);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Complete Your Payment</DialogTitle>
          <DialogDescription>
            Please select your preferred payment method to complete your booking.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-6">
          <div>
            <p className="font-semibold text-lg">Total Amount: <span className="text-primary-600">₹{amount.toFixed(2)}</span></p>
          </div>
          
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
            <div className="flex items-center space-x-2 border p-3 rounded-md hover:bg-gray-50">
              <RadioGroupItem value="credit_card" id="credit_card" />
              <Label htmlFor="credit_card" className="flex items-center space-x-2 cursor-pointer w-full">
                <CreditCard className="h-5 w-5" />
                <span>Credit Card</span>
              </Label>
            </div>
            
            <div className="flex items-center space-x-2 border p-3 rounded-md hover:bg-gray-50">
              <RadioGroupItem value="debit_card" id="debit_card" />
              <Label htmlFor="debit_card" className="flex items-center space-x-2 cursor-pointer w-full">
                <CreditCard className="h-5 w-5" />
                <span>Debit Card</span>
              </Label>
            </div>
            
            <div className="flex items-center space-x-2 border p-3 rounded-md hover:bg-gray-50">
              <RadioGroupItem value="upi" id="upi" />
              <Label htmlFor="upi" className="flex items-center space-x-2 cursor-pointer w-full">
                <Smartphone className="h-5 w-5" />
                <span>UPI</span>
              </Label>
            </div>
            
            <div className="flex items-center space-x-2 border p-3 rounded-md hover:bg-gray-50">
              <RadioGroupItem value="net_banking" id="net_banking" />
              <Label htmlFor="net_banking" className="flex items-center space-x-2 cursor-pointer w-full">
                <Landmark className="h-5 w-5" />
                <span>Net Banking</span>
              </Label>
            </div>
          </RadioGroup>
          
          {/* Conditional form based on payment method */}
          <div className="space-y-4 mt-4">
            {(paymentMethod === 'credit_card' || paymentMethod === 'debit_card') && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="card_number">Card Number</Label>
                  <Input 
                    id="card_number" 
                    placeholder="1234 5678 9012 3456" 
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    maxLength={16}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry_date">Expiry Date</Label>
                    <Input 
                      id="expiry_date" 
                      placeholder="MM/YY" 
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      maxLength={5}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input 
                      id="cvv" 
                      placeholder="123" 
                      type="password"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      maxLength={3}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="name_on_card">Name on Card</Label>
                  <Input 
                    id="name_on_card" 
                    placeholder="John Doe" 
                    value={nameOnCard}
                    onChange={(e) => setNameOnCard(e.target.value)}
                  />
                </div>
              </>
            )}
            
            {paymentMethod === 'upi' && (
              <div className="space-y-2">
                <Label htmlFor="upi_id">UPI ID</Label>
                <Input 
                  id="upi_id" 
                  placeholder="name@upi" 
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                />
              </div>
            )}
            
            {paymentMethod === 'net_banking' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="bank_name">Bank Name</Label>
                  <Input 
                    id="bank_name" 
                    placeholder="Your Bank Name" 
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="account_number">Account Number</Label>
                  <Input 
                    id="account_number" 
                    placeholder="Your Account Number" 
                    type="password"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                  />
                </div>
              </>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isProcessing}>Cancel</Button>
          <Button onClick={handlePayment} disabled={isProcessing}>
            {isProcessing ? "Processing..." : "Pay ₹" + amount.toFixed(2)}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
