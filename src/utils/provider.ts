import {
  JsonRpcBatchProvider,
  StaticJsonRpcProvider
} from '@ethersproject/providers';

const providers = {};
const batchedProviders = {};

export type ProviderOptions = {
  broviderUrl?: string;
};

const DEFAULT_BROVIDER_URL = 'https://dev-rpc.oortech.com';

// Default provider options can be set without the "network" parameter
export default function getProvider(
  { broviderUrl = DEFAULT_BROVIDER_URL }: ProviderOptions = {}
) {
  const url = broviderUrl; // Use the base URL without appending the network (chain ID)
  if (!providers[url]) { // Check providers by URL instead of network
    providers[url] = new StaticJsonRpcProvider(
      {
        url,
        timeout: 25000,
        allowGzip: true
      }
    );
  }
  return providers[url]; // Return provider associated with the URL
}

export function getBatchedProvider(
  { broviderUrl = DEFAULT_BROVIDER_URL }: ProviderOptions = {}
) {
  const url = broviderUrl; // Use the base URL without appending the network (chain ID)
  if (!batchedProviders[url]) { // Check batched providers by URL instead of network
    batchedProviders[url] = new JsonRpcBatchProvider({
      url,
      timeout: 25000,
      allowGzip: true
    });
  }
  return batchedProviders[url]; // Return batched provider associated with the URL
}
