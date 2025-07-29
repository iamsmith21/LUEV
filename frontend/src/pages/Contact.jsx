import contactCover from "../assets/contactImg/contactCover.jpg";
import contactMain from "../assets/contactImg/contactMain.jpg";
import contactCover2 from "../assets/contactImg/contactCover2.jpg";
function Contact() {
  return (
    <>
      <div className="contact-cover">
        <div className="sub-Main p-5">
          <h1>Contact Us</h1>
          <p>
            We’d love to hear from you! Whether you have a question about
            features, feedback, or need support — our team is here to help.
          </p>
        </div>
        <img src={contactCover} alt="" />
      </div>
      <div className="cover-2">
        <div className="cover-bg">
          <img src={contactCover2} alt="Contact Cover" />
        </div>
        <div className="operating-hours shadow-lg">
          <h2>Operating Hours :</h2>
          <p>Customer Support & Inquiries</p>
          <p>Monday – Friday</p>
          <p>9:00 AM – 6:00 PM (EST)</p>
        </div>
      </div>
      <div className="contact">
        <img src={contactMain} alt="Contact Us" className="contact-image" />
        <div className="contact-details">
          <div className="contact-box general bg-light p-5 rounded shadow-sm">
            <h2>General Inquiries</h2>
            <p>For any general questions:</p>
            <p>
              <strong>Email:</strong> contact@luev.com
            </p>
            <p>
              <strong>Phone:</strong> 1 (924) 834-061
            </p>
          </div>
          <div className="contact-box technical bg-light p-5 rounded shadow-sm">
            <h2>Technical Support</h2>
            <p>Having trouble with our EV services or platform?</p>
            <p>
              <strong>Email:</strong> support@luev.com
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default Contact;
