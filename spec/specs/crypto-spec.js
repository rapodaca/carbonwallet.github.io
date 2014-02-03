describe("Crypto.util", function() {
  var msb32 = parseInt('10000000000000000000000000000000', 2);

  describe("#rotl", function() {
    it("shifts bit left by one position", function() {
      var bits = parseInt('01', 2);

      expect(Crypto.util.rotl(bits, 1)).toEqual(0x02);
    });
    it("wraps last bit given rotation by one bit", function() {
      var bits = msb32;

      expect(Crypto.util.rotl(bits, 1)).toEqual(0x01);
    });
  });
  describe("#rotr", function() {
    it("shifts bit right by one position", function() {
      var bits = parseInt('10', 2);

      expect(Crypto.util.rotr(bits, 1)).toEqual(0x01);
    });
    it("wraps last bit given rotation by one bit", function() {
      var bits = parseInt('01', 2);

      expect(Crypto.util.rotr(bits, 1)).toEqual(-msb32);
    });
  });
  describe("#endian", function() {
    it("converts lsb", function() {
      var bits = parseInt('00000001', 2);

      expect(Crypto.util.endian(bits)).toEqual(parseInt('00000001000000000000000000000000', 2));
    });
    it("converts endian-ness of number", function() {
      var bits = msb32;

      expect(Crypto.util.endian(bits)).toEqual(parseInt('10000000', 2));
    });
    it("converts endian-ness of array", function() {
      expect(Crypto.util.endian([1])).toEqual([parseInt('00000001000000000000000000000000', 2)]);
    });
  });
  describe("#bytesToWords", function() {
    it("converts an array of four bytes into an array of one 32-bit word", function() {
      expect(Crypto.util.bytesToWords([0x01, 0x02, 0x03, 0x04])).toEqual([0x01020304]);
    });
    it("converts an array of eight bytes into an array of two 32-bit words", function() {
      expect(Crypto.util.bytesToWords([0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08])).toEqual([0x01020304, 0x05060708]);
    });
  });
  describe("#wordsToBytes", function() {
    it("converts an array of tw 32-bit words into an array of eight bytes", function() {
      expect(Crypto.util.wordsToBytes([0x01020304, 0x05060708])).toEqual([0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08]);
    });
  });
  describe("#bytesToHex", function() {
    it("converts an array of bytes to a hex string", function() {
      expect(Crypto.util.bytesToHex([0xab, 0xcd])).toEqual('abcd');
    });
  });
  describe("#hexToBytes", function() {
    it("converts a hex string to an array of bytes", function() {
      expect(Crypto.util.hexToBytes('abcd')).toEqual([0xab, 0xcd]);
    });
  });
  describe("#bytesToBase64", function() {
    it("converts an array of bytes to a Base-64 encoded string", function() {
      expect(Crypto.util.bytesToBase64([0xab, 0xcd])).toEqual('q80=');
    });
  });
  describe("#base64ToBytes", function() {
    it("converts a Base-64 encoded string into an array of bytes", function() {
      expect(Crypto.util.base64ToBytes('q80=')).toEqual([0xab, 0xcd]);
    });
  });
});
describe("Crypto.charenc.UTF8", function() {
  describe("#stringToBytes", function() {
    it("converts a unicode string into a byte array", function() {
      expect(Crypto.charenc.UTF8.stringToBytes('\u00A9')).toEqual([0xc2, 0xa9]);
    });
  });
  describe("#bytesToString", function() {
    it("converts a byte array into a unicode string", function() {
      expect(Crypto.charenc.UTF8.bytesToString([0xc2, 0xa9])).toEqual('\u00A9');
    });
  });
});
describe("Crypto.charenc.Binary", function() {
  describe("#stringToBytes", function() {
    it("converts a string into an array of bytes", function() {
      expect(Crypto.charenc.Binary.stringToBytes('foo')).toEqual([0x66, 0x6f, 0x6f]);
    });
  });
  describe("#bytesToString", function() {
    it("converts a byte array into an ascii string", function() {
      expect(Crypto.charenc.Binary.bytesToString([0x66, 0x6f, 0x6f])).toEqual('foo');
    });
  });
});