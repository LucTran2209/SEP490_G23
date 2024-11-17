namespace BE.Domain.Abstractions.Enums
{
    public enum RequestStatus
    {
        WaitingForConfirm = 0,
        WaitingForDeposit = 1,
        WaitingForTransit = 2,
        Recieved = 3,
        WaitingForReturn = 4,
        ReturnComplete = 5,
        Cancel = 6,
    }
}
