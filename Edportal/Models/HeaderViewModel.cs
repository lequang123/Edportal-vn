namespace Edportal.Models
{
    using System.Collections.Generic;

    public class HeaderViewModel
    {
        public bool IsAuthenticated { get; set; }
        public string Page { get; set; }
        public string CategorySlug { get; set; }
        public bool IsAdmin { get; set; }
    }
}