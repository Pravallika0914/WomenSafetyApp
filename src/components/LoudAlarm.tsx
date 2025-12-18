import { motion } from "framer-motion";
import { Volume2, VolumeX, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

interface LoudAlarmProps {
  onClose: () => void;
}

const LoudAlarm = ({ onClose }: LoudAlarmProps) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    startAlarm();
    return () => stopAlarm();
  }, []);

  const startAlarm = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Create alarming sound pattern
    oscillator.type = "square";
    gainNode.gain.value = 0.8;

    // Frequency alternation for siren effect
    let high = true;
    const sirenInterval = setInterval(() => {
      oscillator.frequency.setValueAtTime(high ? 880 : 660, audioContext.currentTime);
      high = !high;
    }, 300);

    oscillator.start();

    audioContextRef.current = audioContext;
    oscillatorRef.current = oscillator;
    gainNodeRef.current = gainNode;

    return () => {
      clearInterval(sirenInterval);
    };
  };

  const stopAlarm = () => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
  };

  const toggleAlarm = () => {
    if (isPlaying) {
      stopAlarm();
    } else {
      startAlarm();
    }
    setIsPlaying(!isPlaying);
  };

  const handleClose = () => {
    stopAlarm();
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
    >
      {/* Pulsing background */}
      <motion.div
        animate={{
          backgroundColor: isPlaying
            ? ["hsl(0, 85%, 50%)", "hsl(0, 85%, 30%)", "hsl(0, 85%, 50%)"]
            : "hsl(0, 85%, 40%)",
        }}
        transition={{ repeat: Infinity, duration: 0.5 }}
        className="absolute inset-0"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        <motion.div
          animate={isPlaying ? { scale: [1, 1.2, 1] } : {}}
          transition={{ repeat: Infinity, duration: 0.5 }}
        >
          <Volume2 className="h-32 w-32 text-emergency-foreground" />
        </motion.div>

        <h1 className="text-4xl font-bold text-emergency-foreground">
          {isPlaying ? "ALARM ACTIVE" : "ALARM PAUSED"}
        </h1>

        <p className="text-center text-xl text-emergency-foreground/80">
          {isPlaying
            ? "Loud alarm is playing to attract attention"
            : "Alarm is paused - tap to resume"}
        </p>

        <div className="flex gap-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={toggleAlarm}
              variant={isPlaying ? "secondary" : "emergency"}
              size="xl"
              className="min-w-[150px]"
            >
              {isPlaying ? (
                <>
                  <VolumeX className="mr-2 h-5 w-5" />
                  Pause
                </>
              ) : (
                <>
                  <Volume2 className="mr-2 h-5 w-5" />
                  Resume
                </>
              )}
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button onClick={handleClose} variant="outline" size="xl" className="bg-background/90">
              <X className="mr-2 h-5 w-5" />
              Close
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoudAlarm;
