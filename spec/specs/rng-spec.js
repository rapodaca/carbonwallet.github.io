describe("SecureRandom", function() {
  var random;
  beforeEach(function() {
    random = new SecureRandom();
  });
  describe("#nextBytes", function() {
    var bytes;
    beforeEach(function() {
      bytes = [ ];
    });
    it("fills an 8-byte array with values from 0 to 0xff", function() {
      bytes.length = 8;

      random.nextBytes(bytes);

      for (var i = 0; i < bytes.length; i++) {
        var byte = bytes[i];

        expect(byte >= 0x00 && byte <= 0xff).toBe(true);
      }
    });
  });
});