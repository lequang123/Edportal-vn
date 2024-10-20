using Edportal.Database.Efcore;
using Edportal.Database.Models;
using Edportal.Interface;
using Edportal.Models.Request;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Edportal.Controllers
{
    public class AdminController : Controller
    {
        private readonly IAdminService adminService;
        private readonly ILogger<AdminController> logger;

        public AdminController(ILogger<AdminController> logger, IAdminService adminService)
        {
            this.logger = logger;
            this.adminService = adminService;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public async Task<List<Location>> GetLocation()
        {
            return await adminService.GetLocationsAsync();
        }

        [HttpPost]
        public async Task CreateLocation([FromBody] LocationRequest request)
        {
            await adminService.CreateLocationAsync(request);
        }

        [HttpDelete]
        public async Task DeleteLocation([FromBody] LocationRequest request)
        {
            await adminService.DeleteLocationAsync(request);
        }
    }
}
