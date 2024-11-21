import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
emailjs.init('TlW55K_Vg0XRa07eU');

interface EmailData {
  name: string;
  email: string;
  message: string;
  [key: string]: string;
}

export const sendEmail = async (data: EmailData, templateId: string) => {
  try {
    const response = await emailjs.send(
      'service_2rhclfy',
      templateId,
      {
        to_email: 'ozgylbasakkalkan@gmail.com',
        ...data,
      }
    );
    return response;
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
};