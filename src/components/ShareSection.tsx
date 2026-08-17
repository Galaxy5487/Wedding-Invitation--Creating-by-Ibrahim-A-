import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Share2, MessageCircle, Link2, Check, QrCode } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react'; // Lightweight, highly reliable SVG QR library
import { weddingData } from '../lib/weddingData';

export const ShareSection: React.FC = () => {
  const [currentUrl, setCurrentUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const shareText = `${weddingData.sharing.whatsappTemplate}${currentUrl}`;

  const handleWhatsAppShare = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${weddingData.groomName} & ${weddingData.brideName} — Wedding Invitation`,
          text: `You're warmly invited to celebrate the Nikah and Walima of ${weddingData.groomName} & ${weddingData.brideName} on 10 September 2026.`,
          url: currentUrl,
        });
      } catch (err) {
        console.log('User cancelled share or error occurred:', err);
      }
    } else {
      // Fallback to copy link
      handleCopyLink();
    }
  };

  return (
    <section id="share" className="relative py-24 px-4 bg-pearl-ivory overflow-hidden">
      {/* Background Soft Bloom */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blush-soft/20 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs tracking-[0.3em] uppercase text-dusty-rose-dark font-semibold">Share the Joy</span>
          <h2 className="font-cinzel text-3xl md:text-5xl font-medium text-botanical-green mt-2 tracking-wide">
            Share Invitation
          </h2>
          <div className="h-[1px] w-16 bg-warm-gold/30 mx-auto mt-4" />
        </div>

        {/* Share Card - Grid Layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center p-8 md:p-12 rounded-3xl liquid-glass border border-white/60 shadow-xl"
        >
          {/* QR Code Column (4 cols) */}
          <div className="md:col-span-4 flex flex-col items-center text-center p-6 rounded-2xl bg-white/40 border border-white/60 shadow-inner">
            <div className="p-3 bg-white rounded-xl shadow-md border border-warm-gold/10">
              {currentUrl ? (
                <QRCodeSVG
                  value={currentUrl}
                  size={140}
                  bgColor="#ffffff"
                  fgColor="#2c3621"
                  level="H"
                  includeMargin={false}
                />
              ) : (
                <div className="w-[140px] h-[140px] bg-pearl-dark flex items-center justify-center">
                  <QrCode className="w-8 h-8 text-sage" />
                </div>
              )}
            </div>
            <span className="text-xs font-semibold text-deep-olive/80 tracking-wider mt-4 uppercase flex items-center gap-1.5">
              <QrCode className="w-3.5 h-3.5 text-warm-gold" />
              Scan QR to View
            </span>
          </div>

          {/* Share Buttons Column (8 cols) */}
          <div className="md:col-span-8 space-y-6 flex flex-col justify-center">
            <h3 className="font-cinzel text-xl font-bold text-botanical-green text-center md:text-left">
              Invite Your Friends &amp; Family
            </h3>
            <p className="text-sm text-deep-olive/80 leading-relaxed font-light text-center md:text-left">
              Send this beautiful digital invitation to your loved ones easily via WhatsApp, copy the direct link, or use your device's native sharing menu.
            </p>

            {/* Buttons Row */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              {/* WhatsApp Share */}
              <button
                onClick={handleWhatsAppShare}
                className="flex items-center gap-2 px-6 py-3.5 bg-[#25D366] text-white rounded-full font-medium text-xs tracking-wider shadow-sm hover:bg-[#20ba5a] hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                WHATSAPP SHARE
              </button>

              {/* Native Share / General Share */}
              <button
                onClick={handleNativeShare}
                className="flex items-center gap-2 px-6 py-3.5 bg-botanical-green text-white rounded-full font-medium text-xs tracking-wider shadow-sm hover:bg-sage-dark hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                SHARE INVITATION
              </button>

              {/* Copy Link */}
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-2 px-5 py-3.5 bg-white/70 hover:bg-white text-deep-olive border border-warm-gold/20 rounded-full font-medium text-xs tracking-wider hover:border-warm-gold/40 transition-all duration-300 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-botanical-green" />
                    COPIED LINK!
                  </>
                ) : (
                  <>
                    <Link2 className="w-4 h-4 text-dusty-rose" />
                    COPY LINK
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ShareSection;
