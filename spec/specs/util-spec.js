describe("BitInteger", function() {
  describe("#toByteArrayUnsigned", function() {
    it("returns an array represnting a positive integer given a negative integer", function() {
      var bi = new BigInteger('-1027');

      expect(bi.toByteArrayUnsigned()).toEqual([0x04, 0x03]);
    });
  });
  describe("#fromByteArrayUnsigned", function() {
    it("returns a BigInteger given a byte array", function() {
      var arr = [0x3f, 0xac];

      expect(BigInteger.fromByteArrayUnsigned(arr).toString()).toEqual('16300');
    });
  });
  describe("#toByteArraySigned", function() {
    it("sets the most signficant bit of the first byte given a negative integer", function() {
      var bi = new BigInteger('-16300');

      expect(bi.toByteArraySigned()).toEqual([0xbf, 0xac]);
    });
  });
  describe("#fromByteArraySigned", function() {
    it("works", function() {
      var arr = [0xbf, 0xac];

      expect(BigInteger.fromByteArraySigned(arr).toString()).toEqual('-16300');
    });
  });
});
describe("Bitcoin.Util", function() {
  describe("#isArray", function() {
    it("returns true given object is array", function() {
      expect(Bitcoin.Util.isArray([])).toEqual(true);
    });
    it("returns false given string", function() {
      expect(Bitcoin.Util.isArray('')).toEqual(false);
    });
  });
  describe("#makeFilledArray", function() {
    it("returns an array filled with a value", function() {
      expect(Bitcoin.Util.makeFilledArray(3, 1)).toEqual([1,1,1]);
    });
  });
  describe("#numToVarInt", function() {
    it("returns a 1-byte array given number < 0xfc", function() {
      expect(Bitcoin.Util.numToVarInt(0xfc)).toEqual([0xfc]);
    });
    it("returns a 3-byte array prepended by 0xfd given 0xfd", function() {
      // expect(Bitcoin.Util.numToVarInt(0xfd)).toEqual([0xfd, 0xfd, 0x00]);
      expect(Bitcoin.Util.numToVarInt(0xfd)).toEqual([0xfd, 0x00, 0xfd]);
    });
    it("returns a 3-byte array prepended by 0xfd given 0xfe", function() {
      // expect(Bitcoin.Util.numToVarInt(0xfe)).toEqual([0xfd, 0xfe, 0x00]);
      expect(Bitcoin.Util.numToVarInt(0xfe)).toEqual([0xfd, 0x00, 0xfe]);   
    });
    it("returns a 3-byte array prepended by 0xfd given 0xff", function() {
      // expect(Bitcoin.Util.numToVarInt(0xfe)).toEqual([0xfd, 0xff, 0x00]);
      expect(Bitcoin.Util.numToVarInt(0xff)).toEqual([0xfd, 0x00, 0xff]);   
    });
    it("returns a 3-byte array prepended by 0xfd given 0xffff", function() {
      expect(Bitcoin.Util.numToVarInt(0xffff)).toEqual([0xfd, 0xff, 0xff]);   
    });
    it("returns a 5-byte array prepended by 0xfe given 0x00010000", function() {
      // expect(Bitcoin.Util.numToVarInt(0xff)).toEqual([0xfe, 0x00, 0x00, 0x01, 0x00]);  
      expect(Bitcoin.Util.numToVarInt(0x00010000)).toEqual([0xfd, 256, 0x00]);   
    });
    it("returns a 5-byte array prepended by 0xfe given 0xffffffff", function() {
      // expect(Bitcoin.Util.numToVarInt(0xffffffff)).toEqual([0xfe, 0xff, 0xff, 0xff, 0xff]);
      expect(Bitcoin.Util.numToVarInt(0xffffffff)).toEqual([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]);
    });
    it("returns a 9-byte array prepended by 0xff given 0x0100000000", function() {
      // expect(Bitcoin.Util.numToVarInt(0x0100000000)).toEqual([0xff, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00]);
      expect(Bitcoin.Util.numToVarInt(0x0100000000)).toEqual([0xff, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
    });
  });
  describe("#valueToBigInt", function() {
    it("returns a value given a one-byte array", function() {
      var bigInteger = Bitcoin.Util.valueToBigInt([0x01]);

      expect(bigInteger.toString(10)).toEqual('1');
    });
    it("returns a big-endian value given a two-byte array", function() {
      var bigInteger = Bitcoin.Util.valueToBigInt([0x01, 0x00]);

      expect(bigInteger.toString(16)).toEqual('100');
    });
    it("returns a value given a BigInteger", function() {
      var bigInteger = new BigInteger('1');

      expect(Bitcoin.Util.valueToBigInt([0x01]).toString(10)).toEqual('1');
    });
  });
  describe("#formatValue", function() {
    it("returns string that formats one Satoshi", function() {
      expect(Bitcoin.Util.formatValue([0x01])).toEqual('0.00000001');
    });
    it("returns string that formats one bitcoin", function() {
      expect(Bitcoin.Util.formatValue([0x05, 0xf5, 0xe1, 0x00])).toEqual('1.00');
    });
  });
  describe("#parseValue", function() {
    it("returns a BigInteger representing one bitcoin", function() {
      expect(Bitcoin.Util.parseValue('1.00').toString()).toEqual('100000000');
    });
    it("returns a BigInteger representing one Satoshi", function() {
      expect(Bitcoin.Util.parseValue('0.000000001').toString()).toEqual('1');
    });
  });
  describe("#sha256ripe160", function() {
    it("works", function() {
      var bytes = Crypto.charenc.Binary.stringToBytes('The quick brown fox jumps over the lazy dog')
      var hash = Bitcoin.Util.sha256ripe160(bytes);

      expect(hash).toEqual([ 14, 51, 151, 180, 171, 199, 163, 130, 179, 234, 35, 101, 136, 60, 60, 124, 165, 240, 118, 0 ]);
    });
  });
});