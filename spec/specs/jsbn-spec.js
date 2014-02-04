describe("BigInteger", function() {
  describe("#add", function() {
    it("adds number", function() {
      var a = new BigInteger('25');
      var b = new BigInteger('1002');

      expect(a.add(b).toString(10)).toEqual('1027');
    });
  });
  describe("#subtract", function() {
    it("subtracts number", function() {
      var a = new BigInteger('25');
      var b = new BigInteger('12');

      expect(a.subtract(b).toString()).toEqual('13');
    });
  });
  describe("#multiply", function() {
    it("multiplies number", function() {
      var a = new BigInteger('10');
      var b = new BigInteger('100');

      expect(a.multiply(b).toString(10)).toEqual('1000');
    });
  });
  describe("#divide", function() {
    it("divides number", function() {
      var a = new BigInteger('100')
      var b = new BigInteger('10');

      expect(a.divide(b).toString()).toEqual('10');
    });
    it("discards remainder and does not round up", function() {
      var a = new BigInteger('109');
      var b = new BigInteger('10');

      expect(a.divide(b).toString()).toEqual('10');
    });
  });
});