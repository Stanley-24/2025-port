// components/Contact/ContactUI.js
import SectionIntro from "../SectionIntro/SectionIntro";
import { BsCursorFill } from "react-icons/bs";

const ContactUi = ({ formData, fieldErrors, isSending, onChange, onSubmit }) => {
  return (
    <section className="mt-16 container bg-dkblack flex flex-col gap-12" id="contact">
      <SectionIntro
        heading="Stay in touch"
        subtitle="Ready to start your next project or have something to say? Use the form below!"
      />

      <form
        onSubmit={onSubmit}
        className="w-full max-w-[35rem] lg:max-w-[52rem] mx-auto bg-dkblack border border-l-goldmaize border-r-goldmaize rounded-lg py-8 px-4 lg:px-6 flex flex-col gap-8"
      >
        <div className="w-full flex flex-col sm:flex-row gap-8">
          {/* Full Name */}
          <div className="flex flex-col gap-2 w-full sm:w-1/2">
            <label htmlFor="fullname" className="contact-form-label">
              FullName
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              placeholder="enter full name"
              className="contact-form-input"
              value={formData.fullname}
              onChange={onChange}
              required
            />
            {fieldErrors?.fullname && (
              <p className="text-red-400 text-sm mt-1 animate-fade-in">
                {fieldErrors.fullname}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2 w-full sm:w-1/2">
            <label htmlFor="email" className="contact-form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@email.com"
              className="contact-form-input"
              value={formData.email}
              onChange={onChange}
              required
            />
            {fieldErrors?.email && (
              <p className="text-red-400 text-sm mt-1 animate-fade-in">
                {fieldErrors.email}
              </p>
            )}
          </div>
        </div>

        {/* Subject */}
        <div className="flex flex-col gap-2">
          <label htmlFor="subject" className="contact-form-label">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            placeholder="project inquiry"
            className="contact-form-input"
            value={formData.subject}
            onChange={onChange}
            required
          />
          {fieldErrors?.subject && (
            <p className="text-red-400 text-sm mt-1 animate-fade-in">
              {fieldErrors.subject}
            </p>
          )}
        </div>

        {/* Message */}
        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="contact-form-label">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Tell me what's on your mind..."
            className="contact-textarea"
            rows="6"
            value={formData.message}
            onChange={onChange}
            required
          ></textarea>
          {fieldErrors?.message && (
            <p className="text-red-400 text-sm mt-1 animate-fade-in">
              {fieldErrors.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSending}
          className="flex items-center gap-2 bg-gold justify-center rounded-full text-white-shade font-semibold tracking-wide lg:text-lg hover:bg-transparent hover:border-purple hover:border-2 duration-200 cursor-pointer active:scale-95 max-w-300 mx-auto py-2 px-6 disabled:opacity-70"
        >
          <BsCursorFill />
          {isSending ? "Sending..." : "Send Message"}
        </button>
      </form>
    </section>
  );
};

export default ContactUi;