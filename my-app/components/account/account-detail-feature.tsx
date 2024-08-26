'use client';

import { PublicKey } from '@solana/web3.js';
import { useMemo } from 'react';
import { useParams } from 'next/navigation';

import { ExplorerLink } from '../cluster/cluster-ui';
import { AppHero, ellipsify } from '../ui/ui-layout';
import {
  AccountBalance,
  AccountButtons,
  AccountTokens,
  AccountTransactions,
} from './account-ui';

export default function AccountDetailFeature() {
  const params = useParams();

  const address = useMemo(() => {
    if (!params || !params.address) {
      return null;
    }
    try {
      return new PublicKey(params.address);
    } catch (e) {
      console.log(`Invalid public key`, e);
      return null;
    }
  }, [params]);

  if (!address) {
    return <div>Error loading account</div>;
  }

  return (
    <div>
      <AppHero
        title={<AccountBalance address={address} />}
        subtitle={
          <div className="my-4">
            <ExplorerLink
              path={`account/${address}`}
              label={ellipsify(address.toString())}
            />
          </div>
        }
      />
      <div className="my-4">
        <AccountButtons address={address} />
      </div>
      <div className="space-y-8">
        <AccountTokens address={address} />
        <AccountTransactions address={address} />
      </div>
    </div>
  );
}
