import { motion } from "framer-motion";
import { Phone, Shield, Ambulance, Flame, MapPin } from "lucide-react";
import { states, stateHelplines } from "@/data/safetyData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface HelplineDirectoryProps {
  selectedState: string;
  onStateChange: (state: string) => void;
}

const HelplineDirectory = ({ selectedState, onStateChange }: HelplineDirectoryProps) => {
  const helplines = stateHelplines[selectedState];

  const helplineCards = [
    {
      label: "Police",
      number: helplines.police,
      icon: Shield,
      color: "bg-blue-500",
      description: "Emergency police assistance",
    },
    {
      label: "Women Helpline",
      number: helplines.women,
      icon: Phone,
      color: "bg-primary",
      description: "24/7 women's safety helpline",
    },
    {
      label: "Ambulance",
      number: helplines.ambulance,
      icon: Ambulance,
      color: "bg-safe",
      description: "Medical emergency services",
    },
    {
      label: "Fire",
      number: helplines.fire,
      icon: Flame,
      color: "bg-orange-500",
      description: "Fire emergency services",
    },
  ];

  return (
    <section className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8 text-center"
      >
        <h2 className="text-2xl font-bold text-foreground">Emergency Helplines</h2>
        <p className="mt-2 text-muted-foreground">
          State-wise emergency contact numbers
        </p>
      </motion.div>

      {/* State Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto mb-8 flex max-w-md items-center justify-center gap-3"
      >
        <MapPin className="h-5 w-5 text-muted-foreground" />
        <Select value={selectedState} onValueChange={onStateChange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select State" />
          </SelectTrigger>
          <SelectContent>
            {states.map((state) => (
              <SelectItem key={state} value={state}>
                {state}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>

      {/* Helpline Cards */}
      <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
        {helplineCards.map((card, index) => (
          <motion.a
            key={card.label}
            href={`tel:${card.number}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.03, y: -5 }}
            whileTap={{ scale: 0.97 }}
            className="group flex flex-col items-center rounded-2xl bg-card p-6 shadow-lg transition-shadow hover:shadow-xl"
          >
            <div
              className={`mb-4 rounded-full ${card.color} p-4 transition-transform group-hover:scale-110`}
            >
              <card.icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-sm font-semibold text-foreground">{card.label}</h3>
            <p className="mt-1 text-2xl font-bold text-foreground">{card.number}</p>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              {card.description}
            </p>
          </motion.a>
        ))}
      </div>

      {/* National Helplines */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto mt-8 max-w-2xl rounded-xl bg-primary/5 p-6"
      >
        <h3 className="mb-4 text-center font-semibold text-foreground">
          National Emergency Numbers
        </h3>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="flex items-center gap-2 rounded-full bg-background px-4 py-2">
            <span className="text-sm text-muted-foreground">All Emergency:</span>
            <span className="font-bold text-emergency">112</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-background px-4 py-2">
            <span className="text-sm text-muted-foreground">Women NCW:</span>
            <span className="font-bold text-primary">7827-170-170</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-background px-4 py-2">
            <span className="text-sm text-muted-foreground">Child:</span>
            <span className="font-bold text-safe">1098</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HelplineDirectory;
