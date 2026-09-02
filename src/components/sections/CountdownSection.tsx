import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Calendar, Sparkles, PartyPopper } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { SectionHeading } from '../ui/SectionHeading';
import { MascotDino } from '../common/MascotDino';

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isBirthdayToday: boolean;
}

export const CountdownSection: React.FC = () => {
  const [time, setTime] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isBirthdayToday: false,
  });

  useEffect(() => {
    const targetBirthday = new Date(siteConfig.recipient.birthDate).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetBirthday - now;

      if (difference <= 0) {
        setTime({ days: 0, hours: 0, minutes: 0, seconds: 0, isBirthdayToday: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTime({ days, hours, minutes, seconds, isBirthdayToday: false });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeCards = [
    { label: 'Days', value: time.days, color: 'from-[#FF3EA5] to-[#FF70A6]' },
    { label: 'Hours', value: time.hours, color: 'from-[#8B5CF6] to-[#A78BFA]' },
    { label: 'Minutes', value: time.minutes, color: 'from-[#38BDF8] to-[#60A5FA]' },
    { label: 'Seconds', value: time.seconds, color: 'from-[#5EEAD4] to-[#2DD4BF]' },
  ];

  return (
    <section id="countdown" className="relative py-16 sm:py-24 px-4 z-10">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          badgeText="September 4, 2026"
          badgeEmoji="🗓️"
          title="Countdown to Vivek's Big Day!"
          subtitle={
            time.isBirthdayToday
              ? "TODAY IS THE DAY! Let the celebrations begin! 🥳🎉"
              : `Counting down every single second until September 4th for ${siteConfig.recipient.nickname} ✨`
          }
        />

        {/* Main Countdown Board with Peeking Dino */}
        <div className="relative">
          {/* Peeking Dino Mascot on top corner */}
          <div className="absolute -top-14 -right-2 sm:right-6 z-20">
            <MascotDino
              pose={time.isBirthdayToday ? 'celebrating' : 'peeking'}
              size={115}
              speechText={
                time.isBirthdayToday
                  ? "IT'S V DAY! 🥳"
                  : `${time.days}d ${time.hours}h until V Day! 🦖`
              }
            />
          </div>

          <div className="glass-card p-6 sm:p-10 rounded-3xl shadow-2xl relative overflow-hidden border border-white/80">
            {time.isBirthdayToday ? (
              <div className="text-center py-8">
                <PartyPopper className="w-16 h-16 text-[#FF3EA5] mx-auto animate-bounce mb-3" />
                <h3 className="text-3xl sm:text-5xl font-black text-gradient">
                  IT'S OFFICIALLY VIVEK'S BIRTHDAY! 🎉
                </h3>
                <p className="mt-3 text-base sm:text-lg font-bold text-gray-700">
                  September 4th is finally here! Time for endless cake, celebrations & joy!
                </p>
              </div>
            ) : (
              /* Countdown Digit Cards Grid */
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 relative z-10">
                {timeCards.map((item, idx) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl bg-white/70 backdrop-blur-md border border-white shadow-lg relative group hover:shadow-xl transition-all"
                  >
                    {/* Glowing pill behind number */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-10 rounded-2xl group-hover:opacity-20 transition-opacity`}
                    />

                    {/* Animated Rolling Digit Card */}
                    <div className="relative overflow-hidden h-14 sm:h-20 flex items-center justify-center">
                      <span className="text-3xl sm:text-5xl md:text-6xl font-black text-gradient">
                        {String(item.value).padStart(2, '0')}
                      </span>
                    </div>

                    <span className="mt-2 text-xs sm:text-sm font-extrabold text-gray-600 uppercase tracking-wider">
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Bottom Highlight Statistics */}
            <div className="mt-8 pt-6 border-t border-gray-100/80 flex flex-wrap items-center justify-around gap-4 text-center">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-700">
                <Calendar className="w-4 h-4 text-[#FF3EA5]" />
                <span>Marked: 4 Sept 2026</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-700">
                <Heart className="w-4 h-4 text-[#8B5CF6] fill-[#8B5CF6]" />
                <span>Special VIP: Vivek (V)</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-700">
                <Sparkles className="w-4 h-4 text-[#FFE066]" />
                <span>100% Celebration Mode</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
