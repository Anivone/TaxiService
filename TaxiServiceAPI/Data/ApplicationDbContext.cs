using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TaxiServiceAPI.Data.Models;
using TaxiServiceAPI.Data.QueryObjects;

namespace TaxiServiceAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Department>(e =>
            {
                e.HasKey(p => p.DepartmentId);
                e.HasMany<StaffOperator>().WithOne()
                    .HasForeignKey(o => o.DepartmentId).IsRequired();
                e.HasMany<StaffDriver>().WithOne()
                    .HasForeignKey(o => o.DepartmentId).IsRequired();
                e.ToTable("Departments");
            });

            modelBuilder.Entity<StaffOperator>(e =>
            {
                e.HasKey(p => p.OperatorId);
                e.Property(p => p.Salary).HasColumnType("money");
                e.ToTable("Operators");
            });

            modelBuilder.Entity<StaffDriver>(e =>
            {
                e.HasKey(p => p.DriverId);
                e.Property(p => p.Salary).HasColumnType("money");
                e.ToTable("Drivers");
            });

            modelBuilder.Entity<Client>(e =>
            {
                e.HasKey(p => p.ClientId);
                e.HasAlternateKey(c => new { c.CreditCardNum, c.Email });
                e.ToTable("Clients");
            });

            modelBuilder.Entity<OperatorPhones>(e =>
            {
                e.HasKey(p => p.PhoneNumber);
                e.Property(p => p.PhoneNumber).ValueGeneratedNever();
                e.HasOne<StaffOperator>().WithMany()
                    .HasForeignKey(o => o.OperatorId).IsRequired();
                e.ToTable("OperatorPhones");
            });

            modelBuilder.Entity<DriverPhones>(e =>
            {
                e.HasKey(p => p.PhoneNumber);
                e.Property(p => p.PhoneNumber).ValueGeneratedNever();
                e.HasOne<StaffDriver>().WithMany()
                    .HasForeignKey(o => o.DriverId).IsRequired();
                e.ToTable("DriverPhones");
            });

            modelBuilder.Entity<Car>(e =>
            {
                e.HasKey(p => p.CarId);
                e.Property(p => p.CarId).ValueGeneratedNever();
                e.HasMany<StaffDriver>().WithOne().
                    HasForeignKey(d => d.CarId).OnDelete(DeleteBehavior.NoAction);
                e.ToTable("Cars");
            });

            modelBuilder.Entity<Order>(e =>
            {
                e.HasKey(p => p.OrderId);
                e.HasOne<StaffOperator>().WithMany().
                    HasForeignKey(o => o.OperatorId).OnDelete(DeleteBehavior.NoAction);
                e.HasOne<StaffDriver>().WithMany()
                    .HasForeignKey(o => o.DriverId).OnDelete(DeleteBehavior.NoAction);
                e.HasOne<Client>().WithMany().
                    HasForeignKey(o => o.ClientId).OnDelete(DeleteBehavior.NoAction);
                e.Property(p => p.ApproximatePrice).HasColumnType("money");
                e.Property(p => p.FinalPrice).HasColumnType("money");
                e.ToTable("Orders");
            });

            modelBuilder.Entity<DriverCarQueryObject>(entity => entity.HasNoKey().ToView(null));
            modelBuilder.Entity<DriverReceivedOrder>(entity =>
            {
                entity.HasNoKey().ToView(null);
                entity.Property(p => p.ApproximatePrice).HasColumnType("money");
            });
            modelBuilder.Entity<OperatorPhoneQueryObject>(entity =>
            {
                entity.HasNoKey().ToView(null);
            });
            modelBuilder.Entity<DriverPhoneQueryObject>(entity => entity.HasNoKey().ToView(null));
            modelBuilder.Entity<AvailableCar>(entity => entity.HasNoKey().ToView(null));
            modelBuilder.Entity<ProductiveDriversQueryObject>(entity =>
            {
                entity.HasNoKey().ToView(null);
                entity.Property(p => p.Salary).HasColumnType("money");
            });
            modelBuilder.Entity<NumberOfOrdersDepartment>(entity => entity.HasNoKey().ToView(null));
            modelBuilder.Entity<NumberOfOrders>(entity => entity.HasNoKey().ToView(null));

        }

        public DbSet<Department> Departments { get; set; }
        public DbSet<StaffOperator> Operators { get; set; }
        public DbSet<StaffDriver> Drivers { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<OperatorPhones> OperatorPhones { get; set; }
        public DbSet<DriverPhones> DriverPhones { get; set; }
        public DbSet<Car> Cars { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<DriverCarQueryObject> DriverCarQueryObjects { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<DriverReceivedOrder> DriverReceivedOrders { get; set; }
        public DbSet<OperatorPhoneQueryObject> OperatorQueryPhones { get; set; }
        public DbSet<DriverPhoneQueryObject> DriverQueryPhones { get; set; }
        public DbSet<AvailableCar> AvailableCars { get; set; }
        public DbSet<ProductiveDriversQueryObject> ProductiveDrivers { get; set; }

        public DbSet<NumberOfOrdersDepartment> NumberOfOrdersDepartments { get; set; }
        public DbSet<NumberOfOrders> NumberOfOrders { get; set; }

    }
}
