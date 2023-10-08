const parseStringtify = (data: string) => {
  try {
    return JSON.parse(data);
  } catch (e) {
    return {};
  }
};

// Hàm encode: Chuyển đổi chuỗi thành Base64
export function encodeToBase64(text: string) {
  var binaryData = new TextEncoder().encode(text);
  var base64String = btoa(String.fromCharCode.apply(null, binaryData as any));
  return base64String;
}

// Hàm decode: Giải mã từ Base64 thành chuỗi
export function decodeFromBase64<T>(base64String: string): T {
  var binaryData = atob(base64String);
  var decodedString = new TextDecoder().decode(
    new Uint8Array(Array.from(binaryData, (c) => c.charCodeAt(0))),
  );
  return parseStringtify(decodedString) as T;
}
