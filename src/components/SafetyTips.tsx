import { motion } from "framer-motion";
import { ChevronRight, Shield, AlertTriangle, Lightbulb, CheckCircle } from "lucide-react";
import { useState } from "react";
import { situations, safetyTips } from "@/data/safetyData";

const SafetyTips = () => {
  const [selectedSituation, setSelectedSituation] = useState<string | null>(null);

  const situationIcons: Record<string, React.ElementType> = {
    "Night Travel": AlertTriangle,
    "Public Transport": Shield,
    "Workplace": Lightbulb,
    "Isolated Areas": AlertTriangle,
    "Online Safety": Shield,
  };

  return (
    <section className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8 text-center"
      >
        <h2 className="text-2xl font-bold text-foreground">Safety Tips</h2>
        <p className="mt-2 text-muted-foreground">
          Select a situation to view safety guidelines
        </p>
      </motion.div>

      {/* Situation Buttons */}
      <div className="mb-6 flex flex-wrap justify-center gap-3">
        {situations.map((situation, index) => {
          const Icon = situationIcons[situation] || Shield;
          return (
            <motion.button
              key={situation}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                setSelectedSituation(selectedSituation === situation ? null : situation)
              }
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                selectedSituation === situation
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              <Icon className="h-4 w-4" />
              {situation}
            </motion.button>
          );
        })}
      </div>

      {/* Tips Display */}
      <motion.div
        layout
        className="mx-auto max-w-2xl rounded-2xl bg-card p-6 shadow-lg"
      >
        {selectedSituation ? (
          <motion.div
            key={selectedSituation}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-2">
                {(() => {
                  const Icon = situationIcons[selectedSituation] || Shield;
                  return <Icon className="h-5 w-5 text-primary" />;
                })()}
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {selectedSituation} Safety
              </h3>
            </div>
            <ul className="space-y-3">
              {safetyTips[selectedSituation].map((tip, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-safe" />
                  <span className="text-sm text-muted-foreground">{tip}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center py-8 text-center">
            <ChevronRight className="mb-4 h-12 w-12 text-muted-foreground/30" />
            <p className="text-muted-foreground">
              Select a situation above to view safety tips
            </p>
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default SafetyTips;
