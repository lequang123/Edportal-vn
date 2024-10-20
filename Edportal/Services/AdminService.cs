using Edportal.Database.Efcore;
using Edportal.Database.Models;
using Edportal.Interface;
using Edportal.Models.Request;
using Microsoft.EntityFrameworkCore;

namespace Edportal.Services
{
    public class AdminService : IAdminService
    {
        private readonly ApplicationDbContext applicationDbContext;

        public AdminService(ApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext;
        }
        public async Task CreateLocationAsync(LocationRequest request)
        {
            var location = new Location
            {
                City = request.City,
                ProgramCount = request.ProgramCount,
                DateCreated = DateTime.Now
            };

            await applicationDbContext.Location.AddAsync(location);

            await applicationDbContext.SaveChangesAsync();
        }

        public async Task DeleteLocationAsync(LocationRequest request)
        {
            var location = await applicationDbContext.Location.FindAsync(request.LocationId);
            if (location != null)
            {
                applicationDbContext.Location.Remove(location);
                await applicationDbContext.SaveChangesAsync();
            }
        }

        public async Task<List<Location>> GetLocationsAsync()
        {
            return await applicationDbContext.Location.OrderByDescending(x => x.LocationId).ToListAsync();
        }
    }
}
