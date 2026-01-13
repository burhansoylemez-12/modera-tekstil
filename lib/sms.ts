import axios from 'axios';

interface SMSParams {
  phoneNumber: string;
  message: string;
}

export async function sendSMS({ phoneNumber, message }: SMSParams) {
  try {
    // SMS API entegrasyonu (Netgsm, İleti Merkezi vb.)
    // Bu örnek yapı, gerçek API bilgilerinizle değiştirilmelidir
    
    const smsApiUrl = process.env.SMS_API_URL;
    const smsApiKey = process.env.SMS_API_KEY;
    
    if (!smsApiUrl || !smsApiKey) {
      console.log('SMS servisi yapılandırılmamış. Konsola yazdırılıyor:');
      console.log(`Telefon: ${phoneNumber}`);
      console.log(`Mesaj: ${message}`);
      return { success: true, message: 'SMS simülasyonu başarılı (API yapılandırılmamış)' };
    }

    // Gerçek SMS API çağrısı buraya gelecek
    // Örnek: Netgsm, İleti Merkezi, Twilio vb.
    
    /*
    const response = await axios.post(smsApiUrl, {
      apiKey: smsApiKey,
      phone: phoneNumber,
      message: message,
    });
    
    return { success: true, data: response.data };
    */
    
    return { success: true, message: 'SMS gönderimi için API yapılandırması gerekli' };
  } catch (error) {
    console.error('SMS gönderim hatası:', error);
    return { success: false, error: 'SMS gönderilemedi' };
  }
}

export function generateTrackingCode(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `TK${timestamp}${random}`.toUpperCase();
}
