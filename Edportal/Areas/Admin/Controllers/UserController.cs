namespace Edportal.Areas.Admin.Controllers
{
    using Microsoft.AspNetCore.Mvc;

    public class UserController : AdminController
    {
        public UserController()
        {
            
        }

        public ActionResult Index()
        {
            return View();
        }
    }
}