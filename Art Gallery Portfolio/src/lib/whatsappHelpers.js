import { WHATSAPP_NUMBER } from '../config/constants';

export function generateWhatsAppMessage(item) {
  return `Hi, I like this frame sample.

Code: ${item.code}
Title: ${item.title}
Category: ${item.category?.charAt(0).toUpperCase() + item.category?.slice(1)} Frames

Can you send me the price and customization details?`;
}

export function generateWhatsAppUrl(item) {
  const message = generateWhatsAppMessage(item);
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

export function getGeneralWhatsAppUrl() {
  const message = encodeURIComponent('Hi, I would like to inquire about your photo frame samples.');
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}
