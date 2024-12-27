;; Shipment Tracking and Verification Contract

(define-data-var last-shipment-id uint u0)

(define-map shipments
  { shipment-id: uint }
  {
    owner: principal,
    tracking-number: (string-ascii 64),
    status: (string-ascii 20),
    location: (string-ascii 64),
    last-updated: uint
  }
)

(define-public (create-shipment (tracking-number (string-ascii 64)))
  (let
    (
      (shipment-id (+ (var-get last-shipment-id) u1))
    )
    (map-set shipments
      { shipment-id: shipment-id }
      {
        owner: tx-sender,
        tracking-number: tracking-number,
        status: "created",
        location: "origin",
        last-updated: block-height
      }
    )
    (var-set last-shipment-id shipment-id)
    (ok shipment-id)
  )
)

(define-public (update-shipment (shipment-id uint) (new-status (string-ascii 20)) (new-location (string-ascii 64)))
  (let
    (
      (shipment (unwrap! (map-get? shipments { shipment-id: shipment-id }) (err u404)))
    )
    (asserts! (is-eq tx-sender (get owner shipment)) (err u403))
    (ok (map-set shipments
      { shipment-id: shipment-id }
      (merge shipment {
        status: new-status,
        location: new-location,
        last-updated: block-height
      })
    ))
  )
)

(define-read-only (get-shipment (shipment-id uint))
  (ok (map-get? shipments { shipment-id: shipment-id }))
)

