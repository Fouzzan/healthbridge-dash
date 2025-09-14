import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Stethoscope, UserPlus, LogIn } from 'lucide-react';

interface LoginPageProps {
  onSignIn: () => void;
  onSignUp: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onSignIn, onSignUp }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
            <Stethoscope className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">MediConnect</h1>
          <p className="text-muted-foreground">Your comprehensive health management platform</p>
        </div>

        {/* Action Buttons */}
        <Card className="medical-card">
          <CardHeader>
            <CardTitle>Welcome to MediConnect</CardTitle>
            <CardDescription>Your comprehensive health management platform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              className="w-full justify-start h-12 medical-button-primary"
              onClick={onSignIn}
            >
              <LogIn className="w-5 h-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Sign In</div>
                <div className="text-xs opacity-90">Access your existing account</div>
              </div>
            </Button>
            
            <Button
              className="w-full justify-start h-12 medical-button-primary"
              onClick={onSignUp}
            >
              <UserPlus className="w-5 h-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Create Account</div>
                <div className="text-xs opacity-90">Join MediConnect today</div>
              </div>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;