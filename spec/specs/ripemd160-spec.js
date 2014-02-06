describe("Crypto.util", function() {
  describe("#bytesToLWords", function() {
    it("returns a little-endian 32-bit word array given a byte array", function() {
      expect(Crypto.util.bytesToLWords([0x01, 0x02, 0x03, 0x04, 0x05, 0x00, 0x00, 0x00])).toEqual([0x04030201, 0x05]);
    });
  });
  describe("#lWordsToBytes", function() {
    it("returns a byte array given a littel endian 32-bit word array", function() {
      expect(Crypto.util.lWordsToBytes([0x04030201, 0x05])).toEqual([0x01, 0x02, 0x03, 0x04, 0x05, 0x00, 0x00, 0x00]);
    });
  });
});
// Test vectors from:
// http://homes.esat.kuleuven.be/~bosselae/ripemd160.html#Outline
describe("Crypto.RIPEMD160", function() {
  it("hashes empty string", function() {
    expect(Crypto.RIPEMD160('')).toEqual('9c1185a5c5e9fc54612808977ee8f548b2258d31');
  });
  it("hashes 'a'", function() {
    expect(Crypto.RIPEMD160('a')).toEqual('0bdc9d2d256b3ee9daae347be6f4dc835a467ffe');
  });
  it("hashes abc", function() {
    expect(Crypto.RIPEMD160('abc')).toEqual('8eb208f7e05d987a9b044a8e98c6b087f15a0bfc');
  });
  it("hashes 'message digest'", function() {
    expect(Crypto.RIPEMD160('message digest')).toEqual('5d0689ef49d2fae572b881b123a85ffa21595f36');
  });
  it("hashes 'abcdefghijklmnopqrstuvwxyz", function() {
    expect(Crypto.RIPEMD160('abcdefghijklmnopqrstuvwxyz')).toEqual('f71c27109c692c1b56bbdceb5b9d2865b3708dbc');
  });
  it("hashes 'abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq'", function() {
    expect(Crypto.RIPEMD160('abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq')).toEqual('12a053384a9c0c88e405a06c27dcf49ada62eb2b');
  });
  it("hashes 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'", function() {
    expect(Crypto.RIPEMD160('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789')).toEqual('b0e20b6e3116640286ed3a87a5713079b21f5189');
  });
  it("hashes [8x] '1234567890'", function() {
    var string = Bitcoin.Util.makeFilledArray(8, '1234567890').join('');

    expect(Crypto.RIPEMD160(string)).toEqual('9b752e45573d4b39f4dbd3323cab82bf63326bfb');
  });
});