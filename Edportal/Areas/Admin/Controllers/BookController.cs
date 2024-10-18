namespace Edportal.Areas.Admin.Controllers
{
    using Microsoft.AspNetCore.Mvc;

    public class BookController : AdminController
    {
        public BookController()
        {
            
        }

        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public  IActionResult GetGridData()
        {
            return PartialView("_GridData");
        }
    }
}