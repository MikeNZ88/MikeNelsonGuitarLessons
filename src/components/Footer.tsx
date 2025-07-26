import Link from 'next/link';
import { Facebook, Instagram, Youtube, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-amber-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-playfair">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <a href="tel:022-127-2154" className="hover:text-amber-200 transition-colors">
                  022 127 2154
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>Pukerua Bay, Wellington</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-playfair">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/lessons" className="block hover:text-amber-200 transition-colors">
                Book a Lesson
              </Link>
              <Link href="/blog" className="block hover:text-amber-200 transition-colors">
                Guitar Blog
              </Link>
              <Link href="/tools" className="block hover:text-amber-200 transition-colors">
                Tools
              </Link>
              <Link href="/about" className="block hover:text-amber-200 transition-colors">
                About Mike
              </Link>
              <Link href="/policy.html" className="block hover:text-amber-200 transition-colors">
                Payment and Cancellation Policy
              </Link>
              <Link href="/privacy-policy" className="block hover:text-amber-200 transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-playfair">Follow Me</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/MikeNelsonGuitarLessonsNZ"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-200 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://www.instagram.com/ill_teach_you_a_lesson"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-200 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://www.youtube.com/@guitarbeginnerwinner3768"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-200 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-amber-700 mt-8 pt-8 text-center">
          <p>&copy; 2025 Mike Nelson Guitar Lessons. All rights reserved.</p>
          <Link href="#top" className="inline-block mt-2 hover:text-amber-200 transition-colors">
            Return to Top
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 