using Microsoft.AspNetCore.SignalR;

namespace SignarR_Simple_Project.Hubs
{
    public class DeathlyHallowsHub : Hub
    {
        public Dictionary<string,int> GetRaceStatus()
        {
            return SD.DealthyHallowRace;
        }
    }
}
