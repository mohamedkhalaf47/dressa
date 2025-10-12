import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DressesSection } from './components/DressesSection';
import { ActionsSection } from './components/ActionsSection';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Footer } from './components/Footer';
import { Modal } from './components/Modal';
import { BuyForm } from './components/BuyForm';
import { SellForm } from './components/SellForm';
import { RentForm } from './components/RentForm';
import { logActivity, ACTIVITY_ACTIONS } from './utils/activity';

type ModalType = 'buy' | 'sell' | 'rent' | null;

function App() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    logActivity(ACTIVITY_ACTIONS.PAGE_LOAD);
  }, []);

  const openModal = (type: ModalType) => {
    setActiveModal(type);
    if (type) {
      logActivity(ACTIVITY_ACTIONS.FORM_OPEN, { form: type });
    }
  };

  const closeModal = () => {
    setActiveModal(null);
    setShowSuccess(false);
  };

  const handleFormSuccess = () => {
    setShowSuccess(true);
    setTimeout(() => {
      closeModal();
    }, 2000);
  };

  const getModalTitle = () => {
    switch (activeModal) {
      case 'buy':
        return 'Buy a Dress';
      case 'sell':
        return 'Sell Your Dress';
      case 'rent':
        return 'Rent a Dress';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <DressesSection />
      <ActionsSection
        onBuyClick={() => openModal('buy')}
        onSellClick={() => openModal('sell')}
        onRentClick={() => openModal('rent')}
      />
      <Footer />
      <WhatsAppButton />

      <Modal isOpen={activeModal !== null} onClose={closeModal} title={getModalTitle()}>
        {showSuccess ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-playfair font-bold text-charcoal mb-2">
              Success!
            </h3>
            <p className="text-gray-600 font-poppins">
              Your request has been submitted successfully. We'll get back to you soon!
            </p>
          </div>
        ) : (
          <>
            {activeModal === 'buy' && <BuyForm onSuccess={handleFormSuccess} />}
            {activeModal === 'sell' && <SellForm onSuccess={handleFormSuccess} />}
            {activeModal === 'rent' && <RentForm onSuccess={handleFormSuccess} />}
          </>
        )}
      </Modal>
    </div>
  );
}

export default App;
