import Button from "./ui/Button";
import Input from "./ui/Input";

const NewsLetter = () => {
  return (
    <div className="py-16 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 hero-gradient-overlay text-white">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full shadow-sm mb-6">
          <span className="text-2xl">🎁</span>
          <span className="text-sm font-medium text-white">Get 10% off your first order</span>
        </div>
        
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 gradient-accent-text">
          Never Miss a Deal!
        </h2>
        
        <p className="text-white/85 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Subscribe to get the latest offers, new arrivals, and exclusive discounts delivered straight to your inbox
        </p>
        
        <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
          <Input
            type="email"
            placeholder="Enter your email address"
            required
            className="flex-1 text-base"
          />
          <Button 
            type="submit" 
            variant="accent"
            size="lg"
            className="w-full sm:w-auto btn-accent-custom"
          >
            Subscribe
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Button>
        </form>
        
        <p className="text-white/70 text-sm mt-4">
          No spam, unsubscribe at any time
        </p>
      </div>
    </div>
  );
};

export default NewsLetter;
