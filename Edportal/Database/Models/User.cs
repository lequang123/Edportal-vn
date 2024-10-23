using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Edportal.Database.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; } // Store hashed password
        [Required]
        [Column(TypeName = "ENUM('Admin', 'User')")]
        public string Role { get; set; }
    }
}
