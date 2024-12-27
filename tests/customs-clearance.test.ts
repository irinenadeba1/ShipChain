import { describe, it, expect, beforeEach, vi } from 'vitest'

const mockClarity = {
  contracts: {
    'customs-clearance': {
      functions: {
        'submit-document': vi.fn(),
        'approve-document': vi.fn(),
        'get-document': vi.fn(),
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

describe('Customs Clearance Contract', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })
  
  describe('submit-document', () => {
    it('should submit a new document successfully', async () => {
      const contents = 'Sample document contents'
      const origin = 'New York'
      const destination = 'London'
      const recipient = 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG'
      mockClarity.contracts['customs-clearance'].functions['submit-document'].mockReturnValue({ success: true, value: 1 })
      
      const result = await callContract('customs-clearance', 'submit-document', [contents, origin, destination, recipient])
      
      expect(result.success).toBe(true)
      expect(result.value).toBe(1)
    })
  })
  
  describe('approve-document', () => {
    it('should approve a document successfully', async () => {
      const documentId = 1
      mockClarity.contracts['customs-clearance'].functions['approve-document'].mockReturnValue({ success: true })
      
      const result = await callContract('customs-clearance', 'approve-document', [documentId])
      
      expect(result.success).toBe(true)
    })
    
    it('should fail if not the recipient', async () => {
      const documentId = 1
      mockClarity.contracts['customs-clearance'].functions['approve-document'].mockReturnValue({ success: false, error: 403 })
      
      const result = await callContract('customs-clearance', 'approve-document', [documentId])
      
      expect(result.success).toBe(false)
      expect(result.error).toBe(403)
    })
  })
  
  describe('get-document', () => {
    it('should return document details', async () => {
      const documentId = 1
      const expectedDocument = {
        shipper: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
        recipient: 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG',
        contents: 'Sample document contents',
        origin: 'New York',
        destination: 'London',
        status: 'pending'
      }
      mockClarity.contracts['customs-clearance'].functions['get-document'].mockReturnValue({ success: true, value: expectedDocument })
      
      const result = await callContract('customs-clearance', 'get-document', [documentId])
      
      expect(result.success).toBe(true)
      expect(result.value).toEqual(expectedDocument)
    })
  })
})

