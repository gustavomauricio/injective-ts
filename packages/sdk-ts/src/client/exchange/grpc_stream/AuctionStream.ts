import { InjectiveAuctionRPCClient } from '@injectivelabs/exchange-api/injective_auction_rpc_pb_service'
import {
  StreamBidsRequest,
  StreamBidsResponse,
} from '@injectivelabs/exchange-api/injective_auction_rpc_pb'
import { StreamStatusResponse } from '../types'

export type BidsStreamCallback = (response: StreamBidsResponse) => void

export class AuctionStream {
  protected client: InjectiveAuctionRPCClient

  constructor(endpoint: string) {
    this.client = new InjectiveAuctionRPCClient(endpoint)
  }

  streamBids({
    callback,
    onEndCallback,
    onStatusCallback,
  }: {
    callback: BidsStreamCallback
    onEndCallback?: (status?: StreamStatusResponse) => void
    onStatusCallback?: (status: StreamStatusResponse) => void
  }) {
    const request = new StreamBidsRequest()

    const stream = this.client.streamBids(request)

    stream.on('data', (response: StreamBidsResponse) => {
      callback(response)
    })

    if (onEndCallback) {
      stream.on('end', onEndCallback)
    }

    if (onStatusCallback) {
      stream.on('status', onStatusCallback)
    }

    return stream
  }
}
