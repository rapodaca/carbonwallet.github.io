/**
 * Adapted from Bouncy Castle test suite.
 *
 * http://opensourcejavaphp.net/java/bouncycastle/org/bouncycastle/math/ec/test/ECPointTest.java.html
 */
describe("ECPointFp", function() {
  var Fp, fp;
  beforeEach(function() {
    var Fp = function() {
      this.q = new BigInteger('29');
      this.a = new BigInteger('4');
      this.b = new BigInteger('20');
      this.curve = new ECCurveFp(this.q, this.a, this.b);
      this.infinity = this.curve.getInfinity();
      this.pointSource = [5, 22, 16, 27, 13, 6, 14, 6];
      this.p = [];
      
      this.createPoints = function() {
        for (var i = 0; i < this.pointSource.length / 2; i++) {
          var x = new ECFieldElementFp(this.q, new BigInteger((this.pointSource[2 * i]).toString()));
          var y = new ECFieldElementFp(this.q, new BigInteger((this.pointSource[2 * i + 1]).toString()));

          this.p[i] = new ECPointFp(this.curve, x, y);
        }
      };
    };

    fp = new Fp();

    fp.createPoints();
  });
  describe("test add", function() {
    it("passes for literature values", function() {
      function implTestAdd(p, infinity) {
        expect(p[0].add(p[1]).equals(p[2])).toBe(true);
        expect(p[1].add(p[0]).equals(p[2])).toBe(true);

        for (var i = 0; i < p.length; i++) {
          expect(p[i].add(infinity).equals(p[i])).toEqual(true);
          expect(infinity.add(p[i]).equals(p[i])).toEqual(true);
        }
      }
      
      implTestAdd(fp.p, fp.infinity);
    });
  });
  describe("test twice", function() {
    it("passes for literature values", function() {
      function implTestTwice(p) {
        expect(p[0].twice().equals(p[3])).toEqual(true);
        expect(p[0].twice().equals(p[0].add(p[0]))).toEqual(true);
      }
      
      implTestTwice(fp.p);
      expect(fp.p[0].twice().validate()).toBe(true);
    });
  });
  describe("test all points", function() {
    it("checks that for all points on a curve and k, adding a point k-times is the same as multiplying it by k", function() {
      function implTestAllPoints(p, infinity) {
        var adder = infinity;
        var multiplier = infinity;
        var i = 1;

        do {
          adder = adder.add(p);
          multiplier = p.multiply(new BigInteger((i).toString(10)));
          expect(adder.equals(multiplier)).toBe(true);

          i++;
        } while (!(adder.equals(infinity)));
      }

      for (var i = 0; i < fp.p.length; i++) {
        implTestAllPoints(fp.p[i], fp.infinity);
      }
    });
  });
  describe("test add subtract multiply simple", function() {
    it("checks results against literature values", function() {
      function implTestAddSubtract(p, infinity) {
        expect(p.twice().equals(p.add(p))).toBe(true);
        // ECPointFp#subtract not implemented
        // expect(p.twice().subtract(p).equals(p)).toBe(true);
        // expect(p.subtract(p).equals(infinity)).toBe(true);
        expect(p.add(infinity).equals(p)).toBe(true);
        expect(infinity.add(p).equals(p)).toBe(true);
        expect(infinity.add(infinity).equals(infinity)).toBe(true);
      }

      function implTestMultiplyAll(p, numBits) {
        var bound = BigInteger.valueOf(2).pow(numBits);
        var k = BigInteger.ZERO;

        function multiply(p, k) {
          var q = p.curve.getInfinity();
          var t = k.bitLength();

          for (var i = 0; i < t; i++) {
            if (k.testBit(i)) {
              q = q.add(p);
            }

            p = p.twice();
          }

          return q;
        }

        do {
          var ref = multiply(p, k);
          var q = p.multiply(k);

          expect(ref.equals(q)).toBe(true);

          k = k.add(BigInteger.ONE);
        } while (k.compareTo(bound) < 0);
      }

      for (var iFp = 0; iFp < fp.pointSource.length / 2; iFp++) {
        implTestAddSubtract(fp.p[iFp], fp.infinity);
        implTestMultiplyAll(fp.p[iFp], 6);
        implTestMultiplyAll(fp.infinity, 6);
      }
    });
  });
});