;; Customs Clearance and Documentation Contract

(define-data-var last-document-id uint u0)

(define-map documents
  { document-id: uint }
  {
    shipper: principal,
    recipient: principal,
    contents: (string-utf8 256),
    origin: (string-ascii 64),
    destination: (string-ascii 64),
    status: (string-ascii 20)
  }
)

(define-public (submit-document (contents (string-utf8 256)) (origin (string-ascii 64)) (destination (string-ascii 64)) (recipient principal))
  (let
    (
      (document-id (+ (var-get last-document-id) u1))
    )
    (map-set documents
      { document-id: document-id }
      {
        shipper: tx-sender,
        recipient: recipient,
        contents: contents,
        origin: origin,
        destination: destination,
        status: "pending"
      }
    )
    (var-set last-document-id document-id)
    (ok document-id)
  )
)

(define-public (approve-document (document-id uint))
  (let
    (
      (document (unwrap! (map-get? documents { document-id: document-id }) (err u404)))
    )
    (asserts! (is-eq tx-sender (get recipient document)) (err u403))
    (ok (map-set documents
      { document-id: document-id }
      (merge document { status: "approved" })
    ))
  )
)

(define-read-only (get-document (document-id uint))
  (ok (map-get? documents { document-id: document-id }))
)

