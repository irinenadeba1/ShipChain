;; Tokenized Ownership of Shipping Assets Contract

(define-fungible-token asset-token)

(define-data-var last-asset-id uint u0)

(define-map assets
  { asset-id: uint }
  {
    name: (string-ascii 64),
    asset-type: (string-ascii 20),
    total-supply: uint
  }
)

(define-public (create-asset (name (string-ascii 64)) (asset-type (string-ascii 20)) (total-supply uint))
  (let
    (
      (asset-id (+ (var-get last-asset-id) u1))
    )
    (map-set assets
      { asset-id: asset-id }
      {
        name: name,
        asset-type: asset-type,
        total-supply: total-supply
      }
    )
    (var-set last-asset-id asset-id)
    (ft-mint? asset-token total-supply tx-sender)
  )
)

(define-public (transfer-ownership (recipient principal) (amount uint))
  (ft-transfer? asset-token amount tx-sender recipient)
)

(define-read-only (get-asset (asset-id uint))
  (ok (map-get? assets { asset-id: asset-id }))
)

(define-read-only (get-balance (owner principal))
  (ok (ft-get-balance asset-token owner))
)

