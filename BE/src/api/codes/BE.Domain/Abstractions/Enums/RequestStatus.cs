namespace BE.Domain.Abstractions.Enums
{
    public enum RequestStatus
    {
        PENDING_APPROVAL = 0,
        PENDING_PAYMENT = 1,
        PAYMENTED = 2,
        PENDING_DELIVERY = 3,
        REFUND = 4,
        DEPOSIT_REFUND = 5,
        COMPLETE = 6,
        CANCEL = 7
    }
}
