using Edportal.Database.Efcore;
using Edportal.Database.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Edportal.Controllers
{
    public class AdminController : Controller
    {
        private readonly ApplicationDbContext applicationDbContext;
        private readonly ILogger<AdminController> logger;
        public AdminController(ILogger<AdminController> logger, ApplicationDbContext applicationDbContext)
        {
            this.logger = logger;
            this.applicationDbContext = applicationDbContext;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public async Task<List<Location>> GetLocation()
        {
            return await applicationDbContext.Location.ToListAsync();
        }
    }
}
