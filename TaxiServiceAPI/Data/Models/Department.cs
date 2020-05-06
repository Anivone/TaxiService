using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaxiServiceAPI.Data.Models
{
    public class Department
    {
        public int DepartmentId { get; set; }

        [Required]
        [StringLength(15)]
        public string City { get; set; }
    }
}