
namespace Edportal.Views.Shared.Components.Header
{
    using Edportal.Models;
    using Microsoft.AspNetCore.Mvc;

    public class HeaderViewComponent : ViewComponent
    {

        public HeaderViewComponent()
        {
        }

        public IViewComponentResult Invoke(string categorySlug = "", string page = "")
        {
            var model = new HeaderViewModel
            {
                CategorySlug = categorySlug,
                Page = page
            };
            return View(model);
        }
    }
}
