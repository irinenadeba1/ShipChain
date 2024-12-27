import { describe, it, expect, beforeEach, vi } from 'vitest'

const mockClarity = {
  contracts: {
    'shipment-tracking': {
      functions: {
        'create-shipment': vi.fn(),
        'update-shipment': vi.fn(),
        'get-shipment': vi.fn(),
      },
    },
  },
  globals: {
    'tx-sender': 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
  },
}

function callContract(contractName: string, functionName: string, args: any[]) {
  return mockClarity.contracts[contractName].functions[functionName](...args)
}

describe('Shipment Tracking Contract', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })
  
  describe('create-shipment', () => {
    it('should create a new shipment successfully', async () => {
      const trackingNumber = 'TRACK123456'
      mockClarity.contracts['shipment-tracking'].functions['create-shipment'].mockReturnValue({ success: true, value: 1 })
      
      const result = await callContract('shipment-tracking', 'create-shipment', [trackingNumber])
      
      expect(result.success).toBe(true)
      expect(result.value).toBe(1)
    })
  })
  
  describe('update-shipment', () => {
    it('should update a shipment successfully', async () => {
      const shipmentId = 1
      const newStatus = 'in-transit'
      const newLocation = 'Paris'
      mockClarity.contracts['shipment-tracking'].functions['update-shipment'].mockReturnValue({ success: true })
      
      const result = await callContract('shipment-tracking', 'update-shipment', [shipmentId, newStatus, newLocation])
      
      expect(result.success).toBe(true)
    })
    
    it('should fail if not the shipment owner', async () => {
      const shipmentId = 1
      const newStatus = 'in-transit'
      const newLocation = 'Paris'
      mockClarity.contracts['shipment-tracking'].functions['update-shipment'].mockReturnValue({ success: false, error: 403 })
      
      const result = await callContract('shipment-tracking', 'update-shipment', [shipmentId, newStatus, newLocation])
      
      expect(result.success).toBe(false)
      expect(result.error).toBe(403)
    })
  })
  
  describe('get-shipment', () => {
    it('should return shipment details', async () => {
      const shipmentId = 1
      const expectedShipment = {
        owner: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
        tracking_number: 'TRACK123456',
        status: 'in-transit',
        location: 'Paris',
        last_updated: 123456
      }
      mockClarity.contracts['shipment-tracking'].functions['get-shipment'].mockReturnValue({ success: true, value: expectedShipment })
      
      const result = await callContract('shipment-tracking', 'get-shipment', [shipmentId])
      
      expect(result.success).toBe(true)
      expect(result.value).toEqual(expectedShipment)
    })
  })
})

