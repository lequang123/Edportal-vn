
namespace Edportal.Views.Shared.Components.Footer
{
    using Microsoft.AspNetCore.Mvc;
    using System.Threading.Tasks;

    public class FooterViewComponent : ViewComponent
    {

        public FooterViewComponent()
        {
        }

        public IViewComponentResult Invoke()
        {
            return View();
        }
    }
}
