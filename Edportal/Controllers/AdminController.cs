using Edportal.Database.Efcore;
using Edportal.Database.Models;
using Edportal.Filter;
using Edportal.Interface;
using Edportal.Models;
using Edportal.Models.Request;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Edportal.Controllers
{
    public class AdminController : Controller
    {
        private readonly IAdminService adminService;
        private readonly IUserService userService;
        private readonly ILogger<AdminController> logger;

        public AdminController(ILogger<AdminController> logger, IAdminService adminService, IUserService userService)
        {
            this.logger = logger;
            this.adminService = adminService;
            this.userService = userService;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [ServiceFilter(typeof(JwtAuthorizeAttribute))]
        public async Task<List<Location>> GetLocation()
        {
            return await adminService.GetLocationsAsync();
        }

        [HttpPost]
        [ServiceFilter(typeof(JwtAuthorizeAttribute))]
        public async Task CreateLocation([FromBody] LocationRequest request)
        {
            await adminService.CreateLocationAsync(request);
        }

        [HttpPut]
        [ServiceFilter(typeof(JwtAuthorizeAttribute))]
        public async Task UpdateLocation([FromBody] LocationRequest request)
        {
            await adminService.UpdateLocationAsync(request);
        }

        [HttpDelete]
        [ServiceFilter(typeof(JwtAuthorizeAttribute))]
        public async Task DeleteLocation([FromBody] LocationRequest request)
        {
            await adminService.DeleteLocationAsync(request);
        }

        [HttpPost]
        [ServiceFilter(typeof(JwtAuthorizeAttribute))]
        public async Task<ResponseResult> Register([FromBody] User userRequest)
        {
            return await userService.RegisterAsync(userRequest);
        }

        [HttpPost]
        //[ServiceFilter(typeof(JwtAuthorizeAttribute))]
        public async Task<ResponseResult> Login([FromBody] User userRequest)
        {
            return await userService.LoginAsync(userRequest);
        }
    }
}
