using Edportal.Database.Models;
using Edportal.Models;

namespace Edportal.Interface
{
    public interface IUserService
    {
        string GenerateToken(User user);

        Task<ResponseResult> RegisterAsync(User user);

        Task<ResponseResult> LoginAsync(User userRequest);
    }
}
