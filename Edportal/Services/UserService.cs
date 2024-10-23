using Edportal.Database.Efcore;
using Edportal.Database.Models;
using Edportal.Interface;
using Edportal.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Edportal.Services
{
    public class UserService : IUserService
    {
        private readonly IConfiguration _configuration;

        private readonly ApplicationDbContext applicationDbContext;

        public UserService(IConfiguration configuration, ApplicationDbContext applicationDbContext)
        {
            _configuration = configuration;
            this.applicationDbContext = applicationDbContext;
        }

        public string GenerateToken(User user)
        {
            var jwtSettings = _configuration.GetSection("JwtSettings");
            var secretKey = jwtSettings["SecretKey"];
            var issuer = jwtSettings["Issuer"];
            var audience = jwtSettings["Audience"];
            var expiresInMinutes = int.Parse(jwtSettings["ExpiresInMinutes"]);

            var claims = new[]
            {
            new Claim(JwtRegisteredClaimNames.Sub, user.Username),
            new Claim(ClaimTypes.Role, user.Role),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.Now.AddMinutes(expiresInMinutes),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<ResponseResult> LoginAsync(User userRequest)
        {
            var responseResult = new ResponseResult();
            var user = await applicationDbContext.User.FirstOrDefaultAsync(u => u.Username == userRequest.Username);
            if (user == null || !BCrypt.Net.BCrypt.Verify(userRequest.Password, user.Password))
            {
                responseResult.Message = "Invalid username or password.";

                return responseResult;
            }
                

            var token = GenerateToken(user);
            responseResult.IsSucess = true;
            responseResult.Message = token;
            return responseResult;
        }

        public async Task<ResponseResult> RegisterAsync(User user)
        {
            var responseResult = new ResponseResult();
            if (await applicationDbContext.User.AnyAsync(u => u.Username == user.Username))
            {
                responseResult.Message = "Username already exists.";
                return default;
            }
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            user.Role = _configuration.GetSection("AdminRole").Value == user.Username ? "Admin" : "User";

            applicationDbContext.User.Add(user);
            await applicationDbContext.SaveChangesAsync();

            responseResult.IsSucess = true;
            return responseResult;
        }
    }
}
