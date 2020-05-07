using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaxiServiceAPI.Data.Models
{
    public class StaffOperator
    {
        public int OperatorId { get; set; }

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
        [StringLength(15)]
        public string WorkingPhone { get; set; }
    }
}