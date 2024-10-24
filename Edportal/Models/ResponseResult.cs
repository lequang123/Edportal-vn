using Edportal.Database.Models;

namespace Edportal.Models
{
    public class ResponseResult
    {
        public bool IsSucess { get; set; } = false;

        public string Message { get; set; }

        public User UserInfo { get; set; } = new User();
    }
}
