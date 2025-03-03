import React, { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitStatus, setSubmitStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/meoeynkl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setSubmitMessage("Thank you for your message! I'll get back to you soon.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setSubmitStatus("error");
        setSubmitMessage("Oops! Something went wrong. Please try again.");
      }
    } catch (error) {
      setSubmitStatus("error");
      setSubmitMessage("Network error. Please check your connection and try again.");
    }

    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b-2 border-blue-600 pb-2">Contact Me</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Get In Touch</h3>
          <p className="text-gray-600 mb-6">
            Feel free to reach out if you're looking for a developer, have a question, or just want to connect.
          </p>

          <div className="space-y-4">
            <div className="flex items-start">
              <MapPin size={20} className="text-blue-600 mr-4 mt-1" />
              <div>
                <h4 className="font-medium text-gray-800">Location</h4>
                <p className="text-gray-600">Mysuru, India</p>
              </div>
            </div>

            <div className="flex items-start">
              <Mail size={20} className="text-blue-600 mr-4 mt-1" />
              <div>
                <h4 className="font-medium text-gray-800">Email</h4>
                <a
                  href="mailto:revanthkumars64@gmail.com"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  revanthkumars64@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start">
              <Phone size={20} className="text-blue-600 mr-4 mt-1" />
              <div>
                <h4 className="font-medium text-gray-800">Phone</h4>
                <a
                  href="tel:+918431005243"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  +91 8431005243
                </a>
              </div>
            </div>
          </div>
        </div>

        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md flex items-center transition-colors disabled:bg-blue-400"
            >
              {isSubmitting ? "Sending..." : (
                <>
                  <Send size={18} className="mr-2" />
                  Send Message
                </>
              )}
            </button>

            {submitMessage && (
              <div className={`mt-4 p-3 rounded-md ${submitStatus === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                {submitMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
