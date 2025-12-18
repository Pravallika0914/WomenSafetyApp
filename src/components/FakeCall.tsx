import { motion } from "framer-motion";
import { Phone, PhoneOff, User } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";

interface FakeCallProps {
  onClose: () => void;
}

const FakeCall = ({ onClose }: FakeCallProps) => {
  const [callState, setCallState] = useState<"incoming" | "connected" | "ended">("incoming");
  const [callTime, setCallTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Create ringtone using Web Audio API
  useEffect(() => {
    if (callState === "incoming") {
      // Simple ringtone using oscillator
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 440;
      oscillator.type = "sine";
      gainNode.gain.value = 0.3;
      
      const playRingtone = () => {
        oscillator.start();
        
        // Create pulsing effect
        const pulseInterval = setInterval(() => {
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
          setTimeout(() => {
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
          }, 500);
        }, 1000);

        return () => {
          clearInterval(pulseInterval);
          oscillator.stop();
          audioContext.close();
        };
      };

      const cleanup = playRingtone();
      return cleanup;
    }
  }, [callState]);

  // Call timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (callState === "connected") {
      interval = setInterval(() => {
        setCallTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [callState]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAccept = () => {
    setCallState("connected");
  };

  const handleReject = () => {
    setCallState("ended");
    setTimeout(onClose, 1000);
  };

  const handleEndCall = () => {
    setCallState("ended");
    setTimeout(onClose, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-gradient-to-b from-foreground via-foreground/95 to-foreground/90 p-8 py-16"
    >
      {/* Caller Info */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex flex-col items-center text-center"
      >
        <motion.div
          animate={callState === "incoming" ? { scale: [1, 1.1, 1] } : {}}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-primary/20"
        >
          <User className="h-16 w-16 text-primary" />
        </motion.div>
        <h2 className="text-2xl font-bold text-background">Mom</h2>
        <p className="mt-2 text-lg text-background/70">
          {callState === "incoming" && "Incoming call..."}
          {callState === "connected" && formatTime(callTime)}
          {callState === "ended" && "Call ended"}
        </p>
      </motion.div>

      {/* Call Actions */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex gap-8"
      >
        {callState === "incoming" && (
          <>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleReject}
                variant="destructive"
                size="icon-xl"
                className="rounded-full"
              >
                <PhoneOff className="h-8 w-8" />
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              animate={{ rotate: [0, 15, -15, 15, 0] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              <Button
                onClick={handleAccept}
                variant="safe"
                size="icon-xl"
                className="rounded-full"
              >
                <Phone className="h-8 w-8" />
              </Button>
            </motion.div>
          </>
        )}
        {callState === "connected" && (
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleEndCall}
              variant="destructive"
              size="icon-xl"
              className="rounded-full"
            >
              <PhoneOff className="h-8 w-8" />
            </Button>
          </motion.div>
        )}
        {callState === "ended" && (
          <p className="text-xl text-background/70">Disconnected</p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default FakeCall;
