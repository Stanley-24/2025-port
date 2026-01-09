import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react"; // Shadcn icon for quote
import SectionIntro from "../SectionIntro/SectionIntro"; // Reuse your existing intro
import { testimonials } from '../../data/testimonialsData';

const Testimonials = () => {
  return (
    <section className="container py-16 bg-main-dark-bg">
      <SectionIntro 
        heading="Here what others are saying"
        subtitle="These are some of the people that it happened we have work and chat about softwares"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {testimonials.map((testimonial, index) => (
          <Card 
            key={index} 
            className="bg-dark-bg border-t-0 border-b-0 transition-all duration-300 shadow-lg hover:border-t-2"
          >
            <CardContent className="p-8 relative">
              {/* Quote Icon */}
              <Quote className="absolute top-4 left-4 w-10 h-10 text-goldmaize/30 fill-goldmaize/30" />
              
              {/* Quote Text */}
              <blockquote className="mt-8 text-lite-gray italic text-lg leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="flex items-center mt-8 gap-4">
                {/* Avatar */}
                <Avatar className="w-14 h-14 border-2 border-goldmaize">
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback className="bg-dark-lite text-goldmaize text-xl">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                {/* Client Info */}
                <div>
                  <p className="font-semibold text-goldmaize">{testimonial.name}</p>
                  <p className="text-sm text-dark-gray">{testimonial.role}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;