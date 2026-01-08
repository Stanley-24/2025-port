// src/components/ServicesPage/DeliverySection.jsx

const DeliverySection = () => {
    return (
        <section className="py-12 container">
            <h2 className="amatic-sc-bold text-4xl lg:text-5xl text-white-shade text-center mb-12">
                How We Deliver
            </h2>
            <div className="max-w-4xl mx-auto text-lite-gray montserrat-regular text-lg space-y-6">
                <p className="text-center">
                    We follow <strong>Agile methodology</strong> with 2–4 week sprints so you see progress fast and can adjust as needed.
                </p>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div>
                        <div className="text-goldmaize text-5xl font-bold mb-2">1</div>
                        <h3 className="text-xl text-gold mb-2">Discovery Call</h3>
                        <p>Understand your business & goals</p>
                    </div>
                    <div>
                        <div className="text-goldmaize text-5xl font-bold mb-2">2</div>
                        <h3 className="text-xl text-gold mb-2">MVP in 4–6 Weeks</h3>
                        <p>Core features delivered first</p>
                    </div>
                    <div>
                        <div className="text-goldmaize text-5xl font-bold mb-2">3</div>
                        <h3 className="text-xl text-gold mb-2">Full Launch</h3>
                        <p>3–12 months depending on scope</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DeliverySection;