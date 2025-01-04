import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const PrivacyPolicy: React.FC = () => {
    const menuItems = [
        { id: 1, name: 'Main Page', route: '/mainPagePatient' },
        { id: 2, name: 'My Account', route: '/patient' },
        { id: 3, name: 'Update Account', route: '/patient/update' },
        { id: 4, name: 'Delete Account', route: '/patient/delete' },
        { id: 5, name: 'Privacy Policy', route: '/privacyPolicy' },
      ];

  return (
    <>
      <Navbar menuItemsProp={menuItems} />
      <main style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1>Privacy Policy</h1>

        <h2>1. Introduction</h2>
        <p>
          We value your privacy and are committed to protecting your personal data. This Privacy
          Policy outlines how your data is processed, stored, and retained, as well as your rights
          under the General Data Protection Regulation (GDPR).
        </p>

        <hr />

        <h2>2. Data We Collect</h2>
        <p>We collect and process the following personal data to provide medical services:</p>
        <ul>
          <li>
            <strong>Identification Information</strong>: First name, last name, full name, record
            number, and date of birth.
          </li>
          <li>
            <strong>Contact Information</strong>: Phone number and emergency contact details.
          </li>
          <li>
            <strong>Medical Records</strong>: Medical conditions, allergies, previous, current, and
            future appointments (including surgeries and non-surgical appointments).
          </li>
        </ul>

        <hr />

        <h2>3. Purpose of Data Processing</h2>
        <p>Your personal data is processed for the following purposes:</p>
        <ul>
          <li>
            To deliver medical care and manage your healthcare records (Article 6(1)(b) GDPR).
          </li>
          <li>
            To contact you regarding appointments, test results, or other healthcare-related
            communications.
          </li>
          <li>To comply with legal and regulatory obligations (Article 6(1)(c) GDPR).</li>
          <li>
            For anonymized research and statistical purposes, where applicable (Recital 26 GDPR).
          </li>
        </ul>

        <hr />

        <h2>4. Legal Basis for Processing</h2>
        <p>We process your personal data based on:</p>
        <ul>
          <li>Your consent, where applicable (Article 6(1)(a) GDPR).</li>
          <li>Performance of a contract (provision of healthcare services) (Article 6(1)(b) GDPR).</li>
          <li>Compliance with legal obligations (Article 6(1)(c) GDPR).</li>
          <li>
            Legitimate interests, such as improving healthcare services (Article 6(1)(f) GDPR).
          </li>
        </ul>

        <hr />

        <h2>5. Data Retention Policy</h2>
        <p>We retain your personal data as follows:</p>
        <ul>
          <li>
            <strong>Medical Records</strong>: Retained for a period consistent with legal and
            regulatory requirements, typically up to 10 years after the last interaction (Article
            5(1)(e) GDPR). After this period, records are securely deleted.
          </li>
          <li>
            <strong>Contact and Identification Information</strong>: Retained for the same duration
            as medical records unless required for legal or contractual purposes.
          </li>
          <li>
            <strong>Anonymized Data for Research and Statistics</strong>: Retained indefinitely for
            public health and research purposes, provided that all identifiable information is
            removed (Recital 26 GDPR).
          </li>
        </ul>

        <hr />

        <h2>6. Data Sharing</h2>
        <p>We may share your personal data with:</p>
        <ul>
          <li>Authorized medical professionals involved in your care.</li>
          <li>Regulatory authorities, as required by law (Article 6(1)(c) GDPR).</li>
          <li>Researchers, but only in anonymized form.</li>
        </ul>
        <p>We do not sell or share your data with third parties for marketing purposes.</p>

        <hr />

        <h2>7. Your Rights Under GDPR</h2>
        <p>You have the following rights:</p>
        <ul>
          <li>
            <strong>Access</strong>: Request a copy of your personal data (Article 15 GDPR).
          </li>
          <li>
            <strong>Rectification</strong>: Correct inaccuracies in your data (Article 16 GDPR).
          </li>
          <li>
            <strong>Erasure</strong>: Request deletion of your data, subject to legal and
            contractual obligations (Article 17 GDPR).
          </li>
          <li>
            <strong>Restriction</strong>: Limit the processing of your data (Article 18 GDPR).
          </li>
          <li>
            <strong>Data Portability</strong>: Receive your data in a structured, commonly used
            format (Article 20 GDPR).
          </li>
          <li>
            <strong>Objection</strong>: Object to the processing of your data (Article 21 GDPR).
          </li>
          <li>
            <strong>Withdrawal of Consent</strong>: Withdraw consent where processing is based on
            it (Article 7(3) GDPR).
          </li>
        </ul>

        <hr />

        <h2>8. Security Measures</h2>
        <p>
          We implement appropriate technical and organizational measures to ensure the security of
          your personal data, including encryption, secure storage, and access controls (Article 32
          GDPR).
        </p>

        <hr />

        <h2>9. Contact Information</h2>
        <p>
          For any queries or concerns about this Privacy Policy or your personal data, please
          contact us at:
        </p>
        <ul>
          <li>
            <strong>Email</strong>: hospitalG47@myhospital.com
          </li>
        </ul>

        <hr />

        <h2>10. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will be communicated via
          the system or other appropriate means.
        </p>

        <hr />

        <p>
          <strong>Effective Date</strong>: December 1, 2024
        </p>
      </main>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
