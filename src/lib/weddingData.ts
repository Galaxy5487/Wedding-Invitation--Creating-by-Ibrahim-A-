export interface EventData {
  id: string;
  title: string;
  date: string; // "10 September 2026"
  day: string; // "Thursday"
  time: string; // "5:00 PM" or "After Isha"
  venueName: string;
  address: string;
  description: string;
  googleMapsUrl: string;
  googleMapsEmbedUrl?: string;
  icon: 'nikah' | 'walima';
  calendarTitle: string;
  calendarStart: string; // ISO string or specific format
  calendarDurationHours: number;
  isTimeFlexible?: boolean;
}

export interface StorySegment {
  id: string;
  title: string;
  period: string;
  description: string;
  image: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  caption: string;
  aspectRatio: 'portrait' | 'landscape' | 'square';
}

export interface WeddingConfig {
  groomName: string;
  groomTitle: string;
  groomBio: string;
  brideName: string;
  brideTitle: string;
  brideBio: string;
  weddingDate: string; // "2026-09-10" for countdown
  weddingDateFormatted: string; // "10 September 2026"
  weddingDay: string; // "Thursday"
  nikahTime: string; // "5:00 PM"
  walimaTime: string; // "After Isha"
  bismillahText: string;
  welcomeQuote: string;
  events: EventData[];
  story: StorySegment[];
  gallery: GalleryItem[];
  musicUrl: string; // local placeholder or royalty-free
  sharing: {
    whatsappTemplate: string;
    hashtag: string;
  };
  theme: {
    primaryColor: string; // "dusty-rose"
    secondaryColor: string; // "sage"
    backgroundColor: string; // "pearl-ivory"
    fontSerif: string; // "Playfair Display"
    fontSans: string; // "Plus Jakarta Sans"
  };
}

export const weddingData: WeddingConfig = {
  groomName: "Mohammed Fardeen",
  groomTitle: "Mohammed Fardeen",
  groomBio: "A gentleman of grace and intellect, embarking on this beautiful journey of faith, love, and companionship with a heart full of gratitude and devotion.",
  brideName: "Shagufa Anjum",
  brideTitle: "Shagufa Anjum",
  brideBio: "A soul of elegance and warmth, bringing light and harmony into this blessed union, ready to walk hand-in-hand in a lifetime of love and togetherness.",
  weddingDate: "2026-09-10T17:00:00", // Asar Nikah time
  weddingDateFormatted: "10 September 2026",
  weddingDay: "Thursday",
  nikahTime: "5:00 PM",
  walimaTime: "After Isha",
  bismillahText: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
  welcomeQuote: "With the blessings of our families, we invite you to join us as we celebrate the beginning of a beautiful new chapter.",
  events: [
    {
      id: "nikah",
      title: "ASAR NIKAH",
      date: "10 September 2026",
      day: "Thursday",
      time: "5:00 PM",
      venueName: "Chowk Masjid",
      address: "Chowk Masjid,Bazaar Street, Pernambut",
      description: "The sacred covenant of marriage solemnized under Islamic tradition. A beautiful union of two souls in the presence of loved ones and divine blessings.",
      googleMapsUrl: "https://maps.app.goo.gl/s3dJTERXxnRgA4jc9",
      googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.581537186397!2d78.7188347!3d12.9345954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bad74ceb1fa23d7%3A0x2d8809ba271b3a56!2sChowk%20Masjid%2C%20Pernambut%2C%20Tamil%20Nadu%20635810!5e0!3m2!1sen!2sin!4v1786960005240!5m2!1sen!2sin",
      icon: "nikah",
      calendarTitle: "Nikah: Mohammed Fardeen & Shagufa Anjum",
      calendarStart: "2026-09-10T17:00:00",
      calendarDurationHours: 1.5
    },
    {
      id: "walima",
      title: "WALIMA",
      date: "10 September 2026",
      day: "Thursday",
      time: "After Isha",
      venueName: "Noor Ahmad Residence",
      address: "Noor Ahmad, First Street, Pernambut",
      description: "The sunnah feast of marriage, celebrated with gratitude, joy, and a warm gathering of family and friends to honor the newlywed couple.",
      googleMapsUrl: "https://maps.app.goo.gl/J6tFJZjWJDV52J4X8",
      googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5245880182165!2d78.721021!3d12.9382485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bad74cf618cedb9%3A0x6737ad0c68a72e0!2sNoor%20Ahmed%201st%20St%2C%20Tamil%20Nadu%20635810!5e0!3m2!1sen!2sin!4v1786963278432!5m2!1sen!2sin",
      icon: "walima",
      calendarTitle: "Walima: Mohammed Fardeen & Shagufa Anjum",
      calendarStart: "2026-09-10T20:30:00", // Approximate post-Isha time for calendar slot
      calendarDurationHours: 3,
      isTimeFlexible: true
    }
  ],
  story: [
    {
      id: "beginning",
      title: "The Beginning",
      period: "Written in the Stars",
      description: "A meeting of minds and alignment of values, guided by the prayers of our families. From the very first conversations, there was a quiet certainty that our paths were meant to merge.",
      image: "/images/botanical_detail.jpg"
    },
    {
      id: "journey",
      title: "The Journey",
      period: "Nurturing the Bond",
      description: "A period of mutual respect, learning, and shared dreams. We discovered a deep resonance in our perspectives on life, faith, and family, laying a strong foundation for our future.",
      image: "/images/floral_bg.jpg"
    },
    {
      id: "promise",
      title: "The Promise",
      period: "The Sacred Covenant",
      description: "With the consent and joyful blessings of our parents, we made a solemn commitment to walk this lifetime together, supporting each other in faith, growth, and unconditional love.",
      image: "/images/couple_detail.jpg"
    },
    {
      id: "celebration",
      title: "The Celebration",
      period: "10 September 2026",
      description: "Now, we stand on the threshold of our beautiful new beginning. We await your presence and prayers as we seal our covenant and celebrate our union in the presence of God.",
      image: "/images/venue_detail.jpg"
    }
  ],
  gallery: [
    {
      id: "img1",
      url: "/images/couple_detail.jpg",
      caption: "A Lifetime Promise",
      aspectRatio: "portrait"
    },
    {
      id: "img2",
      url: "/images/botanical_detail.jpg",
      caption: "Graceful Beginnings",
      aspectRatio: "portrait"
    },
    {
      id: "img3",
      url: "/images/floral_bg.jpg",
      caption: "A Garden of Blessings",
      aspectRatio: "landscape"
    },
    {
      id: "img4",
      url: "/images/venue_detail.jpg",
      caption: "In Gratitude & Celebration",
      aspectRatio: "landscape"
    }
  ],
  musicUrl: "/Wedding Nasheed.mp3", // Wedding Nasheed audio file
  sharing: {
    whatsappTemplate: "You're warmly invited to the wedding celebration of Mohammed Fardeen & Shagufa Anjum on 10 September 2026. Please view the digital invitation here: ",
    hashtag: "#FardeenWedsShagufa"
  },
  theme: {
    primaryColor: "dusty-rose",
    secondaryColor: "sage",
    backgroundColor: "pearl-ivory",
    fontSerif: "Playfair Display",
    fontSans: "Plus Jakarta Sans"
  }
};
