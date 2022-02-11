import path from 'path'
import { TokenMeta } from '@injectivelabs/token-metadata'
import { Token, GrpcTokenMeta } from './types'

export const tokenMetaToToken = (
  tokenMeta: TokenMeta | undefined,
  denom: string,
): Token | undefined => {
  if (!tokenMeta) {
    return
  }

  let icon: string = ''

  if (tokenMeta.logo.startsWith('http')) {
    icon = tokenMeta.logo
  } else if (tokenMeta.logo) {
    icon = path.join(
      '/',
      'vendor',
      '@injectivelabs',
      'token-metadata',
      tokenMeta.logo,
    )
  } else {
    icon = ''
  }

  return {
    denom,
    icon,
    symbol: tokenMeta.symbol,
    name: tokenMeta.name,
    decimals: tokenMeta.decimals,
    address: tokenMeta.address,
    coinGeckoId: tokenMeta.coinGeckoId,
  }
}

export const grpcTokenMetaToToken = (
  tokenMeta: GrpcTokenMeta | undefined,
  denom: string,
): Token | undefined => {
  if (!tokenMeta) {
    return
  }

  return {
    denom,
    coinGeckoId: '', // TODO
    symbol: tokenMeta.symbol,
    name: tokenMeta.name,
    icon: tokenMeta.logo,
    decimals: tokenMeta.decimals,
    address: tokenMeta.address,
  }
}

export class TokenTransformer {
  static tokenMetaToToken = tokenMetaToToken

  static grpcTokenMetaToToken = grpcTokenMetaToToken
}