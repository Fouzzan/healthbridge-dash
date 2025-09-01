import React, { useState } from 'react';
import { AlertTriangle, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface EmergencyButtonProps {
  userRole: string;
}

const EmergencyButton: React.FC<EmergencyButtonProps> = ({ userRole }) => {
  const [showModal, setShowModal] = useState(false);
  const [dispatched, setDispatched] = useState(false);
  const { toast } = useToast();

  // Only show for patients
  if (userRole !== 'patient') return null;

  const handleEmergencyClick = () => {
    setShowModal(true);
    setDispatched(false);
  };

  const confirmEmergency = () => {
    setDispatched(true);
    toast({
      title: "Emergency Services Dispatched",
      description: "Help is on the way. Stay calm and follow any instructions given.",
      variant: "default"
    });
    
    // Auto close after showing success
    setTimeout(() => {
      setShowModal(false);
      setDispatched(false);
    }, 3000);
  };

  // Mock location (in a real app, this would use geolocation)
  const mockLocation = "123 Main St, Downtown, City 12345";

  return (
    <>
      <button
        onClick={handleEmergencyClick}
        className="medical-emergency-btn"
        title="Emergency SOS"
      >
        <AlertTriangle className="w-6 h-6" />
      </button>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center text-destructive">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Emergency SOS
            </DialogTitle>
            <DialogDescription>
              {!dispatched ? (
                "You are about to contact emergency services. Please confirm your location and proceed only if this is a real emergency."
              ) : (
                "Emergency services have been notified and are on their way."
              )}
            </DialogDescription>
          </DialogHeader>
          
          {!dispatched ? (
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Current Location</p>
                  <p className="text-sm text-muted-foreground">{mockLocation}</p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setShowModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={confirmEmergency}
                  className="flex-1 medical-button-destructive"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Emergency
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                <Phone className="w-8 h-8 text-success" />
              </div>
              <div>
                <p className="font-medium text-success">Emergency Services Contacted</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Expected arrival: 8-12 minutes
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EmergencyButton;