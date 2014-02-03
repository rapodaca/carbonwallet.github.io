describe("Crypto.SHA256", function() {
  it("hashes a string", function() {
    expect(Crypto.SHA256('The quick brown fox jumps over the lazy dog')).toEqual('d7a8fbb307d7809469ca9abcb0082e4f8d5651e46d3cdb762d02d0bf37c9e592');
  });
});