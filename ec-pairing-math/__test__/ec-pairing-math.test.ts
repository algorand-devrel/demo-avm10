import { describe, test, expect, beforeAll, beforeEach } from '@jest/globals';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { EcPairingMathClient } from '../contracts/clients/EcPairingMathClient';

const fixture = algorandFixture();

let appClient: EcPairingMathClient;

describe('EcPairingMath', () => {
  beforeEach(fixture.beforeEach);

  beforeAll(async () => {
    await fixture.beforeEach();
    const { algod, testAccount } = fixture.context;

    appClient = new EcPairingMathClient(
      {
        sender: testAccount,
        resolveBy: 'id',
        id: 0,
      },
      algod
    );

    await appClient.create.createApplication({});
  });

  // The EC points used in this example were generated with the following command:
  // python3 bls_sig_g1.py "Hello, world!" -v
  test('verify', async () => {
    const verified = await appClient
      .compose()
      .verify({
        publicKeyPoint: Buffer.concat([
          Buffer.from(
            '1297cde9cb2fd3f0a1197b86dd2c20528786082632521494b907d158b84986ca7c95ac969da09439577fe6325ce298d415c06eaea978a058cfb7f752dba3e3731aeb11e91212ea7d74acc2b427f471e36d1b373ca9a5b63d1cc22b2fc476c6f5',
            'hex'
          ),
          Buffer.from(
            '0de9f9b19beb5c54955e820c2fdb31ecbcc34dbcd55bba860aa6becc5ef887454586c45ba3cb7fbe8870f3a27a8f065e05aea3c6113505c440e035b43c768eafa61dad50bf79ae6d86d6b8ef81e55338a314e31bb578fca3ad75150dcbbe517f',
            'hex'
          ),
        ]),
        clearTextPoint: Buffer.concat([
          Buffer.from(
            '0fcd68c4b0a514d5c1479a4b6db70e9510b42ee41afc4cd080068a6e1334c557a95e7ddf16e98f4c3e6d149266c7bd2a',
            'hex'
          ),
          Buffer.from(
            '06bb59ad79dee99f87788a29bb2d8fda0563b4c974efe23a4bd4995da7fd0e7d4d52af10fcff0ae43f60ff0b7adf1bef',
            'hex'
          ),
        ]),
        signaturePoint: Buffer.concat([
          Buffer.from(
            '11d2e96b168672dedea44bee7be12243e7d1ca014d2db484310e3a34993880eaea37ff65118c04224528b7ba10d5f510',
            'hex'
          ),
          Buffer.from(
            '139225f8d02ca73f5a35080a74e7ff44918c0a5e036005ddec7158d892009228489464af6e5ef0691673f152e05882e5',
            'hex'
          ),
        ]),
      })
      .simulate({
        extraOpcodeBudget: 320_000,
      });
    expect(verified.returns).toStrictEqual([true]);
  });
});
