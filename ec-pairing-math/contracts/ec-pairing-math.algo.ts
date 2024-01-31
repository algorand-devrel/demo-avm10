import { Contract } from '@algorandfoundation/tealscript';

// eslint-disable-next-line no-unused-vars
class EcPairingMath extends Contract {
  private pairingCheck(messagePoint: bytes, publicKeyPoint: bytes, signaturePoint: bytes): boolean {
    return ecPairingCheck(
      'BLS12_381g1',
      messagePoint + signaturePoint,
      publicKeyPoint +
        // This is the inverse of the generator of G2 in the python reference implementation.
        hex('024aa2b2f08f0a91260805272dc51051c6e47ad4fa403b02b4510b647ae3d1770bac0326a805bbefd48056c8c121bdb813e02b6052719f607dacd3a088274f65596bd0d09920b61ab5da61bbdc7f5049334cf11213945d57e5ac7d055d042b7e') +
        hex('0d1b3cc2c7027888be51d9ef691d77bcb679afda66c73f17f9ee3837a55024f78c71363275a75d75d86bab79f74782aa13fa4d4a0ad8b1ce186ed5061789213d993923066dddaf1040bc3ff59f825c78df74f2d75467e25e0f55f8a00fa030ed')
    );
  }

  verify(publicKeyPoint: bytes, clearTextPoint: bytes, signaturePoint: bytes): boolean {
    return this.pairingCheck(clearTextPoint, publicKeyPoint, signaturePoint);
  }
}
