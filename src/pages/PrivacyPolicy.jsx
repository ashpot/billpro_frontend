
import React from 'react';
import Logo from '../assets/images/logo.png'

// H1 for main section titles
const H1 = ({ children }) => (
  <h1 className="text-4xl font-bold mt-12 mb-6 text-[#1E1E1E]">{children}</h1>
);

// H2 for sub-section titles 
const H2 = ({ children }) => (
  <h2 className="text-2xl font-bold mt-8 mb-4 ">{children}</h2>
);

// P for all paragraphs
const P = ({ children }) => (
  <p className="text-lg font-bold mb-6 leading-relaxed">{children}</p>
);

// UL for bullet-point lists
const UL = ({ children }) => (
  <ul className="list-disc list-inside space-y-2 mb-6 ml-4 text-lg">
    {children}
  </ul>
);

// OL for numbered lists
const OL = ({ children }) => (
  <ol className="list-decimal list-inside space-y-2 mb-6 ml-4 text-lg ">
    {children}
  </ol>
);

const PrivacyPolicy = () => {
  return (
    <div className="bg-white min-h-screen text-[#1E1E1E]">
      <img src={Logo} alt='billwev logo' className='p-10 ml-44' />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        
        <h1 className="text-6xl font-bold text-[#1E1E1E] mb-10">Privacy Policy</h1>
        <p className="text-lg font-medium mb-5">
          Last Updated: October, 2025
        </p>

        <P>
          Thank you for using our Utility Bills Payment App (“we,” “our,” or “us”).
		  This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you use our mobile application, website, or any related services (collectively referred to as “the App”).
		  By using the App, you agree to the terms of this Privacy Policy. If you do not agree, please discontinue use immediately.
        </P>
        <P>
          By using our Platform, you agree to the terms described in this policy.
        </P>

        <H1>1. Information We Collect</H1>
        <P>
          We collect the following types of information to provide and improve our services:
        </P>

        <H2>1.1 Personal Information</H2>
        <P>
          When you register or use the App, we may collect:
        </P>
        <UL>
          <li>Full name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Bank verification details (as required for KYC)</li>
          <li>Profile photo (optional)</li>
        </UL>

        <H2>1.2 Transaction Information</H2>
        <P>We collect data about payments and transactions you perform through the App, including:</P>
        <UL>
          <li>Airtime and data purchases</li>
          <li>Cable TV subscriptions</li>
          <li>Electricity payments</li>
          <li>Educational payments (JAMB, WAEC, etc.)</li>
          <li>Betting wallet funding</li>
          <li>Wallet funding and withdrawals</li>
        </UL>

        <H2>1.3 Device and Usage Information</H2>
        <P>We automatically collect certain information such as:</P>
        <UL>
            <li>Device type and operating system</li>
            <li>IP address and location (approximate)</li>
            <li>App usage analytics (to improve user experience)</li>
        </UL>

        <H2>1.4 Third-Party Data</H2>
        <P>
          We may receive limited information from our trusted service providers such as <strong>Paystack</strong>, <strong>Vtpass</strong>, and 
          SMS gateways (e.g., <strong>Termii</strong>) to complete your transactions.
        </P>

        <H1>2. How We Use Your Information</H1>
        <P>We use the information we collect to:</P>
        <UL>
          <li>Create and manage your user account</li>
          <li>Process and complete payments or transactions</li>
          <li>Send transaction confirmations, alerts, and OTPs</li>
          <li>Provide customer support</li>
          <li>Improve app performance and user experience</li>
          <li>Detect, prevent, and report fraudulent or illegal activities</li>
          <li>Comply with financial regulations and laws</li>
        </UL>
        <P>
          We <strong>do not</strong> sell or rent your personal data to any third party.
        </P>

        <H1>3. Sharing of Information</H1>
        <P>
          We may share limited data only under the following circumstances:
        </P>
        <UL>
          <li>
            <strong>With service providers:</strong> to process payments (e.g., Paystack), deliver value-added services (e.g., Vtpass), or send notifications (e.g., Termii SMS).
          </li>
          <li>
            <strong>With regulatory bodies:</strong> when required by law, such as anti-money-laundering (AML) or Know-Your-Customer (KYC) compliance.
          </li>
          <li>
            <strong>With business partners:</strong> for technical integrations strictly necessary for service delivery.
          </li>
        </UL>
        <P>All third parties are bound by confidentiality and data protection agreements.</P>

        <H1>4. Wallet and Payment Information</H1>
        <P>
          When you fund your in-app wallet, your payment is securely processed by <strong>Paystack</strong> through your <strong>dedicated virtual account</strong> or card payment.
		  We do not store your full bank card details on our servers.
		  All card or account information is encrypted and handled by PCI-DSS compliant payment processors.
        </P>

		<H1>5. Cookies and Tracking Technologies</H1>
        <P>We may use cookies or similar technologies to:</P>
        <UL>
          <li>Save user preferences</li>
          <li>Analyze traffic and usage patterns</li>
          <li>Enhance your experience within the App</li>
        </UL>
        <P>
          You can disable cookies in your device settings, but some features may stop working properly.
        </P>

        <H1>6. Data Retention</H1>
        <P>We retain user data only for as long as necessary:</P>
        <UL>
          <li>To provide our services</li>
          <li>To comply with financial or legal obligations</li>
          <li>To resolve disputes and enforce agreements</li>
        </UL>
        <P>
          When your account is deleted, we may retain limited information for legal or accounting purposes.
        </P>

        <H1>7. Data Security</H1>
        <P>
          We take reasonable and appropriate measures to protect your personal data, including:
        </P>
        <UL>
            <li>Encryption of sensitive data in transit and at rest</li>
            <li>Regular system audits and vulnerability testing</li>
            <li>Access controls and secure authentication</li>
            <li>Use of HTTPS and tokenized transactions</li>
        </UL>
		<P>However, please note that no electronic storage or transmission is 100% secure.</P>

        <H1>8. Your Rights</H1>
        <P>You have the right to:</P>
        <UL>
            <li>Access the data we hold about you</li>
            <li>Request corrections or updates</li>
            <li>Request deletion of your account or personal data (where legally permitted)</li>
            <li>Withdraw consent to marketing messages</li>
        </UL>
        <P>To exercise these rights, please contact us via the details below.</P>

        <H1>9. Children's Privacy</H1>
        <P>Our App is not directed to individuals under the age of 13. We do not knowingly collect personal information from children.</P>
        <P>If we become aware that we have inadvertently collected such data, we will delete it immediately.</P>

        <H1>10. Third-Party Links and Integrations</H1>
        <P>The App may contain links or integrations with third-party services such as:</P>
        <UL>
            <li>Paystack (for payments and virtual accounts)</li>
            <li>Vtpass (for airtime, data, and bills)</li>
            <li>Termii (for OTP and SMS delivery)</li>
        </UL>
        <P>We are not responsible for their privacy practices.</P>
        <P>Please review their individual privacy policies before using their services.</P>

        <H1>11. Updates to This Policy</H1>
        <P>
          We may update this Privacy Policy periodically to reflect changes in our services or legal requirements.
        </P>
        <P>
          All updates will be posted within the App and will take effect immediately upon publication.
        </P>

        <H1>12. Contact Us</H1>
        <P>
          If you have any questions or concerns about this Privacy Policy, or if you wish to exercise your data rights, please contact us at:
        </P>

        <P>
          Email: customercare@billwev.com
          <br />
          Phone: 09112333351
        </P>
        <P>
          Social Media:
        </P>
        <UL>
            <li>X (Twitter): @BillWevApp</li>
            <li>YouTube: @BillWev</li>
            <li>Facebook: BillWev</li>
            <li>Instagram: @billwev</li>
        </UL>
        
      </main>
    </div>
  );
};

export default PrivacyPolicy;