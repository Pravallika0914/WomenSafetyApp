import { motion, AnimatePresence } from "framer-motion";
import { Phone, Volume2, X, Shield, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmergencyScreenProps {
  onClose: () => void;
  onFakeCall: () => void;
  onLoudAlarm: () => void;
  selectedState: string;
  helplines: { police: string; women: string; ambulance: string; fire: string };
}
<h1 className="text-4xl text-red-600 font-bold">
  Tailwind Test
</h1>

const EmergencyScreen = ({
  onClose,
  onFakeCall,
  onLoudAlarm,
  selectedState,
  helplines,
}: EmergencyScreenProps) => {
  const emergencyOptions = [
    {
      label: "Call Police",
      number: helplines.police,
      icon: Shield,
      color: "bg-blue-600",
    },
    {
      label: "Women Helpline",
      number: helplines.women,
      icon: Phone,
      color: "bg-primary",
    },
    {
      label: "Ambulance",
      number: helplines.ambulance,
      icon: Phone,
      color: "bg-safe",
    },
    {
      label: "Fire",
      number: helplines.fire,
      icon: Phone,
      color: "bg-orange-500",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col bg-gradient-to-b from-emergency/95 to-emergency p-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-emergency-foreground/80">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">{selectedState}</span>
        </div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="text-emergency-foreground hover:bg-emergency-foreground/20"
          >
            <X className="h-6 w-6" />
          </Button>
        </motion.div>
      </div>

      {/* Emergency Title */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mt-8 text-center"
      >
        <h1 className="text-3xl font-bold text-emergency-foreground">Emergency Mode</h1>
        <p className="mt-2 text-emergency-foreground/80">Choose an action below</p>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mt-8 grid grid-cols-2 gap-4"
      >
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Button
            onClick={onFakeCall}
            className="h-24 w-full flex-col gap-2 bg-background/95 text-foreground hover:bg-background"
            variant="secondary"
          >
            <Phone className="h-8 w-8" />
            <span className="text-sm font-semibold">Fake Call</span>
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Button
            onClick={onLoudAlarm}
            className="h-24 w-full flex-col gap-2 bg-warning text-warning-foreground hover:bg-warning/90"
          >
            <Volume2 className="h-8 w-8" />
            <span className="text-sm font-semibold">Loud Alarm</span>
          </Button>
        </motion.div>
      </motion.div>

      {/* Helpline Numbers */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-6 flex-1"
      >
        <h2 className="mb-4 text-lg font-semibold text-emergency-foreground">
          Emergency Helplines
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {emergencyOptions.map((option, index) => (
            <motion.a
              key={option.label}
              href={`tel:${option.number}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex flex-col items-center justify-center gap-2 rounded-xl bg-background/95 p-4 shadow-lg"
            >
              <div className={`rounded-full ${option.color} p-3`}>
                <option.icon className="h-5 w-5 text-white" />
              </div>
              <span className="text-sm font-medium text-foreground">{option.label}</span>
              <span className="text-lg font-bold text-foreground">{option.number}</span>
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Bottom safety message */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 text-center text-sm text-emergency-foreground/70"
      >
        Stay calm. Help is available 24/7.
      </motion.p>
    </motion.div>
  );
};

export default EmergencyScreen;
