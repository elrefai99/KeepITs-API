export function maskPhoneNumbers(text: string): string {
     const phoneRegex =
          /(\+?\d{1,3}[\s\-.]?)?(\(?\d{2,4}\)?[\s\-.]?)(\d{3,4}[\s\-.]?\d{3,4})/g;

     return text.replace(phoneRegex, (match) => {
          // Keep only the last 2 digits visible, mask the rest
          const digitsOnly = match.replace(/\D/g, "");
          const masked = "*".repeat(digitsOnly.length - 2) + digitsOnly.slice(-2);
          return masked;
     });
}
