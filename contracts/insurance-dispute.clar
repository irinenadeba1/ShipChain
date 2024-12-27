;; Insurance and Dispute Resolution Contract

(define-data-var last-claim-id uint u0)

(define-map insurance-claims
  { claim-id: uint }
  {
    claimant: principal,
    shipment-id: uint,
    amount: uint,
    description: (string-utf8 256),
    status: (string-ascii 20)
  }
)

(define-public (file-claim (shipment-id uint) (amount uint) (description (string-utf8 256)))
  (let
    (
      (claim-id (+ (var-get last-claim-id) u1))
    )
    (map-set insurance-claims
      { claim-id: claim-id }
      {
        claimant: tx-sender,
        shipment-id: shipment-id,
        amount: amount,
        description: description,
        status: "filed"
      }
    )
    (var-set last-claim-id claim-id)
    (ok claim-id)
  )
)

(define-public (resolve-claim (claim-id uint) (approved bool))
  (let
    (
      (claim (unwrap! (map-get? insurance-claims { claim-id: claim-id }) (err u404)))
    )
    (asserts! (is-eq tx-sender (get claimant claim)) (err u403))
    (ok (map-set insurance-claims
      { claim-id: claim-id }
      (merge claim { status: (if approved "approved" "rejected") })
    ))
  )
)

(define-read-only (get-claim (claim-id uint))
  (ok (map-get? insurance-claims { claim-id: claim-id }))
)

