import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Stethoscope, Heart, Shield, User } from 'lucide-react';

interface LoginPageProps {
  onLogin: (role: 'patient' | 'clinician' | 'admin') => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRoleLogin = (role: 'patient' | 'clinician' | 'admin') => {
    // In a real app, this would validate credentials
    onLogin(role);
  };

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

        {/* Login Form */}
        <Card className="medical-card">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Enter your credentials to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Role Selection */}
        <Card className="medical-card">
          <CardHeader>
            <CardTitle>Choose Your Role</CardTitle>
            <CardDescription>Select how you want to access MediConnect</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              className="w-full justify-start h-12 medical-button-primary"
              onClick={() => handleRoleLogin('patient')}
            >
              <User className="w-5 h-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Patient Portal</div>
                <div className="text-xs opacity-90">Manage appointments, view records</div>
              </div>
            </Button>
            
            <Button
              className="w-full justify-start h-12 medical-button-primary"
              onClick={() => handleRoleLogin('clinician')}
            >
              <Stethoscope className="w-5 h-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Clinician Dashboard</div>
                <div className="text-xs opacity-90">Patient management, schedules</div>
              </div>
            </Button>
            
            <Button
              className="w-full justify-start h-12 medical-button-primary"
              onClick={() => handleRoleLogin('admin')}
            >
              <Shield className="w-5 h-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Administrator Panel</div>
                <div className="text-xs opacity-90">System management, analytics</div>
              </div>
            </Button>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>Demo credentials not required - simply select your role above</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;