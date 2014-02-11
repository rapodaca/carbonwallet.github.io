describe("ECFieldElementFP", function() {
  var element;
  beforeEach(function() {
    element = new ECFieldElementFp();
  });
  describe("#getByteLength", function() {
    it("returns 1 given one-byte length", function() {
      element.q = new BigInteger('1');
      element.x = new BigInteger('1');

      expect(element.getByteLength()).toEqual(1);
    });
    it("returns 2 given two-byte length", function() {
      element.q = new BigInteger('32768');
      element.x = new BigInteger('1');

      expect(element.getByteLength()).toEqual(1);
    });
  });
});
describe("ECPointFp", function() {
  var point, curve;
  beforeEach(function() {
    curve = new ECCurveFp(new BigInteger('29'), new BigInteger('4'), new BigInteger('20'));
    var x = new ECFieldElementFp(new BigInteger('29'), new BigInteger('5'));
    var y = new ECFieldElementFp(new BigInteger('29'), new BigInteger('22'));
    point = new ECPointFp(curve, x, y);
  });
  describe("#getEncoded", function() {
    it("returns 65 byte public key given uncompressed", function() {
      expect(point.getEncoded(false)).toEqual([
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22 
      ]);
    });
    it("returns 17 byte public key given compressed", function() {
      expect(point.getEncoded(true)).toEqual([
        2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5  
      ]);
    });
  });
  describe("#decodeFrom", function() {
    it("returns point given uncompressed key", function() {
      var key = [
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22 
      ];

      expect(ECPointFp.decodeFrom(curve, key).equals(point)).toBe(true);
    });
  });
  describe("#isOnCurve", function() {
    it("returns true given point is on curve", function() {
      expect(point.isOnCurve()).toBe(true);
    });
    it("returns false given point is not on curve", function() {
      var curve2 = new ECCurveFp(new BigInteger('28'), new BigInteger('2'), new BigInteger('18'));
      var x = new ECFieldElementFp(new BigInteger('29'), new BigInteger('5'));
      var y = new ECFieldElementFp(new BigInteger('29'), new BigInteger('22'));
      var point2 = new ECPointFp(curve2, x, y);

      expect(point2.isOnCurve(curve)).toBe(false);
    });
  });
  describe("#toString", function() {
    it("returns string representation in (x,y) format", function() {
      expect(point.toString()).toEqual('(5,22)');
    });
  });
  describe("#validate", function() {
    it("returns true given valid point", function() {
      expect(point.validate()).toBe(true);
    });
    it("throws given infinity", function() {
      expect(function() {
        curve.infinity.validate();
      }).toThrow(Error('Point is at infinity.'));
    });
  });
});