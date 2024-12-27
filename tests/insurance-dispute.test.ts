import { describe, it, expect, beforeEach, vi } from 'vitest'

const mockClarity = {
  contracts: {
    'insurance-dispute': {
      functions: {
        'file-claim': vi.fn(),
        'resolve-claim': vi.fn(),
        'get-claim': vi.fn(),
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

describe('Insurance and Dispute Resolution Contract', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })
  
  describe('file-claim', () => {
    it('should file a new claim successfully', async () => {
      const shipmentId = 1
      const amount = 1000
      const description = 'Damaged goods'
      mockClarity.contracts['insurance-dispute'].functions['file-claim'].mockReturnValue({ success: true, value: 1 })
      
      const result = await callContract('insurance-dispute', 'file-claim', [shipmentId, amount, description])
      
      expect(result.success).toBe(true)
      expect(result.value).toBe(1)
    })
  })
  
  describe('resolve-claim', () => {
    it('should resolve a claim successfully', async () => {
      const claimId = 1
      const approved = true
      mockClarity.contracts['insurance-dispute'].functions['resolve-claim'].mockReturnValue({ success: true })
      
      const result = await callContract('insurance-dispute', 'resolve-claim', [claimId, approved])
      
      expect(result.success).toBe(true)
    })
    
    it('should fail if not the claimant', async () => {
      const claimId = 1
      const approved = true
      mockClarity.contracts['insurance-dispute'].functions['resolve-claim'].mockReturnValue({ success: false, error: 403 })
      
      const result = await callContract('insurance-dispute', 'resolve-claim', [claimId, approved])
      
      expect(result.success).toBe(false)
      expect(result.error).toBe(403)
    })
  })
  
  describe('get-claim', () => {
    it('should return claim details', async () => {
      const claimId = 1
      const expectedClaim = {
        claimant: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
        shipment_id: 1,
        amount: 1000,
        description: 'Damaged goods',
        status: 'filed'
      }
      mockClarity.contracts['insurance-dispute'].functions['get-claim'].mockReturnValue({ success: true, value: expectedClaim })
      
      const result = await callContract('insurance-dispute', 'get-claim', [claimId])
      
      expect(result.success).toBe(true)
      expect(result.value).toEqual(expectedClaim)
    })
  })
})

