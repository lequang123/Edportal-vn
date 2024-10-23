using Edportal.Database.Models;
using Edportal.Models.Request;

namespace Edportal.Interface
{
    public interface IAdminService
    {
        Task<List<Location>> GetLocationsAsync();

        Task CreateLocationAsync(LocationRequest request);

        Task UpdateLocationAsync(LocationRequest request);

        Task DeleteLocationAsync(LocationRequest request);
    }
}
