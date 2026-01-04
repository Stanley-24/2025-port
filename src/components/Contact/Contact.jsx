// components/Contact/Contact.js
import ContactUi from "./contactUI";
import FormNotification from "../FormNotification/FormNotification";
import { useContactForm } from "../../hooks/useContactForm";

const Contact = () => {
  const {
    formData,
    isSending,
    notification,
    handleChange,
    handleSubmit,
    fieldErrors,
    closeNotification,
  } = useContactForm();

  return (
    <>
      <ContactUi
        formData={formData}
        isSending={isSending}
        fieldErrors={fieldErrors}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />

      {notification && (
        <FormNotification
          title={notification.title}
          message={notification.message}
          isSuccess={notification.isSuccess}
          isError={notification.isError}
          onClose={closeNotification}
        />
      )}
    </>
  );
};

export default Contact;