using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class apiUsers
    {
        [Key]
        public Int64 Id { get; set; }
        [Required]
        [MaxLength(100)]
        public string full_name { get; set; }
        [Required]
        [MaxLength(100)]
        public string user_name { get; set; }
        [Required]
        [MaxLength(100)]
        [EmailAddress(ErrorMessage = "Invalid Email Address!")]
        public string email { get; set; }
        [Required]
        [MaxLength(100)]
        public string phone { get; set; }
        public string role { get; set; }
    }
}
