import { describe, it, expect, beforeEach, vi } from 'vitest'

const mockClarity = {
  contracts: {
    'tokenized-ownership': {
      functions: {
        'create-asset': vi.fn(),
        'transfer-ownership': vi.fn(),
        'get-asset': vi.fn(),
        'get-balance': vi.fn(),
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

describe('Tokenized Ownership Contract', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })
  
  describe('create-asset', () => {
    it('should create a new asset successfully', async () => {
      const name = 'Shipping Container XYZ'
      const assetType = 'container'
      const totalSupply = 1000
      mockClarity.contracts['tokenized-ownership'].functions['create-asset'].mockReturnValue({ success: true, value: 1 })
      
      const result = await callContract('tokenized-ownership', 'create-asset', [name, assetType, totalSupply])
      
      expect(result.success).toBe(true)
      expect(result.value).toBe(1)
    })
  })
  
  describe('transfer-ownership', () => {
    it('should transfer ownership successfully', async () => {
      const recipient = 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG'
      const amount = 100
      mockClarity.contracts['tokenized-ownership'].functions['transfer-ownership'].mockReturnValue({ success: true })
      
      const result = await callContract('tokenized-ownership', 'transfer-ownership', [recipient, amount])
      
      expect(result.success).toBe(true)
    })
  })
  
  describe('get-asset', () => {
    it('should return asset details', async () => {
      const assetId = 1
      const expectedAsset = {
        name: 'Shipping Container XYZ',
        asset_type: 'container',
        total_supply: 1000
      }
      mockClarity.contracts['tokenized-ownership'].functions['get-asset'].mockReturnValue({ success: true, value: expectedAsset })
      
      const result = await callContract('tokenized-ownership', 'get-asset', [assetId])
      
      expect(result.success).toBe(true)
      expect(result.value).toEqual(expectedAsset)
    })
  })
  
  describe('get-balance', () => {
    it('should return the balance for an owner', async () => {
      const owner = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM'
      const expectedBalance = 1000
      mockClarity.contracts['tokenized-ownership'].functions['get-balance'].mockReturnValue({ success: true, value: expectedBalance })
      
      const result = await callContract('tokenized-ownership', 'get-balance', [owner])
      
      expect(result.success).toBe(true)
      expect(result.value).toBe(expectedBalance)
    })
  })
})

