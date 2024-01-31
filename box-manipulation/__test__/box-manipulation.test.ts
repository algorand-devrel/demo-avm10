import { describe, test, expect, beforeAll, beforeEach } from '@jest/globals';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { BoxManipulationClient } from '../contracts/clients/BoxManipulationClient';
import {ensureFunded, microAlgos} from "@algorandfoundation/algokit-utils";

const fixture = algorandFixture();

let appClient: BoxManipulationClient;

describe('BoxManipulation', () => {
  beforeEach(fixture.beforeEach);

  beforeAll(async () => {
    await fixture.beforeEach();
    const { algod, testAccount } = fixture.context;

    appClient = new BoxManipulationClient(
      {
        sender: testAccount,
        resolveBy: 'id',
        id: 0,
      },
      algod
    );

    await appClient.create.createApplication({});
    await appClient.appClient.fundAppAccount({
      amount: microAlgos(5_000_000),
      sender: testAccount,
    });
    await appClient.bootstrap(
      {},
      {
        boxes: ['spliceableBox', 'resizeableBox'],
      }
    );
  });

  test('splice', async () => {
    const splicedBox = await appClient.spliceBox(
      {},
      {
        boxes: ['spliceableBox'],
      }
    );
    expect(splicedBox.return).toBe('This is some new content.');
  });

  test('resize', async () => {
    const resizedBox = await appClient.resizeBox(
      {},
      {
        boxes: ['resizeableBox'],
      }
    );
    expect(resizedBox.return).toBe('This is my collection of dots ..........');
  });
});
