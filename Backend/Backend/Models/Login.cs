using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Login
    {
        [Required]
        [MaxLength(100)]
        public string username { get; set; }
        [Required]
        [MaxLength(100)]
        public string password { get; set; }
    }
}
