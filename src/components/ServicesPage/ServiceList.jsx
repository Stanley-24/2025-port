// src/components/ServicesPage/ServiceList.jsx
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { services } from '../../data/servicePageData';
import SectionIntro from "../SectionIntro/SectionIntro";
import CheckoutModal from '../Payment/CheckoutModal';

// Update this to your actual scheduling link (e.g., Cal.com, Calendly, etc.)
const MEETING_LINK = 'https://cal.com/stanley-owarieta-wcfe8m/discovery-call'; // ← Change to your real link

const ServiceList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const handlePayClick = (service) => {
    const fullAmount = parseInt(service.price);

    if (isNaN(fullAmount) || fullAmount <= 0) {
      console.error('Invalid service price:', service.price);
      return;
    }
    
    const depositAmount = Math.round(fullAmount * 0.7); // 70% deposit

    setSelectedService({
      title: service.title,
      fullAmount,
      depositAmount,
      displayPrice: service.displayPrice,
    });
    setIsModalOpen(true);
  };

  const handleScheduleClick = () => {
    window.open(MEETING_LINK, '_blank', 'noopener,noreferrer');
  };

  // Define which CTAs trigger payment (customize as needed)
  const isPayableCta = (cta) => {
    const nonPayableCtas = ['Get Quote', 'Schedule Call'];
    return !nonPayableCtas.includes(cta);
  };

  return (
    <section id="services" className="container py-8">
      <SectionIntro 
        heading="My Services"
        subtitle="What I can do for you with your business."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {services.map((service, index) => {
          const payable = isPayableCta(service.cta);

          return (
            <Card key={index} className="bg-dark-bg border-0 border-purple">
              <CardHeader>
                <CardTitle className="text-goldmaize">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-lite-gray">
                <p>{service.description}</p>
                <p className="mt-2 font-bold text-goldmaize">{service.displayPrice}</p>
                <Button 
                  onClick={() => {
                    if (payable) {
                      handlePayClick(service);
                    } else {
                      handleScheduleClick();
                    }
                  }}
                  className="mt-4 bg-gold hover:bg-purple "
                >
                  {service.cta}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {selectedService && (
        <CheckoutModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          service={selectedService.title}
          amount={selectedService.depositAmount}
          fullAmount={selectedService.fullAmount}
          displayPrice={selectedService.displayPrice}
        />
      )}
    </section>
  );
};

export default ServiceList;