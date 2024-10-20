using System.ComponentModel.DataAnnotations.Schema;

namespace Edportal.Models.Request
{
    public class LocationRequest
    {
        public int LocationId { get; set; }

        public string City { get; set; }

        public int ProgramCount { get; set; }
    }
}
