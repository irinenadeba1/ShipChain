# ShipChain: Decentralized Shipping & Logistics Platform

A blockchain-based platform for optimizing global shipping operations through automated documentation, real-time tracking, and decentralized ownership models.

## Overview

ShipChain revolutionizes global shipping and logistics by combining blockchain technology, IoT devices, and smart contracts to create a transparent, efficient, and automated shipping ecosystem. The platform enables automated customs clearance, real-time cargo tracking, decentralized insurance, and fractional ownership of shipping assets.

## Core Features

### Smart Documentation System

- Automated customs documentation
- Digital Bill of Lading
- Smart letter of credit
- Certificate of origin automation
- Compliance verification
- Multi-jurisdiction support

### IoT Tracking Network

- Real-time location tracking
- Environmental monitoring
- Cargo condition sensors
- Tamper detection
- Route optimization
- Predictive maintenance

### Insurance & Dispute Resolution

- Automated claim processing
- Smart contract insurance policies
- Decentralized arbitration
- Evidence collection system
- Compensation calculation
- Risk assessment tools

### Asset Tokenization

- Container NFTs
- Vessel fractional ownership
- Equipment tokenization
- Capacity trading
- Revenue sharing
- Asset performance tracking

## Technical Architecture

### Documentation Layer

1. Document Processing
    - Template management
    - Digital signatures
    - Version control
    - Validation system
    - Archive management

2. Compliance Engine
    - Rules database
    - Jurisdiction checker
    - Update system
    - Audit trail
    - Alert system

### Tracking Layer

1. IoT Integration
    - Device management
    - Data collection
    - Alert system
    - Battery management
    - Maintenance scheduling

2. Route Optimization
    - Weather integration
    - Port congestion data
    - Fuel efficiency
    - Time estimation
    - Cost calculation

## Installation

```bash
# Clone repository
git clone https://github.com/your-org/shipchain

# Install dependencies
cd shipchain
npm install

# Configure environment
cp .env.example .env

# Initialize system
npm run init

# Start services
npm run start
```

## Configuration

Required environment variables:

```
ETHEREUM_NODE_URL=
DATABASE_URL=
IOT_GATEWAY_URL=
WEATHER_API_KEY=
CUSTOMS_API_KEYS=
PORT_ACCESS_TOKEN=
```

## Usage Examples

### Documentation Management

```javascript
// Create shipping document
const document = await Document.create({
  type: "bill_of_lading",
  shipment: {
    origin: "Shanghai",
    destination: "Rotterdam",
    cargo: {
      type: "containers",
      quantity: 4,
      weight: "68000 kg"
    }
  },
  parties: {
    shipper: "ABC Trading",
    consignee: "XYZ Import"
  }
});

// Submit for customs clearance
await document.submitCustoms({
  country: "Netherlands",
  port: "NLRTM",
  eta: "2024-03-15T14:00:00Z"
});
```

### Shipment Tracking

```javascript
// Initialize tracking
const tracker = await Tracking.initialize({
  shipmentId: "SHP123456",
  devices: ["IoT001", "IoT002"],
  parameters: ["location", "temperature", "humidity"]
});

// Set up alerts
await tracker.configureAlerts({
  temperature: {
    min: -2,
    max: 4
  },
  humidity: {
    max: 85
  },
  geofence: [
    {
      port: "NLRTM",
      radius: "500m"
    }
  ]
});
```

### Insurance Management

```javascript
// Create insurance policy
const policy = await Insurance.create({
  shipment: "SHP123456",
  coverage: {
    type: "all-risk",
    value: "1000000 USD",
    deductible: "5000 USD"
  },
  duration: {
    start: "2024-03-01T00:00:00Z",
    end: "2024-03-20T23:59:59Z"
  }
});

// File claim
await policy.fileClaim({
  type: "damage",
  description: "Container temperature exceeded limits",
  evidence: ["LOG123", "PHOTO456"],
  amount: "25000 USD"
});
```

## Development

### Prerequisites

- Node.js v16+
- PostgreSQL 13+
- IoT Gateway
- Ethereum client

### Testing

```bash
# Run unit tests
npm run test

# Test IoT integration
npm run test:iot

# Run system tests
npm run test:system
```

## Security Features

- Document encryption
- Access control
- Device authentication
- Transaction verification
- Audit logging
- Fraud detection

## Compliance

- International maritime laws
- Customs regulations
- Insurance requirements
- Environmental standards
- Data privacy laws

## Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/enhancement`)
3. Commit changes (`git commit -m 'Add enhancement'`)
4. Push branch (`git push origin feature/enhancement`)
5. Submit Pull Request

## License

MIT License - see [LICENSE.md](LICENSE.md)

## Support

- Documentation: docs.shipchain.io
- Discord: discord.gg/shipchain
- Email: support@shipchain.io
- Forum: community.shipchain.io

## Acknowledgments

- Port authorities
- Customs agencies
- Shipping companies
- Insurance providers
- IoT manufacturers
