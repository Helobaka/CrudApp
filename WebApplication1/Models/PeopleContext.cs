using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public class PeopleContext : DbContext
    {
        public DbSet<PeopleModel> Peoples { get; set; }

        public PeopleContext()
        {
        

            Database.EnsureCreated();
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySql("Data Source=31.31.196.234; Port=3306;Database=u0879354_people;User ID=u0879_people;Password=1234po16;");
        }
    }
}
