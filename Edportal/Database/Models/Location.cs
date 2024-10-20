using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Edportal.Database.Models
{
    public class Location
    {
        [Key]
        [Column("location_id")]
        public int LocationId { get; set; }

        [Column("city_name")]
        public string City { get; set; }

        [Column("program_count")]
        public int ProgramCount { get; set; }

        [Column("date_created")]
        public DateTime DateCreated { get; set; }
    }
}
