import { motion, AnimatePresence } from "framer-motion";
import { Shield, AlertCircle, Phone, Volume2, BookOpen, MapPin } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { stateHelplines } from "@/data/safetyData";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import EmergencyScreen from "@/components/EmergencyScreen";
import FakeCall from "@/components/FakeCall";
import LoudAlarm from "@/components/LoudAlarm";
import SafetyTips from "@/components/SafetyTips";
import HelplineDirectory from "@/components/HelplineDirectory";

const Index = () => {
  const { preferences, savePreferences } = useLocalStorage();
  const [showEmergency, setShowEmergency] = useState(false);
  const [showFakeCall, setShowFakeCall] = useState(false);
  const [showAlarm, setShowAlarm] = useState(false);

  const handleEmergencyOpen = () => {
    setShowEmergency(true);
    savePreferences({ lastAccessedMode: "emergency" });
  };

  const handleStateChange = (state: string) => {
    savePreferences({ selectedState: state });
  };

  const helplines = stateHelplines[preferences.selectedState] || stateHelplines["Delhi"];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative overflow-hidden gradient-hero">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            {/* Logo */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.8 }}
              className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary shadow-lg"
            >
              <Shield className="h-10 w-10 text-primary-foreground" />
            </motion.div>

            <h1 className="text-3xl font-bold text-foreground md:text-4xl">
              Women <span className="text-gradient">Safety</span> App
            </h1>
            <p className="mx-auto mt-4 max-w-md text-muted-foreground">
              Your safety companion. Quick access to emergency help, fake calls, loud alarms, and safety resources.
            </p>

            {/* Emergency Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8"
            >
              <Button
                onClick={handleEmergencyOpen}
                variant="emergency"
                size="xl"
                className="px-12 text-lg"
              >
                <AlertCircle className="mr-2 h-6 w-6" />
                EMERGENCY
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent/5 blur-3xl" />
      </header>

      {/* Quick Actions */}
      <section className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-center"
        >
          <h2 className="text-2xl font-bold text-foreground">Quick Actions</h2>
          <p className="mt-2 text-muted-foreground">Instant safety features at your fingertips</p>
        </motion.div>

        <div className="mx-auto grid max-w-2xl grid-cols-2 gap-4 md:grid-cols-4">
          {[
            {
              icon: Phone,
              label: "Fake Call",
              description: "Simulate incoming call",
              onClick: () => setShowFakeCall(true),
              color: "bg-primary/10 text-primary",
            },
            {
              icon: Volume2,
              label: "Loud Alarm",
              description: "Attract attention",
              onClick: () => setShowAlarm(true),
              color: "bg-warning/10 text-warning",
            },
            {
              icon: BookOpen,
              label: "Safety Tips",
              description: "Learn guidelines",
              onClick: () => document.getElementById("tips")?.scrollIntoView({ behavior: "smooth" }),
              color: "bg-accent/10 text-accent",
            },
            {
              icon: MapPin,
              label: "Helplines",
              description: "Emergency numbers",
              onClick: () => document.getElementById("helplines")?.scrollIntoView({ behavior: "smooth" }),
              color: "bg-safe/10 text-safe",
            },
          ].map((action, index) => (
            <motion.button
              key={action.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.97 }}
              onClick={action.onClick}
              className="flex flex-col items-center rounded-2xl bg-card p-6 shadow-lg transition-shadow hover:shadow-xl"
            >
              <div className={`mb-3 rounded-full p-4 ${action.color}`}>
                <action.icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-foreground">{action.label}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{action.description}</p>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Safety Tips Section */}
      <section id="tips" className="container mx-auto px-4">
        <SafetyTips />
      </section>

      {/* Helpline Directory */}
      <section id="helplines" className="container mx-auto px-4">
        <HelplineDirectory
          selectedState={preferences.selectedState}
          onStateChange={handleStateChange}
        />
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="font-semibold text-foreground">Women Safety App</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Stay safe, stay aware. Your safety is our priority.
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Works offline once loaded. All data stored locally.
          </p>
        </div>
      </footer>

      {/* Modals */}
      <AnimatePresence>
        {showEmergency && (
          <EmergencyScreen
            onClose={() => setShowEmergency(false)}
            onFakeCall={() => {
              setShowEmergency(false);
              setShowFakeCall(true);
            }}
            onLoudAlarm={() => {
              setShowEmergency(false);
              setShowAlarm(true);
            }}
            selectedState={preferences.selectedState}
            helplines={helplines}
          />
        )}
        {showFakeCall && <FakeCall onClose={() => setShowFakeCall(false)} />}
        {showAlarm && <LoudAlarm onClose={() => setShowAlarm(false)} />}
      </AnimatePresence>
    </div>
  );
};

export default Index;
