using BE.Domain.Entities;

namespace BE.Infrastructure.Firebase
{
    public interface IFireBaseService
    {
        Task AddUser(User user);
    }
}
