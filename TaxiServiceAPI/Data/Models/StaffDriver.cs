using System;
using System.ComponentModel.DataAnnotations;

namespace TaxiServiceAPI.Data.Models
{
    public class StaffDriver
    {
        public int DriverId { get; set; }

        [Required]
        [StringLength(20)]
        public string CarId { get; set; }

        [Required]
        public int DepartmentId { get; set; }

        [Required]
        [StringLength(20)]
        public string LastName { get; set; }

        [Required]
        [StringLength(20)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(20)]
        public string MiddleName { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateTime DateOfBirth { get; set; }

        [Required]
        [StringLength(20)]
        public string Region { get; set; }

        [Required]
        [StringLength(20)]
        public string City { get; set; }

        [Required]
        [StringLength(20)]
        public string Street { get; set; }


        [Required]
        [StringLength(5)]
        public string Building { get; set; }
        public int? Flat { get; set; }

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime Beginning { get; set; }

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime Ending { get; set; }

        [Required]
        public int Salary { get; set; }

        [Required] 
        public bool Available { get; set; }
    }
}