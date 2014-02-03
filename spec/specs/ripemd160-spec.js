describe("Crypto.util", function() {
  describe("#bytesToLWords", function() {
    it("works", function() {
      expect(Crypto.util.bytesToLWords([0x01, 0x02, 0x03, 0x04, 0x05, 0x00, 0x00, 0x00])).toEqual([0x04030201, 0x05]);
    });
  });
  describe("#lWordsToBytes", function() {
    it("works", function() {
      expect(Crypto.util.lWordsToBytes([0x04030201, 0x05])).toEqual([0x01, 0x02, 0x03, 0x04, 0x05, 0x00, 0x00, 0x00]);
    });
  });
});
describe("Crypto.RIPEMD160", function() {
  it("hashes a test string", function() {
    expect(Crypto.RIPEMD160('The quick brown fox jumps over the lazy dog')).toEqual('37f332f68db77bd9d7edd4969571ad671cf9dd3b');
  });
});