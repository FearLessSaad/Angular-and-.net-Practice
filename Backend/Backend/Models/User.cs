using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class User
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
        [Required]
        [MaxLength(100)]
        [MinLength(5, ErrorMessage ="Password Must Be 5 Characters Long!")]
        public string password { get; set; }
        public string token { get; set; }
        public string role { get; set;}

    }
}
