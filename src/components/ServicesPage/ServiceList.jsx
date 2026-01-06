// src/components/ServicesPage/ServiceList.jsx
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { services } from '../../data/servicePageData';
import SectionIntro from "../SectionIntro/SectionIntro";
import CheckoutModal from '../Payment/CheckoutModal';

const ServiceList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const handlePayClick = (service) => {
    const fullAmount = parseInt(service.price);
    const depositAmount = Math.round(fullAmount * 0.7); // 70%

    setSelectedService({
      title: service.title,
      fullAmount,
      depositAmount,
      displayPrice: service.displayPrice,
    });
    setIsModalOpen(true);
  };

  const isPayable = (cta) => {
    return !['Get Quote', 'Schedule Call'].includes(cta);
  };

  return (
    <section id="services" className="container py-8">
      <SectionIntro 
        heading="My Services"
        subtitle="What I can do for you with your business."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {services.map((service, index) => (
          <Card key={index} className="bg-dark-bg border-0 border-purple">
            <CardHeader>
              <CardTitle className="text-goldmaize">{service.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-lite-gray">
              <p>{service.description}</p>
              <p className="mt-2 font-bold text-goldmaize">{service.displayPrice}</p>
              <Button 
                onClick={() => isPayable(service.cta) && handlePayClick(service)}
                className="mt-4 bg-gold hover:bg-purple"
              >
                {service.cta}
              </Button>
            </CardContent>
          </Card>
        ))}
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